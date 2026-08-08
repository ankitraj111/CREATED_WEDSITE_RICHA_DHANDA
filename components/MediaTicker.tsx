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
    <section className="bg-[#0B1426] py-8 border-y border-gold/20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mb-5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold uppercase tracking-widest mb-1">
            Media &amp; Press Recognition
          </div>
          <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white">
            As Featured In <span className="text-gold">Leading National Outlets</span>
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-left hidden sm:block">
            <div className="text-gold font-bold text-lg font-serif">200+</div>
            <div className="text-white/60 text-xs">Media Outlets Covered</div>
          </div>
          {setActiveView && (
            <button
              onClick={() => {
                setActiveView("media");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-gold hover:bg-gold-soft text-navy px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 shadow-lg"
            >
              View All Media Coverage
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Pure Text Marquee Ticker (No Dots, No Background Boxes, No Borders) */}
      <div className="relative w-full marquee-container py-2">
        <div className="marquee-track flex gap-8 items-center">
          {[...logos, ...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="hover:opacity-80 transition cursor-pointer shrink-0"
              onClick={() => {
                if (setActiveView) {
                  setActiveView("media");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <BrandLogo name={logo} isDarkTheme={true} />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Headline Ticker Strip */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-5">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <span className="px-3 py-1 rounded bg-[#ef4444] text-white text-[11px] font-bold uppercase tracking-wider shrink-0">
              Breaking News
            </span>
            <p className="text-white/90 text-xs sm:text-sm font-medium line-clamp-1">
              <strong>The Tribune &amp; Ahmedabad Mirror:</strong> Advocates Warn Small-Town Youth Against Fake Work Permit Scams.
            </p>
          </div>
          {setActiveView && (
            <button
              onClick={() => {
                setActiveView("media");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-gold hover:text-white text-xs font-bold underline underline-offset-4 shrink-0 cursor-pointer"
            >
              Read Coverage →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
