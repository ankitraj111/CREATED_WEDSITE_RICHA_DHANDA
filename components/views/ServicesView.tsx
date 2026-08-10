"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ServicesViewProps {
  setActiveView?: (view: string) => void;
}

export default function ServicesView({ setActiveView }: ServicesViewProps = {}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      title: "Immigration Consultation",
      desc: "Comprehensive initial assessment of your background to chart the fastest and most secure visa strategy.",
      tag: "Popular",
    },
    {
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      title: "Work & Skilled Visas",
      desc: "Legal representation for work permits, skilled worker applications, and employer sponsorships worldwide.",
      tag: "High Demand",
    },
    {
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      title: "Student Visas & Permits",
      desc: "Complete assistance for international university admissions, study permits, and post-study work rights.",
      tag: "Top Choice",
    },
    {
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80",
      title: "Permanent Residency (PR)",
      desc: "End-to-end legal support for points-based Express Entry, Provincial Nominations, and PR card renewals.",
      tag: "",
    },
    {
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
      title: "Family & Spouse Sponsorship",
      desc: "Reunite families through spouse, partner, dependent child, and parent immigration sponsorship pathways.",
      tag: "",
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      title: "Business & Investor Visas",
      desc: "Strategic visa pathways for business owners, startup founders, and investors expanding internationally.",
      tag: "",
    },
    {
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
      title: "Visitor & Tourist Visas",
      desc: "Hassle-free application handling for short-term tourism, family visits, and business travel visas.",
      tag: "",
    },
    {
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
      title: "Appeals & Refusal Cases",
      desc: "Expert legal representation to challenge visa refusals, file appeals, and overcome procedural objections.",
      tag: "Specialized",
    },
    {
      image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80",
      title: "Citizenship & Naturalization",
      desc: "Step-by-step assistance for permanent residents applying for full citizenship and passport issuance.",
      tag: "",
    },
  ];

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
    window.location.href = "/book";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900">
      
      {/* Hero Header Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            Professional Legal Services
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
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0B1426] mb-3">
              Explore Our Practice Areas
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Select a service below to book a direct consultation with Advocate Richa Dhanda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    {s.tag && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-[#8B1538] text-white shadow-md">
                        {s.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-7">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8B1538] transition-colors">
                      {s.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {s.desc}
                    </p>
                  </div>
                </div>

                <div className="px-7 pb-7 pt-2">
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
              Need Personalized Legal Advice?
            </h3>
            <p className="text-white/80 text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Book a 1-on-1 consultation session with Advocate Richa Dhanda to discuss your specific immigration matter with complete confidentiality.
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
