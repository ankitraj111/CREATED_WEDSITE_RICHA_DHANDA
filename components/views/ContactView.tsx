"use client";

import { useState, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { sendEmailNotification } from "@/lib/email";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (id: string, value: string): boolean => {
    if (id === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (id === "phone") {
      return /^[+]?[\d\s\-()]{7,}$/.test(value);
    }
    return value.trim().length > 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!validateField(key, value)) {
        newErrors[key] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    // 1. Firebase Save
    try {
      if (db) {
        await addDoc(collection(db, "contacts"), {
          ...formData,
          createdAt: serverTimestamp(),
        });
      }
    } catch (firebaseError) {
      console.warn("Firebase save failed:", firebaseError);
    }

    // 2. Email Sending
    try {
      await sendEmailNotification(formData);
    } catch (emailError) {
      console.warn("Email send failed:", emailError);
    }

    // 3. Success state and WhatsApp redirect
    try {
      setSuccess(true);
      
      const whatsappText = 'Hi, I have an inquiry. ' + (formData.service ? 'Service: ' + formData.service : '');
      window.open('https://wa.me/918800329904?text=' + encodeURIComponent(whatsappText), '_blank');

      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fdfbf7] min-h-screen font-sans pb-24">
      {/* Hero Section */}
      <div className="bg-[#111827] pt-28 pb-32 relative overflow-hidden">
        {/* Subtle abstract pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px"
        }}></div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10 text-center">
          <h4 className="text-[#a67c00] font-semibold tracking-[0.15em] uppercase text-sm mb-4">
            Contact Our Firm
          </h4>
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Start Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#E8C547] to-[#d4af37]">Global Journey</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Expert immigration counsel is just a message away. Reach out to discuss your visa, residency, or citizenship goals with Advocate Richa Dhanda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-5 gap-0 bg-white shadow-2xl border border-[#e5e7eb]">
          
          {/* Left Column - Contact Info (2 columns) */}
          <div className="lg:col-span-2 bg-[#fdfbf7] p-10 lg:p-14 border-r border-[#e5e7eb]">
            <h2 className="font-serif text-3xl font-bold text-[#111827] mb-8">
              Get in Touch
            </h2>
            
            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-[#a67c00] border border-[#e5e7eb] shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wider text-[#9ca3af] uppercase mb-1">Direct Line</div>
                  <a href="tel:+918800329904" className="font-serif text-xl text-[#111827] hover:text-[#a67c00] transition-colors">
                    +91 88003 29904
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-[#a67c00] border border-[#e5e7eb] shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wider text-[#9ca3af] uppercase mb-1">Email Inquiry</div>
                  <a href="mailto:Advocaterichadhanda@gmail.com" className="font-serif text-lg text-[#111827] hover:text-[#a67c00] transition-colors break-all">
                    Advocaterichadhanda@gmail.com
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-[#a67c00] border border-[#e5e7eb] shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wider text-[#9ca3af] uppercase mb-1">Main Office</div>
                  <address className="font-serif text-[#111827] not-italic leading-relaxed">
                    (Kurukshetra, Haryana)
                  </address>
                </div>
              </div>
            </div>

            <div className="mt-14 pt-10 border-t border-[#e5e7eb]">
              <h3 className="font-serif text-xl font-bold text-[#111827] mb-6">
                Hours of Operation
              </h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-[#e5e7eb]">
                  <tr>
                    <td className="py-3 text-[#4b5563]">Mon – Fri</td>
                    <td className="py-3 text-right font-medium text-[#111827]">9:00 AM – 6:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[#4b5563]">Saturday</td>
                    <td className="py-3 text-right font-medium text-[#111827]">10:00 AM – 2:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-[#4b5563]">Sunday</td>
                    <td className="py-3 text-right font-medium text-[#a67c00]">Closed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column - Contact Form (3 columns) */}
          <div className="lg:col-span-3 p-10 lg:p-14">
            <h2 className="font-serif text-3xl font-bold text-[#111827] mb-2">
              Send a Message
            </h2>
            <p className="text-[#6b7280] mb-10">
              All communications are strictly confidential and protected by attorney-client privilege. We aim to respond to all inquiries within one business day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#111827] mb-2">
                    Full Name <span className="text-[#a67c00]">*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-[#f9fafb] border focus:bg-white transition-colors duration-200 focus:outline-none ${
                      errors.name ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-[#e5e7eb] focus:border-[#a67c00] focus:ring-1 focus:ring-[#a67c00]"
                    }`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                  {errors.name && <div className="text-red-500 text-xs mt-2">Required field</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#111827] mb-2">
                    Phone Number <span className="text-[#a67c00]">*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-[#f9fafb] border focus:bg-white transition-colors duration-200 focus:outline-none ${
                      errors.phone ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-[#e5e7eb] focus:border-[#a67c00] focus:ring-1 focus:ring-[#a67c00]"
                    }`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91"
                  />
                  {errors.phone && <div className="text-red-500 text-xs mt-2">Valid phone required</div>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#111827] mb-2">
                    Email Address <span className="text-[#a67c00]">*</span>
                  </label>
                  <input
                    className={`w-full px-4 py-3 bg-[#f9fafb] border focus:bg-white transition-colors duration-200 focus:outline-none ${
                      errors.email ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-[#e5e7eb] focus:border-[#a67c00] focus:ring-1 focus:ring-[#a67c00]"
                    }`}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                  />
                  {errors.email && <div className="text-red-500 text-xs mt-2">Valid email required</div>}
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase text-[#111827] mb-2">
                    Inquiry Type <span className="text-[#a67c00]">*</span>
                  </label>
                  <select
                    className={`w-full px-4 py-3 bg-[#f9fafb] border focus:bg-white transition-colors duration-200 focus:outline-none appearance-none ${
                      errors.service ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-[#e5e7eb] focus:border-[#a67c00] focus:ring-1 focus:ring-[#a67c00]"
                    }`}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select Visa/Immigration Service</option>
                    <option value="Work Visa">Work & Business Visas</option>
                    <option value="Student Visa">Student Visas & Permits</option>
                    <option value="PR">Permanent Residency (PR)</option>
                    <option value="Family">Family Sponsorship</option>
                    <option value="Appeals">Visa Refusals & Appeals</option>
                    <option value="Other">Other Immigration Matter</option>
                  </select>
                  {errors.service && <div className="text-red-500 text-xs mt-2">Selection required</div>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest uppercase text-[#111827] mb-2">
                  Case Details <span className="text-[#a67c00]">*</span>
                </label>
                <textarea
                  className={`w-full px-4 py-3 bg-[#f9fafb] border focus:bg-white transition-colors duration-200 focus:outline-none resize-y min-h-[120px] ${
                    errors.message ? "border-red-500 focus:border-red-500 ring-1 ring-red-500" : "border-[#e5e7eb] focus:border-[#a67c00] focus:ring-1 focus:ring-[#a67c00]"
                  }`}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide a brief description of your legal situation..."
                />
                {errors.message && <div className="text-red-500 text-xs mt-2">Message cannot be empty</div>}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-10 py-4 text-white font-bold text-sm tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#111827] hover:bg-[#a67c00]"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  {!isSubmitting && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </div>

              {success && (
                <div className="mt-6 p-4 bg-[#fdfbf7] border-l-4 border-[#a67c00] flex gap-3">
                  <svg className="w-5 h-5 text-[#a67c00] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-sm text-[#111827] font-medium">
                    Your inquiry has been successfully submitted. Our office will contact you shortly to arrange a consultation.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Maps section */}
        <div className="mt-12 border border-[#e5e7eb] bg-white p-2 shadow-sm mb-12">
          <iframe
            title="Office location"
            src="https://www.google.com/maps?q=Sector+4+Kurukshetra&output=embed"
            width="100%"
            height="400"
            loading="lazy"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
