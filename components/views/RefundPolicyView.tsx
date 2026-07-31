"use client";

interface RefundPolicyViewProps {
  setActiveView: (view: string) => void;
}

export default function RefundPolicyView({ setActiveView }: RefundPolicyViewProps) {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-5 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => setActiveView("home")}
          className="flex items-center gap-2 text-navy/60 hover:text-gold transition mb-8 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-cream-2 p-8 lg:p-12">
          <div className="mb-8">
            <span className="inline-block px-4 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-bold tracking-widest uppercase mb-4">
              Legal Document
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-3">
              Refund Policy
            </h1>
            <p className="text-navy/50 text-sm">Last updated: July 2025</p>
          </div>

          <div className="prose prose-navy max-w-none space-y-8 text-navy/80 text-sm leading-relaxed">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <p className="text-amber-800 font-medium">
                ⚠️ Please read this policy carefully before booking a consultation or engaging our services. By making a payment, you acknowledge and agree to the terms outlined below.
              </p>
            </div>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">1. Consultation Fees</h2>
              <h3 className="font-semibold text-navy mb-2">1.1 Cancellation by Client</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>More than 48 hours before appointment:</strong> Full refund of consultation fee (minus payment gateway processing charges of up to 3%).</li>
                <li><strong>24 to 48 hours before appointment:</strong> 50% refund of consultation fee.</li>
                <li><strong>Less than 24 hours before appointment:</strong> No refund. However, you may reschedule once without additional charge.</li>
                <li><strong>No-show (missed without notice):</strong> No refund. Consultation fee is forfeited.</li>
              </ul>

              <h3 className="font-semibold text-navy mb-2 mt-5">1.2 Cancellation by Us</h3>
              <p>
                In the rare event that we need to cancel a scheduled consultation due to an emergency or unforeseen circumstances, you will be offered a full refund or the option to reschedule at no additional cost.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">2. Legal Service Fees (Retainer / Engagement)</h2>
              <p>
                Once an engagement letter is signed and the retainer fee is paid, the following refund terms apply:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Within 48 hours of signing (no work commenced):</strong> Full refund minus administrative charges of ₹500.</li>
                <li><strong>After work has commenced:</strong> Fees are non-refundable for work already completed. A proportional refund may be issued for unearned fees at our discretion.</li>
                <li><strong>Government fees and filing charges:</strong> These are strictly non-refundable once submitted to the relevant authority, as they are paid to third parties.</li>
                <li><strong>Visa refusals:</strong> Our professional fees are not refundable in case of visa refusal by immigration authorities, as the fees represent services rendered regardless of outcome.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">3. Document Preparation Services</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Fees for completed document preparation work are non-refundable.</li>
                <li>If a document has not yet been started, a full refund may be issued upon written request.</li>
                <li>Partial refunds may be considered for documents partially completed, subject to our assessment.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">4. Rescheduling Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consultations may be rescheduled free of charge if done at least 24 hours before the scheduled time.</li>
                <li>Each booking allows a maximum of <strong>2 free rescheduling</strong> requests. Additional rescheduling may incur an administrative fee of ₹200.</li>
                <li>Rescheduled appointments are subject to availability.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">5. How to Request a Refund</h2>
              <p>To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-5 space-y-2 mt-3">
                <li>Email us at <a href="mailto:Advocaterichadhanda@gmail.com" className="text-gold hover:text-gold-dark">Advocaterichadhanda@gmail.com</a> with the subject line: <strong>"Refund Request – [Your Name] – [Booking Date]"</strong></li>
                <li>Include your booking ID / payment reference number.</li>
                <li>State the reason for your refund request.</li>
              </ol>
              <p className="mt-3">
                We will review your request and respond within <strong>3 business days</strong>. Approved refunds will be processed within <strong>7–10 business days</strong> to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">6. Disputes</h2>
              <p>
                If you have concerns regarding a charge or refund, please contact us first to resolve the matter amicably. We are committed to fair resolution. Disputes that cannot be resolved directly will be subject to arbitration under applicable Indian law.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">7. Payment Gateway Charges</h2>
              <p>
                All payments are processed through Razorpay. Payment gateway processing charges (typically 2–3%) are non-refundable in all cases, as these are charged by the payment processor and not retained by us.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">8. Contact Us</h2>
              <div className="bg-cream rounded-xl p-5 space-y-2">
                <p><strong>Advocate Richa Dhanda</strong></p>
                <p>📧 <a href="mailto:Advocaterichadhanda@gmail.com" className="text-gold hover:text-gold-dark">Advocaterichadhanda@gmail.com</a></p>
                <p>📞 <a href="tel:+919254067300" className="text-gold hover:text-gold-dark">+91 92540 67300</a></p>
                <p>Bar Council Reg. PH/1260/2025</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
