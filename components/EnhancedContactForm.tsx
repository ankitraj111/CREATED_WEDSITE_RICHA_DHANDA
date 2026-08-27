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

    // 1. Direct Firebase Save
    try {
      if (db) {
        await addDoc(collection(db, "contacts"), {
          ...formState,
          createdAt: serverTimestamp(),
        });
      }
    } catch (fbErr) {
      console.warn("Client Firebase save failed:", fbErr);
    }

    // 2. Send Email Notification via API
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        console.error("API contact response error:", await res.text());
      }
    } catch (error) {
      console.error("Form email notification error:", error);
    } finally {
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      setSubmitSuccess(true);
      setIsSubmitting(false);
      setTimeout(() => setSubmitSuccess(false), 6000);
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-navy">Email</div>
                  <a
                    href="mailto:Advocatericha29@gmail.com"
                    className="text-muted hover:text-gold transition-colors duration-250 focus:outline-none focus:underline break-all"
                  >
                    Advocatericha29@gmail.com
                  </a>
                </div>
              </div>
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
