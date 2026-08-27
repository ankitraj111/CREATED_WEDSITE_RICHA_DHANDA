"use client";

interface WhyChooseProps {
  setActiveView?: (view: string) => void;
}

export default function WhyChoose({ setActiveView }: WhyChooseProps = {}) {
  const features = [
    {
      num: "01",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Bar Council Enrolled",
      description: "Registered advocate (Reg. PH/1260/2025) with direct immigration law expertise.",
    },
    {
      num: "02",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "1-on-1 Personal Attention",
      description: "Your case is handled directly by Advocate Richa — no junior delegation, ever.",
    },
    {
      num: "03",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Transparent Fees",
      description: "Clear upfront pricing, zero hidden charges — you know costs before we begin.",
    },
    {
      num: "04",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: "Refusal & Appeal Recovery",
      description: "Specialist in challenging visa refusals and filing strong legal appeals.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] relative overflow-hidden border-b border-gray-200">
      <div className="relative z-10 w-full px-5 lg:px-8 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            Why Work With Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1426] mb-3 leading-tight">
            Why Choose <span className="text-[#8B1538]">Advocate Richa Dhanda</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base leading-relaxed">
            Honest, transparent legal representation for your immigration journey.
          </p>
        </div>

        {/* Features Grid — 2 cols on md, 4 cols on lg */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200/90 shadow-sm hover:shadow-lg hover:border-[#8B1538]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300 shadow-xs">
                  {feature.icon}
                </div>
                <span className="font-serif font-extrabold text-xl text-[#D4AF37]">
                  {feature.num}
                </span>
              </div>
              <h3 className="text-slate-900 font-bold font-serif text-lg mb-2 group-hover:text-[#8B1538] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}