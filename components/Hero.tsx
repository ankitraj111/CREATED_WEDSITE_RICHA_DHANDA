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
    <div className="relative min-h-[85vh] bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900 overflow-hidden flex flex-col justify-center border-b border-gray-200">
      <div className="relative z-10 w-full px-5 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">

          {/* Left Column (Content) - 7 cols aligned to left side */}
          <div className={`lg:col-span-7 transition-opacity duration-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
            
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 mb-6 shadow-xs">
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Bar Council Registered Advocate &amp; Legal Specialist
              </span>
            </div>

            {/* Simple Clear Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-slate-900">
              Your Trusted Lawyer For <br />
              <span className="text-[#8B1538]">
                Global Visas &amp; Immigration
              </span>
            </h1>

            {/* Simple Clear English Subtitle */}
            <p className="text-slate-700 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mb-8">
              Advocate Richa Dhanda provides honest, straightforward legal assistance for <strong>Work Visas</strong>, <strong>Student Visas</strong>, <strong>PR Applications</strong>, and <strong>Visa Refusal Appeals</strong> with 100% legal clarity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => setActiveView && setActiveView("book")}
                className="bg-[#06090F] hover:bg-slate-800 text-white font-bold text-sm px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book Legal Consultation
              </button>

              <button
                onClick={() => setActiveView && setActiveView("services")}
                className="bg-white hover:bg-gray-50 text-slate-900 border border-gray-300 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm hover:border-slate-400"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                </svg>
                Explore Legal Services
              </button>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 max-w-lg">
              {stats.map((st, i) => (
                <div key={i}>
                  <div className="font-serif font-bold text-2xl sm:text-3xl text-[#8B1538]">{st.number}</div>
                  <div className="text-slate-600 text-xs mt-1 font-semibold">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Checkmarks */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> Bar Council Enrolled</span>
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> LL.M. Degree Holder</span>
              <span className="flex items-center gap-1.5 text-slate-800"><span className="text-amber-600">✓</span> High Court Advocate</span>
            </div>

          </div>

          {/* Right Column (Advocate Photo Card) - 5 cols */}
          <div className={`lg:col-span-5 transition-opacity duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="relative ml-auto max-w-md">
              <div className="relative bg-white border border-gray-200 rounded-3xl p-3 shadow-xl overflow-hidden">
                <div className="relative h-[440px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  
                  {/* Subtle Gradient Shadow at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                  {/* Name Badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-slate-900/95 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white shadow-lg">
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg sm:text-xl">Advocate Richa Dhanda</h3>
                      <p className="text-amber-400 text-xs font-semibold">High Court &amp; Immigration Lawyer</p>
                    </div>
                    <div className="bg-[#8B1538] text-white font-bold px-3 py-2 rounded-lg text-center shrink-0 shadow-md">
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