"use client";

interface WhyChooseProps {
  setActiveView?: (view: string) => void;
}

export default function WhyChoose({ setActiveView }: WhyChooseProps = {}) {
  const features = [
    {
      icon: "✈️",
      title: "Expert Immigration Representation",
      description: "Specialized expertise in work visas, PR applications, and citizenship cases with a proven track record of approvals.",
    },
    {
      icon: "💬",
      title: "Personalized Case Strategy",
      description: "Every immigration case receives a customized strategy with direct consultation — no delegation to junior staff.",
    },
    {
      icon: "💰",
      title: "Transparent Pricing",
      description: "Clear, upfront fees for all visa services with no hidden costs. You always know exactly what you are paying for.",
    },
    {
      icon: "🌐",
      title: "Global Coverage",
      description: "Immigration solutions for Canada, Australia, UK, USA, New Zealand, Germany, and 10+ other countries.",
    },
    {
      icon: "📞",
      title: "24/7 Availability",
      description: "Always accessible for urgent visa matters — last-minute document requests, interview prep, and emergency consultations.",
    },
    {
      icon: "📋",
      title: "End-to-End Support",
      description: "From initial eligibility assessment to visa stamping and landing — we handle every step of your immigration journey.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FFFFFF] via-[#F8F9FA] to-[#F1F3F5] relative overflow-hidden border-b border-gray-200">
      <div className="relative z-10 w-full px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3 shadow-xs">
            Why Work With Us
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Why Choose <span className="text-[#8B1538]">Advocate Richa Dhanda</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            Trusted immigration expertise with a commitment to achieving the best outcomes for every visa applicant.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300 shadow-xs">
                  {feature.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-3 group-hover:text-[#8B1538] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button 
            onClick={() => {
              if (setActiveView) {
                setActiveView('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="bg-[#06090F] hover:bg-slate-800 text-white px-9 py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}