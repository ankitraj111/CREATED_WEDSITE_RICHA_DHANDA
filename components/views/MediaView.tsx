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

  const categories = [
    { name: "All", label: "All Outlets (200+)", color: "bg-navy text-gold" },
    { name: "National", label: "🔴 National News", color: "bg-red-600/10 text-red-700 border-red-200" },
    { name: "Regional", label: "🟠 Regional Wire", color: "bg-amber-600/10 text-amber-700 border-amber-200" },
    { name: "Business", label: "🟣 Business & Economy", color: "bg-purple-600/10 text-purple-700 border-purple-200" },
    { name: "Legal", label: "🔵 Legal & Courts", color: "bg-blue-600/10 text-blue-700 border-blue-200" },
    { name: "Immigration", label: "🟢 Visas & PR", color: "bg-emerald-600/10 text-emerald-700 border-emerald-200" },
  ];

  const filteredPublications = ALL_MEDIA_PUBLICATIONS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Authentic Brand Colors for News Outlets
  const renderBrandTitle = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("google")) {
      return (
        <span className="font-sans text-xl font-bold tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>{" "}
          <span className="text-[#5F6368] font-normal">News</span>
        </span>
      );
    }
    if (lower.includes("yahoo")) {
      return (
        <span className="font-sans text-xl font-black tracking-tight text-[#6001D2]">
          Yahoo!<span className="text-[#222] font-semibold text-base ml-1">News</span>
        </span>
      );
    }
    if (lower.includes("tribune")) {
      return <span className="font-serif text-xl font-bold text-[#C8102E]">The Tribune</span>;
    }
    if (lower.includes("ahmedabad mirror")) {
      return <span className="font-serif text-xl font-extrabold text-[#E65100]">Ahmedabad Mirror</span>;
    }
    if (lower.includes("india today")) {
      return (
        <span className="font-sans text-lg font-black text-[#E50914] tracking-tighter">
          INDIA TODAY <span className="text-[#333] font-serif capitalize font-normal text-base">Times</span>
        </span>
      );
    }
    if (lower.includes("times of india")) {
      return (
        <span className="font-serif text-lg font-black text-[#990000]">
          Times of India <span className="text-[#333] font-sans font-normal text-sm">Daily</span>
        </span>
      );
    }
    if (lower.includes("business") || lower.includes("corporate")) {
      return <span className="font-sans font-bold text-[#0D47A1]">{name}</span>;
    }
    if (lower.includes("karnataka") || lower.includes("punjab") || lower.includes("delhi")) {
      return <span className="font-serif font-bold text-[#D97706]">{name}</span>;
    }
    return <span className="font-serif font-bold text-navy">{name}</span>;
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "National":
        return "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-sm";
      case "Regional":
        return "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm";
      case "Business":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm";
      case "Legal":
        return "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm";
      case "Immigration":
        return "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm";
      default:
        return "bg-navy text-gold";
    }
  };

  const getBorderColor = (cat: string) => {
    switch (cat) {
      case "National":
        return "border-l-4 border-l-red-500";
      case "Regional":
        return "border-l-4 border-l-amber-500";
      case "Business":
        return "border-l-4 border-l-purple-500";
      case "Legal":
        return "border-l-4 border-l-blue-500";
      case "Immigration":
        return "border-l-4 border-l-emerald-500";
      default:
        return "border-l-4 border-l-gold";
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* NEWSROOM BRAND HERO BANNER */}
      <div className="relative min-h-[420px] lg:min-h-[480px] flex items-center overflow-hidden bg-gradient-to-br from-[#070D1B] via-[#0B1426] to-[#122040]">
        <Image
          src="/images/media_hero.jpg"
          alt="Pressroom Header"
          fill
          className="object-cover opacity-20 mix-blend-overlay"
          priority
        />

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 w-full z-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setActiveView("home")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-gold hover:text-navy text-white text-xs font-semibold backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Website Home
            </button>

            <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/80 text-white text-[11px] font-bold uppercase tracking-wider animate-pulse">
              ● Official Media Room
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  National Media Center
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-semibold">
                  200+ Outlets Verified
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Advocate Richa Dhanda <br />
                <span className="bg-gradient-to-r from-amber-300 via-gold to-amber-500 bg-clip-text text-transparent">
                  In National Media &amp; News
                </span>
              </h1>

              <p className="text-white/80 text-base lg:text-lg max-w-2xl font-light leading-relaxed mb-8">
                Legal commentary, fraud awareness advisories, and work permit insights published in{" "}
                <span className="font-sans font-bold text-white">
                  <span className="text-[#4285F4]">G</span>
                  <span className="text-[#EA4335]">o</span>
                  <span className="text-[#FBBC05]">o</span>
                  <span className="text-[#4285F4]">g</span>
                  <span className="text-[#34A853]">l</span>
                  <span className="text-[#EA4335]">e</span> News
                </span>,{" "}
                <span className="font-sans font-black text-[#a755f7]">Yahoo! News</span>,{" "}
                <strong className="text-[#ff4d6d]">The Tribune</strong>, and over 200+ news portals across India.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#featured-news"
                  className="bg-gradient-to-r from-amber-400 via-gold to-amber-500 text-navy px-7 py-3.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform duration-300 shadow-xl cursor-pointer inline-flex items-center gap-2"
                >
                  📰 Read Lead Coverage
                </a>
                <a
                  href="#search-directory"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer inline-flex items-center gap-2 backdrop-blur-sm"
                >
                  🔍 Search 200+ Outlets
                </a>
              </div>
            </div>

            {/* Official Advocate Profile Card */}
            <div className="hidden lg:flex flex-col items-center text-center bg-gradient-to-b from-white/15 to-white/5 border border-gold/40 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-red-600 to-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-md">
                Bar Council Enrolled
              </div>
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gold shadow-2xl mb-4">
                <Image
                  src="/images/richa_tribune.png"
                  alt="Advocate Richa Dhanda"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-serif font-bold text-white text-xl">Advocate Richa Dhanda</h3>
              <span className="text-amber-300 text-xs font-semibold mt-0.5">Bar Council Reg. PH/1260/2025</span>
              <p className="text-white/75 text-xs mt-2 leading-relaxed">
                Expert Immigration Lawyer &amp; National Press Spokesperson on Visa Safeguards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP PUBLICATIONS AUTHENTIC BRAND COLOR STRIP */}
      <div className="bg-navy border-y border-gold/20 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest shrink-0">
            Featured Outlets:
          </span>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="px-4 py-1.5 rounded-full bg-white text-navy text-xs font-bold shadow-md border border-gray-200">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span> <span className="text-[#5F6368]">News</span>
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#6001D2] text-white text-xs font-black shadow-md">
              Yahoo! News
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#C8102E] text-white text-xs font-bold shadow-md">
              The Tribune
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#E65100] text-white text-xs font-extrabold shadow-md">
              Ahmedabad Mirror
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#E50914] text-white text-xs font-black shadow-md uppercase">
              India Today
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#990000] text-white text-xs font-bold shadow-md">
              Times of India
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">

        {/* SPOTLIGHT LEAD COVERAGE SECTION */}
        <div id="featured-news" className="mb-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
                <span className="w-8 h-0.5 bg-red-600" />
                Featured Editorial Highlights
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
                National Front Page Cover Stories
              </h2>
            </div>
            <p className="text-navy/60 text-sm max-w-md">
              Verified cover stories featuring Advocate Richa Dhanda&apos;s legal commentary on work permit scam warnings in India.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            {/* THE TRIBUNE COVERAGE CARD */}
            <div className="group bg-white rounded-3xl border border-cream-2 shadow-xl overflow-hidden hover:shadow-2xl hover:border-red-500/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                {/* Image & Header Overlay */}
                <div className="relative h-80 w-full overflow-hidden bg-navy">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda - The Tribune Feature"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="bg-[#C8102E] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg">
                      The Tribune
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-300/30">
                      Partner Exclusive
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white font-medium text-xs flex items-center gap-2 z-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    August 14, 2024 ● National Circulation
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <span className="text-[#C8102E] text-xs font-bold uppercase tracking-wider block mb-2">
                    Legal Advisory &amp; Fraud Prevention
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-navy mb-4 leading-snug group-hover:text-[#C8102E] transition-colors duration-300">
                    Immigration Experts Highlight Fraud Risks Linked to Fake Work Permit Offers in India
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-6">
                    Every week, families from small towns across Punjab, Haryana, Uttar Pradesh, Himachal Pradesh and several other states make one of the biggest financial decisions of their lives — navigating fake work permit risks with guidance from expert immigration advocates.
                  </p>

                  <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl text-navy/90 text-xs italic mb-6">
                    <strong className="not-italic text-amber-700 font-bold block mb-1">Official Statement from Advocate Richa Dhanda:</strong>
                    &quot;Applicants must rigorously verify employer sponsor licenses and official contract letters prior to transferring retainer funds.&quot;
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-8 py-5 bg-cream/50 border-t border-cream-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-navy/60">Verified Release Link</span>
                <a
                  href="https://www.tribuneindia.com/partner-exclusives/immigration-experts-highlight-fraud-risks-linked-to-fake-work-permit-offers-in-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8102E] text-white hover:bg-red-700 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-md group-hover:translate-x-1"
                >
                  Read Full Tribune Article →
                </a>
              </div>
            </div>

            {/* AHMEDABAD MIRROR COVERAGE CARD */}
            <div className="group bg-white rounded-3xl border border-cream-2 shadow-xl overflow-hidden hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-between">
              <div>
                {/* Image & Header Overlay */}
                <div className="relative h-80 w-full overflow-hidden bg-navy">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda - Ahmedabad Mirror Feature"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="bg-[#E65100] text-white px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-lg">
                      Ahmedabad Mirror
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-300/30">
                      National Feature
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 text-white font-medium text-xs flex items-center gap-2 z-10">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    August 14, 2024 ● National Circulation
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8">
                  <span className="text-[#E65100] text-xs font-bold uppercase tracking-wider block mb-2">
                    Overseas Job Offer Scam Warning
                  </span>
                  <h3 className="font-serif text-2xl lg:text-3xl font-bold text-navy mb-4 leading-snug group-hover:text-[#E65100] transition-colors duration-300">
                    Young Indians From Small Towns Losing Savings to Fake Work Permit Offers, Warn Immigration Experts
                  </h3>
                  <p className="text-navy/70 text-sm leading-relaxed mb-6">
                    Legal experts issue crucial warnings regarding fraudulent overseas employment schemes, fake job offers, and essential document verification steps for aspiring international migrants seeking global careers.
                  </p>

                  <div className="bg-orange-500/10 border-l-4 border-[#E65100] p-4 rounded-r-2xl text-navy/90 text-xs italic mb-6">
                    <strong className="not-italic text-amber-700 font-bold block mb-1">Key Legal Advisory:</strong>
                    &quot;Small-town candidates are often targeted by unaccredited agents. Legal verification before payment is the best protection.&quot;
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="px-8 py-5 bg-cream/50 border-t border-cream-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-navy/60">Verified Release Link</span>
                <a
                  href="https://www.ahmedabadmirror.com/young-indians-from-small-towns-losing-savings-to-fake-work-permit-offers-warn-immigration-experts/81918948.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E65100] text-white hover:bg-orange-700 px-6 py-3 rounded-xl text-xs font-bold transition-all duration-300 shadow-md group-hover:translate-x-1"
                >
                  Read Full Mirror Article →
                </a>
              </div>
            </div>

          </div>

          {/* MAJOR MEDIA CARDS WITH ORIGINAL BRAND LOGOS & COLORS (MATCHING USER SCREENSHOT) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_ARTICLES.slice(2).map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-cream-2 shadow-lg overflow-hidden hover:shadow-2xl hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.img || "/images/consultation.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="mb-3">
                      {renderBrandTitle(item.name)}
                    </div>
                    <p className="text-navy/70 text-xs leading-relaxed line-clamp-3 mb-4">
                      {item.summary || item.title}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={item.link && item.link !== "#" ? item.link : `https://news.google.com/search?q=${encodeURIComponent(item.name + " Advocate Richa Dhanda")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-cream/70 hover:bg-gold hover:text-navy text-navy font-bold text-xs transition-all duration-300 text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Read Coverage</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 200+ PUBLICATIONS SEARCHABLE INDEX */}
        <div id="search-directory" className="bg-white rounded-3xl border border-cream-2 shadow-2xl p-8 lg:p-12 mb-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 border-b border-cream-2 pb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 text-gold-dark text-xs font-bold uppercase tracking-wider mb-2">
                Searchable Media Index
              </div>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-navy">
                Browse 200+ Media Publications
              </h2>
              <p className="text-navy/60 text-sm mt-1">
                Filter and search all news portals, legal digests, and press release distribution channels.
              </p>
            </div>

            <div className="bg-navy text-white px-6 py-3.5 rounded-2xl text-center shadow-lg border border-gold/30 shrink-0">
              <div className="font-serif font-bold text-3xl text-amber-400">200+</div>
              <div className="text-[10px] text-white/70 uppercase font-bold tracking-widest">Active Media Outlets</div>
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mb-8">
            <svg
              className="w-6 h-6 absolute left-5 top-4 text-gold-dark"
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
              placeholder="Search by publication name or headline (e.g. Google, Yahoo, Tribune, Karnataka, Punjab, Work Permit, Appeals...)"
              className="w-full pl-14 pr-6 py-4 bg-cream/40 border border-cream-2 rounded-2xl text-base text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition shadow-inner font-medium"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border ${
                  activeCategory === cat.name
                    ? "bg-navy text-gold shadow-lg scale-105 border-gold"
                    : `${cat.color} hover:scale-105`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Publication Grid Cards */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-16 bg-cream/30 rounded-2xl border border-dashed border-cream-2">
              <p className="text-navy font-semibold text-lg mb-2">No matching publications found.</p>
              <p className="text-navy/50 text-xs mb-4">Try typing another publication name or click reset below.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="bg-navy text-gold px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-gold hover:text-navy transition"
              >
                Reset All Search Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPublications.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-white rounded-2xl border border-cream-2 ${getBorderColor(
                    item.category
                  )} p-6 hover:shadow-xl hover:border-gold/60 transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div>
                        {renderBrandTitle(item.name)}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${getCategoryBadge(item.category)}`}>
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
                    className="inline-flex items-center justify-between w-full pt-3.5 border-t border-cream-2 text-xs font-bold text-navy hover:text-red-600 transition group-hover:translate-x-1"
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

        {/* PRESS ADVISORY & MEDIA CONTACT FOOTER BOX */}
        <div className="relative rounded-3xl bg-gradient-to-r from-navy via-[#0A1730] to-navy p-8 lg:p-14 text-white overflow-hidden shadow-2xl border border-gold/30">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gold shadow-2xl shrink-0">
                <Image
                  src="/images/richa_tribune.png"
                  alt="Advocate Richa Dhanda"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
                  Official Media Advisory
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
                  Journalists &amp; Media Inquiries
                </h3>
                <p className="text-white/80 text-sm lg:text-base max-w-xl leading-relaxed">
                  Advocate Richa Dhanda is available for expert commentary, legal press quotes, and media interviews on work permit regulations and immigration law.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <button
                onClick={() => setActiveView("contact")}
                className="bg-gradient-to-r from-amber-400 via-gold to-amber-500 hover:from-amber-500 hover:to-gold text-navy px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
              >
                Contact Press Desk
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
