"use client";

import React from "react";

interface BrandLogoProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ name, size = "md" }: BrandLogoProps) {
  const lower = name.toLowerCase();

  if (lower.includes("google")) {
    return (
      <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-sm shrink-0">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span className="font-sans font-bold text-sm text-gray-800">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>{" "}
          <span className="text-[#5F6368] font-normal">News</span>
        </span>
      </div>
    );
  }

  if (lower.includes("yahoo")) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-[#6001D2] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-black text-sm font-sans tracking-tight shrink-0">
        <span>Yahoo!</span>
        <span className="bg-white/20 px-1.5 py-0.5 rounded text-[11px] font-medium text-white">News</span>
      </div>
    );
  }

  if (lower.includes("tribune")) {
    return (
      <div className="inline-flex items-center gap-2 bg-[#C8102E] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-serif font-bold text-sm tracking-wide shrink-0">
        <span>The Tribune</span>
      </div>
    );
  }

  if (lower.includes("ahmedabad mirror")) {
    return (
      <div className="inline-flex items-center gap-2 bg-[#E65100] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-serif font-extrabold text-sm tracking-tight shrink-0">
        <span>Ahmedabad Mirror</span>
      </div>
    );
  }

  if (lower.includes("india today")) {
    return (
      <div className="inline-flex items-center gap-1.5 bg-[#E50914] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-sans font-black text-xs uppercase tracking-tighter shrink-0">
        <span>INDIA TODAY</span>
        <span className="bg-black/30 px-1.5 py-0.5 rounded text-[10px] font-normal text-white">Times</span>
      </div>
    );
  }

  if (lower.includes("times of india")) {
    return (
      <div className="inline-flex items-center gap-2 bg-[#990000] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-serif font-black text-xs tracking-wider uppercase shrink-0">
        <span>Times of India</span>
      </div>
    );
  }

  if (lower.includes("business")) {
    return (
      <div className="inline-flex items-center gap-2 bg-[#0D47A1] px-3.5 py-1.5 rounded-xl shadow-sm text-white font-sans font-bold text-xs tracking-wide shrink-0">
        <span>{name}</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-white font-serif font-bold text-xs shrink-0">
      <span>{name}</span>
    </div>
  );
}
