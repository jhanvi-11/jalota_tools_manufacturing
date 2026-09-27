import { NextResponse } from "next/server";
import { sendQuoteEmail } from "@/lib/email";

// Simple in-memory rate limiting per IP
// Note: This resets on server restart and doesn't work across multiple serverless instances,
// but is sufficient for this traffic level.
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const MAX_REQUESTS = 5;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateLimit = rateLimitMap.get(ip);

    if (rateLimit) {
      if (now - rateLimit.timestamp < WINDOW_MS) {
        if (rateLimit.count >= MAX_REQUESTS) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        rateLimit.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    // 2. Payload size guard (e.g., max 10kb)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10240) {
      return NextResponse.json(
        { error: "Payload too large." },
        { status: 413 }
      );
    }

    // 3. Method / Content-Type guard (Method is guaranteed POST by Next.js router)
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type." },
        { status: 415 }
      );
    }

    const body = await req.json();

    // 4. Honeypot check
    if (body.website_url) {
      // Silently return success if honeypot is filled (bot suspected)
      return NextResponse.json({ success: true });
    }

    // 5. Server-side validation
    const { name, email, phone, quantity, message, product } = body;

    if (!name || typeof name !== "string" || name.length > 100) {
      return NextResponse.json(
        { error: "Name is required and must be under 100 characters." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || email.length > 254) {
      return NextResponse.json(
        { error: "Valid email is required." },
        { status: 400 }
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (message && (typeof message !== "string" || message.length > 2000)) {
      return NextResponse.json(
        { error: "Message must be under 2000 characters." },
        { status: 400 }
      );
    }

    // 6. Call email function
    await sendQuoteEmail({ name, email, phone, quantity, message, product });

    // 7. Return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote API Error:", error);
    return NextResponse.json(
      { error: "Something went wrong, please try again." },
      { status: 500 }
    );
  }
}
