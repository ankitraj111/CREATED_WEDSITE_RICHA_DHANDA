"use client";

import { useState } from "react";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogos";
import { ALL_MEDIA_PUBLICATIONS, FEATURED_ARTICLES } from "@/lib/mediaData";

interface MediaViewProps {
  setActiveView: (view: string) => void;
}

export default function MediaView({ setActiveView }: MediaViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    { name: "All", label: "All Outlets (200+)" },
    { name: "National", label: "National News" },
    { name: "Regional", label: "Regional Wire" },
    { name: "Business", label: "Business & Economy" },
    { name: "Legal", label: "Legal & Courts" },
    { name: "Immigration", label: "Visas & PR" },
  ];

  const filteredPublications = ALL_MEDIA_PUBLICATIONS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827]">

      {/* CLEAN PROFESSIONAL PRESSROOM HEADER */}
      <div className="bg-[#0B1426] text-white py-14 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          
          <div className="flex items-center justify-between gap-4 mb-6">
            <button
              onClick={() => setActiveView("home")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-gold hover:text-navy text-white text-xs font-semibold transition cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 5l-7 7 7 7" />
              </svg>
              Back to Website
            </button>

            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C8102E] text-white text-xs font-bold uppercase tracking-wider">
              ● Official Media Room
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">
                Press Releases &amp; Media Mentions
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                Advocate Richa Dhanda <br />
                <span className="text-gold">In National Media</span>
              </h1>

              <p className="text-gray-300 text-base lg:text-lg max-w-2xl leading-relaxed mb-6 font-light">
                Verified legal commentary, work permit scam advisories, and expert opinions published in major national news outlets including <strong className="text-white">The Tribune</strong>, <strong className="text-white">Ahmedabad Mirror</strong>, <strong className="text-white">Google News</strong>, and over 200+ media portals across India.
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <a
                  href="#featured-news"
                  className="bg-gold text-navy font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-gold-soft transition shadow-md"
                >
                  Featured Cover Stories ↓
                </a>
                <a
                  href="#search-directory"
                  className="bg-white/10 text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-white/20 transition border border-white/20"
                >
                  Search 200+ Outlets 🔍
                </a>
              </div>
            </div>

            {/* Official Advocate Profile Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gold shadow-md mb-3">
                <Image
                  src="/images/richa_tribune.png"
                  alt="Advocate Richa Dhanda"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h3 className="font-serif font-bold text-white text-lg">Advocate Richa Dhanda</h3>
              <p className="text-gold text-xs font-medium">Bar Council Reg. PH/1260/2025</p>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Expert Immigration Lawyer &amp; National Press Spokesperson.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* TOP FEATURED LOGOS STRIP */}
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0">
            Featured In Top Media:
          </span>
          <div className="flex flex-wrap gap-4 items-center overflow-x-auto py-1">
            <BrandLogo name="Google News" />
            <BrandLogo name="Yahoo! News" />
            <BrandLogo name="The Tribune" />
            <BrandLogo name="Ahmedabad Mirror" />
            <BrandLogo name="India Today" />
            <BrandLogo name="Times of India" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14">

        {/* FEATURED LEAD COVERAGE SECTION */}
        <div id="featured-news" className="mb-16 scroll-mt-24">
          <div className="border-b border-gray-200 pb-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-[#C8102E] text-xs font-bold uppercase tracking-widest block mb-1">
                Featured Lead Stories
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#0B1426]">
                National Cover Stories
              </h2>
            </div>
            <span className="text-xs font-semibold text-gray-500 hidden sm:block">
              August 2024 Coverage
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-14">

            {/* THE TRIBUNE SPOTLIGHT CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="relative h-72 w-full bg-gray-100 border-b border-gray-200">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda - The Tribune Feature"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <BrandLogo name="The Tribune" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/75 text-white px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    Published: August 14, 2024
                  </div>
                </div>

                <div className="p-7">
                  <span className="text-xs font-bold text-[#C8102E] uppercase tracking-wider block mb-2">
                    National Partner Exclusive
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1426] mb-3 leading-snug hover:text-[#C8102E] transition">
                    Immigration Experts Highlight Fraud Risks Linked to Fake Work Permit Offers in India
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Every week, families from small towns across Punjab, Haryana, Uttar Pradesh, Himachal Pradesh and several other states make one of the biggest financial decisions of their lives — navigating fake work permit risks with guidance from expert immigration advocates.
                  </p>

                  <div className="bg-gray-50 border-l-4 border-[#C8102E] p-4 rounded-r-xl text-gray-700 text-xs italic mb-4">
                    <strong className="not-italic text-gray-900 font-bold block mb-1">Statement from Advocate Richa Dhanda:</strong>
                    &quot;Applicants must rigorously verify employer sponsor licenses and official contract letters prior to transferring retainer funds.&quot;
                  </div>
                </div>
              </div>

              <div className="px-7 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Verified Press Release</span>
                <a
                  href="https://www.tribuneindia.com/partner-exclusives/immigration-experts-highlight-fraud-risks-linked-to-fake-work-permit-offers-in-india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition inline-flex items-center gap-1.5"
                >
                  Read Full Tribune Article →
                </a>
              </div>
            </div>

            {/* AHMEDABAD MIRROR SPOTLIGHT CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between overflow-hidden">
              <div>
                <div className="relative h-72 w-full bg-gray-100 border-b border-gray-200">
                  <Image
                    src="/images/richa_tribune.png"
                    alt="Advocate Richa Dhanda - Ahmedabad Mirror Feature"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <BrandLogo name="Ahmedabad Mirror" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black/75 text-white px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                    Published: August 14, 2024
                  </div>
                </div>

                <div className="p-7">
                  <span className="text-xs font-bold text-[#E65100] uppercase tracking-wider block mb-2">
                    National News Feature
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0B1426] mb-3 leading-snug hover:text-[#E65100] transition">
                    Young Indians From Small Towns Losing Savings to Fake Work Permit Offers, Warn Immigration Experts
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5">
                    Legal experts issue crucial warnings regarding fraudulent overseas employment schemes, fake job offers, and essential document verification steps for aspiring international migrants seeking global careers.
                  </p>

                  <div className="bg-gray-50 border-l-4 border-[#E65100] p-4 rounded-r-xl text-gray-700 text-xs italic mb-4">
                    <strong className="not-italic text-gray-900 font-bold block mb-1">Key Legal Advisory:</strong>
                    &quot;Small-town candidates are often targeted by unaccredited agents. Legal verification before payment is the best protection.&quot;
                  </div>
                </div>
              </div>

              <div className="px-7 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Verified Press Release</span>
                <a
                  href="https://www.ahmedabadmirror.com/young-indians-from-small-towns-losing-savings-to-fake-work-permit-offers-warn-immigration-experts/81918948.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#E65100] hover:bg-orange-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition inline-flex items-center gap-1.5"
                >
                  Read Full Mirror Article →
                </a>
              </div>
            </div>

          </div>

          {/* OTHER MAJOR MEDIA OUTLETS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_ARTICLES.slice(2).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4">
                    <BrandLogo name={item.name} />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-[#0B1426] text-base mb-2 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {item.summary || item.title}
                  </p>
                </div>

                <a
                  href={item.link && item.link !== "#" ? item.link : `https://news.google.com/search?q=${encodeURIComponent(item.name + " Advocate Richa Dhanda")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-[#0B1426] hover:text-white text-[#0B1426] font-bold text-xs transition text-center flex items-center justify-center gap-1.5"
                >
                  Read Coverage →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 200+ PUBLICATIONS SEARCHABLE DIRECTORY */}
        <div id="search-directory" className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 lg:p-10 mb-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-gray-200 pb-6">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Complete Press Index
              </span>
              <h2 className="font-serif text-2xl lg:text-3xl font-bold text-[#0B1426]">
                Browse 200+ Verified Publications
              </h2>
            </div>

            <div className="bg-gray-100 text-[#0B1426] px-5 py-2.5 rounded-xl text-center border border-gray-200 shrink-0">
              <div className="font-serif font-bold text-2xl text-[#0B1426]">200+</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Publications</div>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-6">
            <svg
              className="w-5 h-5 absolute left-4 top-3.5 text-gray-400"
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
              placeholder="Search by outlet or headline (e.g. Google, Yahoo, Tribune, Karnataka, Punjab, Work Permit...)"
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#0B1426] focus:bg-white transition"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeCategory === cat.name
                    ? "bg-[#0B1426] text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Publication Grid Cards */}
          {filteredPublications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm font-semibold mb-2">No matching publications found.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-xs font-bold text-[#0B1426] underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPublications.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50/50 rounded-xl border border-gray-200 p-5 hover:bg-white hover:border-gray-300 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <BrandLogo name={item.name} />
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-200 px-2.5 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>

                    <h5 className="text-gray-800 text-xs font-semibold leading-relaxed mb-4 line-clamp-2">
                      {item.title}
                    </h5>
                  </div>

                  <a
                    href={item.link && item.link !== "#" ? item.link : `https://news.google.com/search?q=${encodeURIComponent(item.name + " Advocate Richa Dhanda")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between w-full pt-3 border-t border-gray-200 text-xs font-bold text-[#0B1426] hover:text-[#C8102E] transition"
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

        {/* PRESS DESK CONTACT BOX */}
        <div className="bg-[#0B1426] rounded-2xl p-8 lg:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold shrink-0">
              <Image
                src="/images/richa_tribune.png"
                alt="Advocate Richa Dhanda"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-1">
                Official Media Desk
              </span>
              <h3 className="font-serif text-2xl font-bold mb-1">Press &amp; Media Inquiries</h3>
              <p className="text-gray-300 text-sm max-w-lg">
                Advocate Richa Dhanda is available for legal commentary, press quotes, and media interviews on immigration law.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveView("contact")}
            className="bg-gold text-navy hover:bg-gold-soft font-bold px-7 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shrink-0 shadow-md cursor-pointer"
          >
            Contact Media Desk
          </button>
        </div>

      </div>
    </div>
  );
}
