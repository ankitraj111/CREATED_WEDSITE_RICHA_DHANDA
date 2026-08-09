"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import MediaTicker from "@/components/MediaTicker";
import AboutView from "@/components/views/AboutView";
import ServicesView from "@/components/views/ServicesView";
import MediaView from "@/components/views/MediaView";
import BlogView from "@/components/views/BlogView";
import FAQView from "@/components/views/FAQView";
import ContactView from "@/components/views/ContactView";
import BookView from "@/components/views/BookView";
import PrivacyPolicyView from "@/components/views/PrivacyPolicyView";
import TermsView from "@/components/views/TermsView";
import RefundPolicyView from "@/components/views/RefundPolicyView";

// Enhanced Services Preview Component with Executive Light Design
function ServicesPreview({ setActiveView }: { setActiveView: (v: string) => void }) {
  const services = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Work & Business Visas",
      description: "Expert legal representation for skilled worker permits, LMIA approvals, corporate immigration, and investor visa pathways worldwide.",
      features: ["Skilled Worker Visas", "Investor & Entrepreneur Visas", "Corporate Immigration"],
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      title: "Student & Education Visas",
      description: "Complete assistance for international university admissions, study permits, statement of purpose, and post-graduation work rights.",
      features: ["Study Permits & Admissions", "Post-Graduation Work Rights", "Dependant Student Visas"],
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#8B1538]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Permanent Residency & Citizenship",
      description: "End-to-end legal support for points-based Express Entry, Provincial Nominee Programs (PNP), spousal sponsorship, and citizenship.",
      features: ["Permanent Residency (PR)", "Family & Spousal Sponsorship", "Citizenship Applications"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Global Immigration Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1426] mb-4 leading-tight">
            Expert Immigration <span className="text-[#8B1538]">Lawyer</span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            From securing work permits to achieving permanent residency, Advocate Richa Dhanda provides expert immigration legal representation with a personal touch that prioritizes your international goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-amber-50 border border-amber-200/80 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-100 group-hover:scale-105 transition-all duration-300 shadow-xs">
                  {service.icon}
                </div>
                
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8B1538] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 border-t border-gray-100 pt-5">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                      <svg className="w-4 h-4 text-[#D4AF37] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <button
                  onClick={() => setActiveView("services")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FAF9F5] hover:bg-[#8B1538] text-slate-800 hover:text-white border border-amber-200/80 hover:border-[#8B1538] font-bold text-xs uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  Explore Practice Area
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => setActiveView("services")}
            className="bg-[#8B1538] hover:bg-[#70102d] text-white px-9 py-4 rounded-xl font-extrabold text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            View All Legal Practice Areas →
          </button>
        </div>
      </div>
    </section>
  );
}



export default function Home() {
  const [activeView, setActiveView] = useState("home");

  return (
    <>
      <Header activeView={activeView} setActiveView={setActiveView} />
      <main>
        {activeView === "home" && (
          <>
            <Hero setActiveView={setActiveView} />
            <MediaTicker setActiveView={setActiveView} />
            <WhyChoose setActiveView={setActiveView} />
            <ServicesPreview setActiveView={setActiveView} />
            <CTABanner setActiveView={setActiveView} />
            <Testimonials />
            <EnhancedFAQ setActiveView={setActiveView} />
            <EnhancedContactForm />
          </>
        )}
        {activeView === "about" && <AboutView setActiveView={setActiveView} />}
        {activeView === "services" && <ServicesView setActiveView={setActiveView} />}
        {activeView === "media" && <MediaView setActiveView={setActiveView} />}
        {activeView === "blog" && <BlogView />}
        {activeView === "faq" && <FAQView />}
        {activeView === "contact" && <ContactView />}
        {activeView === "book" && <BookView />}
        {activeView === "privacy" && <PrivacyPolicyView setActiveView={setActiveView} />}
        {activeView === "terms" && <TermsView setActiveView={setActiveView} />}
        {activeView === "refund" && <RefundPolicyView setActiveView={setActiveView} />}
      </main>
      <Footer setActiveView={setActiveView} />
      <CookieBanner />
    </>
  );
}
