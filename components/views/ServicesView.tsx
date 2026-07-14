"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ServicesView() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    {
      icon: "https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Immigration Consultation",
      desc: "Initial assessment of your profile to determine the best immigration pathway or visa strategy for your goals.",
      tag: "Initial Assessment",
      gradient: "from-gold/90 via-gold-soft/90 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Work Visas",
      desc: "Expert guidance on skilled worker visas, employer sponsorships, and temporary work permits across major destinations.",
      tag: "Popular",
      gradient: "from-navy/90 via-gold/80 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Student Visas",
      desc: "End-to-end assistance for study permits, university admissions alignment, and post-graduation work pathways.",
      tag: "",
      gradient: "from-maroon/90 via-gold/80 to-gold-soft/90",
    },
    {
      icon: "https://images.pexels.com/photos/7292911/pexels-photo-7292911.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Permanent Residency",
      desc: "Comprehensive support for PR applications, points-based systems, and provincial/state nomination programs.",
      tag: "",
      gradient: "from-gold/90 via-platinum/90 to-gold-soft/90",
    },
    {
      icon: "https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Family Sponsorship",
      desc: "Reunite with your loved ones through spouse, parent, and dependent child sponsorship programs.",
      tag: "",
      gradient: "from-navy/90 via-gold/80 to-gold-soft/90",
    },
    {
      icon: "https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Business & Investor Visas",
      desc: "Strategic pathways for entrepreneurs, startup founders, and high-net-worth investors seeking global mobility.",
      tag: "",
      gradient: "from-maroon/90 via-gold-soft/90 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/8084666/pexels-photo-8084666.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Citizenship Applications",
      desc: "Guidance on naturalization processes, dual citizenship laws, and passport applications.",
      tag: "",
      gradient: "from-gold/90 via-gold-soft/90 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Tourist & Visitor Visas",
      desc: "Hassle-free processing for short-term visitor visas, tourist applications, and business visitor documentation.",
      tag: "",
      gradient: "from-navy/90 via-gold/80 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/5668774/pexels-photo-5668774.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Appeals & Refusals",
      desc: "Strong legal representation for visa refusals, deportation defense, and immigration appeals tribunals.",
      tag: "",
      gradient: "from-maroon/90 via-gold-soft/90 to-platinum/90",
    },
  ];

  const process = [
    {
      num: "1",
      title: "Initial Consultation",
      desc: "We evaluate your profile, review documents, and identify the most suitable immigration pathway for your goals.",
    },
    {
      num: "2",
      title: "Strategy & Eligibility",
      desc: "We prepare a tailored immigration plan with clear timelines, cost breakdowns, and success probability assessment.",
    },
    {
      num: "3",
      title: "Application & Filing",
      desc: "Meticulous preparation and filing of all visa applications, supporting documents, and evidence packages.",
    },
    {
      num: "4",
      title: "Visa Approval",
      desc: "Active case tracking, responding to queries from authorities, and guiding you through landing formalities.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-navy pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold/30 to-transparent rounded-full blur-3xl floating-element"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-tl from-maroon/30 to-transparent rounded-full blur-3xl floating-element" style={{animationDelay: '2s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 text-center animate-fade-in">
          <div className="inline-block px-6 py-2 rounded-full border border-gold/30 text-gold text-sm font-bold tracking-widest uppercase mb-6 bg-gold/10 backdrop-blur-md">
            Our Expertise
          </div>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-8 premium-text-shadow leading-tight">
            Comprehensive <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-soft to-platinum">Immigration Solutions</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From initial consultation to final visa approval — we provide expert immigration representation with a personal touch that prioritizes your global mobility goals.
          </p>
        </div>
        
        {/* Decorative divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12 lg:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,197.35,112.5,239.5,108.18,280.9,94.27,321.39,56.44Z" className="fill-cream-2"></path>
          </svg>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="bg-cream-2 py-20 lg:py-32 relative">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Immigration Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold-soft mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, i) => (
               <div
                key={i}
                className={`group premium-card rounded-3xl p-8 hover:shadow-premium-lg cursor-default transition-all duration-500 relative overflow-hidden bg-white border border-gold/10 ${mounted ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Premium background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300 bg-cream-2 relative">
                      <Image src={service.icon} alt={service.title} fill className="object-cover" sizes="64px" unoptimized />
                    </div>
                    {service.tag && (
                      <span className="px-4 py-1 text-xs font-bold text-maroon bg-maroon/10 rounded-full uppercase tracking-wider">
                        {service.tag}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-500">
                    {service.title}
                  </h3>
                  
                  <p className="text-charcoal/70 leading-relaxed text-lg h-24">
                    {service.desc}
                  </p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Immigration Process */}
      <div className="py-20 lg:py-32 relative overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-block px-6 py-2 rounded-full border border-gold/30 text-navy text-sm font-bold tracking-widest uppercase mb-6 bg-gold/5">
              How It Works
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
              Our Immigration Process
            </h2>
            <p className="text-charcoal/70 text-lg">
              A transparent, systematic approach designed to give you clarity and confidence at every step of your visa journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <div key={i} className="relative group">
                <div className="hidden lg:block absolute top-1/2 left-[60%] w-full h-[2px] bg-gradient-to-r from-gold/50 to-transparent -z-10 group-last:hidden"></div>
                <div className="bg-white rounded-3xl p-8 border border-gold/20 shadow-lg hover:shadow-premium transition-all duration-500 hover:-translate-y-2 h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-navy to-charcoal text-white flex items-center justify-center font-bold font-serif text-2xl mb-6 shadow-md group-hover:scale-110 transition-transform duration-500 border-2 border-gold/30">
                    {step.num}
                  </div>
                  <h3 className="font-serif font-bold text-xl text-navy mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
             <div className="premium-glass rounded-3xl p-12 max-w-4xl mx-auto border border-gold/30 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-navy to-charcoal -z-10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                <h3 className="font-serif text-3xl font-bold text-white mb-4">
                  Need Immigration Assistance?
                </h3>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Take the first step towards your global mobility goals. Schedule a consultation with our immigration experts today.
                </p>
                <button 
                  onClick={() => window.open(`https://wa.me/919254067300?text=${encodeURIComponent("Hi, I want to book a free consultation regarding my immigration matter.")}`)}
                  className="bg-gradient-to-r from-gold to-gold-soft text-navy px-10 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
                  Schedule Your Consultation
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
