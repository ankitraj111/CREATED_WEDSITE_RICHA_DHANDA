"use client";

interface Testimonial {
  name: string;
  initials: string;
  occupation: string;
  location: string;
  rating: number;
  quote: string;
  avatarColor: string;
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative flex-shrink-0 w-[360px] bg-white border border-gray-200 rounded-3xl p-7 hover:border-gold/30 transition-all duration-500 cursor-default hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] shadow-sm">
      {/* Quote mark */}
      <div className="text-[80px] text-gold/20 font-serif leading-none -mt-4 mb-2 select-none">&ldquo;</div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, si) => (
          <svg key={si} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-700 text-[15px] leading-relaxed mb-6 italic min-h-[100px]">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-5" />

      {/* Client Info */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0 ring-2 ring-gray-100`}>
          {t.initials}
        </div>
        <div>
          <div className="font-bold text-gray-900 text-sm">{t.name}</div>
          <div className="text-gray-500 text-xs">{t.occupation} · {t.location}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Rajesh Mehta",
      initials: "RM",
      occupation: "Business Owner",
      location: "Dubai",
      rating: 5,
      quote: "Advocate Richa handled my Investor Visa application with exceptional skill. Her clear communication and strategic approach helped my family relocate smoothly. Highly professional.",
      avatarColor: "from-amber-500 to-orange-600",
    },
    {
      name: "Anita Rao",
      initials: "AR",
      occupation: "Student",
      location: "London",
      rating: 5,
      quote: "When my UK student visa was at risk due to a documentation error, Richa ma'am guided me perfectly. She saved my academic year. Excellent legal representation.",
      avatarColor: "from-rose-500 to-pink-600",
    },
    {
      name: "Vikram Singh",
      initials: "VS",
      occupation: "Software Engineer",
      location: "Toronto",
      rating: 5,
      quote: "Navigating the Canada Express Entry system was overwhelming until I hired Advocate Richa. She ensured my PR application was flawless. Got my ITA within months!",
      avatarColor: "from-blue-500 to-indigo-600",
    },
    {
      name: "Suman Patel",
      initials: "SP",
      occupation: "Doctor",
      location: "Melbourne",
      rating: 5,
      quote: "Our family faced a complex visa refusal appeal for Australia. Richa's thorough understanding of immigration law resulted in our appeal being successfully overturned.",
      avatarColor: "from-emerald-500 to-teal-600",
    },
    {
      name: "Priya Sharma",
      initials: "PS",
      occupation: "Homemaker",
      location: "Chicago",
      rating: 5,
      quote: "Advocate Richa guided me through a challenging US Spouse Visa process. She fought tirelessly against unnecessary delays and reunited me with my husband.",
      avatarColor: "from-purple-500 to-violet-600",
    },
    {
      name: "Deepak Gupta",
      initials: "DG",
      occupation: "Project Manager",
      location: "Auckland",
      rating: 5,
      quote: "I needed to secure an Accredited Employer Work Visa for New Zealand. Richa ma'am's meticulous preparation of my sponsor and employment documents made the process seamless.",
      avatarColor: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-cream relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold-soft text-sm font-bold tracking-widest uppercase mb-6">
            ⭐ Client Testimonials
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-5">
            What Clients Say
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-soft">About My Services</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Real feedback from clients whose global immigration journeys I&apos;ve proudly supported.
          </p>
        </div>
      </div>

      {/* Marquee Scrolling Testimonials */}
      <div className="relative">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 lg:w-40 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="overflow-hidden py-4 marquee-container">
          <div className="marquee-track flex gap-8 px-8">
            {/* Copy 1 */}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`a-${i}`} t={t} />
            ))}
            {/* Copy 2 */}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`b-${i}`} t={t} />
            ))}
            {/* Copy 3 */}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`c-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom trust bar - Premium Corporate Style */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 mt-20">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#e8e0cc] relative overflow-hidden">
          {/* subtle gold accent line at the top */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-gray-200">
            {[
              { 
                icon: (
                  <svg className="w-8 h-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                ),
                label: "5.0 Rating", sub: "Google Reviews" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                label: "100% Confidential", sub: "Attorney-Client Privilege" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                label: "Fast Processing", sub: "Quick Turnaround" 
              },
              { 
                icon: (
                  <svg className="w-8 h-8 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                  </svg>
                ),
                label: "98% Success Rate", sub: "Proven Track Record" 
              },
            ].map((item, i) => (
              <div key={i} className={`flex flex-col items-center text-center ${i !== 0 ? 'pt-8 sm:pt-0 lg:pt-0' : ''} group`}>
                <div className="mb-5 p-4 rounded-2xl bg-[#FEFCF3] border border-[#e8e0cc] group-hover:scale-110 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-500 shadow-sm">
                  {item.icon}
                </div>
                <div className="font-serif text-[#0B1426] font-bold text-xl mb-2 group-hover:text-[#b8962e] transition-colors duration-300">
                  {item.label}
                </div>
                <div className="text-[#6B7280] text-[11px] tracking-[0.2em] uppercase font-bold">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}