"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#000000]/95 backdrop-blur-md border-b border-[#C8A04B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Mobile hamburger menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-[#CFCFCF] hover:text-[#C8A04B] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-3xl">
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:justify-start items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.svg"
                alt="Jalota Tools"
                className="w-44 sm:w-52 md:w-64 lg:w-72 h-auto max-h-16 md:max-h-20 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-semibold tracking-widest uppercase transition-colors hover:text-[#E6C667] ${
                    isActive ? "text-[#C8A04B]" : "text-[#CFCFCF]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile spacer to balance hamburger icon and keep logo centered */}
          <div className="w-10 md:hidden" aria-hidden="true" />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-[#0D0D0D]/95 border-b border-[#C8A04B]/20">
          <div className="px-4 pt-2 pb-6 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-semibold tracking-wider uppercase border-l-2 ${
                    isActive
                      ? "border-[#C8A04B] text-[#C8A04B] bg-[#1A1A1A]"
                      : "border-transparent text-[#CFCFCF] hover:text-[#C8A04B] hover:bg-[#1A1A1A]"
                  } transition-all`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
