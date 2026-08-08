"use client";

import { useState } from "react";

interface FAQ {
  cat: string;
  q: string;
  a: string;
}

interface FAQViewProps {
  setActiveView?: (view: string) => void;
}

export default function FAQView({ setActiveView }: FAQViewProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Consultation & Fees",
    "Immigration & PR",
    "Work Permits",
    "Student Visas",
    "Visa Refusals & Appeals",
  ];

  const faqs: FAQ[] = [
    {
      cat: "Consultation & Fees",
      q: "How do I book a consultation with Advocate Richa Dhanda?",
      a: "Booking is simple! Click 'Book a Consultation' on this website or reach out via WhatsApp at +91 93067 92300. Sessions are available both online via video call and in-person.",
    },
    {
      cat: "Consultation & Fees",
      q: "What can I expect during my 30-minute consultation session?",
      a: "Advocate Richa Dhanda evaluates your full background, assesses your eligibility for various visa pathways, identifies potential risks, and provides a clear step-by-step legal roadmap.",
    },
    {
      cat: "Consultation & Fees",
      q: "Are your consultation fees transparent with no hidden charges?",
      a: "Yes, 100%. We maintain strict professional standards with clear upfront fee details. There are no hidden costs or unexpected charges.",
    },
    {
      cat: "Immigration & PR",
      q: "Which countries do you provide immigration legal services for?",
      a: "We specialize in legal representation for major global destinations including Canada, United Kingdom, Australia, USA, Schengen countries, and Gulf nations.",
    },
    {
      cat: "Immigration & PR",
      q: "How long does a Permanent Residency (PR) application take?",
      a: "Processing times vary by country and immigration stream. Fast-track options like Express Entry can take 6 months, while family sponsorship or state nomination pathways may take 12-18 months.",
    },
    {
      cat: "Immigration & PR",
      q: "Can I sponsor my spouse and children for PR?",
      a: "Yes. Permanent residents and citizens can sponsor their legally married spouse, common-law partner, and dependent children under family reunification programs.",
    },
    {
      cat: "Work Permits",
      q: "What are the essential requirements for a skilled work visa?",
      a: "Key requirements typically include a valid passport, ECA credential evaluation, verified work experience documents, language test scores (IELTS/PTE), and a job offer or sponsorship.",
    },
    {
      cat: "Work Permits",
      q: "Can my spouse work if I hold an international work permit?",
      a: "In many countries like Canada and the UK, spouses of skilled work permit holders are eligible to apply for an Open Work Permit allowing full-time employment.",
    },
    {
      cat: "Student Visas",
      q: "Can international students work while studying abroad?",
      a: "Yes. Most major destinations allow international students to work part-time (up to 20 hours per week) during academic semesters and full-time during official scheduled breaks.",
    },
    {
      cat: "Student Visas",
      q: "What is a Post-Graduation Work Permit (PGWP)?",
      a: "A PGWP is an open work permit granted to international students after graduating from an eligible university or college, allowing them to gain work experience toward Permanent Residency.",
    },
    {
      cat: "Visa Refusals & Appeals",
      q: "What should I do if my visa application was refused or rejected?",
      a: "Do not re-apply immediately without addressing the refusal grounds. Advocate Richa Dhanda analyzes your refusal letter line-by-line and prepares an official legal appeal or re-application package.",
    },
    {
      cat: "Visa Refusals & Appeals",
      q: "Can a visa refusal be legally challenged in court?",
      a: "Yes. Depending on the country, visa refusal decisions can be challenged through administrative reconsideration, tribunal appeals, or judicial review before High Courts.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCat === "All" || faq.cat === activeCat;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleBookClick = () => {
    if (setActiveView) {
      setActiveView("book");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.open(
        `https://wa.me/919306792300?text=${encodeURIComponent(
          "Hi Advocate Richa Dhanda, I want to book a consultation regarding my visa matter."
        )}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900 pb-20">
      
      {/* Header Banner */}
      <section className="pt-16 pb-16 lg:pt-24 lg:pb-20 border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Legal Knowledge Base
          </span>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#0B1426] mb-4 leading-tight">
            Frequently Asked <span className="text-[#8B1538]">Questions</span>
          </h1>

          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto mb-8">
            Get instant, clear answers regarding visa legal requirements, refusal appeals, and consultation booking.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search any question or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] text-sm font-medium"
            />
            <svg
              className="w-5 h-5 text-slate-400 absolute left-4 top-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16">
        <div className="w-full px-5 lg:px-8 max-w-5xl mx-auto">
          
          {/* Quick Help Category Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8B1538]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-1">Direct Consultation</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Book a 1-on-1 session to evaluate your visa options with legal clarity.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8B1538]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-1">Work &amp; PR Visas</h3>
              <p className="text-slate-600 text-xs leading-relaxed">End-to-end guidance for Express Entry, PNP, and skilled work permits.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mx-auto mb-4 text-[#8B1538]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-base mb-1">Refusals &amp; Appeals</h3>
              <p className="text-slate-600 text-xs leading-relaxed">Specialized legal representation to challenge visa rejections effectively.</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCat(cat);
                  setOpenIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCat === cat
                    ? "bg-[#8B1538] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4 mb-16">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
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
              })
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 text-slate-500">
                No matching questions found for &quot;{searchQuery}&quot;. Please try another search term.
              </div>
            )}
          </div>

          {/* Bottom Direct CTA Box */}
          <div className="rounded-3xl bg-gradient-to-r from-[#7A1532] via-[#8B1538] to-[#0A1628] p-10 text-center text-white shadow-xl">
            <h3 className="font-serif text-3xl font-bold mb-3">
              Have a Specific Legal Question?
            </h3>
            <p className="text-white/80 text-base max-w-xl mx-auto mb-6">
              Get personalized legal answers directly for your visa matter in a confidential 1-on-1 session.
            </p>
            <button
              onClick={handleBookClick}
              className="bg-[#D4AF37] hover:bg-[#c29f2e] text-[#0A1628] font-extrabold px-8 py-3 rounded-xl text-sm transition shadow-lg cursor-pointer inline-flex items-center gap-2"
            >
              Book Your Consultation Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
