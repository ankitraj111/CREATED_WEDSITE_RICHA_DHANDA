"use client";

import { useState } from "react";
import Image from "next/image";

interface BlogPost {
  cat: string;
  title: string;
  excerpt: string;
  date: string;
  img: string;
  link: string;
}

export default function BlogView() {
  const [activeCat, setActiveCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Work Visas",
    "Student Visas",
    "PR Updates",
    "Appeals",
    "Immigration Policy",
  ];

  const blogPosts: BlogPost[] = [
    {
      cat: "Immigration Policy",
      title: "Canada Immigration Updates 2025: What You Need to Know",
      excerpt:
        "Latest changes to Express Entry, PNP draws, and LMIA requirements for skilled workers moving to Canada.",
      date: "10 Jun 2025",
      img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/news.html",
    },
    {
      cat: "Work Visas",
      title: "UK Skilled Worker Visa: Complete Guide 2025",
      excerpt:
        "Understanding the points-based system, salary thresholds, sponsor license requirements, and application process for working in the UK.",
      date: "25 May 2025",
      img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
      link: "https://www.gov.uk/skilled-worker-visa",
    },
    {
      cat: "Student Visas",
      title: "5 Critical Checks Before Applying for Your Study Permit",
      excerpt:
        "Financial proof, acceptance letters, SOPs, and common pitfalls that lead to study visa rejections worldwide.",
      date: "12 May 2025",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html",
    },
    {
      cat: "PR Updates",
      title: "Australia PR Pathway: Subclass 189 vs 190 vs 491",
      excerpt:
        "Comparing the three main permanent residency pathways for skilled migrants to Australia — eligibility, processing times, and points requirements.",
      date: "2 May 2025",
      img: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80",
      link: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189",
    },
    {
      cat: "Appeals",
      title: "Visa Refusal? Here's What You Need to Do Immediately",
      excerpt:
        "Understanding refusal letters, administrative reviews, and when to file a formal immigration appeal.",
      date: "18 Apr 2025",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
      link: "https://www.gov.uk/immigration-asylum-tribunal",
    },
    {
      cat: "Work Visas",
      title: "How to Secure Employer Sponsorship for International Relocation",
      excerpt:
        "A guide to finding sponsored roles, understanding labor market tests, and visa documentation requirements.",
      date: "1 Apr 2025",
      img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=600&q=80",
      link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html",
    },
    {
      cat: "Immigration Policy",
      title: "New Zealand Accredited Employer Work Visa (AEWV) Guide",
      excerpt:
        "Everything you need to know about NZ's employer-led work visa system, median wage requirements, and sector agreements.",
      date: "15 Mar 2025",
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
      link: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/accredited-employer-work-visa",
    },
    {
      cat: "PR Updates",
      title: "Germany Opportunity Card: New Immigration Pathway for Skilled Workers",
      excerpt:
        "Germany's new Chancenkarte allows skilled workers to enter Germany to search for employment without a prior job offer.",
      date: "28 Feb 2025",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
      link: "https://www.make-it-in-germany.com/en/visa-residence/types/chance-card",
    },
    {
      cat: "Student Visas",
      title: "USA F-1 Student Visa: Step-by-Step Application Process",
      excerpt:
        "From SEVIS registration to embassy interview — complete guide for Indian students planning to study in the United States.",
      date: "10 Feb 2025",
      img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f04?w=600&q=80",
      link: "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html",
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const catMatch = activeCat === "All" || post.cat === activeCat;
    const searchMatch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.cat.toLowerCase().includes(searchQuery.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F5] via-[#FFFFFF] to-[#F1F3F5] text-slate-900">
      
      {/* Header Banner */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-gray-200">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            Immigration Insights &amp; Policy Updates
          </span>

          <h1 className="font-serif text-4xl lg:text-6xl font-bold text-[#0B1426] mb-6 leading-tight max-w-4xl mx-auto">
            Latest Insights On <span className="text-[#8B1538]">Global Immigration &amp; Visas</span>
          </h1>

          <p className="text-slate-600 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated on Express Entry draws, UK Skilled Worker rules, Australia PR pathways, and legal visa refusal recovery strategies.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 lg:py-24">
        <div className="w-full px-5 lg:px-8 max-w-7xl mx-auto">
          
          {/* Categories & Search Bar */}
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between mb-12">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    activeCat === cat
                      ? "bg-[#8B1538] text-white shadow-sm"
                      : "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative md:w-80">
              <input
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-white text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#8B1538]/30 focus:border-[#8B1538] shadow-xs"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-3.5 top-3 text-slate-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          {/* Grid or Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                🔍
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">No Articles Found</h3>
              <p className="text-slate-500 text-sm">
                No legal updates match &quot;{searchQuery}&quot;. Try searching another keyword or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, i) => (
                <a
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-[#8B1538]/40 transition-all duration-300 group overflow-hidden flex flex-col justify-between"
                >
                  <article>
                    <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                      <Image
                        src={post.img}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-bold bg-[#8B1538] text-white shadow-md">
                        {post.cat}
                      </span>
                    </div>

                    <div className="p-7">
                      <div className="text-xs font-semibold text-slate-400 mb-2">
                        {post.date}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-slate-900 mb-3 group-hover:text-[#8B1538] transition-colors leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>

                  <div className="px-7 pb-7 pt-2">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2563eb] group-hover:text-[#1d4ed8] transition-colors">
                      Read Full Article →
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
