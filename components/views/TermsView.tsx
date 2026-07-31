"use client";

interface TermsViewProps {
  setActiveView: (view: string) => void;
}

export default function TermsView({ setActiveView }: TermsViewProps) {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-navy/50 text-sm">Last updated: July 2025</p>
          </div>

          <div className="prose prose-navy max-w-none space-y-8 text-navy/80 text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing this website or engaging the legal services of Advocate Richa Dhanda, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">2. Nature of Services</h2>
              <p>
                Advocate Richa Dhanda provides professional immigration legal services including, but not limited to, visa applications, permanent residency, citizenship, appeals, and immigration consultations. Our services are governed by the Advocates Act, 1961 and the Bar Council of India Rules.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">3. No Legal Advice Without Engagement</h2>
              <p>
                The information provided on this website is for general informational purposes only and does not constitute legal advice. An attorney-client relationship is established only upon execution of a formal engagement letter and payment of the agreed retainer/fee. Until such time, any communication does not create an attorney-client relationship.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">4. Consultation Bookings</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Consultations must be booked in advance through our website or by contacting our office.</li>
                <li>Booking fees are charged at the time of scheduling and are non-refundable unless cancelled as per our Refund Policy.</li>
                <li>Clients are expected to be available at the scheduled time. Late arrivals of more than 15 minutes may result in the session being forfeited.</li>
                <li>Rescheduling must be done at least 24 hours in advance.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">5. Client Responsibilities</h2>
              <p>You agree to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Provide accurate, complete, and truthful information relevant to your immigration matter.</li>
                <li>Promptly provide all requested documents and respond to communications.</li>
                <li>Understand that providing false information may result in termination of representation and may have legal consequences.</li>
                <li>Pay all agreed fees within the specified timeframes.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">6. No Guarantee of Outcome</h2>
              <p>
                Immigration law and government policies are subject to change. While we provide our best professional advice and representation, we cannot guarantee any specific outcome of visa applications, appeals, or other immigration proceedings. Success depends on various factors beyond our control, including government decisions, policy changes, and the completeness of the client&apos;s information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">7. Fees and Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All fees are discussed and agreed upon before engagement and are outlined in the engagement letter.</li>
                <li>Government fees, filing charges, and third-party costs are separate from our professional fees.</li>
                <li>Payments are processed securely via Razorpay. We accept UPI, credit/debit cards, and net banking.</li>
                <li>Unpaid invoices may result in suspension of services.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">8. Intellectual Property</h2>
              <p>
                All content on this website including text, graphics, logos, and images is the property of Advocate Richa Dhanda and is protected by applicable intellectual property laws. Unauthorized reproduction or use is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Advocate Richa Dhanda shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of this website or our services. Our liability is limited to the fees paid for the specific service in question.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">10. Termination of Engagement</h2>
              <p>
                Either party may terminate the engagement with written notice. Upon termination, we will provide all client documents and a final statement of account. Fees earned for work completed to date are non-refundable.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">11. Governing Law</h2>
              <p>
                These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Punjab, India.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">12. Contact Us</h2>
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
