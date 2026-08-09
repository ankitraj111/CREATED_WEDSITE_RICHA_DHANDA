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

// Enhanced Services Preview Component with Executive Light Design & Images
function ServicesPreview({ setActiveView }: { setActiveView: (v: string) => void }) {
  const services = [
    {
      image: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Work & Business Visas",
      description: "Expert legal representation for skilled worker permits, LMIA approvals, corporate immigration, and investor visa pathways worldwide.",
      features: ["Skilled Worker Visas", "Investor & Entrepreneur Visas", "Corporate Immigration"],
    },
    {
      image: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Student & Education Visas",
      description: "Complete assistance for international university admissions, study permits, statement of purpose, and post-graduation work rights.",
      features: ["Study Permits & Admissions", "Post-Graduation Work Rights", "Dependant Student Visas"],
    },
    {
      image: "https://images.pexels.com/photos/7292911/pexels-photo-7292911.jpeg?auto=compress&cs=tinysrgb&w=600",
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
              className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 group flex flex-col justify-between overflow-hidden"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                </div>

                <div className="p-7">
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
              </div>

              <div className="px-7 pb-7 pt-2">
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
