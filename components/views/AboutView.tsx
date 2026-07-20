"use client";

import Image from "next/image";

interface AboutViewProps {
  setActiveView?: (view: string) => void;
}

export default function AboutView({ setActiveView }: AboutViewProps = {}) {
  const qualifications = [
    {
      year: "2022",
      title: "LL.M (Master of Laws)",
      institution: "Kurukshetra University — First Division",
      icon: "🎓",
    },
    {
      year: "2025",
      title: "Bar Council Enrollment",
      institution: "Bar Council of Punjab & Haryana — Reg. PH/1260/2025",
      icon: "⚖️",
    },
  ];

  const expertise = [
    {
      title: "Work Visas",
      desc: "Skilled worker visas, employer sponsorships, work permits, and labour market impact assessments.",
      icon: "💼",
    },
    {
      title: "Student Visas",
      desc: "Study permits, university admissions guidance, post-graduation work permits, and pathway planning.",
      icon: "🎓",
    },
    {
      title: "Permanent Residency",
      desc: "PR applications, Express Entry profiles, provincial nominee programs, and points optimization.",
      icon: "🏠",
    },
    {
      title: "Family Immigration",
      desc: "Spouse sponsorship, parent and grandparent sponsorship, dependent visas, and family reunification.",
      icon: "👨‍👩‍👧",
    },
    {
      title: "Business & Investor Visas",
      desc: "Entrepreneur visas, startup visa programs, investor immigration, and business expansion permits.",
      icon: "📈",
    },
    {
      title: "Appeals & Refusals",
      desc: "Visa refusal appeals, deportation defense, administrative reviews, and judicial review applications.",
      icon: "🛡️",
    },
  ];

  const philosophyPoints = [
    {
      icon: "👤",
      title: "Personal Attention",
      desc: "Direct, personal attention to every visa case — no delegation to juniors.",
    },
    {
      icon: "💰",
      title: "Transparent Fees",
      desc: "Clear, transparent fee structures for all immigration services discussed upfront.",
    },
    {
      icon: "🗣️",
      title: "Multilingual Communication",
      desc: "Plain-language explanations of complex immigration matters in Hindi, Punjabi, or English.",
    },
    {
      icon: "📜",
      title: "Ethical Practice",
      desc: "Grounded in Bar Council guidelines and the highest professional standards.",
    },
  ];

  const stats = [
    { value: "500+", label: "Visas Approved" },
    { value: "98%", label: "Success Rate" },
    { value: "10+", label: "Countries Covered" },
    { value: "3", label: "Languages" },
  ];

  return (
    <>
      {/* Hero Banner — Light */}
      <section className="relative bg-white overflow-hidden border-b border-[#e8e0cc]">
        {/* Background subtle accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#F8F6ED] rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B1426]/5 border border-[#0B1426]/10 text-[#0B1426] text-sm font-bold tracking-widest uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            About the Immigration Expert
          </div>
          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#0B1426] mt-3 max-w-4xl leading-tight">
            Your Trusted Guide to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8962e]">
              Global Immigration
            </span>{" "}
            & Visa Success
          </h1>
          <p className="text-[#6B7280] max-w-2xl text-lg mt-6 leading-relaxed">
            Expert immigration counsel rooted in academic excellence and a genuine passion for helping clients achieve their dreams abroad.
          </p>
          <div className="h-[2px] w-24 bg-gradient-to-r from-[#d4af37] to-transparent mt-8" />
        </div>
      </section>

      {/* Main About Content — White Background */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Photo Column */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                {/* Photo Card */}
                <div className="relative group">
                  {/* Gold border glow */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-[#d4af37]/30 via-transparent to-[#d4af37]/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative rounded-3xl overflow-hidden border border-[#e8e0cc] shadow-[0_8px_40px_rgba(0,0,0,0.08)] group-hover:shadow-[0_12px_50px_rgba(212,175,55,0.15)] transition-all duration-500">
                    <Image
                      src="/advocate-richa-new.jpg"
                      alt="Advocate Richa Dhandha — Expert Immigration Lawyer"
                      width={800}
                      height={520}
                      className="w-full h-[480px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Info Card */}
                <div className="mt-6 bg-[#FEFCF3] border border-[#e8e0cc] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8962e] flex items-center justify-center font-bold font-serif text-lg text-white shadow-[0_4px_15px_rgba(212,175,55,0.3)]">
                      RD
                    </div>
                    <div>
                      <div className="font-serif text-xl text-[#0B1426] font-semibold">
                        Advocate Richa Dhandha
                      </div>
                      <div className="text-sm text-[#6B7280]">LL.M, Kurukshetra University</div>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37]/25 to-transparent my-5" />
                  <div className="flex flex-wrap gap-2">
                    {["Immigration Law Expert", "Bar Council Enrolled", "Global Visa Specialist"].map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-[#0B1426]/5 text-xs font-medium text-[#0B1426] border border-[#0B1426]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificate Card */}
                <div className="mt-6 bg-white border border-[#e8e0cc] rounded-2xl p-4 shadow-sm overflow-hidden group">
                  <div className="text-center font-serif text-sm font-semibold tracking-wider text-[#0B1426] mb-3 uppercase">
                    Certificate of Enrolment
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-[#e8e0cc]/50 bg-[#FEFCF3]">
                    <Image
                      src="/certificate.jpg"
                      alt="Bar Council of Punjab & Haryana - Certificate of Enrolment"
                      width={800}
                      height={1000}
                      className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7">
              {/* Bio */}
              <p className="text-lg text-[#2C2C2C] leading-relaxed">
                I am Advocate Richa Dhandha, an expert immigration lawyer enrolled with the
                Bar Council of Punjab & Haryana (Registration No. PH/1260/2025). With a
                Master of Laws (LL.M) degree from Kurukshetra University in First Division,
                I specialize in helping individuals and families navigate complex immigration
                processes and achieve their goals of living, working, and studying abroad.
              </p>
              <p className="text-[#6B7280] mt-5 leading-relaxed">
                My practice covers the full spectrum of immigration law — from work visas and
                student visas to permanent residency applications, citizenship pathways, family
                immigration sponsorships, and visa refusal appeals. I guide clients through
                immigration systems of countries including Canada, Australia, the United Kingdom,
                the United States, and New Zealand, ensuring every application is meticulously
                prepared for the highest chance of success.
              </p>

              {/* Education Timeline */}
              <div className="mt-12">
                <h3 className="font-serif text-2xl text-[#0B1426] font-semibold flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-sm">🎓</span>
                  Education & Qualifications
                </h3>
                <div className="h-[2px] w-16 bg-gradient-to-r from-[#d4af37] to-transparent mt-4" />

                <div className="mt-8 space-y-0">
                  {qualifications.map((qual, i) => (
                    <div key={i} className="relative flex gap-6 group">
                      {/* Timeline icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/20 flex items-center justify-center text-xl group-hover:bg-[#d4af37]/20 group-hover:border-[#d4af37]/40 transition-all duration-300">
                          {qual.icon}
                        </div>
                        {i < qualifications.length - 1 && (
                          <div className="w-px h-full bg-gradient-to-b from-[#d4af37]/25 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <div className="text-[#d4af37] text-sm font-bold tracking-wider">{qual.year}</div>
                        <div className="font-semibold text-[#0B1426] text-lg mt-1">{qual.title}</div>
                        <div className="text-sm text-[#6B7280] mt-1">{qual.institution}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Philosophy */}
              <div className="mt-14">
                <h3 className="font-serif text-3xl text-[#0B1426] font-bold">
                  Practice Philosophy
                </h3>
                <div className="flex items-center gap-2 mt-4">
                  <div className="h-[3px] w-12 bg-[#d4af37] rounded-full" />
                  <div className="h-[3px] w-2 bg-[#d4af37]/50 rounded-full" />
                  <div className="h-[3px] w-2 bg-[#d4af37]/20 rounded-full" />
                </div>

                <div className="mt-10 grid sm:grid-cols-2 gap-6">
                  {philosophyPoints.map((point, i) => (
                    <div
                      key={i}
                      className="relative bg-white border border-[#e8e0cc] rounded-2xl p-6 hover:border-[#d4af37]/50 hover:shadow-[0_15px_40px_rgba(212,175,55,0.12)] transition-all duration-500 hover:-translate-y-1 overflow-hidden group"
                    >
                      {/* Decorative top glow line */}
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                      
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FEFCF3] to-white border border-[#e8e0cc] shadow-sm flex items-center justify-center text-2xl mb-5 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                        {point.icon}
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-serif font-bold text-[#0B1426] text-xl group-hover:text-[#b8962e] transition-colors duration-300">
                        {point.title}
                      </h4>
                      <p className="text-[#6B7280] text-[15px] mt-2.5 leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar — Light */}
      <section className="bg-[#FEFCF3] border-y border-[#e8e0cc]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="font-serif text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8962e]">
                  {stat.value}
                </div>
                <div className="text-[#6B7280] text-sm mt-2 font-medium tracking-wider uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas of Expertise — Light cream background */}
      <section className="bg-[#F8F6ED] py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0B1426]/5 border border-[#0B1426]/10 text-[#0B1426] text-sm font-bold tracking-widest uppercase mb-6">
              ✈️ Areas of Expertise
            </div>
            <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#0B1426]">
              Immigration Practice{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#b8962e]">
                Areas
              </span>
            </h2>
            <p className="text-[#6B7280] max-w-xl mx-auto text-lg mt-5">
              Comprehensive immigration services across multiple visa categories, each handled with expertise and dedication.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((item, i) => (
              <div
                key={i}
                className="group relative bg-white border border-[#e8e0cc] rounded-3xl p-8 hover:border-[#d4af37]/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(212,175,55,0.12)]"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/15 flex items-center justify-center text-2xl mb-5 group-hover:bg-[#d4af37]/20 group-hover:border-[#d4af37]/30 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="font-serif text-xl font-semibold text-[#0B1426] group-hover:text-[#b8962e] transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-[#6B7280] text-sm mt-3 leading-relaxed">{item.desc}</p>
                {/* Bottom accent */}
                <div className="h-px bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/25 to-[#d4af37]/0 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — Light */}
      <section className="bg-white py-16 lg:py-20 border-t border-[#e8e0cc]">
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#0B1426] mb-5">
            Ready to Start Your{" "}
            <span className="text-[#d4af37]">Immigration Journey</span>?
          </h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-lg mb-10">
            Schedule a consultation today and take the first step towards achieving your immigration goals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (setActiveView) {
                  setActiveView('book');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  window.open(`https://wa.me/919254067300?text=${encodeURIComponent("Hi, I want to book a free consultation regarding my immigration matter.")}`, "_blank");
                }
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-[#d4af37] to-[#c9a030] text-[#0B1426] hover:from-[#e0bc45] hover:to-[#d4af37] hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:-translate-y-[1px] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              Book Free Consultation
            </button>
            <a
              href="tel:+919254067300"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold bg-[#0B1426] border border-[#0B1426] text-white hover:bg-[#122040] hover:shadow-[0_8px_30px_rgba(11,20,38,0.2)] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
