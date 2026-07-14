"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChoose from "@/components/WhyChoose";
import CTABanner from "@/components/CTABanner";
import Testimonials from "@/components/Testimonials";
import EnhancedFAQ from "@/components/EnhancedFAQ";
import EnhancedContactForm from "@/components/EnhancedContactForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieBanner from "@/components/CookieBanner";
import AboutView from "@/components/views/AboutView";
import ServicesView from "@/components/views/ServicesView";
import BlogView from "@/components/views/BlogView";
import FAQView from "@/components/views/FAQView";
import ContactView from "@/components/views/ContactView";
import BookView from "@/components/views/BookView";

// Enhanced Services Preview Component with Ultra Premium Design
function ServicesPreview({ setActiveView }: { setActiveView: (v: string) => void }) {
  const services = [
    {
      icon: "✈️",
      title: "Work & Business Visas",
      description: "Strategic guidance for professionals, entrepreneurs, and investors seeking international work and business opportunities.",
      features: ["Skilled Worker Visas", "Investor Programs", "Corporate Immigration"],
      gradient: "from-gold/90 via-gold-soft/90 to-platinum/90",
    },
    {
      icon: "🎓",
      title: "Student Visas",
      description: "Expert assistance for students aiming to study abroad, ensuring smooth processing of study permits and admissions.",
      features: ["Study Permits", "Post-Graduation Work", "Dependant Visas"],
      gradient: "from-maroon/90 via-gold/80 to-gold-soft/90",
    },
    {
      icon: "🛂",
      title: "PR & Citizenship",
      description: "Comprehensive support for Permanent Residency applications, family sponsorship, and citizenship pathways.",
      features: ["Permanent Residency", "Family Sponsorship", "Citizenship Applications"],
      gradient: "from-navy/90 via-gold/80 to-platinum/90",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-bold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse"></span>
            🌍 Global Immigration Solutions
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">
            Your Global Journey <span className="text-[#d4af37]">Starts Here</span>
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto text-lg leading-relaxed">
            From securing work permits to achieving permanent residency, we provide expert immigration representation with a personal touch that prioritizes your international goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-2xl p-8 border border-[#333] hover:border-[#d4af37] transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#d4af37] to-[#c9a030] rounded-xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm">
                    <svg className="w-4 h-4 text-[#d4af37] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button 
            onClick={() => setActiveView("services")}
            className="bg-gradient-to-r from-[#d4af37] to-[#c9a030] text-black px-10 py-4 rounded-lg font-semibold hover:from-[#c9a030] hover:to-[#d4af37] transition-all duration-300 shadow-lg cursor-pointer"
          >
            View All Services
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
            <Hero />

            <WhyChoose />
            <ServicesPreview setActiveView={setActiveView} />
            <CTABanner />
            <Testimonials />
            <EnhancedFAQ />
            <EnhancedContactForm />
          </>
        )}
        {activeView === "about" && <AboutView />}
        {activeView === "services" && <ServicesView />}
        {activeView === "blog" && <BlogView />}
        {activeView === "faq" && <FAQView />}
        {activeView === "contact" && <ContactView />}
        {activeView === "book" && <BookView />}
      </main>
      <Footer setActiveView={setActiveView} />
      <FloatingWhatsApp />
      <CookieBanner />
    </>
  );
}
