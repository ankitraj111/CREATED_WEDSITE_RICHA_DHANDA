"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero({ setActiveView }: { setActiveView?: (view: string) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { number: "1000+", label: "Visas Assisted" },
    { number: "98%", label: "Success Rate" },
    { number: "15+", label: "Top Countries" },
  ];

  return (
    <div className="relative min-h-[85vh] bg-gradient-to-b from-[#091322] via-[#0D1B2A] to-[#060D18] text-white overflow-hidden flex flex-col justify-center">
      {/* Background Royal Ambient Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#d4af37]/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#1e3a8a]/20 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      <div className="relative z-10 w-full px-5 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">

          {/* Left Column (Content) - 7 cols aligned to left side */}
          <div className={`lg:col-span-7 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="text-[#d4af37] text-xs font-bold uppercase tracking-wider">
                Bar Council Registered Advocate &amp; Legal Specialist
              </span>
            </div>

            {/* Simple Clear Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-white">
              Your Trusted Lawyer For <br />
              <span className="bg-gradient-to-r from-amber-300 via-[#d4af37] to-amber-500 bg-clip-text text-transparent">
                Global Visas &amp; Immigration
              </span>
            </h1>

            {/* Simple Clear English Subtitle */}
            <p className="text-white/80 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              Advocate Richa Dhanda provides honest, straightforward legal assistance for <strong>Work Visas</strong>, <strong>Student Visas</strong>, <strong>PR Applications</strong>, and <strong>Visa Refusal Appeals</strong> with 100% legal clarity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setActiveView && setActiveView("book")}
                className="bg-gradient-to-r from-amber-400 via-[#d4af37] to-amber-500 text-[#070D1B] font-bold text-sm px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book Legal Consultation
              </button>

              <button
                onClick={() => setActiveView && setActiveView("services")}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm px-8 py-4 rounded-2xl transition-all duration-300 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Explore Legal Services
              </button>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              {stats.map((st, i) => (
                <div key={i}>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#d4af37]">{st.number}</div>
                  <div className="text-white/70 text-xs mt-1 font-medium">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Checkmarks */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-white/70">
              <span className="flex items-center gap-1.5 text-amber-300">✓ Bar Council Enrolled</span>
              <span className="flex items-center gap-1.5 text-amber-300">✓ LL.M. Degree Holder</span>
              <span className="flex items-center gap-1.5 text-amber-300">✓ High Court Advocate</span>
            </div>

          </div>

          {/* Right Column (Advocate Photo Card) - 5 cols */}
          <div className={`lg:col-span-5 transition-opacity duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="relative ml-auto max-w-md">
              {/* Outer Golden Glow & Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-[#d4af37]/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-gradient-to-b from-white/10 to-white/5 border border-[#d4af37]/30 rounded-3xl p-3 shadow-2xl backdrop-blur-md overflow-hidden">
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-[#070D1B]">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Subtle Gradient Shadow at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D1B] via-[#070D1B]/20 to-transparent" />

                  {/* Name Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-[#d4af37]/30">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg sm:text-xl">Advocate Richa Dhanda</h3>
                      <p className="text-amber-300 text-xs font-semibold">High Court &amp; Immigration Lawyer</p>
                    </div>
                    <div className="bg-[#d4af37] text-[#070D1B] font-bold px-3 py-2 rounded-lg text-center shrink-0">
                      <div className="text-sm font-black leading-none">5+</div>
                      <div className="text-[9px] uppercase tracking-wider font-extrabold mt-0.5">Years Exp</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}