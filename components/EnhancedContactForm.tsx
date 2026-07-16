"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { sendEmailNotification } from "@/lib/email";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function EnhancedContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);

    // 1. Try saving to Firebase (Don't let it crash the whole function if rules are strict)
    try {
      if (db) {
        await addDoc(collection(db, "quick_contacts"), {
          ...formState,
          createdAt: serverTimestamp(),
        });
      }
    } catch (firebaseError) {
      console.warn("Firebase save failed (check Firestore rules):", firebaseError);
    }

    // 2. Try sending Email
    try {
      await sendEmailNotification(formState);
    } catch (emailError) {
      console.warn("Email send failed:", emailError);
    }

    // 3. Always Redirect to WhatsApp
    try {
      const whatsappText = 'Hi, I need assistance. My name is ' + formState.name + '. ' + (formState.service ? 'Service: ' + formState.service : '');
      window.open('https://wa.me/919254067300?text=' + encodeURIComponent(whatsappText), '_blank');
      
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="contact">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Info */}
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4">
              Get in Touch
            </Badge>
            <h2 className="font-serif text-3xl lg:text-4xl font-semibold text-navy">
              Schedule Your Consultation
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              Take the first step toward resolving your legal matter. I&apos;m here to
              listen, advise, and represent your interests with dedication and
              expertise.
            </p>

            {/* Contact Details */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4 group cursor-default">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy/10 transition-colors duration-250">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">Phone</div>
                  <a
                    href="tel:+919254067300"
                    className="text-muted hover:text-gold transition-colors duration-250 focus:outline-none focus:underline"
                  >
                    +91 92540 67300
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy/10 transition-colors duration-250">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">Email</div>
                  <a
                    href="mailto:Advocaterichadhanda@gmail.com"
                    className="text-muted hover:text-gold transition-colors duration-250 focus:outline-none focus:underline break-all"
                  >
                    Advocaterichadhanda@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-default">
                <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-navy/10 transition-colors duration-250">
                  <svg
                    className="w-5 h-5 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">Office</div>
                  <p className="text-muted">
                    VUNE2732, Compass Building,<br />AL Hutaita Industrial Zone-FZ,<br />Ras Al Khaimah, UAE
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Info */}
            <div className="bg-[#0a192f]/5 rounded-2xl p-8 border border-[#0a192f]/10 mt-8">
              <h4 className="text-[#0a192f] font-serif font-bold text-xl mb-4">Consultation Details</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[#0a192f]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Comprehensive Visa Profile Assessment</span>
                </li>
                <li className="flex items-center gap-3 text-[#0a192f]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Strategy for Complex Refusals</span>
                </li>
                <li className="flex items-center gap-3 text-[#0a192f]/70">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Secure & Confidential Process</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-cream rounded-3xl p-8 lg:p-10 border border-cream-2 shadow-lg animate-slide-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="name" className="text-navy font-medium">
                  Full Name <span className="text-maroon">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 transition-all duration-250 ${
                    focusedField === "name" ? "ring-2 ring-gold" : ""
                  }`}
                  placeholder="Your full name"
                  aria-required="true"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-navy font-medium">
                  Email Address <span className="text-maroon">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 transition-all duration-250 ${
                    focusedField === "email" ? "ring-2 ring-gold" : ""
                  }`}
                  placeholder="your.email@example.com"
                  aria-required="true"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="text-navy font-medium">
                  Phone Number <span className="text-maroon">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 transition-all duration-250 ${
                    focusedField === "phone" ? "ring-2 ring-gold" : ""
                  }`}
                  placeholder="+91 XXXXX XXXXX"
                  aria-required="true"
                />
              </div>

              {/* Service */}
              <div>
                <Label htmlFor="service" className="text-navy font-medium">
                  Legal Service Required <span className="text-maroon">*</span>
                </Label>
                <select
                  id="service"
                  name="service"
                  required
                  value={formState.service}
                  onChange={(e) =>
                    setFormState({ ...formState, service: e.target.value })
                  }
                  onFocus={() => setFocusedField("service")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 w-full px-5 py-4 rounded-xl border ${
                    focusedField === "service"
                      ? "border-[#0a192f] ring-1 ring-[#0a192f]/20"
                      : "border-[#0a192f]/10"
                  } bg-[#f8f9fa] text-[#0a192f] focus:outline-none transition-all duration-300 appearance-none`}
                  aria-required="true"
                >
                  <option value="" disabled>Select Visa/Immigration Service</option>
                  <option value="Work Visa">Work & Business Visas</option>
                  <option value="Student Visa">Student Visas & Permits</option>
                  <option value="PR">Permanent Residency (PR)</option>
                  <option value="Family">Family Sponsorship</option>
                  <option value="Appeals">Visa Refusals & Appeals</option>
                  <option value="Other">Other Immigration Matter</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-navy font-medium">
                  Tell me about your case <span className="text-maroon">*</span>
                </Label>
                <Textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`mt-2 min-h-32 transition-all duration-250 ${
                    focusedField === "message" ? "ring-2 ring-gold" : ""
                  }`}
                  placeholder="Please provide details about your legal situation..."
                  aria-required="true"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-3.5 rounded-full transition-all duration-250 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              {submitSuccess && (
                <div className="text-green-600 text-center font-medium mt-4 bg-green-50 py-2 rounded-lg border border-green-200">
                  Message sent successfully!
                </div>
              )}

              <p className="text-xs text-muted text-center mt-4">
                All consultations are confidential and subject to attorney-client
                privilege.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
