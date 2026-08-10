"use client";

import { useState } from "react";
import Logo from "@/components/Logo";

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
    { id: "media", label: "Media & Press" },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="w-full px-5 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Custom SVG Logo Emblem / Brand Name */}
          <button
            onClick={() => handleNavClick("home")}
            className="cursor-pointer text-left focus:outline-none"
          >
            <Logo size={46} isDarkBg={false} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`hover:text-[#8B1538] transition cursor-pointer ${
                  activeView === item.id ? "text-[#8B1538] font-bold border-b-2 border-[#8B1538] pb-1" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/book"
              className="hidden sm:inline-flex items-center gap-2 bg-[#8B1538] hover:bg-[#70102d] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition cursor-pointer shadow-md"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book a Consultation
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-slate-900 p-2 cursor-pointer"
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

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full z-50 bg-white border-t border-gray-200 shadow-2xl">
          <div className="px-5 py-4 flex flex-col gap-3 text-slate-800 text-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`py-2.5 border-b border-gray-100 text-left transition cursor-pointer ${
                  activeView === item.id ? "text-[#8B1538] font-bold" : "text-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/book"
              className="bg-[#8B1538] text-white text-center py-3 rounded-md font-bold mt-2 shadow-md cursor-pointer block"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
