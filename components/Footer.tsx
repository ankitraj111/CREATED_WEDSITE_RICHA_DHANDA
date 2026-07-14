"use client";

interface FooterProps {
  setActiveView: (view: string) => void;
}

export default function Footer({ setActiveView }: FooterProps) {
  const handleNavClick = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a1730] grain text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full seal flex items-center justify-center font-bold font-serif">
                RD
              </div>
              <div>
                <div className="font-serif text-white text-lg">
                  Advocate Richa Dhanda
                </div>
                <div className="text-[10px] tracking-[0.22em] uppercase text-gold">
                  Immigration Law
                </div>
              </div>
            </div>
            <p className="text-sm mt-4 leading-relaxed">
              Compassionate, precise immigration legal help for individuals,
              families & professionals across India and beyond.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.linkedin.com/in/dr-richa-dhanda-61a63994"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17V10H6v7h2.34zM7.17 8.96a1.36 1.36 0 1 0 0-2.72 1.36 1.36 0 0 0 0 2.72zM18 17v-3.83c0-2.04-1.09-2.99-2.55-2.99-1.18 0-1.7.65-2 1.1V10h-2.34v7h2.34v-3.93c0-.83.16-1.63 1.18-1.63 1.01 0 1.02.95 1.02 1.69V17H18z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/txinctic"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-navy flex items-center justify-center transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {["home", "about", "services", "blog", "faq", "book"].map(
                (view) => (
                  <li key={view}>
                    <button
                      onClick={() => handleNavClick(view)}
                      className="hover:text-gold-soft transition capitalize"
                    >
                      {view === "book" ? "Book a Consultation" : view}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white text-lg mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-gold-soft transition"
                >
                  Work Visa Assistance
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-gold-soft transition"
                >
                  Family Immigration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-gold-soft transition"
                >
                  Permanent Residency
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-gold-soft transition"
                >
                  Citizenship & OCI
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick("services")}
                  className="hover:text-gold-soft transition"
                >
                  Appeals & Refusals
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-white text-lg mb-4">Office</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <svg
                  className="shrink-0 mt-0.5 text-gold"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                (Kurukshetra, Haryana)
              </li>
              <li className="flex gap-3">
                <svg
                  className="shrink-0 text-gold"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="tel:+918800329904" className="hover:text-gold-soft">
                  +91 88003 29904
                </a>
              </li>
              <li className="flex gap-3">
                <svg
                  className="shrink-0 text-gold"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-10 5L2 7" />
                </svg>
                <a
                  href="mailto:Advocaterichadhanda@gmail.com"
                  className="hover:text-gold-soft break-all"
                >
                  Advocaterichadhanda@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs">
          <div>
            © 2026 Advocate Richa Dhanda. All rights reserved.{" "}
            <span className="text-white/40">Bar Council Reg. PH/1260/2025</span>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button className="hover:text-gold-soft">Privacy Policy</button>
            <button className="hover:text-gold-soft">
              Terms & Conditions
            </button>
            <button className="hover:text-gold-soft">Disclaimer</button>
            <button className="hover:text-gold-soft">Cookie Policy</button>
          </div>
        </div>

        <p className="text-[10px] text-white/35 mt-4 leading-relaxed">
          The content on this website is for general informational purposes only
          and does not constitute legal advice. An advocate-client relationship
          is formed only upon execution of a formal engagement letter.
        </p>
      </div>
    </footer>
  );
}
