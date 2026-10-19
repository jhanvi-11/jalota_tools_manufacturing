"use client";

import React, { useEffect, useState } from "react";

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917900980096";
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");
  const formattedNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
  const message = "Hi, I'd like to know more about your products.";
  
  // Format the URL
  const waUrl = formattedNumber 
    ? `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`
    : "#";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !formattedNumber) return null;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 animate-bounce-once motion-reduce:animate-none motion-reduce:hover:scale-100"
      style={{
        // Define a custom one-time bounce/pulse animation using standard CSS
        animation: "wa-bounce-in 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wa-bounce-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          60% {
            transform: scale(1.1);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-bounce-once {
            animation: none !important;
            transform: scale(1) !important;
            opacity: 1 !important;
          }
        }
      `}} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
      >
        <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.122.551 4.195 1.6 6.02L.159 24l6.115-1.602a11.95 11.95 0 0 0 5.757 1.472h.005c6.645 0 12.032-5.386 12.032-12.032 0-3.218-1.253-6.246-3.528-8.52A11.95 11.95 0 0 0 12.031 0zm0 21.895h-.005a9.92 9.92 0 0 1-5.06-1.378l-.363-.215-3.766.986.998-3.673-.235-.375A9.92 9.92 0 0 1 2.007 12.03c0-5.523 4.494-10.017 10.019-10.017 2.677 0 5.19 1.042 7.082 2.936 1.893 1.893 2.937 4.407 2.937 7.081 0 5.525-4.494 10.02-10.014 10.02zm5.503-7.518c-.302-.151-1.788-.883-2.064-.985-.276-.102-.477-.151-.679.151-.202.302-.78 .985-.956 1.186-.176.202-.352.226-.653.076-2.126-1.066-3.565-2.062-4.908-4.32-.156-.263.155-.246.74-.827.102-.102.152-.202.227-.302.075-.101.037-.189 0-.265-.038-.076-.679-1.637-.93-2.242-.243-.585-.49-.505-.679-.515-.175-.01-.376-.01-.578-.01-.202 0-.528.076-.804.378-.276.302-1.055 1.033-1.055 2.52 0 1.488 1.08 2.924 1.23 3.125.151.201 2.13 3.254 5.159 4.56.721.31 1.283.495 1.721.633.722.229 1.38.197 1.897.12.578-.086 1.788-.731 2.039-1.437.251-.706.251-1.311.176-1.437-.076-.126-.277-.202-.579-.353z"/>
      </svg>
    </a>
  );
}
