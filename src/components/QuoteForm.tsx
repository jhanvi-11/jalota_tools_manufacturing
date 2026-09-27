"use client";

import { useState, type FormEvent } from "react";

interface QuoteFormProps {
  productName?: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function QuoteForm({ productName }: QuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
    product: productName || "",
    honeypot: "", // spam protection
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) errors.name = "Name is required.";
    else if (form.name.length > 100) errors.name = "Name is too long.";

    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    } else if (form.email.length > 254) {
      errors.email = "Email is too long.";
    }

    if (form.message.length > 2000) {
      errors.message = "Message must be under 2000 characters.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setStatus("loading");

    try {
      // If company is provided, we can prepend it to the message or just include it
      const combinedMessage = form.company
        ? `Company: ${form.company}\n\n${form.message}`
        : form.message;

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: form.quantity,
          message: combinedMessage,
          product: form.product,
          website_url: form.honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          quantity: "",
          message: "",
          product: productName || "",
          honeypot: "",
        });
        setValidationErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center space-y-4 w-full" aria-live="polite">
        <span className="material-symbols-outlined text-[#C8A04B] text-5xl">
          check_circle
        </span>
        <h3 className="text-xl font-extrabold uppercase text-white font-heading">
          Quote Request Sent
        </h3>
        <p className="text-sm text-[#CFCFCF]">
          Thank you for your interest{productName ? ` in ` : "."}
          {productName && <span className="text-[#C8A04B] font-semibold">{productName}</span>}
          {productName && "."} Our team will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 border border-[#C8A04B] text-[#C8A04B] hover:bg-[#C8A04B] hover:text-[#000000] px-6 py-3 font-bold text-[10px] tracking-wider uppercase transition-all duration-300"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full" noValidate>
      {/* Product indicator (read-only if passed as prop, input otherwise) */}
      <div className="space-y-2">
        <label htmlFor="quote-product" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Product(s) Interested In
        </label>
        {productName ? (
          <div className="form-input-luxury text-white text-sm bg-[#0D0D0D]/50 cursor-default flex items-center gap-2">
            <span className="material-symbols-outlined text-[#C8A04B] text-base">
              inventory_2
            </span>
            {productName}
            {/* hidden field to ensure value is present in form visually, although we pass form.product */}
          </div>
        ) : (
          <input
            id="quote-product"
            type="text"
            value={form.product}
            onChange={(e) => setForm({ ...form, product: e.target.value })}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="e.g. Precision Lathe Tools"
          />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="quote-name" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="quote-name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (validationErrors.name) setValidationErrors({ ...validationErrors, name: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="e.g. Jane Smith"
          />
          {validationErrors.name && (
            <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.name}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="quote-company" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Company Name
          </label>
          <input
            id="quote-company"
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="Industrial Solutions Ltd."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="quote-email" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="quote-email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (validationErrors.email) setValidationErrors({ ...validationErrors, email: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="jane@company.com"
          />
          {validationErrors.email && (
            <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="quote-phone" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Phone Number
          </label>
          <input
            id="quote-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="+91 7900980096, +91 9464013001"
          />
        </div>
      </div>

      {/* Quantity */}
      <div className="space-y-2">
        <label htmlFor="quote-quantity" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Quantity
        </label>
        <input
          id="quote-quantity"
          type="text"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
          placeholder="e.g. 100 units"
        />
      </div>

      {/* Message / Specifications */}
      <div className="space-y-2">
        <label htmlFor="quote-message" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Additional Specifications
        </label>
        <textarea
          id="quote-message"
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (validationErrors.message) setValidationErrors({ ...validationErrors, message: "" });
          }}
          className="form-input-luxury text-white placeholder-[#747878]/60 text-sm h-32 resize-none w-full"
          placeholder="Include dimensions, custom plating, or tolerance requirements here..."
        ></textarea>
        {validationErrors.message && (
          <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from humans, visible to bots */}
      {/* CAPTCHA could be added here in the future if spam becomes a real problem */}
      <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
        <label htmlFor="quote-website_url">Website</label>
        <input
          type="text"
          id="quote-website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        />
      </div>

      {/* Error message */}
      {status === "error" && errorMsg && (
        <div className="flex items-center gap-2 text-red-400 text-xs border border-red-400/20 bg-red-400/5 p-3" role="alert" aria-live="assertive">
          <span className="material-symbols-outlined text-base">error</span>
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#C8A04B] hover:bg-[#E6C667] disabled:opacity-60 disabled:cursor-not-allowed text-[#000000] font-bold text-xs tracking-widest uppercase py-4 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
            Sending...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-base">send</span>
            Request Quote
          </>
        )}
      </button>
    </form>
  );
}
