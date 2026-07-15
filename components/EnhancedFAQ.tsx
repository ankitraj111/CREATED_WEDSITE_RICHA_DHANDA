"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'work', label: 'Work Visas' },
  { id: 'student', label: 'Student Visas' },
  { id: 'pr', label: 'Permanent Residency' },
  { id: 'appeals', label: 'Appeals & Refusals' }
];

const faqs = [
  {
    category: 'work',
    question: 'What are the requirements for a skilled worker visa?',
    answer: 'Requirements vary by country, but generally include a valid job offer from a sponsored employer, proof of relevant skills/qualifications, passing a points-based assessment, and meeting English language requirements.'
  },
  {
    category: 'work',
    question: 'Can I bring my family with me on a work visa?',
    answer: 'Yes, in most cases, skilled worker visas allow you to bring your spouse and dependent children. They will typically be granted dependent visas which may also allow them to work or study.'
  },
  {
    category: 'student',
    question: 'Can I work while studying abroad?',
    answer: 'Most popular study destinations (like Canada, UK, Australia) allow international students to work part-time (usually up to 20 hours per week) during the academic term and full-time during scheduled breaks.'
  },
  {
    category: 'student',
    question: 'What is a Post-Graduation Work Permit (PGWP)?',
    answer: 'A PGWP allows international students who have graduated from a participating post-secondary institution to gain valuable work experience in that country, which often counts towards Permanent Residency.'
  },
  {
    category: 'pr',
    question: 'How long does the Permanent Residency process take?',
    answer: 'Processing times vary wildly based on the pathway (e.g., Express Entry vs. Family Sponsorship) and the country. It can take anywhere from 6 months for highly skilled express pathways to 2+ years for other streams.'
  },
  {
    category: 'pr',
    question: 'What is a points-based immigration system?',
    answer: 'Countries like Canada and Australia use a points system to evaluate candidates for PR. Points are awarded for age, education, work experience, language proficiency, and adaptability.'
  },
  {
    category: 'appeals',
    question: 'My visa was refused. What are my options?',
    answer: 'Depending on the country and visa type, you may have the option to appeal the decision, request an administrative review, or reapply with stronger evidence addressing the refusal reasons. Consulting an immigration lawyer immediately is highly recommended.'
  },
  {
    category: 'appeals',
    question: 'Can I appeal a deportation order?',
    answer: 'Yes, deportation orders can often be appealed on humanitarian and compassionate grounds, risk to life in the home country, or procedural errors. Time is critical, so immediate legal counsel is necessary.'
  }
];

interface EnhancedFAQProps {
  setActiveView?: (view: string) => void;
}

export default function EnhancedFAQ({ setActiveView }: EnhancedFAQProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredFaqs =
    selectedCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div className="py-16 lg:py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-4">
            Frequently Asked Questions
          </Badge>
          <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-navy">
            Common Immigration Questions Answered
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto">
            Find quick answers to common legal questions. Can&apos;t find what you&apos;re
            looking for? Contact me for personalized assistance.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10 animate-slide-up">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-250 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                selectedCategory === cat.id
                  ? "bg-navy text-white shadow-md scale-105"
                  : "bg-white text-navy hover:bg-navy/5 hover:scale-102"
              }`}
              aria-label={`Filter by ${cat.label}`}
              aria-pressed={selectedCategory === cat.id}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="animate-slide-up">
          <Accordion className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-cream-2 shadow-sm hover:shadow-md transition-shadow duration-250"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline focus:outline-none focus:ring-2 focus:ring-gold focus:ring-inset rounded-xl">
                  <span className="font-semibold text-navy pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-cream-2 shadow-sm animate-scale-in">
          <p className="text-navy font-medium mb-4">
            Still have questions?
          </p>
          <button 
            onClick={() => {
              if (setActiveView) {
                setActiveView('book');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.open(`https://wa.me/919254067300?text=${encodeURIComponent("Hi, I have some questions and want to schedule a consultation.")}`, "_blank");
              }
            }}
            className="bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-250 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 cursor-pointer shadow-md"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
