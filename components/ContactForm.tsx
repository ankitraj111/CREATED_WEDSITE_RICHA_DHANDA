"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    visa: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);

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

    // TODO: Replace with actual form submission logic
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

    setSuccess(true);
    setFormData({
      name: "",
      phone: "",
      email: "",
      visa: "",
      message: "",
    });

    setTimeout(() => setSuccess(false), 6000);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-start">
      <div>
        <div className="chip text-maroon">Get In Touch</div>
        <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-navy mt-3">
          Tell me about your case
        </h2>
        <div className="gold-line w-24 mt-5" />
        <p className="text-muted mt-5 max-w-md">
          Share a few details and I&apos;ll personally review your situation and
          respond within one business day. Everything you share is strictly
          confidential.
        </p>

        <div className="mt-8 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-cream-2 border border-[#ece6d6] flex items-center justify-center text-maroon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wider">
                Call
              </div>
              <a
                href="tel:+919254067300"
                className="font-semibold text-navy hover:text-maroon"
              >
                +91 92540 67300
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-cream-2 border border-[#ece6d6] flex items-center justify-center text-maroon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-10 5L2 7" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wider">
                Email
              </div>
              <a
                href="mailto:Advocaterichadhanda@gmail.com"
                className="font-semibold text-navy hover:text-maroon"
              >
                Advocaterichadhanda@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-cream-2 border border-[#ece6d6] flex items-center justify-center text-maroon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-muted uppercase tracking-wider">
                Office
              </div>
              <div className="font-semibold text-navy">
                VUNE2732, Compass Building,<br />Ras Al Khaimah, UAE
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-7 lg:p-8" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
              Full Name
            </label>
            <input
              className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                errors.name ? "border-maroon" : "border-[#d9d2bf] focus:border-gold"
              }`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && (
              <div className="text-maroon text-xs mt-1">
                Please enter your name.
              </div>
            )}
          </div>

          <div>
            <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
              Phone
            </label>
            <input
              className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                errors.phone ? "border-maroon" : "border-[#d9d2bf] focus:border-gold"
              }`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 ..."
            />
            {errors.phone && (
              <div className="text-maroon text-xs mt-1">
                Please enter a valid phone number.
              </div>
            )}
          </div>

          <div>
            <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
              Email
            </label>
            <input
              className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                errors.email ? "border-maroon" : "border-[#d9d2bf] focus:border-gold"
              }`}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@email.com"
            />
            {errors.email && (
              <div className="text-maroon text-xs mt-1">
                Please enter a valid email.
              </div>
            )}
          </div>

          <div>
            <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
              Legal Service Required
            </label>
            <select
              className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                errors.visa ? "border-maroon" : "border-[#d9d2bf] focus:border-gold"
              }`}
              name="visa"
              value={formData.visa}
              onChange={handleChange}
            >
              <option value="">Select…</option>
              <option>Legal Consultation</option>
              <option>Civil Law</option>
              <option>Criminal Law</option>
              <option>Family Law</option>
              <option>Property Disputes</option>
              <option>Consumer Matters</option>
              <option>Documentation & Agreements</option>
              <option>Immigration Consultation</option>
              <option>Appeals & Legal Notices</option>
              <option>Other</option>
            </select>
            {errors.visa && (
              <div className="text-maroon text-xs mt-1">
                Please select a service type.
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
              How can I help?
            </label>
            <textarea
              className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                errors.message ? "border-maroon" : "border-[#d9d2bf] focus:border-gold"
              }`}
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Briefly describe your situation…"
            />
            {errors.message && (
              <div className="text-maroon text-xs mt-1">
                Please add a short message.
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="btn-maroon w-full mt-5 py-3.5 rounded-full font-semibold"
        >
          Send Message
        </button>

        <p className="text-xs text-muted mt-3 text-center">
          By submitting, you agree to our{" "}
          <button className="underline">privacy policy</button>.
        </p>

        {success && (
          <div className="mt-4 p-4 rounded-lg bg-cream-2 border border-gold/40 text-navy text-sm">
            ✓ Thank you. Your message has been received — I&apos;ll respond within
            one business day.
          </div>
        )}
      </form>
    </div>
  );
}
