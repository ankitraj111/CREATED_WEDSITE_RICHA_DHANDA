"use client";

import { useState } from "react";

interface FAQ {
  cat: string;
  q: string;
  a: string;
}

export default function FAQView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Immigration & Visas",
    "Work Permits",
    "Student Visas",
    "Visa Refusals",
    "Consultation & Fees",
  ];

  const faqs: FAQ[] = [
    {
      cat: "Consultation & Fees",
      q: "What are your consultation fees and how do I book?",
      a: "Our consultation fees are transparent with no hidden charges. You can easily book a 30-minute 1-on-1 session online or via WhatsApp (+91 93067 92300) with Advocate Richa Dhanda.",
    },
    {
      cat: "Consultation & Fees",
      q: "Do you offer online video consultations?",
      a: "Yes, we offer both online video consultations for clients across India and internationally, as well as in-person legal consultation sessions.",
    },
    {
      cat: "Immigration & Visas",
      q: "Which countries do you provide visa legal services for?",
      a: "Advocate Richa Dhanda specializes in immigration legal representation for major global destinations including Canada, UK, Australia, USA, Schengen Europe, and Gulf nations.",
    },
    {
      cat: "Work Permits",
      q: "What documents are required for a skilled work visa?",
      a: "You generally need a valid passport, educational evaluation certificates, proof of work experience, language proficiency scores (IELTS/PTE), and an employer job offer or sponsorship.",
    },
    {
      cat: "Work Permits",
      q: "Can my family accompany me on my work permit?",
      a: "Yes, in most cases, skilled work permits allow your spouse and dependent children under 18 to accompany you with dependent visas.",
    },
    {
      cat: "Student Visas",
      q: "Can international students work while studying abroad?",
      a: "Yes, major study destinations allow international students to work up to 20 hours per week during term time and full-time during official academic vacations.",
    },
    {
      cat: "Student Visas",
      q: "What is a Post-Graduation Work Permit (PGWP)?",
      a: "A PGWP allows international graduates to work in their study destination after completing their degree, building crucial experience toward Permanent Residency.",
    },
    {
      cat: "Visa Refusals",
      q: "What should I do if my visa application was refused or rejected?",
      a: "Do not panic or re-apply blindly. Bring your refusal letter to Advocate Richa Dhanda. We analyze the exact legal grounds of refusal and prepare an official appeal or legal re-submission.",
    },
    {
      cat: "Visa Refusals",
      q: "Can a visa refusal be legally challenged?",
      a: "Yes, depending on the country, visa refusal decisions can be challenged through administrative reviews, legal appeals, or judicial reviews in court.",
    },
    {
      cat: "Immigration & Visas",
      q: "How long does a Permanent Residency (PR) application take?",
      a: "PR timelines depend on the immigration stream (Express Entry, State Nomination, Family Sponsorship) and typically range from 6 to 18 months.",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900 pb-20">
      
      {/* Header Banner */}
      <section className="pt-16 pb-16 lg:pt-24 lg:pb-20 border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
            Help Center &amp; Answers
          </span>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#0B1426] mb-4">
            Frequently Asked <span className="text-[#8B1538]">Questions</span>
          </h1>

          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto mb-8">
            Find immediate legal clarity on visa procedures, refusal appeals, and consultation steps.
          </p>

          {/* Search Box */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search any question or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-300 bg-white text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8B1538] text-sm"
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
      <section className="py-12">
        <div className="w-full px-5 lg:px-8 max-w-4xl mx-auto">
          
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
          <div className="space-y-4">
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

        </div>
      </section>

    </div>
  );
}
