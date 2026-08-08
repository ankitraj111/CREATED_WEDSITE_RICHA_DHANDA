"use client";

import BrandLogo from "@/components/BrandLogos";

interface MediaTickerProps {
  setActiveView?: (view: string) => void;
}

export default function MediaTicker({ setActiveView }: MediaTickerProps) {
  const logos = [
    "Google News",
    "Yahoo! News",
    "The Tribune",
    "Ahmedabad Mirror",
    "India Today Times",
    "Times of India Daily",
    "India Global Live",
    "Indian Press Wire",
    "Maharashtra Portal",
    "Gujarat Watch",
    "Rajasthan Headlines",
  ];

  return (
    <section className="bg-gradient-to-b from-[#F8F9FA] via-[#FFFFFF] to-[#F1F3F5] py-10 border-y border-gray-200 overflow-hidden relative shadow-sm">
      {/* Background Soft Subtlety */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-5 lg:px-8 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest mb-2 shadow-xs">
            Media &amp; Press Recognition
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-slate-900">
            As Featured In <span className="text-[#8B1538]">Leading National Outlets</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-left hidden sm:block shadow-sm">
            <div className="text-[#8B1538] font-bold text-lg font-serif">200+</div>
            <div className="text-slate-600 text-xs font-medium">Media Outlets Covered</div>
          </div>
          {setActiveView && (
            <button
              onClick={() => {
                setActiveView("media");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-[#06090F] hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-md"
            >
              View All Media Coverage
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Pure Text Marquee Ticker (Light Theme Brand Logos) */}
      <div className="relative w-full marquee-container py-3 z-10 border-y border-gray-100 bg-white/60 backdrop-blur-xs">
        <div className="marquee-track flex gap-10 items-center">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="hover:opacity-75 transition cursor-pointer shrink-0"
              onClick={() => {
                if (setActiveView) {
                  setActiveView("media");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <BrandLogo name={logo} isDarkTheme={false} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Headline Ticker Strip */}
      <div className="relative z-10 w-full px-5 lg:px-8 mt-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3 text-left">
            <span className="px-3 py-1 rounded bg-[#ef4444] text-white text-[11px] font-bold uppercase tracking-wider shrink-0 shadow-xs">
              Breaking News
            </span>
            <p className="text-slate-800 text-xs sm:text-sm font-medium line-clamp-1">
              <strong>The Tribune &amp; Ahmedabad Mirror:</strong> Advocates Warn Small-Town Youth Against Fake Work Permit Scams.
            </p>
          </div>
          {setActiveView && (
            <button
              onClick={() => {
                setActiveView("media");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[#8B1538] hover:text-slate-900 text-xs font-bold underline underline-offset-4 shrink-0 cursor-pointer transition"
            >
              Read Coverage →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
