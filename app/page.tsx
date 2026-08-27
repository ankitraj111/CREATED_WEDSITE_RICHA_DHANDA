"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
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
import PrivacyPolicyView from "@/components/views/PrivacyPolicyView";
import TermsView from "@/components/views/TermsView";
import RefundPolicyView from "@/components/views/RefundPolicyView";

// Compact Services Preview
function ServicesPreview({ setActiveView }: { setActiveView: (v: string) => void }) {
  const services = [
    {
      title: "Work & Business Visas",
      features: ["Skilled Worker Visas", "Investor & Entrepreneur Visas", "Corporate Immigration"],
    },
    {
      title: "Student & Education Visas",
      features: ["Study Permits & Admissions", "Post-Graduation Work Rights", "Dependant Student Visas"],
    },
    {
      title: "Permanent Residency & Citizenship",
      features: ["Express Entry / PNP", "Family & Spousal Sponsorship", "Citizenship Applications"],
    },
  ];

  return (
    <section className="py-14 bg-[#FAF9F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            Practice Areas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0B1426] mb-2">
            Immigration <span className="text-[#8B1538]">Legal Services</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            End-to-end legal representation across all major visa categories.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#8B1538]/30 transition-all duration-300 group"
            >
              <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 group-hover:text-[#8B1538] transition-colors">
                {service.title}
              </h3>
              <ul className="space-y-2.5">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-slate-600 text-sm">
                    <svg className="w-4 h-4 text-[#D4AF37] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setActiveView("services")}
                className="mt-5 text-[#8B1538] text-xs font-bold uppercase tracking-wider hover:underline cursor-pointer flex items-center gap-1"
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setActiveView("services")}
            className="bg-[#8B1538] hover:bg-[#70102d] text-white px-7 py-3 rounded-xl font-bold text-sm transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
          >
            View All Practice Areas →
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState("home");

  const handleViewChange = (view: string) => {
    if (view === "book") {
      window.location.href = "/book";
      return;
    }
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header activeView={activeView} setActiveView={handleViewChange} />
      <main>
        {activeView === "home" && (
          <>
            <Hero setActiveView={handleViewChange} />
            <MediaTicker setActiveView={handleViewChange} />
            <WhyChoose setActiveView={handleViewChange} />
            <ServicesPreview setActiveView={handleViewChange} />
            <Testimonials />
            <EnhancedFAQ setActiveView={handleViewChange} />
            <EnhancedContactForm />
          </>
        )}
        {activeView === "about" && <AboutView setActiveView={handleViewChange} />}
        {activeView === "services" && <ServicesView setActiveView={handleViewChange} />}
        {activeView === "media" && <MediaView setActiveView={handleViewChange} />}
        {activeView === "blog" && <BlogView />}
        {activeView === "faq" && <FAQView />}
        {activeView === "contact" && <ContactView />}
        {activeView === "privacy" && <PrivacyPolicyView setActiveView={handleViewChange} />}
        {activeView === "terms" && <TermsView setActiveView={handleViewChange} />}
        {activeView === "refund" && <RefundPolicyView setActiveView={handleViewChange} />}
      </main>
      <Footer setActiveView={handleViewChange} />
      <CookieBanner />
    </>
  );
}
