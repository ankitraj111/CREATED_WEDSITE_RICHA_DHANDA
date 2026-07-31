"use client";

interface CTABannerProps {
  setActiveView?: (view: string) => void;
}

export default function CTABanner({ setActiveView }: CTABannerProps = {}) {

  return (
    <div className="bg-gradient-to-r from-maroon via-maroon/90 to-navy grain relative overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gold/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-soft/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-20 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-gold-soft text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            Free 15-minute assessment
          </div>
          <h3 className="font-serif text-3xl lg:text-4xl font-semibold text-white mb-6 max-w-4xl mx-auto leading-tight">
            Not sure where your case stands?
            <br />
            <span className="text-gold-soft">Let&apos;s talk it through.</span>
          </h3>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Share your situation briefly and I&apos;ll provide an honest assessment of whether — 
            and how — I can help you achieve the best possible outcome.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => {
              if (setActiveView) {
                setActiveView('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="group btn-gold inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-navy shadow-xl hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 hover:scale-105 cursor-pointer text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-gold-soft to-gold animate-pulse opacity-20"></div>
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="relative z-10">Book a Consultation</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="group-hover:translate-x-1 transition-transform duration-300 relative z-10"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-soft" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>No obligation consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-soft" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Completely confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gold-soft" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>Same-day response</span>
          </div>
        </div>
      </div>
    </div>
  );
}
