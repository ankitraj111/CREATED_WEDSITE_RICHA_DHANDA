"use client";

interface PrivacyPolicyViewProps {
  setActiveView: (view: string) => void;
}

export default function PrivacyPolicyView({ setActiveView }: PrivacyPolicyViewProps) {
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
              Privacy Policy
            </h1>
            <p className="text-navy/50 text-sm">Last updated: July 2025</p>
          </div>

          <div className="prose prose-navy max-w-none space-y-8 text-navy/80 text-sm leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">1. Introduction</h2>
              <p>
                Advocate Richa Dhanda ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website or use our legal services.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and address provided through contact or booking forms.</li>
                <li><strong>Case-Related Information:</strong> Immigration history, passport details, visa application information, and other documents you share with us for legal consultations.</li>
                <li><strong>Payment Information:</strong> Transaction details processed through our secure payment gateway (Razorpay). We do not store card details on our servers.</li>
                <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our website for analytics purposes.</li>
                <li><strong>Communication Records:</strong> Emails, WhatsApp messages, and other communications with our office.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Provide, operate, and improve our legal consultation services.</li>
                <li>Process bookings and payments for consultations.</li>
                <li>Communicate with you regarding your case, appointments, or inquiries.</li>
                <li>Send important legal updates or service notifications.</li>
                <li>Comply with legal obligations and Bar Council regulations.</li>
                <li>Improve website functionality and user experience.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li><strong>Service Providers:</strong> Trusted third parties (e.g., payment processors, email service providers) who assist in operating our practice under strict confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> If required by law, court order, or government authority.</li>
                <li><strong>With Your Consent:</strong> In any other case, only with your explicit written consent.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">5. Attorney-Client Privilege</h2>
              <p>
                All information shared in the context of a legal consultation or engagement is protected by attorney-client privilege and professional secrecy obligations under the Advocates Act, 1961 and Bar Council of India Rules. We maintain the highest standards of confidentiality for all client communications and case files.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">6. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your browser. You may choose to disable cookies through your browser settings, though this may affect website functionality. We use cookies for:
              </p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Session management and user preferences.</li>
                <li>Website analytics (via Google Analytics or similar).</li>
                <li>Security and fraud prevention.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">7. Data Retention</h2>
              <p>
                We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Client files are typically retained for a minimum of 7 years after the conclusion of the engagement, as per legal and regulatory requirements.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">8. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-3">
                <li>Access, correct, or delete your personal data.</li>
                <li>Withdraw consent for processing (where applicable).</li>
                <li>Request a copy of data we hold about you.</li>
                <li>Lodge a complaint with the relevant data protection authority.</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:Advocaterichadhanda@gmail.com" className="text-gold hover:text-gold-dark">Advocaterichadhanda@gmail.com</a>.</p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">9. Security</h2>
              <p>
                We implement industry-standard security measures including SSL/TLS encryption, secure servers, and access controls to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-navy mb-3">11. Contact Us</h2>
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
