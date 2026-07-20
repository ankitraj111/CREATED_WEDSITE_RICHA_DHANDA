"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("rd_cookie");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("rd_cookie", "accept");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("rd_cookie", "decline");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-gold/30 p-4 animate-slide-up">
      <div className="max-w-7xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white/80">
          We use cookies to improve your browsing experience and analyse site
          traffic. See our{" "}
          <button className="text-gold-soft underline">cookie policy</button>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm rounded-full border border-white/25 text-white hover:bg-white/10 transition"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="btn-gold px-5 py-2 text-sm rounded-full font-semibold"
          >
            Accept
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
