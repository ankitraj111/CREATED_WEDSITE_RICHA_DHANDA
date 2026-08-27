"use client";

import Image from "next/image";

interface RefundPolicyViewProps {
  setActiveView: (view: string) => void;
}

export default function RefundPolicyView({ setActiveView }: RefundPolicyViewProps) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-72 lg:h-96 overflow-hidden">
        <Image
          src="/images/appeals.jpg"
          alt="Refund Policy"
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
            Legal Document
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2">Refund Policy</h1>
          <p className="text-white/50 text-sm">Last updated: July 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-16">

        {/* Alert Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <p className="text-amber-800 text-sm leading-relaxed font-medium">
            Please read this policy carefully before booking a consultation or engaging our services. By making a payment, you acknowledge and agree to the terms outlined below.
          </p>
        </div>

        {/* Refund Summary Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { emoji: "✅", label: "Full Refund", desc: "Cancellation 48+ hours before appointment" },
            { emoji: "⚡", label: "50% Refund", desc: "Cancellation 24–48 hours before appointment" },
            { emoji: "❌", label: "No Refund", desc: "Less than 24 hours or no-show" },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-cream-2 shadow-sm p-6 text-center">
              <div className="text-3xl mb-3">{card.emoji}</div>
              <div className="font-serif font-bold text-navy mb-1">{card.label}</div>
              <div className="text-navy/50 text-xs">{card.desc}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-8">

          {/* Section 1 */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">01</span>
              <h2 className="font-serif text-xl font-bold text-navy">Consultation Fees</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed space-y-5">
              <div>
                <h3 className="font-semibold text-navy mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold text-xs flex items-center justify-center font-bold">A</span>
                  Cancellation by Client
                </h3>
                <div className="space-y-2">
                  {[
                    ["More than 48 hours before", "Full refund (minus payment gateway charges up to 3%).", "bg-green-50 border-green-100"],
                    ["24 to 48 hours before", "50% refund of consultation fee.", "bg-amber-50 border-amber-100"],
                    ["Less than 24 hours before", "No refund. You may reschedule once without additional charge.", "bg-red-50 border-red-100"],
                    ["No-show (missed without notice)", "No refund. Consultation fee is forfeited.", "bg-red-50 border-red-100"],
                  ].map(([timing, policy, bg]) => (
                    <div key={timing} className={`rounded-xl border p-4 ${bg}`}>
                      <div className="font-semibold text-navy text-xs mb-1">{timing}</div>
                      <div className="text-navy/60 text-xs">{policy}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-navy mb-2 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold/10 text-gold text-xs flex items-center justify-center font-bold">B</span>
                  Cancellation by Us
                </h3>
                <p>In the rare event that we need to cancel a scheduled consultation, you will be offered a full refund or the option to reschedule at no additional cost.</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">02</span>
              <h2 className="font-serif text-xl font-bold text-navy">Legal Service Fees (Retainer / Engagement)</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
              <p className="mb-3">Once an engagement letter is signed and the retainer fee is paid, the following refund terms apply:</p>
              <ul className="space-y-2">
                {[
                  ["Within 48 hours of signing (no work commenced)", "Full refund minus administrative charges of ₹500."],
                  ["After work has commenced", "Fees are non-refundable for work already completed. A proportional refund may be issued for unearned fees at our discretion."],
                  ["Government fees and filing charges", "Strictly non-refundable once submitted to the relevant authority."],
                  ["Visa refusals", "Our professional fees are not refundable in case of visa refusal, as the fees represent services rendered regardless of outcome."],
                ].map(([title, desc]) => (
                  <li key={title} className="flex gap-3 items-start list-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span><strong className="text-navy">{title}:</strong> {desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">03</span>
              <h2 className="font-serif text-xl font-bold text-navy">Document Preparation Services</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
              <ul className="space-y-2">
                {[
                  "Fees for completed document preparation work are non-refundable.",
                  "If a document has not yet been started, a full refund may be issued upon written request.",
                  "Partial refunds may be considered for documents partially completed, subject to our assessment.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start list-none">
                    <svg className="w-4 h-4 text-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">04</span>
              <h2 className="font-serif text-xl font-bold text-navy">Rescheduling Policy</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
              <ul className="space-y-2">
                {[
                  "Consultations may be rescheduled free of charge if done at least 24 hours before the scheduled time.",
                  "Each booking allows a maximum of 2 free rescheduling requests. Additional rescheduling may incur an administrative fee of ₹200.",
                  "Rescheduled appointments are subject to availability.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 items-start list-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 5 - How to Request */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">05</span>
              <h2 className="font-serif text-xl font-bold text-navy">How to Request a Refund</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
              <p className="mb-4">To request a refund, please follow these steps:</p>
              <div className="space-y-3">
                {[
                  [`Email us at Advocatericha29@gmail.com with subject: "Refund Request – [Your Name] – [Booking Date]"`, "1"],
                  ["Include your booking ID / payment reference number.", "2"],
                  ["State the reason for your refund request.", "3"],
                ].map(([text, num]) => (
                  <div key={num} className="flex gap-4 items-start bg-cream rounded-xl p-4">
                    <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">{num}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-navy/50">We will respond within <strong className="text-navy">3 business days</strong>. Approved refunds processed within <strong className="text-navy">7–10 business days</strong>.</p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-white rounded-2xl border border-cream-2 shadow-sm overflow-hidden">
            <div className="flex items-center gap-4 px-8 py-5 border-b border-cream-2">
              <span className="font-serif text-2xl font-bold text-gold/30">06</span>
              <h2 className="font-serif text-xl font-bold text-navy">Payment Gateway Charges</h2>
            </div>
            <div className="px-8 py-6 text-navy/70 text-sm leading-relaxed">
              <p>All payments are processed through Razorpay. Payment gateway processing charges (typically 2–3%) are non-refundable in all cases, as these are charged by the payment processor and not retained by us.</p>
            </div>
          </div>

        </div>

        {/* Contact Card */}
        <div className="mt-12 bg-gradient-to-br from-navy via-navy to-[#0a1730] rounded-2xl p-8 text-white">
          <h3 className="font-serif text-2xl font-bold mb-2">Contact Us</h3>
          <p className="text-white/50 text-sm mb-6">Need to request a refund or have questions?</p>
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

          </div>
          <div className="mt-4 text-xs text-white/30 text-center">Bar Council Reg. PH/1260/2025</div>
        </div>

        {/* Other policies */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          {[["Privacy Policy", "privacy"], ["Terms & Conditions", "terms"]].map(([label, view]) => (
            <button key={view} onClick={() => setActiveView(view)} className="text-sm text-navy/50 hover:text-gold transition underline underline-offset-4">
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
