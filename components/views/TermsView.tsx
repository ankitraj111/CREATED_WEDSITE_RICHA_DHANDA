"use client";

import Image from "next/image";

interface TermsViewProps {
  setActiveView: (view: string) => void;
}

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: <p>By accessing this website or engaging the legal services of Advocate Richa Dhanda, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or services.</p>,
  },
  {
    number: "02",
    title: "Nature of Services",
    content: <p>Advocate Richa Dhanda provides professional immigration legal services including, but not limited to, visa applications, permanent residency, citizenship, appeals, and immigration consultations. Our services are governed by the Advocates Act, 1961 and the Bar Council of India Rules.</p>,
  },
  {
    number: "03",
    title: "No Legal Advice Without Engagement",
    content: <p>The information on this website is for general informational purposes only and does not constitute legal advice. An attorney-client relationship is established only upon execution of a formal engagement letter and payment of the agreed retainer/fee.</p>,
  },
  {
    number: "04",
    title: "Consultation Bookings",
    content: (
      <ul className="space-y-2">
        {[
          "Consultations must be booked in advance through our website or by contacting our office.",
          "Booking fees are charged at the time of scheduling and are non-refundable unless cancelled as per our Refund Policy.",
          "Late arrivals of more than 15 minutes may result in the session being forfeited.",
          "Rescheduling must be done at least 24 hours in advance.",
        ].map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "05",
    title: "Client Responsibilities",
    content: (
      <ul className="space-y-2">
        {[
          "Provide accurate, complete, and truthful information relevant to your immigration matter.",
          "Promptly provide all requested documents and respond to communications.",
          "Understand that providing false information may result in termination of representation and may have legal consequences.",
          "Pay all agreed fees within the specified timeframes.",
        ].map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "06",
    title: "No Guarantee of Outcome",
    content: <p>Immigration law and government policies are subject to change. While we provide our best professional advice and representation, we cannot guarantee any specific outcome. Success depends on various factors beyond our control, including government decisions, policy changes, and the completeness of the client&apos;s information.</p>,
  },
  {
    number: "07",
    title: "Fees and Payment",
    content: (
      <ul className="space-y-2">
        {[
          "All fees are discussed and agreed upon before engagement and are outlined in the engagement letter.",
          "Government fees, filing charges, and third-party costs are separate from our professional fees.",
          "Payments are processed securely via Razorpay. We accept UPI, credit/debit cards, and net banking.",
          "Unpaid invoices may result in suspension of services.",
        ].map((item) => (
          <li key={item} className="flex gap-3 items-start">
            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: "08",
    title: "Intellectual Property",
    content: <p>All content on this website including text, graphics, logos, and images is the property of Advocate Richa Dhanda and is protected by applicable intellectual property laws. Unauthorized reproduction or use is strictly prohibited.</p>,
  },
  {
    number: "09",
    title: "Limitation of Liability",
    content: <p>To the maximum extent permitted by law, Advocate Richa Dhanda shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or our services. Our liability is limited to the fees paid for the specific service in question.</p>,
  },
  {
    number: "10",
    title: "Termination of Engagement",
    content: <p>Either party may terminate the engagement with written notice. Upon termination, we will provide all client documents and a final statement of account. Fees earned for work completed to date are non-refundable.</p>,
  },
  {
    number: "11",
    title: "Governing Law",
    content: <p>These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Punjab, India.</p>,
  },
];

export default function TermsView({ setActiveView }: TermsViewProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <Image
          src="/images/business.jpg"
          alt="Terms and Conditions"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/40" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 max-w-5xl mx-auto">
          <button
            onClick={() => setActiveView("home")}
            className="flex items-center gap-2 text-white/60 hover:text-gold transition mb-6 text-sm w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to Home
          </button>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/30 text-gold text-xs font-bold tracking-widest uppercase mb-4 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Legal Document
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">Terms &amp; Conditions</h1>
          <p className="text-white/50 text-sm">Last updated: July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-16">
        {/* Quick summary card */}
        <div className="bg-navy text-white rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold mb-2">Please Read Carefully</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              By using our website or engaging our services, you agree to these terms. These conditions govern the professional relationship between you and Advocate Richa Dhanda and are designed to ensure clarity, transparency, and mutual respect throughout the legal process.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.number} className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
                <span className="font-serif text-2xl font-bold text-gold/30">{section.number}</span>
                <h2 className="font-serif text-xl font-bold text-navy">{section.title}</h2>
              </div>
              <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Card */}
        <div className="mt-12 bg-gradient-to-br from-navy via-navy to-[#0a1730] rounded-2xl p-8 text-white">
          <h3 className="font-serif text-2xl font-bold mb-2">Contact Us</h3>
          <p className="text-white/50 text-sm mb-6">Have questions about our terms? We&apos;re happy to clarify.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="mailto:Advocaterichadhanda@gmail.com" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Email</div>
                <div className="text-sm font-medium">Advocaterichadhanda@gmail.com</div>
              </div>
            </a>
            <a href="tel:+919254067300" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Phone</div>
                <div className="text-sm font-medium">+91 92540 67300</div>
              </div>
            </a>
          </div>
          <div className="mt-4 text-xs text-white/30 text-center">Bar Council Reg. PH/1260/2025</div>
        </div>

        {/* Other policies */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {[["Privacy Policy", "privacy"], ["Refund Policy", "refund"]].map(([label, view]) => (
            <button key={view} onClick={() => setActiveView(view)} className="text-sm text-navy/50 hover:text-gold transition underline underline-offset-4">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
