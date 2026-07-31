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

  const services = [
    "Work Visas", "✈️",
    "Student Visas", "🎓",
    "Permanent Residency", "🛂",
    "Immigration Appeals", "⚖️",
    "Business Visas", "💼",
    "Citizenship", "🏛️",
    "Tourist Visas", "🌍",
    "Family Sponsorship", "👨‍👩‍👧‍👦",
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

            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-[#d4af37]/30 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.2em] uppercase">Expert Immigration Lawyer</span>
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              Your Pathway To
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#E8C547] to-[#d4af37]">
                  Global Opportunities
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37] to-[#d4af37]/0 rounded-full" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-white/60 max-w-lg leading-relaxed mb-10 font-light">
              Advocate Richa Dhanda — Expert Immigration Lawyer. Navigating complex
              visa laws, securing your future abroad, and delivering successful
              immigration outcomes with a client-first approach.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-14">
              <button
                onClick={() => setActiveView && setActiveView("book")}
                className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[#06090f] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
                style={{ background: "linear-gradient(135deg, #d4af37, #E8C547, #d4af37)" }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Consultation
              </button>

              <button
                onClick={() => setActiveView && setActiveView("services")}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white border border-white/20 backdrop-blur-md hover:bg-white/10 hover:border-[#d4af37]/40 transition-all duration-300 hover:scale-105"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                View Services
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 lg:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-serif text-3xl lg:text-4xl font-bold text-[#d4af37]">{stat.number}</div>
                  <div className="text-white/50 text-xs tracking-wider uppercase mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-4">
              {["Bar Council Enrolled", "LL.M. Qualified", "High Court Practitioner"].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-white/40 text-xs">
                  <svg className="w-3.5 h-3.5 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Column — Image (IMG_2430.JPG) ── */}
          <div className={`relative transition-opacity duration-1000 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}>

            {/* Glow ring */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#8B1538]/20 blur-xl scale-105" />

            <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-[0_0_60px_rgba(212,175,55,0.15)]">
              <Image
                src="/IMG_2430.JPG"
                alt="Advocate Richa Dhanda – Expert Immigration Lawyer"
                width={800}
                height={1000}
                className="w-full h-[500px] lg:h-[660px] object-cover object-[center_top] scale-[1.15]"
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

      {/* Scrolling Marquee */}
      <div className="relative z-10 border-t border-b border-[#d4af37]/40 bg-[#d4af37]/15 backdrop-blur-md py-4 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap" style={{ animation: "marqueeScroll 30s linear infinite" }}>
          {[...services, ...services].map((item, i) => (
            <span key={i} className="text-white/90 text-sm font-semibold tracking-widest uppercase flex-shrink-0">
              {item}
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