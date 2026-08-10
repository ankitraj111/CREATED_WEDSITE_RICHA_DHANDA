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
      title: "Bar Council Enrolled Specialist",
      description: "Direct legal representation from an enrolled Bar Council Advocate (Reg. PH/1260/2025) with specialized immigration expertise.",
    },
    {
      num: "02",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Direct 1-on-1 Legal Guidance",
      description: "Your case is handled directly by Advocate Richa Dhanda — with full personal attention and no junior delegation.",
    },
    {
      num: "03",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Transparent Legal Fees",
      description: "Clear upfront fee structures with zero hidden charges. You know the exact legal costs before starting your application.",
    },
    {
      num: "04",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Multi-Country Visa Solutions",
      description: "Proven expertise across Canada, UK, Australia, USA, Schengen Europe, and Gulf region immigration laws.",
    },
    {
      num: "05",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: "Refusal & Rejection Recovery",
      description: "Specialized legal representation to challenge visa refusals, file appeals, and address procedural fairness objections.",
    },
    {
      num: "06",
      icon: (
        <svg className="w-6 h-6 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "End-to-End Case Management",
      description: "From document preparation and submission to case tracking and visa stamping — every detail is handled meticulously.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] relative overflow-hidden border-b border-gray-200">
      <div className="relative z-10 w-full px-5 lg:px-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Why Work With Us
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1426] mb-4 leading-tight">
            Why Choose <span className="text-[#8B1538]">Advocate Richa Dhanda</span>
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg font-normal leading-relaxed">
            High-trust legal representation dedicated to securing your international visas with complete transparency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300 shadow-xs">
                    {feature.icon}
                  </div>
                  <span className="font-serif font-extrabold text-2xl text-[#D4AF37]">
                    {feature.num}
                  </span>
                </div>

                <h3 className="text-slate-900 font-bold font-serif text-xl mb-3 group-hover:text-[#8B1538] transition-colors duration-300">
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
        <div className="text-center mt-16">
          <a 
            href="/book"
            className="bg-[#8B1538] hover:bg-[#70102d] text-white px-8 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Schedule a Consultation
          </a>
        </div>

      </div>
    </section>
  );
}