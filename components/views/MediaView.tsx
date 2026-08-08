"use client";

import { useState } from "react";
import Image from "next/image";
import { ALL_MEDIA_PUBLICATIONS, FEATURED_ARTICLES, MediaItem } from "@/lib/mediaData";

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
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-80 lg:h-96 overflow-hidden bg-navy">
        <Image
          src="/images/appeals.jpg"
          alt="Media & Press Coverage"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/60" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-16 max-w-6xl mx-auto">
          <button
            onClick={() => setActiveView("home")}
            className="flex items-center gap-2 text-white/60 hover:text-gold transition mb-4 text-sm w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </button>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-bold tracking-widest uppercase mb-3 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Verified Press &amp; News Coverage
          </span>
          <h1 className="font-serif text-3xl lg:text-5xl font-bold text-white mb-3">
            Media &amp; Press Features
          </h1>
          <p className="text-white/70 text-sm lg:text-base max-w-2xl leading-relaxed">
            Advocate Richa Dhanda&apos;s legal commentary on immigration fraud awareness, work permit security, and applicant rights featured across <strong className="text-gold">200+ national and regional publications</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 lg:px-8 py-14">

        {/* Featured Top Articles (The Tribune & Ahmedabad Mirror Spotlight) */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-gold rounded-full" />
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-navy">
                Featured Lead Stories
              </h2>
              <p className="text-navy/60 text-sm">Major national news highlights &amp; expert legal interviews</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* The Tribune Card */}
            <div className="bg-white rounded-2xl border border-cream-2 shadow-md overflow-hidden hover:border-gold/50 transition duration-300 flex flex-col justify-between">
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-navy text-gold text-xs font-bold uppercase tracking-wider">
                    The Tribune
                  </span>
                  <span className="text-navy/40 text-xs font-medium">Partner Exclusive</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3 leading-snug hover:text-gold transition">
                  <a
                    href="https://www.tribuneindia.com/partner-exclusives/immigration-experts-highlight-fraud-risks-linked-to-fake-work-permit-offers-in-india/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Immigration Experts Highlight Fraud Risks Linked to Fake Work Permit Offers in India
                  </a>
                </h3>
                <p className="text-navy/70 text-sm leading-relaxed mb-6">
                  Every week, families from small towns across Punjab, Haryana, Uttar Pradesh, and Himachal Pradesh make life-changing financial decisions. Legal experts warn candidates to verify work permits and contracts before making payments.
                </p>
              </div>
              <div className="px-8 py-5 bg-cream/60 border-t border-cream-2 flex items-center justify-between">
                <span className="text-xs text-navy/50 font-medium">Published in The Tribune</span>
                <a
                  href="https://www.tribuneindia.com/partner-exclusives/immigration-experts-highlight-fraud-risks-linked-to-fake-work-permit-offers-in-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy px-4 py-2 rounded-xl text-xs font-bold transition duration-300"
                >
                  Read Full Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Ahmedabad Mirror Card */}
            <div className="bg-white rounded-2xl border border-cream-2 shadow-md overflow-hidden hover:border-gold/50 transition duration-300 flex flex-col justify-between">
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-navy text-gold text-xs font-bold uppercase tracking-wider">
                    Ahmedabad Mirror
                  </span>
                  <span className="text-navy/40 text-xs font-medium">National Feature</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-navy mb-3 leading-snug hover:text-gold transition">
                  <a
                    href="https://www.ahmedabadmirror.com/young-indians-from-small-towns-losing-savings-to-fake-work-permit-offers-warn-immigration-experts/81918948.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Young Indians From Small Towns Losing Savings to Fake Work Permit Offers, Warn Immigration Experts
                  </a>
                </h3>
                <p className="text-navy/70 text-sm leading-relaxed mb-6">
                  Immigration lawyers issue critical advisories for job seekers facing unverified overseas job offers. Learn key verification guidelines and legal recourse available for victims of visa scams.
                </p>
              </div>
              <div className="px-8 py-5 bg-cream/60 border-t border-cream-2 flex items-center justify-between">
                <span className="text-xs text-navy/50 font-medium">Published in Ahmedabad Mirror</span>
                <a
                  href="https://www.ahmedabadmirror.com/young-indians-from-small-towns-losing-savings-to-fake-work-permit-offers-warn-immigration-experts/81918948.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-navy text-white hover:bg-gold hover:text-navy px-4 py-2 rounded-xl text-xs font-bold transition duration-300"
                >
                  Read Full Article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 200+ Publications Searchable Section */}
        <div className="bg-white rounded-3xl border border-cream-2 shadow-sm p-8 lg:p-10 mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-cream-2 pb-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-navy mb-1">
                Explore 200+ Media Publications
              </h3>
              <p className="text-navy/60 text-sm">
                Search and filter media releases across news portals &amp; legal journals
              </p>
            </div>
            <div className="px-4 py-2 bg-gold/15 border border-gold/30 rounded-xl text-gold-dark font-bold text-sm text-center">
              200+ Media Releases Verified
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Box */}
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
                placeholder="Search Media Coverage... (e.g. Tribune, Karnataka, Work Permit, Legal)"
                className="w-full pl-12 pr-4 py-3 bg-cream/50 border border-cream-2 rounded-xl text-sm text-navy placeholder:text-navy/40 focus:outline-none focus:border-gold transition"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    activeCategory === cat
                      ? "bg-navy text-white shadow-sm"
                      : "bg-cream text-navy/70 hover:bg-cream-2"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-12 text-navy/50">
              <p className="text-base font-medium">No publications found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-3 text-gold text-xs font-bold underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPublications.map((item) => (
                <div
                  key={item.id}
                  className="bg-cream/40 rounded-2xl border border-cream-2 p-5 hover:border-gold/50 hover:bg-white transition duration-250 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-serif font-bold text-navy text-base">
                        {item.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gold/15 text-gold-dark text-[10px] font-bold uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-navy/80 text-xs font-medium mb-4 line-clamp-2 leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                  <a
                    href={item.link !== "#" ? item.link : "https://news.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-gold transition mt-2"
                  >
                    Read Coverage →
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Contact Banner */}
        <div className="bg-navy rounded-3xl p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">
              For Journalists &amp; Media Outlets
            </span>
            <h3 className="font-serif text-2xl font-bold mb-2">Media &amp; Press Inquiries</h3>
            <p className="text-white/60 text-sm max-w-xl">
              Seeking legal expert quotes, commentary on immigration policy updates, or insights on fraud awareness? Reach out to Advocate Richa Dhanda.
            </p>
          </div>
          <button
            onClick={() => setActiveView("contact")}
            className="bg-gold hover:bg-gold-soft text-navy px-8 py-3.5 rounded-xl font-bold text-sm shrink-0 transition duration-300 hover:scale-105 cursor-pointer shadow-lg"
          >
            Contact Media Team
          </button>
        </div>
      </div>
    </div>
  );
}
