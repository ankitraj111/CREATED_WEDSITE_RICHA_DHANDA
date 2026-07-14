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
      icon: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Work & Business Visas",
      description: "Strategic guidance for professionals, entrepreneurs, and investors seeking international work and business opportunities.",
      features: ["Skilled Worker Visas", "Investor Programs", "Corporate Immigration"],
      gradient: "from-gold/90 via-gold-soft/90 to-platinum/90",
    },
    {
      icon: "https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "Student Visas",
      description: "Expert assistance for students aiming to study abroad, ensuring smooth processing of study permits and admissions.",
      features: ["Study Permits", "Post-Graduation Work", "Dependant Visas"],
      gradient: "from-maroon/90 via-gold/80 to-gold-soft/90",
    },
    {
      icon: "https://images.pexels.com/photos/7292911/pexels-photo-7292911.jpeg?auto=compress&cs=tinysrgb&w=200",
      title: "PR & Citizenship",
      description: "Comprehensive support for Permanent Residency applications, family sponsorship, and citizenship pathways.",
      features: ["Permanent Residency", "Family Sponsorship", "Citizenship Applications"],
      gradient: "from-navy/90 via-gold/80 to-platinum/90",
    },
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/20 text-gold-dark text-sm font-bold tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            Global Immigration Solutions
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-6">
            Your Global Journey <span className="text-gold">Starts Here</span>
          </h2>
          <p className="text-navy-light max-w-3xl mx-auto text-lg leading-relaxed">
            From securing work permits to achieving permanent residency, we provide expert immigration representation with a personal touch that prioritizes your international goals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-cream-2 hover:border-gold transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 overflow-hidden shadow-sm group-hover:scale-110 transition-transform duration-300 bg-cream-2 relative">
                <Image src={service.icon} alt={service.title} fill className="object-cover" sizes="64px" unoptimized />
              </div>
              
              <h3 className="font-serif text-xl font-bold text-navy mb-3 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-navy-light text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              
              <div className="space-y-3">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-navy/80 text-sm">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
            <Hero setActiveView={setActiveView} />

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
