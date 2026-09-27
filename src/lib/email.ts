import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL || "jalotatoolsmanufacturing@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev"; // Default Resend email

/**
 * Escapes HTML characters in user input to prevent injection in emails.
 */
function escapeHtml(unsafe: string): string {
  if (!unsafe) return "";
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface QuoteData {
  name: string;
  email: string;
  phone?: string;
  quantity?: string;
  message?: string;
  product?: string;
}

export async function sendContactEmail(data: ContactData) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");

  try {
    const response = await resend.emails.send({
      from: `Jalota Tools <${FROM_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Contact Inquiry from ${safeName}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <br/>
        <h3>Message:</h3>
        <p>${safeMessage}</p>
      `,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error("Resend Error (Contact):", error);
    throw new Error("Failed to send contact email");
  }
}

export async function sendQuoteEmail(data: QuoteData) {
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeQuantity = escapeHtml(data.quantity || "Not specified");
  const safeMessage = escapeHtml(data.message || "No additional message").replace(/\n/g, "<br>");
  const safeProduct = escapeHtml(data.product || "General Quote");

  try {
    const response = await resend.emails.send({
      from: `Jalota Tools <${FROM_EMAIL}>`,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Quote Request: ${safeProduct} - ${safeName}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Product/Service:</strong> ${safeProduct}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Phone:</strong> ${safePhone}</p>
        <p><strong>Quantity:</strong> ${safeQuantity}</p>
        <br/>
        <h3>Additional Message:</h3>
        <p>${safeMessage}</p>
      `,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return { success: true, id: response.data?.id };
  } catch (error) {
    console.error("Resend Error (Quote):", error);
    throw new Error("Failed to send quote email");
  }
}
