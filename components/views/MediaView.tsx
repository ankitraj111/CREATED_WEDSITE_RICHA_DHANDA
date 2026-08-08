"use client";

import { useState } from "react";
import Image from "next/image";
import { ALL_MEDIA_PUBLICATIONS, FEATURED_ARTICLES } from "@/lib/mediaData";

interface MediaViewProps {
  setActiveView: (view: string) => void;
}

export default function MediaView({ setActiveView }: MediaViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "National", "Regional", "Business", "Legal", "Immigration"];

  const filteredPublications = ALL_MEDIA_PUBLICATIONS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Dynamic Colorful Hero Banner */}
      <div className="relative min-h-[380px] lg:min-h-[440px] flex items-center overflow-hidden bg-gradient-to-br from-[#0B1426] via-[#122040] to-[#0A0F1D]">
        {/* Background Generated Banner Image */}
        <Image
          src="/images/media_hero.jpg"
          alt="Media Coverage Banner"
          fill
          className="object-cover opacity-30 mix-blend-overlay"
          priority
        />

        {/* Ambient Glowing Orbs & Gradients */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-maroon/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-transparent to-[#0B1426]/50" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 w-full z-10">
          <button
            onClick={() => setActiveView("home")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-navy text-white text-xs font-semibold backdrop-blur-md transition-all duration-300 mb-6 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Homepage
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
              Verified Press &amp; Media Hub
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              200+ Publications
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Advocate Richa Dhanda <br />
            <span className="bg-gradient-to-r from-gold via-amber-300 to-gold-soft bg-clip-text text-transparent">
              In National Media &amp; Press
            </span>
          </h1>

          <p className="text-white/80 text-base lg:text-lg max-w-2xl font-light leading-relaxed mb-8">
            Expert legal opinions on overseas work permit fraud, visa refusal remedies, and applicant rights covered extensively across <strong className="text-gold font-semibold">200+ verified national &amp; regional news portals</strong>.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#featured-news"
              className="bg-gradient-to-r from-gold to-gold-soft text-navy px-7 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer inline-flex items-center gap-2"
            >
              Featured Lead Stories ↓
            </a>
            <a
              href="#search-directory"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer inline-flex items-center gap-2 backdrop-blur-sm"
            >
              Search 200+ Publications 🔍
            </a>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">

        {/* FEATURED LEAD ARTICLES SECTION */}
        <div id="featured-news" className="mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-dark uppercase tracking-widest mb-2">
                <span className="w-8 h-0.5 bg-gold" />
                Spotlight Features
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
                National News Exclusives
              </h2>
            </div>
            <p className="text-navy/60 text-sm max-w-md">
              Major cover stories and legal warnings published in top-tier national news outlets.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* THE TRIBUNE SPOTLIGHT CARD */}
            <div className="group bg-white rounded-3xl border border-cream-2 shadow-lg overflow-hidden hover:shadow-2xl hover:border-gold/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/images/tribune_coverage.jpg"
                    alt="The Tribune Coverage"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-red-600 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      The Tribune
                    </span>
                    <span className="bg-black/60 text-gold backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold">
                      Partner Exclusive
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white/80 text-xs font-medium flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    August 14, 2024
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-navy mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                    Immigration Experts Highlight Fraud Risks Linked to Fake Work Permit Offers in India
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-6">
                    Every week, families from small towns across Punjab, Haryana, Uttar Pradesh, Himachal Pradesh and several other states make one of the biggest financial decisions of their lives — navigating fake work permit risks with guidance from expert immigration advocates.
                  </p>

                  <blockquote className="border-l-4 border-gold pl-4 py-2 bg-cream/50 rounded-r-xl text-navy/80 text-xs italic mb-6">
                    &quot;Applicants must rigorously verify employer sponsor licenses and official contract letters prior to transferring retainer funds.&quot;
                  </blockquote>
                </div>
              </div>

              <div className="px-8 py-5 bg-navy/5 border-t border-cream-2 flex items-center justify-between">
                <span className="text-xs font-bold text-navy/60">Verified News Outlet</span>
                <a
                  href="https://www.tribuneindia.com/partner-exclusives/immigration-experts-highlight-fraud-risks-linked-to-fake-work-permit-offers-in-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md group-hover:translate-x-1"
                >
                  Read Full Tribune Article →
                </a>
              </div>
            </div>

            {/* AHMEDABAD MIRROR SPOTLIGHT CARD */}
            <div className="group bg-white rounded-3xl border border-cream-2 shadow-lg overflow-hidden hover:shadow-2xl hover:border-gold/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src="/images/ahmedabad_coverage.jpg"
                    alt="Ahmedabad Mirror Coverage"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-amber-600 text-white px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                      Ahmedabad Mirror
                    </span>
                    <span className="bg-black/60 text-gold backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold">
                      National Feature
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white/80 text-xs font-medium flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    August 14, 2024
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-navy mb-4 leading-snug group-hover:text-gold transition-colors duration-300">
                    Young Indians From Small Towns Losing Savings to Fake Work Permit Offers, Warn Immigration Experts
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-6">
                    Legal experts issue crucial warnings regarding fraudulent overseas employment schemes, fake job offers, and essential document verification steps for aspiring international migrants seeking global careers.
                  </p>

                  <blockquote className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-500/10 rounded-r-xl text-navy/80 text-xs italic mb-6">
                    &quot;Small-town candidates are often targeted by unaccredited agents. Legal verification before payment is the best protection.&quot;
                  </blockquote>
                </div>
              </div>

              <div className="px-8 py-5 bg-navy/5 border-t border-cream-2 flex items-center justify-between">
                <span className="text-xs font-bold text-navy/60">Verified News Outlet</span>
                <a
                  href="https://www.ahmedabadmirror.com/young-indians-from-small-towns-losing-savings-to-fake-work-permit-offers-warn-immigration-experts/81918948.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 shadow-md group-hover:translate-x-1"
                >
                  Read Full Mirror Article →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAJOR NEWS CHANNELS & PORTALS GRID (WITH IMAGES) */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-gold-dark text-xs font-bold uppercase tracking-widest block mb-2">
              Multi-Platform Coverage
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
              Prominent Media Outlets
            </h2>
            <p className="text-navy/60 text-sm max-w-xl mx-auto">
              Coverage across major national daily news networks, legal portals, and business digests.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_ARTICLES.slice(2).map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden hover:shadow-xl hover:border-gold/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={item.img || "/images/consultation.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif font-bold text-navy text-base mb-2 group-hover:text-gold transition">
                      {item.name}
                    </h4>
                    <p className="text-navy/70 text-xs line-clamp-2 leading-relaxed mb-4">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    href={item.link !== "#" ? item.link : "https://news.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-cream hover:bg-gold hover:text-navy text-navy font-bold text-xs transition duration-300 text-center flex items-center justify-center gap-1.5"
                  >
                    Read Coverage →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 200+ PUBLICATIONS SEARCHABLE DIRECTORY SECTION */}
        <div id="search-directory" className="bg-white rounded-3xl border border-cream-2 shadow-xl p-8 lg:p-12 mb-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 border-b border-cream-2 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold uppercase tracking-wider mb-2">
                Interactive Press Index
              </div>
              <h2 className="font-serif text-3xl font-bold text-navy">
                Search 200+ Verified Publications
              </h2>
              <p className="text-navy/60 text-sm mt-1">
                Filter and browse all media releases, news portals, and press distribution channels.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-navy text-white px-5 py-3 rounded-2xl text-center shadow-md">
                <div className="font-serif font-bold text-2xl text-gold">200+</div>
                <div className="text-[10px] text-white/60 uppercase font-semibold tracking-wider">Publications</div>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10">
            {/* Search Input Box */}
            <div className="relative flex-1">
              <svg
                className="w-5 h-5 absolute left-4 top-3.5 text-navy/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search media coverage (e.g. Tribune, Karnataka, Punjab, Work Permit, Appeals...)"
                className="w-full pl-12 pr-4 py-3.5 bg-cream/50 border border-cream-2 rounded-2xl text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition shadow-inner"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-navy text-gold shadow-md scale-105"
                      : "bg-cream text-navy/70 hover:bg-gold/20 hover:text-navy"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Publication Grid Cards */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 bg-cream/30 rounded-2xl border border-dashed border-cream-2">
              <p className="text-navy font-semibold mb-2">No media publications found.</p>
              <p className="text-navy/50 text-xs mb-4">Try adjusting your search terms or selecting another category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="bg-navy text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-gold hover:text-navy transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((item) => (
                <div
                  key={item.id}
                  className="group bg-gradient-to-b from-white to-cream/30 rounded-2xl border border-cream-2 p-6 hover:border-gold/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-serif font-bold text-navy text-lg group-hover:text-gold transition">
                        {item.name}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gold/15 text-gold-dark text-[10px] font-bold uppercase tracking-wider shrink-0">
                        {item.category}
                      </span>
                    </div>

                    <h5 className="text-navy/80 text-xs font-semibold leading-relaxed mb-4 line-clamp-2">
                      {item.title}
                    </h5>
                  </div>

                  <a
                    href={item.link && item.link !== "#" ? item.link : `https://news.google.com/search?q=${encodeURIComponent(item.name + " Advocate Richa Dhanda")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full pt-3 border-t border-cream-2 text-xs font-bold text-navy hover:text-gold transition group-hover:translate-x-0.5"
                  >
                    <span>Read Coverage</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* High-Impact Vibrant Contact Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-navy via-navy to-[#0a1730] p-8 lg:p-14 text-white overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gold/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                Media &amp; Press Advisory
              </span>
              <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-3">
                Need Legal Opinions or Press Quotes?
              </h3>
              <p className="text-white/70 text-sm lg:text-base max-w-xl leading-relaxed">
                Advocate Richa Dhanda regularly contributes legal commentary for news outlets on work permit fraud, visa refusal trends, and international migration policies.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => setActiveView("contact")}
                className="bg-gradient-to-r from-gold to-gold-soft hover:from-gold-soft hover:to-gold text-navy px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
              >
                Contact Press Team
              </button>
              <button
                onClick={() => setActiveView("book")}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
