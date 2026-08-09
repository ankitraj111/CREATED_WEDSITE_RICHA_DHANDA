"use client";

import { useState } from "react";

interface ServicesViewProps {
  setActiveView?: (view: string) => void;
}

export default function ServicesView({ setActiveView }: ServicesViewProps = {}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const services = [
    {
      category: "Work & PR",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Immigration Consultation",
      desc: "Comprehensive initial assessment of your background to chart the fastest and most secure visa strategy.",
      tag: "Popular",
    },
    {
      category: "Work & PR",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Work & Skilled Visas",
      desc: "Legal representation for work permits, employer sponsorships, LMIA, and skilled worker applications worldwide.",
      tag: "High Demand",
    },
    {
      category: "Student Visas",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: "Student Visas & Permits",
      desc: "Complete assistance for international university admissions, study permits, and post-study work rights.",
      tag: "Top Choice",
    },
    {
      category: "Work & PR",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Permanent Residency (PR)",
      desc: "End-to-end legal support for points-based Express Entry, Provincial Nominee Programs (PNP), and PR renewals.",
      tag: "",
    },
    {
      category: "Family & Appeals",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Family & Spouse Sponsorship",
      desc: "Reunite families through spousal sponsorship, dependent child visas, and parent immigration pathways.",
      tag: "",
    },
    {
      category: "Work & PR",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Business & Investor Visas",
      desc: "Strategic visa pathways for business owners, startup founders, and investors expanding internationally.",
      tag: "",
    },
    {
      category: "Student Visas",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Visitor & Tourist Visas",
      desc: "Hassle-free application handling for short-term tourism, family visits, and business travel visas.",
      tag: "",
    },
    {
      category: "Family & Appeals",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      title: "Appeals & Refusal Cases",
      desc: "Expert legal representation to challenge visa refusals, file appeals, and overcome procedural objections.",
      tag: "Specialized",
    },
    {
      category: "Work & PR",
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Citizenship & Passport Rights",
      desc: "Step-by-step assistance for permanent residents applying for full citizenship and passport issuance.",
      tag: "",
    },
  ];

  const categories = ["All", "Work & PR", "Student Visas", "Family & Appeals"];

  const filteredServices = activeCategory === "All"
    ? services
    : services.filter((s) => s.category === activeCategory);

  const process = [
    {
      num: "01",
      title: "Profile Assessment",
      desc: "We review your educational, work, and personal background to find the most successful visa option.",
    },
    {
      num: "02",
      title: "Custom Legal Strategy",
      desc: "You receive a clear roadmap outlining exact requirements, costs, document checklists, and expected timelines.",
    },
    {
      num: "03",
      title: "Filing & Documentation",
      desc: "Our legal team meticulously compiles, verifies, and submits your complete visa application bundle.",
    },
    {
      num: "04",
      title: "Visa Approval & Support",
      desc: "We manage inquiries from authorities, track case status in real-time, and guide you until passport delivery.",
    },
  ];

  const handleBookClick = () => {
    if (setActiveView) {
      setActiveView("book");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.open(
        `https://wa.me/919306792300?text=${encodeURIComponent(
          "Hi Advocate Richa Dhanda, I want to book a legal consultation for immigration services."
        )}`,
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900">
      
      {/* Hero Header Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            Global Immigration Solutions &amp; Legal Practice
          </span>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#0B1426] mb-6 leading-tight max-w-4xl mx-auto">
            Trusted Legal Solutions For Your <span className="text-[#8B1538]">Global Visas &amp; Immigration</span>
          </h1>

          <p className="text-slate-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            From initial strategy to final visa grant — Advocate Richa Dhanda provides high-trust, legal representation tailored to your unique goals.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto">
          
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0B1426] mb-2">
                Explore Our Legal Practice Areas
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Select a service below to book a direct consultation with Advocate Richa Dhanda.
              </p>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#8B1538] text-white shadow-sm"
                      : "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300 shadow-xs">
                      {s.icon}
                    </div>
                    {s.tag && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8B1538]/10 text-[#8B1538] border border-[#8B1538]/20">
                        {s.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8B1538] transition-colors">
                    {s.title}
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={handleBookClick}
                  className="w-full py-3 px-4 rounded-xl bg-[#FAF9F5] hover:bg-[#8B1538] text-slate-800 hover:text-white border border-amber-200/80 hover:border-[#8B1538] font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  Book Legal Consultation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The 4-Step Process */}
      <section className="py-16 lg:py-24 bg-white border-t border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#8B1538] font-bold text-xs uppercase tracking-widest block mb-2">
              Transparent &amp; Simple Process
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0B1426] mb-4">
              How We Work With You
            </h2>
            <p className="text-slate-600 text-base">
              A step-by-step legal roadmap built to give you 100% clarity at every stage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <div key={i} className="bg-[#FAF9F5] rounded-2xl p-6 border border-amber-200/80 relative shadow-xs">
                <div className="text-3xl font-extrabold text-[#D4AF37] font-serif mb-4">
                  {p.num}
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Call to Action Banner */}
      <section className="py-16 lg:py-20">
        <div className="w-full px-5 lg:px-8 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#7A1532] via-[#8B1538] to-[#0A1628] p-10 lg:p-14 text-center text-white shadow-2xl relative overflow-hidden">
            <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              Need Direct Legal Guidance?
            </h3>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Book a 1-on-1 consultation session with Advocate Richa Dhanda to discuss your specific visa application or refusal matter with complete confidentiality.
            </p>
            <button
              onClick={handleBookClick}
              className="bg-[#D4AF37] hover:bg-[#c29f2e] text-[#0A1628] font-extrabold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-lg cursor-pointer inline-flex items-center gap-3 hover:scale-105"
            >
              Book Your Consultation Now
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
