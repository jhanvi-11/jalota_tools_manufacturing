"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import QuoteForm from "@/components/QuoteForm";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"general" | "quote">("general");

  useEffect(() => {
    if (searchParams.get("tab") === "quote") {
      setActiveTab("quote");
    }
  }, [searchParams]);

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
              className={`flex-1 text-center py-4 text-xs font-extrabold uppercase tracking-wider font-heading transition-all ${activeTab === "general"
                ? "border-b-2 border-[#C8A04B] text-[#C8A04B]"
                : "text-[#747878] hover:text-[#CFCFCF]"
                }`}
            >
              General Inquiry
            </button>
            <button
              onClick={() => setActiveTab("quote")}
              className={`flex-1 text-center py-4 text-xs font-extrabold uppercase tracking-wider font-heading transition-all ${activeTab === "quote"
                ? "border-b-2 border-[#C8A04B] text-[#C8A04B]"
                : "text-[#747878] hover:text-[#CFCFCF]"
                }`}
            >
              Request a Quote
            </button>
          </div>

          {/* Form Switcher */}
          {activeTab === "general" ? (
            <ContactForm />
          ) : (
            <QuoteForm />
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
              Waryana Industrial Complex, 102/1, Leather Complex Rd, Jalandhar, Punjab 144013              <br />
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
            <p className="text-xs text-[#CFCFCF] leading-relaxed">+91 7900980096, +91 9464013001</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-[#C8A04B]/10 hover:border-[#C8A04B] transition-all duration-300 group">
            <span className="material-symbols-outlined text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
              mail
            </span>
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest mb-2 text-white">
              Email
            </h3>
            <p className="text-xs text-[#CFCFCF] leading-relaxed">jalotatoolsmanufacturing@gmail.com</p>
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
              Waryana Industrial Complex, 102/1, Leather Complex Rd, Jalandhar, Punjab 144013
            </p>
            <a
              href="https://www.google.com/maps/place/Jalota+Tools+Manufacturing+Co./@31.3360413,75.5119874,17z/data=!3m1!4b1!4m6!3m5!1s0x391a458f49544e9b:0xeda50a50519f1097!8m2!3d31.3360413!4d75.5119874!16s%2Fg%2F11y0465hzl?entry=ttu&g_ep=EgoyMDI2MTAxNC4wIKXMDSoASAFQAw%3D%3D"
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

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D0D]" />}>
      <ContactPageContent />
    </Suspense>
  );
}
