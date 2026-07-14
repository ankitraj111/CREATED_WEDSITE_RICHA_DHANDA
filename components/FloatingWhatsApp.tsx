"use client";

const WHATSAPP_NUMBER = "919254067300";

export default function FloatingWhatsApp() {
  const waMsg = encodeURIComponent(
    "Hi, I want to book a consultation regarding my immigration matter."
  );

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:scale-105 transition animate-float"
      aria-label="Chat on WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1.2 4.8L2 22l5.4-1.2c1.4.8 3 1.2 4.6 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.4 0-2.8-.4-4-1.1l-.3-.2-3.2.7.7-3.1-.2-.3C5.3 14.8 5 13.4 5 12c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z" />
      </svg>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </a>
  );
}
