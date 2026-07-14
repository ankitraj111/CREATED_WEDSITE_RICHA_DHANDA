"use client";

const WHATSAPP_NUMBER = "919254067300";

export default function CTABanner() {
  const waMsg = encodeURIComponent(
    "Hi, I want to book a consultation regarding my legal matter."
  );

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
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`, "_blank")}
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

          <div className="flex items-center gap-3 text-white/60 text-sm">
            <div className="w-px h-8 bg-white/30"></div>
            <span>or</span>
            <div className="w-px h-8 bg-white/30"></div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer hover:border-gold-soft"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover:scale-110 transition-transform duration-300"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            <span>WhatsApp Me</span>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </a>
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
