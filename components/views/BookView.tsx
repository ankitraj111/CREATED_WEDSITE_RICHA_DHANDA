"use client";

import { useState, FormEvent } from "react";
import { db } from "@/lib/firebase";
import { sendEmailNotification } from "@/lib/email";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function BookView() {
  const [consultMode, setConsultMode] = useState<"online" | "office">("online");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    date: "",
    time: "",
    service: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WHATSAPP_NUMBER = "919254067300";

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

    const requiredFields = ["name", "phone", "email", "type", "date", "time", "service"];
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        newErrors[field] = true;
        isValid = false;
      }
    });

    setErrors(newErrors);

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      if (db) {
        await addDoc(collection(db, "consultations"), {
          ...formData,
          createdAt: serverTimestamp(),
          mode: consultMode,
        });
      }
    } catch (firebaseError) {
      console.warn("Firebase save failed (check Firestore rules):", firebaseError);
    }
      
    try {
      await sendEmailNotification(formData);
    } catch (emailError) {
      console.warn("Email send failed:", emailError);
    }
    
    try {
      window.open('https://wa.me/919254067300?text=' + encodeURIComponent('Hi, I want to book a consultation. Details: Name: ' + formData.name + ', Service: ' + formData.service), '_blank');

      setFormData({
        name: "",
        phone: "",
        email: "",
        type: "",
        date: "",
        time: "",
        service: "",
        notes: "",
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 6000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const waMsg = encodeURIComponent(
    `Hi, I want to book ${
      consultMode === "office" ? "an office consultation" : "an online consultation"
    } regarding ${formData.service || "my legal matter"}. Please share available slots.`
  );

  return (
    <>
      <div className="bg-navy grain py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="chip text-gold-soft">Book a Consultation</div>
          <h1 className="font-serif text-4xl lg:text-5xl font-semibold text-white mt-3 max-w-3xl">
            Let&apos;s find a time that works for you
          </h1>
          <div className="gold-line w-24 mt-6" />
          <p className="text-white/70 mt-5 max-w-2xl">
            Choose between an online video consultation or an in-office meeting.
            Both are confidential and led personally by me.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-8 py-16 lg:py-20">
        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-cream-2 border border-[#ece6d6] rounded-full p-1.5">
            <button
              onClick={() => setConsultMode("online")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition ${
                consultMode === "online"
                  ? "bg-navy text-white border-navy"
                  : "bg-transparent text-navy border-transparent"
              }`}
            >
              Online Consultation
            </button>
            <button
              onClick={() => setConsultMode("office")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition ${
                consultMode === "office"
                  ? "bg-navy text-white border-navy"
                  : "bg-transparent text-navy border-transparent"
              }`}
            >
              Office Consultation
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="card p-7 lg:p-8" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Full Name
                  </label>
                  <input
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.name
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
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
                      errors.phone
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
                    }`}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 ..."
                  />
                  {errors.phone && (
                    <div className="text-maroon text-xs mt-1">
                      Please enter a valid phone.
                    </div>
                  )}
                </div>

                <div>
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Email
                  </label>
                  <input
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.email
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
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
                    Consultation Type
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.type
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
                    }`}
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Select…</option>
                    <option>Initial assessment (30 min)</option>
                    <option>Detailed consultation (60 min)</option>
                    <option>Case review with documents</option>
                    <option>Follow-up consultation</option>
                  </select>
                  {errors.type && (
                    <div className="text-maroon text-xs mt-1">
                      Please select a type.
                    </div>
                  )}
                </div>

                <div>
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Preferred Date
                  </label>
                  <input
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.date
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
                    }`}
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {errors.date && (
                    <div className="text-maroon text-xs mt-1">
                      Please pick a date.
                    </div>
                  )}
                </div>

                <div>
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Preferred Time
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.time
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
                    }`}
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="">Select…</option>
                    <option>10:00 AM</option>
                    <option>11:30 AM</option>
                    <option>2:00 PM</option>
                    <option>3:30 PM</option>
                    <option>5:00 PM</option>
                  </select>
                  {errors.time && (
                    <div className="text-maroon text-xs mt-1">
                      Please pick a time.
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Legal Service Required
                  </label>
                  <select
                    className={`w-full px-4 py-3 border rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 ${
                      errors.service
                        ? "border-maroon"
                        : "border-[#d9d2bf] focus:border-gold"
                    }`}
                    name="service"
                    value={formData.service}
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
                  {errors.service && (
                    <div className="text-maroon text-xs mt-1">
                      Please select a service type.
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="label block text-xs font-semibold tracking-wider uppercase text-muted mb-2">
                    Briefly describe your situation
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-[#d9d2bf] rounded-lg bg-white text-sm transition focus:outline-none focus:ring-3 focus:ring-gold/20 focus:border-gold"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="A few sentences are enough…"
                  />
                </div>
              </div>

              {/* Mode-specific info */}
              {consultMode === "online" && (
                <div className="mt-4 p-4 rounded-xl bg-cream-2 border border-[#ece6d6]">
                  <div className="font-semibold text-navy text-sm flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="3" width="20" height="14" rx="2" />
                      <path d="M8 21h8M12 17v4" />
                    </svg>
                    Online consultation details
                  </div>
                  <p className="text-xs text-muted mt-2">
                    A secure video link (Google Meet) will be sent to your email 30
                    minutes before the appointment. Please ensure a quiet space and
                    stable internet.
                  </p>
                </div>
              )}

              {consultMode === "office" && (
                <div className="mt-4 p-4 rounded-xl bg-cream-2 border border-[#ece6d6]">
                  <div className="font-semibold text-navy text-sm flex items-center gap-2">
                    <svg
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
                    Office visit details
                  </div>
                  <p className="text-xs text-muted mt-2">
                    (Kurukshetra, Haryana). Please bring original
                    documents & one photocopy set. Valid photo ID required.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-maroon w-full mt-5 py-3.5 rounded-full font-semibold disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Request Appointment"}
              </button>

              {success && (
                <div className="mt-4 p-4 rounded-lg bg-cream-2 border border-gold/40 text-navy text-sm">
                  ✓ Appointment request received. I&apos;ll confirm your slot by phone
                  or email within one business day.
                </div>
              )}
            </form>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="card p-6">
              <h3 className="font-serif text-xl font-semibold text-navy">
                What to expect
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-[#3a4252]">
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> A personal review of your
                  situation — no juniors, no scripts.
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> An honest assessment of your
                  options, costs & timelines.
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> A clear next-step plan in
                  writing, if you&apos;d like to proceed.
                </li>
                <li className="flex gap-3">
                  <span className="text-gold">◆</span> Zero pressure — the decision
                  to engage is always yours.
                </li>
              </ul>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-6 flex items-center gap-4 hover:border-[#25D366] transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1.2 4.8L2 22l5.4-1.2c1.4.8 3 1.2 4.6 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.4 0-2.8-.4-4-1.1l-.3-.2-3.2.7.7-3.1-.2-.3C5.3 14.8 5 13.4 5 12c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-navy">Prefer WhatsApp?</div>
                <div className="text-sm text-muted">
                  Send a pre-filled message and I&apos;ll reply directly.
                </div>
              </div>
            </a>

            <div className="card p-6">
              <h3 className="font-semibold text-navy mb-3">Office hours</h3>
              <div className="text-sm space-y-2 text-[#3a4252]">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="font-medium">10:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10:00 AM – 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-maroon">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
