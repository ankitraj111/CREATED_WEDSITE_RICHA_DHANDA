"use client";

import Image from "next/image";

interface PrivacyPolicyViewProps {
  setActiveView: (view: string) => void;
}

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: (
      <p>
        Advocate Richa Dhanda (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our legal services.
      </p>
    ),
  },
  {
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <p className="mb-3">We may collect the following types of information:</p>
        <ul className="space-y-2">
          {[
            ["Personal Identification", "Name, email address, phone number, and address provided through contact or booking forms."],
            ["Case-Related Information", "Immigration history, passport details, visa application information, and other documents shared for legal consultations."],
            ["Payment Information", "Transaction details processed through our secure payment gateway (Razorpay). We do not store card details on our servers."],
            ["Usage Data", "Browser type, IP address, pages visited, and time spent on our website for analytics purposes."],
            ["Communication Records", "Emails, phone calls, and other communications with our office."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              <span><strong className="text-navy">{title}:</strong> {desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: (
      <ul className="space-y-2">
        {[
          "Provide, operate, and improve our legal consultation services.",
          "Process bookings and payments for consultations.",
          "Communicate with you regarding your case, appointments, or inquiries.",
          "Send important legal updates or service notifications.",
          "Comply with legal obligations and Bar Council regulations.",
          "Improve website functionality and user experience.",
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
    number: "04",
    title: "Information Sharing",
    content: (
      <>
        <p className="mb-3">We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
        <ul className="space-y-2">
          {[
            ["Service Providers", "Trusted third parties (e.g., payment processors, email service providers) who assist in operating our practice under strict confidentiality agreements."],
            ["Legal Requirements", "If required by law, court order, or government authority."],
            ["With Your Consent", "In any other case, only with your explicit written consent."],
          ].map(([title, desc]) => (
            <li key={title} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              <span><strong className="text-navy">{title}:</strong> {desc}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "05",
    title: "Attorney-Client Privilege",
    content: (
      <p>
        All information shared in the context of a legal consultation or engagement is protected by attorney-client privilege and professional secrecy obligations under the Advocates Act, 1961 and Bar Council of India Rules. We maintain the highest standards of confidentiality for all client communications and case files.
      </p>
    ),
  },
  {
    number: "06",
    title: "Cookies",
    content: (
      <>
        <p className="mb-3">Our website uses cookies to enhance your browsing experience. You may disable cookies through your browser settings. We use cookies for:</p>
        <ul className="space-y-2">
          {["Session management and user preferences.", "Website analytics (via Google Analytics or similar).", "Security and fraud prevention."].map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: "07",
    title: "Data Retention",
    content: (
      <p>
        We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Client files are typically retained for a minimum of 7 years after the conclusion of the engagement, as per legal and regulatory requirements.
      </p>
    ),
  },
  {
    number: "08",
    title: "Your Rights",
    content: (
      <>
        <p className="mb-3">You have the right to:</p>
        <ul className="space-y-2 mb-3">
          {["Access, correct, or delete your personal data.", "Withdraw consent for processing (where applicable).", "Request a copy of data we hold about you.", "Lodge a complaint with the relevant data protection authority."].map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>To exercise these rights, contact us at <a href="mailto:Advocatericha29@gmail.com" className="text-gold hover:underline font-medium">Advocatericha29@gmail.com</a>.</p>
      </>
    ),
  },
  {
    number: "09",
    title: "Security",
    content: (
      <p>
        We implement industry-standard security measures including SSL/TLS encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the Internet is 100% secure.
      </p>
    ),
  },
  {
    number: "10",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
      </p>
    ),
  },
];

export default function PrivacyPolicyView({ setActiveView }: PrivacyPolicyViewProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <Image
          src="/images/consultation.jpg"
          alt="Privacy Policy"
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
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-16">
        {/* Quick summary card */}
        <div className="bg-navy text-white rounded-2xl p-8 mb-12 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold mb-2">Your Privacy Matters to Us</h2>
            <p className="text-white/60 text-sm leading-relaxed">
              We are committed to protecting your personal information and handling it with the utmost confidentiality. All information shared with our office is governed by attorney-client privilege and strict professional secrecy obligations under the Advocates Act, 1961.
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
          <p className="text-white/50 text-sm mb-6">Questions about this policy? Get in touch.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="mailto:Advocatericha29@gmail.com" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Email</div>
                <div className="text-sm font-medium">Advocatericha29@gmail.com</div>
              </div>
            </a>
            <a href="tel:+919306792300" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div className="text-xs text-white/40 mb-0.5">Phone</div>
                <div className="text-sm font-medium">+91 93067 92300</div>
              </div>
            </a>
          </div>
          <div className="mt-4 text-xs text-white/30 text-center">Bar Council Reg. PH/1260/2025</div>
        </div>

        {/* Other policies */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {[["Terms & Conditions", "terms"], ["Refund Policy", "refund"]].map(([label, view]) => (
            <button key={view} onClick={() => setActiveView(view)} className="text-sm text-navy/50 hover:text-gold transition underline underline-offset-4">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
