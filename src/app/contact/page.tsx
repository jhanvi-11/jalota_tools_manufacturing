"use client";

import { useState } from "react";

interface ProductRow {
  id: number;
  product: string;
  quantity: string;
}

export default function ContactPage() {
  // Tab State: "general" | "quote"
  const [activeTab, setActiveTab] = useState<"general" | "quote">("general");

  // General Inquiry form values
  const [generalForm, setGeneralForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Request a Quote form values
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    specifications: "",
  });

  // Quote form product rows (repeatable rows)
  const [productRows, setProductRows] = useState<ProductRow[]>([
    { id: Date.now(), product: "Precision Lathe Tools", quantity: "1" },
  ]);

  // Options for products dropdown
  const productOptions = [
    "Precision Lathe Tools",
    "Industrial Milling Cutters",
    "CNC Carbide Inserts",
    "Hydraulic Chucks",
    "Digital Caliper X1",
    "Precision Wrench Set",
    "Titanium Saw Blade",
    "Master Torque Driver",
  ];

  // Repeatable rows handlers
  const handleAddRow = () => {
    setProductRows([
      ...productRows,
      { id: Date.now(), product: productOptions[0], quantity: "1" },
    ]);
  };

  const handleRemoveRow = (id: number) => {
    if (productRows.length > 1) {
      setProductRows(productRows.filter((row) => row.id !== id));
    }
  };

  const handleRowChange = (id: number, field: "product" | "quantity", value: string) => {
    setProductRows(
      productRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  // Submit handlers (UI ONLY - TODO marked clearly)
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect this with API route/backend database submission.
    // Replace this validation and log block with actual database insert or CRM hook.
    console.log("=== TODO: Submit General Inquiry ===");
    console.log("Sender Details:", generalForm);
    alert(`Thank you, ${generalForm.name}. Your inquiry has been logged (UI simulation only).`);
    
    // Reset form
    setGeneralForm({ name: "", email: "", phone: "", message: "" });
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Connect this with API route/backend database submission.
    // Replace this validation and log block with actual database insert or quote estimation hook.
    console.log("=== TODO: Submit Request a Quote ===");
    console.log("Sender Details:", quoteForm);
    console.log("Products Requested:", productRows);
    alert(`Thank you, ${quoteForm.name}. Your quote request for ${productRows.length} item(s) has been logged (UI simulation only).`);
    
    // Reset form
    setQuoteForm({ name: "", company: "", email: "", phone: "", specifications: "" });
    setProductRows([{ id: Date.now(), product: productOptions[0], quantity: "1" }]);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Page Header */}
      <header className="bg-[#1A1A1A] border-b border-[#C8A04B]/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase text-white">
            GET IN TOUCH
          </h1>
          <p className="text-sm sm:text-base text-[#CFCFCF]/80 leading-relaxed">
            We are here to provide the precision solutions and custom machinery specs your B2B operations demand.
          </p>
        </div>
      </header>

      {/* Form Card Section */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#1A1A1A] border border-[#C8A04B]/20 p-6 sm:p-10 mb-20">
          {/* Tabs */}
          <div className="flex border-b border-[#C8A04B]/20 mb-8 sm:mb-12">
            <button
              onClick={() => setActiveTab("general")}
              className={`flex-1 text-center py-4 text-xs font-extrabold uppercase tracking-wider font-heading transition-all ${
                activeTab === "general"
                  ? "border-b-2 border-[#C8A04B] text-[#C8A04B]"
                  : "text-[#747878] hover:text-[#CFCFCF]"
              }`}
            >
              General Inquiry
            </button>
            <button
              onClick={() => setActiveTab("quote")}
              className={`flex-1 text-center py-4 text-xs font-extrabold uppercase tracking-wider font-heading transition-all ${
                activeTab === "quote"
                  ? "border-b-2 border-[#C8A04B] text-[#C8A04B]"
                  : "text-[#747878] hover:text-[#CFCFCF]"
              }`}
            >
              Request a Quote
            </button>
          </div>

          {/* Form Switcher */}
          {activeTab === "general" ? (
            /* General Inquiry Form */
            <form onSubmit={handleGeneralSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={generalForm.name}
                    onChange={(e) => setGeneralForm({ ...generalForm, name: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={generalForm.email}
                    onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={generalForm.phone}
                  onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                  className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                  Message
                </label>
                <textarea
                  required
                  value={generalForm.message}
                  onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                  className="form-input-luxury text-white placeholder-[#747878]/60 text-sm h-36 resize-none"
                  placeholder="How can our engineering team assist you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] font-bold text-xs tracking-widest uppercase py-4 transition-all duration-300 active:scale-95"
              >
                Send Message
              </button>
            </form>
          ) : (
            /* Request a Quote Form */
            <form onSubmit={handleQuoteSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="e.g. Jane Smith"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quoteForm.company}
                    onChange={(e) => setQuoteForm({ ...quoteForm, company: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="Industrial Solutions Ltd."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="jane@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="form-input-luxury text-white placeholder-[#747878]/60 text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Dynamic Product Rows */}
              <div className="space-y-4">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                  Products Interested In
                </label>

                <div className="space-y-3">
                  {productRows.map((row, index) => (
                    <div key={row.id} className="flex gap-4 items-center">
                      <div className="flex-1 grid grid-cols-12 gap-3">
                        {/* Select Product */}
                        <div className="col-span-8">
                          <select
                            value={row.product}
                            onChange={(e) => handleRowChange(row.id, "product", e.target.value)}
                            className="w-full bg-[#1A1A1A] border border-[#747878] text-white p-3 text-sm focus:border-[#C8A04B] outline-none"
                          >
                            {productOptions.map((opt) => (
                              <option key={opt} value={opt} className="bg-[#1A1A1A]">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Quantity input */}
                        <div className="col-span-4">
                          <input
                            type="number"
                            min="1"
                            required
                            value={row.quantity}
                            onChange={(e) => handleRowChange(row.id, "quantity", e.target.value)}
                            className="w-full bg-[#1A1A1A] border border-[#747878] text-white p-3 text-sm focus:border-[#C8A04B] outline-none text-center"
                            placeholder="Qty"
                          />
                        </div>
                      </div>

                      {/* Remove Row Button */}
                      {productRows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          className="text-[#747878] hover:text-[#C8A04B] p-2"
                        >
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddRow}
                  className="text-[#C8A04B] hover:text-[#E6C667] text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 mt-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add another product
                </button>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold tracking-widest uppercase text-[#C8A04B] font-heading">
                  Additional Specifications
                </label>
                <textarea
                  value={quoteForm.specifications}
                  onChange={(e) => setQuoteForm({ ...quoteForm, specifications: e.target.value })}
                  className="form-input-luxury text-white placeholder-[#747878]/60 text-sm h-32 resize-none"
                  placeholder="Include dimensions, custom plating, or tolerance requirements here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8A04B] hover:bg-[#E6C667] text-[#000000] font-bold text-xs tracking-widest uppercase py-4 transition-all duration-300 active:scale-95"
              >
                Request Quote
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 items-stretch">
          <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] transition-all duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              location_on
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-2 text-white">
              Address
            </h3>
            <p className="text-xs text-[#CFCFCF] leading-relaxed">
              Plot 44, Industrial Estate,
              <br />
              Sector 12
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] transition-all duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              call
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-2 text-white">
              Phone
            </h3>
            <p className="text-xs text-[#CFCFCF] leading-relaxed">+91 98765 43210</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] transition-all duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              mail
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-2 text-white">
              Email
            </h3>
            <p className="text-xs text-[#CFCFCF] leading-relaxed">info@jalotatools.com</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] transition-all duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              schedule
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-2 text-white">
              Hours
            </h3>
            <p className="text-xs text-[#CFCFCF] leading-relaxed">Mon-Sat: 09:00 - 18:00</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="border border-[#C8A04B]/20 relative overflow-hidden h-[450px]">
          <div className="absolute inset-0 bg-[#000000]/60 z-10"></div>
          {/* Architectural Grayscale Map with Gold Highlights */}
          <img
            alt="HQ Location Map visualization"
            className="w-full h-full object-cover grayscale brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgFLvojgHKbR-5amGOClcBvdwX7-wrOJVdRUpyjcxvhg1fzp3sw-eLidESTI4UzZpOFJytHVhlMwwsl2b8Ab3jzzyKx-f6SxFXukwH5n1qIVn-1e1KeyAAxABoNLjKRjIVPx70sSg_3rAikhwlantPKOrqADKo0EShtpimpRnt3EoRZclEEPrtKRuxslIZ0hk4mNQLcAAGa-7vfztUoiISL0OCJ5TJMhlt32FIxrOhh1JZWJh8_VZR2mZNvaSjMD7SOjVXKPLCyAKA"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 z-20 text-center">
            <span className="material-symbols-outlined text-[#C8A04B] text-5xl mb-4 animate-bounce">
              location_on
            </span>
            <p className="font-heading text-[10px] font-bold tracking-[0.25em] text-[#C8A04B] uppercase">
              Our Manufacturing HQ
            </p>
            <p className="font-heading text-xl sm:text-2xl font-black mt-2 uppercase">
              Industrial Estate, Sector 12
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border border-[#C8A04B] hover:bg-[#C8A04B] text-[#C8A04B] hover:text-[#000000] px-6 py-3 font-bold text-[10px] tracking-wider uppercase transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
