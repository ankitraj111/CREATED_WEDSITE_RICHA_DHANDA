"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero({ setActiveView }: { setActiveView?: (view: string) => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { number: "1000+", label: "Visas Processed" },
    { number: "98%", label: "Success Rate" },
    { number: "15+", label: "Countries" },
  ];

  const serviceList = [
    "Work Visas",
    "Student Visas",
    "Permanent Residency",
    "Immigration Appeals",
    "Business Visas",
    "Citizenship Pathways",
    "Tourist Visas",
    "Family Sponsorship",
  ];

  return (
    <div className="relative min-h-screen bg-[#06090f] overflow-hidden flex flex-col">

      {/* Animated Background Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#8B1538]/15 blur-[100px] animate-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-[#d4af37]/5 blur-[80px] animate-pulse" style={{ animationDelay: "3s" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-5 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-72px)] py-16 lg:py-20">

          {/* ── Left Column ── */}
          <div className={`text-white transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
            
            {/* Enrollment Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
              <span className="text-[#d4af37] font-medium text-xs tracking-wider uppercase">
                Bar Council Enrolled Advocate
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] mb-6">
              Empowering Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">
                Global Dreams
              </span>{" "}
              With Trust
            </h1>

            {/* Sub-headline */}
            <p className="text-white/70 text-base sm:text-lg max-w-xl font-light leading-relaxed mb-10">
              Expert legal counsel for global migration, visa applications, refusal appeals &amp; residency. Transparent guidance rooted in Bar Council standards.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => setActiveView?.("book")}
                className="bg-gradient-to-r from-[#d4af37] to-[#aa8010] text-[#06090f] font-bold px-8 py-4 rounded-xl hover:opacity-95 transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-pointer text-center"
              >
                Book Legal Consultation
              </button>
              <button
                onClick={() => setActiveView?.("services")}
                className="border border-[#d4af37]/40 text-white font-medium px-8 py-4 rounded-xl hover:bg-[#d4af37]/10 transition-all duration-300 backdrop-blur-sm cursor-pointer text-center"
              >
                Explore Services
              </button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8 max-w-md">
              {stats.map((st, i) => (
                <div key={i}>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#d4af37]">{st.number}</div>
                  <div className="text-white/60 text-xs mt-1 font-light">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column ── */}
          <div className="relative lg:block">
            {/* Outer Frame with Gold Accent */}
            <div className="relative mx-auto max-w-[420px] lg:max-w-[480px]">
              
              {/* Glow Behind Photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/20 via-[#8B1538]/20 to-transparent rounded-3xl blur-2xl transform scale-105" />

              {/* Card Container */}
              <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 bg-[#0c121e] shadow-2xl">
                <div className="relative h-[480px] sm:h-[540px] w-full">
                  <Image
                    src="/advocate-richa-photo.jpg"
                    alt="Advocate Richa Dhanda"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  
                  {/* Bottom gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#06090f] via-[#06090f]/40 to-transparent" />

                  {/* Floating name card */}
                  <div className="absolute bottom-6 left-6 right-6 flex gap-4">
                    <div className="flex-1 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-[#d4af37]/20">
                      <div className="text-[#d4af37] font-bold text-xl font-serif">Advocate Richa Dhanda</div>
                      <div className="text-white/60 text-xs tracking-wider mt-0.5">Expert Immigration Lawyer</div>
                    </div>
                    <div className="bg-[#d4af37] rounded-2xl p-4 flex flex-col items-center justify-center min-w-[80px]">
                      <div className="font-serif font-bold text-2xl text-[#06090f]">5+</div>
                      <div className="text-[#06090f]/70 text-[10px] font-bold tracking-wider text-center">YRS EXP</div>
                    </div>
                  </div>
                </div>

                {/* Corner ornaments */}
                <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-[#d4af37]/30 rounded-tr-3xl" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-[#d4af37]/30 rounded-bl-3xl" />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Pure Text Services Marquee Ticker (No Emoji Dots / Icons) */}
      <div className="relative z-10 border-t border-b border-[#d4af37]/40 bg-[#d4af37]/15 backdrop-blur-md py-4 overflow-hidden">
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: "marqueeScroll 35s linear infinite" }}>
          {[...serviceList, ...serviceList, ...serviceList].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-10 text-white/90 text-sm font-semibold tracking-widest uppercase flex-shrink-0">
              <span>{item}</span>
              <span className="text-[#d4af37]/60">✦</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}