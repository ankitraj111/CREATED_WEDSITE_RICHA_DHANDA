"use client";

export default function WhyChoose() {
  const features = [
    {
      icon: "âœˆï¸",
      title: "Expert Immigration Representation",
      description: "Specialized expertise in work visas, PR applications, and citizenship cases with a proven track record of approvals.",
    },
    {
      icon: "ðŸ’¬",
      title: "Personalized Case Strategy",
      description: "Every immigration case receives a customized strategy with direct consultation â€” no delegation to junior staff.",
    },
    {
      icon: "ðŸ’°",
      title: "Transparent Pricing",
      description: "Clear, upfront fees for all visa services with no hidden costs. You always know exactly what you are paying for.",
    },
    {
      icon: "ðŸŒ",
      title: "Global Coverage",
      description: "Immigration solutions for Canada, Australia, UK, USA, New Zealand, Germany, and 10+ other countries.",
    },
    {
      icon: "ðŸ“ž",
      title: "24/7 Availability",
      description: "Always accessible for urgent visa matters â€” last-minute document requests, interview prep, and emergency consultations.",
    },
    {
      icon: "ðŸ“‹",
      title: "End-to-End Support",
      description: "From initial eligibility assessment to visa stamping and landing â€” we handle every step of your immigration journey.",
    },
  ];

  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-[#d4af37]">Advocate Richa Dhandha</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Trusted immigration expertise with a commitment to achieving the best outcomes for every visa applicant
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333] hover:border-[#d4af37]/50 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-[#d4af37]/10 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#d4af37]/20 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#d4af37] transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button 
            onClick={() => window.open(`https://wa.me/919254067300?text=${encodeURIComponent("Hi, I want to schedule a consultation.")}`, "_blank")}
            className="bg-[#d4af37] text-black px-8 py-4 rounded-lg font-semibold hover:bg-[#c9a030] transition-colors duration-300 cursor-pointer"
          >
            Schedule a Consultation
          </button>
        </div>
      </div>
    </section>
  );
}