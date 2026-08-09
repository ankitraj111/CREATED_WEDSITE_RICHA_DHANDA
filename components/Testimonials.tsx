"use client";

import { useState } from "react";

interface Testimonial {
  name: string;
  initials: string;
  occupation: string;
  location: string;
  rating: number;
  quote: string;
  avatarColor: string;
}

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Rajesh Mehta",
      initials: "RM",
      occupation: "Business Owner",
      location: "Dubai, UAE",
      rating: 5,
      quote: "Advocate Richa handled my Investor Visa application with exceptional skill. Her clear communication and strategic approach helped my family relocate smoothly. Highly professional.",
      avatarColor: "bg-amber-600",
    },
    {
      name: "Anita Rao",
      initials: "AR",
      occupation: "International Student",
      location: "London, UK",
      rating: 5,
      quote: "When my UK student visa was at risk due to a documentation query, Richa ma'am guided me step-by-step. She saved my academic intake. Excellent legal representation.",
      avatarColor: "bg-rose-600",
    },
    {
      name: "Vikram Singh",
      initials: "VS",
      occupation: "Software Engineer",
      location: "Toronto, Canada",
      rating: 5,
      quote: "Navigating the Express Entry system was overwhelming until I consulted Advocate Richa. She ensured my PR documentation was 100% compliant. Received my PR smoothly!",
      avatarColor: "bg-blue-600",
    },
    {
      name: "Suman Patel",
      initials: "SP",
      occupation: "Healthcare Specialist",
      location: "Melbourne, Australia",
      rating: 5,
      quote: "Our family faced a complex visa refusal appeal for Australia. Richa's thorough understanding of immigration laws resulted in our appeal being successfully resolved.",
      avatarColor: "bg-emerald-600",
    },
    {
      name: "Priya Sharma",
      initials: "PS",
      occupation: "Entrepreneur",
      location: "Chicago, USA",
      rating: 5,
      quote: "Advocate Richa guided me through a challenging US Spouse Visa process. She gave honest advice, followed up diligently, and helped reunite our family.",
      avatarColor: "bg-purple-600",
    },
    {
      name: "Deepak Gupta",
      initials: "DG",
      occupation: "Project Manager",
      location: "Auckland, NZ",
      rating: 5,
      quote: "I needed guidance for an Accredited Employer Work Visa for New Zealand. Richa ma'am's precise preparation of my documentation made the entire process hassle-free.",
      avatarColor: "bg-cyan-600",
    },
  ];

  // Divide 6 testimonials into 2 slides of 3 cards each for desktop carousel
  const slides = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
  ];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
              Verified Client Reviews
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1426] leading-tight">
              What Clients Say <span className="text-[#8B1538]">About Our Legal Services</span>
            </h2>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Testimonials"
              className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-[#8B1538] hover:bg-[#8B1538] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">
              {activeSlide + 1} / {slides.length}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next Testimonials"
              className="w-12 h-12 rounded-full bg-white border border-gray-300 hover:border-[#8B1538] hover:bg-[#8B1538] text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slideGroup, slideIdx) => (
              <div key={slideIdx} className="w-full flex-shrink-0 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {slideGroup.map((t, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-8 border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Rating Stars & Quote Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-1">
                          {Array.from({ length: t.rating }).map((_, si) => (
                            <svg key={si} className="w-5 h-5 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-3xl text-amber-200 font-serif leading-none select-none">&ldquo;</span>
                      </div>

                      {/* Quote Text */}
                      <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                        &ldquo;{t.quote}&rdquo;
                      </p>
                    </div>

                    {/* Client Profile */}
                    <div className="pt-5 border-t border-gray-100 flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-full ${t.avatarColor} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs`}>
                        {t.initials}
                      </div>
                      <div>
                        <div className="font-serif font-bold text-slate-900 text-sm group-hover:text-[#8B1538] transition-colors">{t.name}</div>
                        <div className="text-slate-500 text-xs">{t.occupation} · <span className="font-medium text-slate-700">{t.location}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-8 bg-[#8B1538]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}