"use client";

import { useState, type FormEvent } from "react";

interface ProductQuoteFormProps {
  productName: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ProductQuoteForm({
  productName,
}: ProductQuoteFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
    honeypot: "", // spam protection
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  function validate(): boolean {
    const errors: Record<string, string> = {};

    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) errors.phone = "Phone number is required.";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          quantity: form.quantity,
          message: form.message,
          product: productName,
          honeypot: form.honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          phone: "",
          quantity: "",
          message: "",
          honeypot: "",
        });
        setValidationErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(
          data.error || "Something went wrong. Please try again."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#1A1A1A] border border-[#C8A04B]/20 p-8 sm:p-12 text-center space-y-4 max-w-2xl">
        <span className="material-symbols-outlined text-[#C8A04B] text-5xl">
          check_circle
        </span>
        <h3 className="text-xl font-extrabold uppercase text-white font-heading">
          Quote Request Sent
        </h3>
        <p className="text-sm text-[#CFCFCF]">
          Thank you for your interest in{" "}
          <span className="text-[#C8A04B] font-semibold">{productName}</span>.
          Our team will get back to you within 24 hours.
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
    <form
      onSubmit={handleSubmit}
      className="bg-[#1A1A1A] border border-[#C8A04B]/20 p-6 sm:p-10 max-w-2xl space-y-6"
      noValidate
    >
      {/* Product indicator (read-only) */}
      <div className="space-y-2">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Product
        </label>
        <div className="form-input-luxury text-white text-sm bg-[#0D0D0D]/50 cursor-default flex items-center gap-2">
          <span className="material-symbols-outlined text-[#C8A04B] text-base">
            inventory_2
          </span>
          {productName}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (validationErrors.name)
                setValidationErrors({ ...validationErrors, name: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
            placeholder="e.g. John Doe"
          />
          {validationErrors.name && (
            <p className="text-red-400 text-[10px] tracking-wider">
              {validationErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (validationErrors.email)
                setValidationErrors({ ...validationErrors, email: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
            placeholder="john@company.com"
          />
          {validationErrors.email && (
            <p className="text-red-400 text-[10px] tracking-wider">
              {validationErrors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => {
              setForm({ ...form, phone: e.target.value });
              if (validationErrors.phone)
                setValidationErrors({ ...validationErrors, phone: "" });
            }}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
            placeholder="+91 7900980096, +91 9464013001"
          />
          {validationErrors.phone && (
            <p className="text-red-400 text-[10px] tracking-wider">
              {validationErrors.phone}
            </p>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
            Quantity
          </label>
          <input
            type="text"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
            placeholder="e.g. 100 units"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
          Additional Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="form-input-luxury text-white placeholder-[#747878]/60 text-sm h-32 resize-none"
          placeholder="Include any specifications, custom requirements, or questions here..."
        ></textarea>
      </div>

      {/* Honeypot — hidden from humans, visible to bots */}
      <div className="absolute opacity-0 pointer-events-none -z-10" aria-hidden="true">
        <label htmlFor="website_url">Website</label>
        <input
          type="text"
          id="website_url"
          name="website_url"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        />
      </div>

      {/* Error message */}
      {status === "error" && errorMsg && (
        <div className="flex items-center gap-2 text-red-400 text-xs border border-red-400/20 bg-red-400/5 p-3">
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
            <span className="material-symbols-outlined text-base animate-spin">
              progress_activity
            </span>
            Sending...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-base">send</span>
            Submit Quote Request
          </>
        )}
      </button>
    </form>
  );
}
