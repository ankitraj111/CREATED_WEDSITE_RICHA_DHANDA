"use client";

import { useState } from "react";

interface EnhancedFAQProps {
  setActiveView?: (view: string) => void;
}

export default function EnhancedFAQ({ setActiveView }: EnhancedFAQProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "visas", label: "Visas & PR" },
    { id: "work", label: "Work Permits" },
    { id: "refusals", label: "Visa Refusals" },
    { id: "consultation", label: "Consultation" },
  ];

  const faqs = [
    {
      category: "consultation",
      q: "How do I book a consultation with Advocate Richa Dhanda?",
      a: "You can easily schedule a 30-minute consultation by clicking the 'Book a Consultation' button on this website or contacting us directly on WhatsApp (+91 93067 92300). Sessions are available both online and in-person.",
    },
    {
      category: "visas",
      q: "What immigration and visa services do you provide?",
      a: "Advocate Richa Dhanda provides complete legal guidance for Work Visas, Student Permits, Permanent Residency (PR), Family & Spouse Sponsorship, Business Investment Visas, and Citizenship applications across top global destinations.",
    },
    {
      category: "refusals",
      q: "My visa application was rejected. Can you help me appeal?",
      a: "Yes. Visa refusals and rejections are a core legal specialty. We thoroughly analyze your refusal letter, identify legal or documentation gaps, and file a strong legal appeal or re-application bundle.",
    },
    {
      category: "work",
      q: "What are the key requirements for a skilled worker visa?",
      a: "Requirements depend on the destination country, but generally require verified work experience, educational credentials, language proficiency (IELTS/PTE), and a valid job offer or points score.",
    },
    {
      category: "visas",
      q: "Can I bring my spouse and children with me on a work visa?",
      a: "Yes. Most major immigration destinations allow skilled work visa holders to bring their legally married spouse and dependent children under dependent visa permits.",
    },
    {
      category: "consultation",
      q: "What are your consultation fees and process?",
      a: "We offer complete transparency with clear upfront consultation fees and no hidden charges. During your consultation, Advocate Richa Dhanda evaluates your case and provides an exact legal strategy.",
    },
  ];

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleBookClick = () => {
    window.location.href = "/book";
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] border-t border-b border-gray-200">
      <div className="w-full px-5 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Frequently Asked Questions
          </span>

          <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#0B1426] mb-4">
            Everything You Need To Know About <span className="text-[#8B1538]">Visas &amp; Legal Consultation</span>
          </h2>

          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto">
            Clear, simple answers to common questions about your immigration journey and legal representation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#8B1538] text-white shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4 mb-16">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:border-[#8B1538]/30 transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-serif text-lg font-bold text-slate-900 pr-2">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-[#8B1538] text-white rotate-180"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 text-base leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="rounded-2xl bg-white border border-amber-200/80 p-8 text-center shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
              Still Have Questions About Your Case?
            </h3>
            <p className="text-slate-600 text-sm">
              Get personalized legal advice directly from Advocate Richa Dhanda.
            </p>
          </div>

          <button
            onClick={handleBookClick}
            className="bg-[#8B1538] hover:bg-[#70102d] text-white font-bold px-6 py-3 rounded-xl text-sm transition shadow-md shrink-0 cursor-pointer inline-flex items-center gap-2"
          >
            Ask Us Directly
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
