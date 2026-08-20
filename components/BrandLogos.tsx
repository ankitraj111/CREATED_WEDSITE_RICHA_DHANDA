"use client";

import React from "react";

interface BrandLogoProps {
  name: string;
  isDarkTheme?: boolean;
}

export default function BrandLogo({ name, isDarkTheme = false }: BrandLogoProps) {
  const lower = name.toLowerCase();

  // Official Outlook India Logo — Blue branded style
  if (lower.includes("outlook india") || lower === "outlook") {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
        <span className="font-sans font-black text-base tracking-tight text-[#1A56DB]">OUTLOOK</span>
        <span className={isDarkTheme ? "text-white/80 text-xs font-semibold" : "text-slate-500 text-xs font-semibold"}>India</span>
      </div>
    );
  }

  // Official Google News SVG + 4-Color Official Text
  if (lower.includes("google")) {
    return (
      <div className="inline-flex items-center gap-2 shrink-0 py-1">
        <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span className="font-sans font-bold text-lg tracking-tight">
          <span className="text-[#4285F4]">G</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">o</span>
          <span className="text-[#4285F4]">g</span>
          <span className="text-[#34A853]">l</span>
          <span className="text-[#EA4335]">e</span>{" "}
          <span className={isDarkTheme ? "text-gray-200 font-medium" : "text-slate-700 font-medium"}>News</span>
        </span>
      </div>
    );
  }

  // Official Yahoo! News Purple Logo Text
  if (lower.includes("yahoo")) {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
        <span className="font-sans font-black text-xl tracking-tight text-[#6001D2]">Yahoo!</span>
        <span className={isDarkTheme ? "text-white/90 text-sm font-bold" : "text-slate-800 text-sm font-bold"}>News</span>
      </div>
    );
  }

  // Official The Tribune Deep Navy/Black Newspaper Serif Text
  if (lower.includes("tribune")) {
    return (
      <div className="inline-flex items-center shrink-0 py-1">
        <span className={`font-serif font-black text-lg tracking-wide ${isDarkTheme ? "text-white" : "text-[#0F172A]"}`}>
          The Tribune
        </span>
      </div>
    );
  }

  // Official Ahmedabad Mirror Bright Orange Font
  if (lower.includes("ahmedabad mirror") || lower.includes("newz today")) {
    return (
      <div className="inline-flex items-center shrink-0 py-1">
        <span className="font-serif font-extrabold text-lg tracking-tight text-[#E65100]">Ahmedabad Mirror</span>
      </div>
    );
  }

  // Official India Today Red Logo
  if (lower.includes("india today")) {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
        <span className="font-sans font-black text-base uppercase tracking-tighter text-[#D32F2F]">INDIA TODAY</span>
      </div>
    );
  }

  // Official Times of India TOI Red Logo
  if (lower.includes("times of india")) {
    return (
      <div className="inline-flex items-center shrink-0 py-1">
        <span className="font-serif font-black text-base tracking-wider uppercase text-[#D32F2F]">Times of India</span>
      </div>
    );
  }

  // Express / Wire / Press Outlets
  if (lower.includes("express") || lower.includes("wire")) {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
        <span className="bg-[#2563eb] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase">WIRE</span>
        <span className={`font-serif font-bold text-sm ${isDarkTheme ? "text-white" : "text-[#0F172A]"}`}>{name}</span>
      </div>
    );
  }

  // Live / Flash / Breaking Outlets
  if (lower.includes("live") || lower.includes("flash") || lower.includes("breaking")) {
    return (
      <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
        </span>
        <span className={`font-serif font-bold text-sm ${isDarkTheme ? "text-white" : "text-[#0F172A]"}`}>{name}</span>
      </div>
    );
  }

  // Default Custom Newspaper Logo Style
  return (
    <div className="inline-flex items-center gap-1.5 shrink-0 py-1">
      <div className="w-5 h-5 rounded bg-slate-100 border border-slate-300 flex items-center justify-center text-[10px] font-extrabold text-slate-700 uppercase">
        {name.charAt(0)}
      </div>
      <span className={isDarkTheme ? "font-serif font-bold text-sm text-white/90" : "font-serif font-bold text-sm text-[#0F172A]"}>
        {name}
      </span>
    </div>
  );
}
