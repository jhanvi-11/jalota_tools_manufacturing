"use client";

import { useState, type FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
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

    if (!form.message.trim()) errors.message = "Message is required.";
    else if (form.message.length > 2000) errors.message = "Message must be under 2000 characters.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          website_url: form.honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          message: "",
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
          Message Sent
        </h3>
        <p className="text-sm text-[#CFCFCF]">
          Thank you for reaching out. Our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 border border-[#C8A04B] text-[#C8A04B] hover:bg-[#C8A04B] hover:text-[#000000] px-6 py-3 font-bold text-[10px] tracking-wider uppercase transition-all duration-300"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="contact-name" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (validationErrors.name) setValidationErrors({ ...validationErrors, name: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="e.g. John Doe"
          />
          {validationErrors.name && (
            <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="contact-email" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (validationErrors.email) setValidationErrors({ ...validationErrors, email: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
            placeholder="john@company.com"
          />
          {validationErrors.email && (
            <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-phone" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Phone Number
        </label>
        <input
          id="contact-phone"
          type="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="form-input-luxury text-white placeholder-[#747878]/60 text-sm w-full"
          placeholder="+91 7900980096, +91 9464013001"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => {
            setForm({ ...form, message: e.target.value });
            if (validationErrors.message) setValidationErrors({ ...validationErrors, message: "" });
          }}
          className="form-input-luxury text-white placeholder-[#747878]/60 text-sm h-36 resize-none w-full"
          placeholder="How can our engineering team assist you?"
        ></textarea>
        {validationErrors.message && (
          <p className="text-red-400 text-[10px] tracking-wider" role="alert">{validationErrors.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from humans, visible to bots */}
      {/* CAPTCHA could be added here in the future if spam becomes a real problem */}
      <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
        <label htmlFor="contact-website_url">Website</label>
        <input
          type="text"
          id="contact-website_url"
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
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
