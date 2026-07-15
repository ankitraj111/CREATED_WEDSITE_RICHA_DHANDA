"use client";

import { useState } from "react";
import Link from "next/link";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Header({ activeView, setActiveView }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "blog", label: "Blog" },
    { id: "faq", label: "FAQs" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveView(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-full border-2 border-[#d4af37] bg-transparent flex items-center justify-center font-bold font-serif text-lg text-white">
              RD
            </div>
            <div className="leading-tight">
              <div className="font-serif text-white text-lg font-semibold tracking-wide">
                Advocate Richa Dhandha
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37]/70 font-medium">
                Expert Immigration Lawyer
              </div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-white/70">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-white transition ${
                  activeView === item.id ? "text-[#d4af37]" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick("book")}
              className="hidden sm:inline-flex items-center gap-2 bg-[#d4af37] text-black px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-[#c9a030] transition"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book a Consultation
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
              aria-label="Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full z-50 bg-[#0a0a0a] border-t border-[#333] shadow-xl">
          <div className="px-5 py-4 flex flex-col gap-3 text-white/90 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="py-2 border-b border-[#333] text-left"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("book")}
              className="bg-[#d4af37] text-black text-center py-3 rounded font-semibold mt-2"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
