"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

interface SlotData {
  time: string;
  available: boolean;
}

const SERVICES = [
  {
    value: "Work Visa",
    label: "Work Visa",
    sub: "Employment & Work Permit",
    svgPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    value: "Student Visa",
    label: "Student Visa",
    sub: "University & Higher Education",
    svgPath: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
  },
  {
    value: "PR Application",
    label: "PR / Residency",
    sub: "Permanent Residency & Express Entry",
    svgPath: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    value: "Family Immigration",
    label: "Family Immigration",
    sub: "Spouse & Family Sponsorship",
    svgPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
  {
    value: "Business Visa",
    label: "Business Visa",
    sub: "Investor, Founder & Business Travel",
    svgPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h2m0 0h2m-4 0V9a1 1 0 011-1h2a1 1 0 011 1v12m-4 0h4",
  },
  {
    value: "Citizenship & OCI",
    label: "Citizenship & OCI",
    sub: "Passport, Naturalisation & OCI Cards",
    svgPath: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
  },
  {
    value: "Visa Refusal / Appeal",
    label: "Visa Refusal / Appeal",
    sub: "Rejection Review & Appeal Filings",
    svgPath: "M3 6l9-4 9 4M3 6v14a2 2 0 002 2h14a2 2 0 002-2V6M3 6l9 6 9-6",
  },
  {
    value: "Other",
    label: "Other Matter",
    sub: "General Legal Consultation",
    svgPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 02 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
];

function groupSlots(slots: SlotData[]) {
  const morning: SlotData[] = [];
  const afternoon: SlotData[] = [];
  const evening: SlotData[] = [];
  slots.forEach((slot) => {
    const parts = slot.time.split(" ");
    const period = parts[1];
    const hour = parseInt(parts[0].split(":")[0]);
    const h24 = period === "PM" && hour !== 12 ? hour + 12 : period === "AM" && hour === 12 ? 0 : hour;
    if (h24 < 12) morning.push(slot);
    else if (h24 < 16) afternoon.push(slot);
    else evening.push(slot);
  });
  return { morning, afternoon, evening };
}

export default function BookView() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get("order_id");
    if (orderIdParam) {
      setIsProcessing(true); setStep(4);

      // Restore booking details from sessionStorage (saved before Cashfree redirect)
      let pending: Record<string, string> = {};
      try {
        pending = JSON.parse(sessionStorage.getItem("pendingBooking") || "{}");
        if (pending.date) setSelectedDate(pending.date);
        if (pending.time) setSelectedSlot(pending.time);
        if (pending.name) setFormData({ name: pending.name, phone: pending.phone, email: pending.email, service: pending.service, notes: pending.notes || "" });
      } catch { /* sessionStorage parse failed, proceed without */ }

      fetch("/api/booking/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderIdParam, bookingDetails: Object.keys(pending).length > 0 ? pending : undefined }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            // Use API response details (from Firestore — most reliable source of truth)
            const bd = data.bookingDetails;
            if (bd) {
              if (bd.date) setSelectedDate(bd.date);
              if (bd.time) setSelectedSlot(bd.time);
              setFormData((prev) => ({
                name: bd.name || prev.name,
                phone: bd.phone || prev.phone,
                email: bd.email || prev.email,
                service: bd.service || prev.service,
                notes: bd.notes || prev.notes,
              }));
            }
            // Clear sessionStorage after successful confirmation
            try { sessionStorage.removeItem("pendingBooking"); } catch {}
            setBookingId(data.bookingId || orderIdParam);
            setBookingConfirmed(true);
            setStep(5);
          } else {
            setPaymentError(data.error || "Payment verification failed.");
            setStep(3);
          }
        })
        .catch(() => { setPaymentError("Payment verification failed. Please contact us."); setStep(3); })
        .finally(() => setIsProcessing(false));
    }
  }, []);

  // Parse "YYYY-MM-DD" as LOCAL date (not UTC) to avoid timezone shift
  const parseLocalDate = (d: string) => { const [y, m, day] = d.split("-").map(Number); return new Date(y, m - 1, day); };
  const isSunday = (d: string) => parseLocalDate(d).getDay() === 0;
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i)); // local date, no UTC offset
    return days;
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today); maxDate.setDate(today.getDate() + 30);
    return date > today && date <= maxDate && date.getDay() !== 0;
  };

  useEffect(() => {
    if (!selectedDate) return;
    if (isSunday(selectedDate)) { setSlots([]); return; }
    setLoadingSlots(true); setSelectedSlot("");
    fetch(`/api/booking/available-slots?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data) => { setSlots(data.slots || []); setLoadingSlots(false); })
      .catch(() => {
        const [sy, sm, sd] = selectedDate.split("-").map(Number);
        const day = new Date(sy, sm - 1, sd).getDay();
        const endHour = day === 6 ? 14 : 18;
        const fb: SlotData[] = [];
        for (let h = 10; h < endHour; h++) {
          for (let m = 0; m < 60; m += 30) {
            const dh = h > 12 ? h - 12 : h;
            fb.push({ time: `${dh}:${m.toString().padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`, available: true });
          }
        }
        setSlots(fb); setLoadingSlots(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const validateField = (id: string, value: string) => {
    if (id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (id === "phone") return /^[+]?[\d\s\-()]{7,}$/.test(value);
    return value.trim().length > 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: false }));
  };

  const handleDateSelect = (dateStr: string) => { if (isSunday(dateStr)) return; setSelectedDate(dateStr); setStep(2); };
  const handleSlotSelect = (time: string) => { setSelectedSlot(time); setStep(3); };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!validateField("name", formData.name)) newErrors.name = true;
    if (!validateField("phone", formData.phone)) newErrors.phone = true;
    if (!validateField("email", formData.email)) newErrors.email = true;
    if (!formData.service) newErrors.service = true;
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setIsProcessing(true); setPaymentError(""); setStep(4);
    try {
      const orderRes = await fetch("/api/booking/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, phone: formData.phone, service: formData.service, date: selectedDate, time: selectedSlot, notes: formData.notes }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) throw new Error(orderData.error || "Failed to create payment order");
      const form = document.createElement("form");
      form.method = "POST"; form.action = "https://api.cashfree.com/pg/view/sessions/checkout";
      const input = document.createElement("input");
      input.type = "hidden"; input.name = "payment_session_id"; input.value = orderData.paymentSessionId;
      form.appendChild(input); document.body.appendChild(form);
      // Save booking details to sessionStorage before redirect (survives full page navigation)
      try {
        sessionStorage.setItem("pendingBooking", JSON.stringify({
          date: selectedDate, time: selectedSlot,
          name: formData.name, email: formData.email, phone: formData.phone,
          service: formData.service, notes: formData.notes,
        }));
      } catch { /* sessionStorage not available, DB fallback will handle it */ }
      form.submit();
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Failed to initiate payment.");
      setStep(3); setIsProcessing(false);
    }
  };

  const formatDate = (dateStr: string) =>
    parseLocalDate(dateStr).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const getDayInfo = (dateStr: string) => {
    const day = parseLocalDate(dateStr).getDay();
    if (day === 6) return "Saturday · 10:00 AM – 2:00 PM";
    return "Monday – Friday · 10:00 AM – 6:00 PM";
  };

  const resetAll = () => {
    setStep(1); setSelectedDate(""); setSelectedSlot("");
    setFormData({ name: "", phone: "", email: "", service: "", notes: "" });
    setBookingConfirmed(false); setBookingId(""); setPaymentError("");
  };

  // ── CONFIRMATION ──────────────────────────────────────────────────────────
  if (bookingConfirmed) {
    return (
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-[#7a2d2d] to-[#0a1628]" />
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-1">Booking Confirmed</h2>
            <p className="text-gray-500 text-sm mb-7">Your consultation has been successfully scheduled.</p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden mb-6 text-left">
              <div className="bg-[#0a1628] px-5 py-4">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">Booking Reference</p>
                <p className="font-mono text-[#d4af37] text-base font-bold mt-0.5">
                  #{bookingId.substring(0, 12).toUpperCase()}
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { label: "Advocate", value: "Adv. Richa Dhanda" },
                  { label: "Date", value: selectedDate ? formatDate(selectedDate) : "—" },
                  { label: "Time", value: selectedSlot || "—" },
                  { label: "Duration", value: "30 Minutes" },
                  { label: "Service", value: formData.service || "—" },
                  { label: "Amount Paid", value: "₹499" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center px-5 py-3">
                    <span className="text-sm text-gray-500">{r.label}</span>
                    <span className={`text-sm font-semibold ${r.label === "Amount Paid" ? "text-green-600" : "text-gray-900"}`}>{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-sm text-amber-800">
                A confirmation will be sent to <strong>{formData.email || "your email"}</strong>.
              </p>
            </div>

            <button onClick={resetAll}
              className="w-full py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
              Book Another Consultation
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── MAIN PAGE ─────────────────────────────────────────────────────────────
  const grouped = groupSlots(slots);

  return (
    <section className="min-h-screen bg-gray-50">

      {/* ── PAGE HEADER ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-[#7a2d2d] text-sm font-semibold uppercase tracking-widest mb-2">
                Legal Consultation
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Book Your Consultation
              </h1>
              <p className="text-gray-500 text-base max-w-lg">
                Schedule a private 30-minute session with Advocate Richa Dhanda for personalised immigration and legal guidance.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "Licensed Advocate", icon: "⚖️" },
                { label: "Secure Payment", icon: "🔒" },
                { label: "Instant Confirmation", icon: "✅" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{b.icon}</span>
                  <span className="font-medium">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
          <div className="w-full lg:w-72 lg:sticky lg:top-8 flex-shrink-0 space-y-4">

            {/* Advocate Card */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="h-0.5 bg-gradient-to-r from-[#7a2d2d] to-[#5c2323]" />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#7a2d2d] shadow-sm flex-shrink-0">
                    <Image
                      src="/advocate-richa-photo.jpg"
                      alt="Advocate Richa Dhanda"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-gray-900">Adv. Richa Dhanda</h3>
                    <p className="text-gray-500 text-sm">Immigration Law Expert</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5 text-[#c9a227]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-400 ml-1">500+ clients</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">Consultation Fee</span>
                    <span className="text-xl font-bold text-gray-900">₹499</span>
                  </div>
                  <p className="text-xs text-gray-400">One 30-minute session</p>
                </div>

                <div className="space-y-2.5">
                  {[
                    "30-minute one-on-one session",
                    "Expert legal guidance",
                    "Personalised case advice",
                    "Immigration law expertise",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Office Hours</h4>
              <div className="space-y-2">
                {[
                  { day: "Mon – Fri", hours: "10:00 AM – 6:00 PM" },
                  { day: "Saturday", hours: "10:00 AM – 2:00 PM" },
                  { day: "Sunday", hours: "Closed", closed: true },
                ].map((r) => (
                  <div key={r.day} className="flex justify-between text-sm">
                    <span className="text-gray-500">{r.day}</span>
                    <span className={`font-medium ${r.closed ? "text-red-500" : "text-gray-900"}`}>{r.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 space-y-3">
              {[
                { icon: "🔒", label: "Payments secured by Cashfree" },
                { icon: "✅", label: "Instant booking confirmation" },
                { icon: "🛡️", label: "Your data is safe & private" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-base">{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: BOOKING WIZARD ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="h-0.5 bg-gradient-to-r from-[#7a2d2d] to-[#0a1628]" />

              {/* Progress Steps */}
              {step <= 3 && (
                <div className="px-6 lg:px-8 pt-6 pb-5 border-b border-gray-100">
                  <div className="flex items-center gap-0">
                    {[
                      { num: 1, label: "Select Date" },
                      { num: 2, label: "Time Slot" },
                      { num: 3, label: "Your Details" },
                    ].map((s, i) => (
                      <div key={s.num} className="flex items-center flex-1 last:flex-none">
                        <button onClick={() => { if (s.num < step) setStep(s.num); }}
                          disabled={s.num >= step}
                          className="flex items-center gap-2 group">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                            step > s.num ? "bg-green-600 text-white"
                            : step === s.num ? "bg-[#7a2d2d] text-white shadow-sm ring-2 ring-[#7a2d2d]/20"
                            : "bg-gray-100 text-gray-400"
                          }`}>
                            {step > s.num ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : s.num}
                          </div>
                          <span className={`text-sm font-medium hidden sm:block ${step >= s.num ? "text-gray-900" : "text-gray-400"}`}>
                            {s.label}
                          </span>
                        </button>
                        {i < 2 && (
                          <div className="flex-1 mx-3 h-px bg-gray-200">
                            <div className="h-full bg-[#7a2d2d] transition-all duration-500"
                              style={{ width: step > s.num ? "100%" : "0%" }} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-6 lg:p-8">

                {/* ── STEP 1: DATE ─────────────────────────────────────── */}
                {step === 1 && (
                  <div>
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">Select a Date</h2>
                    <p className="text-gray-500 text-sm mb-6">
                      Available Monday through Saturday. Select your preferred date below.
                    </p>

                    {/* Calendar */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
                        <button onClick={prevMonth}
                          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span className="font-semibold text-gray-900">
                          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                        </span>
                        <button onClick={nextMonth}
                          className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19l7-7-7-7" />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-7 gap-1 mb-1">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                            <div key={d} className={`text-center text-xs font-semibold py-2 ${d === "Sun" ? "text-red-400" : "text-gray-400"}`}>
                              {d}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((date, i) => {
                            if (!date) return <div key={`e-${i}`} />;
                            const selectable = isDateSelectable(date);
                            // Build YYYY-MM-DD from local date components (not UTC, avoids 1-day shift in IST)
                            const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
                            const isSelected = selectedDate === dateStr;
                            const isToday = new Date().toDateString() === date.toDateString();
                            const isSun = date.getDay() === 0;
                            return (
                              <button key={i} disabled={!selectable} onClick={() => handleDateSelect(dateStr)}
                                className={`
                                  h-9 w-full rounded-lg text-sm font-medium transition-colors
                                  ${isSelected ? "bg-[#7a2d2d] text-white font-semibold shadow-sm" : ""}
                                  ${!isSelected && selectable ? "hover:bg-gray-100 text-gray-700 cursor-pointer" : ""}
                                  ${!selectable ? "text-gray-300 cursor-not-allowed" : ""}
                                  ${isSun ? "!text-red-300 cursor-not-allowed" : ""}
                                  ${isToday && !isSelected ? "ring-1 ring-[#7a2d2d] text-[#7a2d2d] font-semibold" : ""}
                                `}>
                                {date.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="mt-4 flex items-center gap-2 p-3.5 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>Selected: <strong>{formatDate(selectedDate)}</strong></span>
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 2: TIME SLOTS ──────────────────────────────── */}
                {step === 2 && (
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">Select a Time Slot</h2>
                        <p className="text-gray-500 text-sm">{formatDate(selectedDate)} &bull; {getDayInfo(selectedDate)}</p>
                      </div>
                      <button onClick={() => setStep(1)}
                        className="text-sm text-[#7a2d2d] font-medium hover:underline flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Change
                      </button>
                    </div>

                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-16 gap-3">
                        <div className="w-6 h-6 border-2 border-[#0a1628] border-t-transparent rounded-full animate-spin" />
                        <span className="text-gray-500 text-sm">Loading available slots...</span>
                      </div>
                    ) : slots.length === 0 ? (
                      <div className="text-center py-14">
                        <p className="text-gray-900 font-semibold mb-1">No slots available</p>
                        <p className="text-gray-500 text-sm mb-5">Please select a different date.</p>
                        <button onClick={() => setStep(1)}
                          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                          Go Back
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {[
                          { label: "Morning", slots: grouped.morning },
                          { label: "Afternoon", slots: grouped.afternoon },
                          { label: "Evening", slots: grouped.evening },
                        ].filter((g) => g.slots.length > 0).map((group) => (
                          <div key={group.label}>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
                              {group.label}
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {group.slots.map((slot) => (
                                <button key={slot.time} disabled={!slot.available}
                                  onClick={() => handleSlotSelect(slot.time)}
                                  className={`py-2.5 px-2 rounded-lg text-sm font-medium transition-colors border ${
                                    selectedSlot === slot.time
                                      ? "bg-[#7a2d2d] text-white border-[#7a2d2d]"
                                      : slot.available
                                      ? "border-gray-200 text-gray-700 hover:border-[#7a2d2d] hover:text-[#7a2d2d] bg-white"
                                      : "border-gray-100 text-gray-300 cursor-not-allowed line-through bg-gray-50"
                                  }`}>
                                  {slot.time}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* ── STEP 3: FORM ────────────────────────────────────── */}
                {step === 3 && (
                  <div>
                    {/* Header with Slot Pill */}
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-gray-900">Your Details</h2>
                        <p className="text-gray-500 text-xs mt-0.5">Please provide your contact details for booking</p>
                      </div>
                      <button onClick={() => setStep(2)}
                        className="text-xs font-semibold text-[#7a2d2d] bg-[#7a2d2d]/10 hover:bg-[#7a2d2d]/20 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Change Time
                      </button>
                    </div>

                    {/* Selected Slot Banner */}
                    <div className="mb-6 p-3.5 bg-gradient-to-r from-red-50/70 via-amber-50/40 to-gray-50 border border-[#7a2d2d]/20 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#7a2d2d] text-white flex items-center justify-center font-bold text-sm shadow-xs flex-shrink-0">
                          📅
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Selected Consultation Slot</p>
                          <p className="text-sm font-bold text-gray-900 mt-0.5">
                            {formatDate(selectedDate)} · <span className="text-[#7a2d2d]">{selectedSlot}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <span className="text-xs text-gray-400 block">Fee</span>
                        <span className="text-sm font-extrabold text-[#7a2d2d]">₹499</span>
                      </div>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </span>
                            <input type="text" name="name" value={formData.name} onChange={handleChange}
                              placeholder="Enter your full name"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                                errors.name
                                  ? "border-red-400 bg-red-50 focus:border-red-500"
                                  : "border-gray-300 bg-white focus:border-[#7a2d2d] focus:ring-1 focus:ring-[#7a2d2d]"
                              } text-gray-900`} />
                          </div>
                          {errors.name && <p className="text-red-500 text-xs mt-1">Please enter your full name</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </span>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                              placeholder="+91 XXXXX XXXXX"
                              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                                errors.phone
                                  ? "border-red-400 bg-red-50 focus:border-red-500"
                                  : "border-gray-300 bg-white focus:border-[#7a2d2d] focus:ring-1 focus:ring-[#7a2d2d]"
                              } text-gray-900`} />
                          </div>
                          {errors.phone && <p className="text-red-500 text-xs mt-1">Enter a valid phone number</p>}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </span>
                          <input type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="you@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                              errors.email
                                ? "border-red-400 bg-red-50 focus:border-red-500"
                                : "border-gray-300 bg-white focus:border-[#7a2d2d] focus:ring-1 focus:ring-[#7a2d2d]"
                            } text-gray-900`} />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>}
                      </div>

                      {/* Service Cards */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                          Type of Matter <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {SERVICES.map((svc) => {
                            const isSelected = formData.service === svc.value;
                            return (
                              <button key={svc.value} type="button"
                                onClick={() => { setFormData((p) => ({ ...p, service: svc.value })); setErrors((p) => ({ ...p, service: false })); }}
                                className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex items-center justify-between group ${
                                  isSelected
                                    ? "border-[#7a2d2d] bg-red-50/40 ring-1 ring-[#7a2d2d]"
                                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/80 text-gray-700"
                                } ${errors.service ? "border-red-300 bg-red-50/30" : ""}`}>
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isSelected
                                      ? "bg-[#7a2d2d] text-white shadow-xs"
                                      : "bg-gray-100 text-gray-500 group-hover:bg-[#7a2d2d]/10 group-hover:text-[#7a2d2d]"
                                  }`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d={svc.svgPath} />
                                    </svg>
                                  </div>
                                  <div>
                                    <p className={`text-xs font-bold ${isSelected ? "text-[#7a2d2d]" : "text-gray-900"}`}>{svc.label}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">{svc.sub}</p>
                                  </div>
                                </div>
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                  isSelected ? "border-[#7a2d2d] bg-[#7a2d2d] text-white" : "border-gray-300 bg-white group-hover:border-gray-400"
                                }`}>
                                  {isSelected && (
                                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1.5">Please select a service type</p>}
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                          Additional Notes <span className="text-gray-400 font-normal uppercase-none">(Optional)</span>
                        </label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                          placeholder="Briefly describe your situation or any specific questions..."
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7a2d2d] focus:ring-1 focus:ring-[#7a2d2d] outline-none transition-colors text-sm text-gray-900 resize-none" />
                      </div>

                      {/* Booking Summary Card */}
                      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Consultation Duration</span>
                          <span className="font-semibold text-gray-900">30 Minutes</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Mode</span>
                          <span className="font-semibold text-gray-900">Online / Phone Call</span>
                        </div>
                        <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                          <span className="text-sm font-semibold text-gray-700">Total Payable</span>
                          <span className="text-base font-extrabold text-[#7a2d2d]">₹499</span>
                        </div>
                      </div>

                      {/* Error */}
                      {paymentError && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                          <span>⚠️</span>
                          <p>{paymentError}</p>
                        </div>
                      )}

                      {/* CTA */}
                      <button type="submit" disabled={isProcessing}
                        className="w-full py-3.5 rounded-xl bg-[#7a2d2d] hover:bg-[#602323] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-md shadow-[#7a2d2d]/20">
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Creating Secure Session...
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Pay ₹499 &amp; Book Consultation →
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Secured by Cashfree Payments · 256-bit SSL
                      </p>
                    </form>
                  </div>
                )}

                {/* ── STEP 4: PROCESSING ──────────────────────────────── */}
                {step === 4 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#0a1628] rounded-full animate-spin mx-auto mb-6" />
                    <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">Redirecting to Payment</h2>
                    <p className="text-gray-500 text-sm mb-1">
                      Please complete payment of <strong className="text-gray-900">₹499</strong> on the Cashfree secure page.
                    </p>
                    <p className="text-gray-400 text-xs mb-6">Do not close or refresh this window.</p>
                    <button onClick={() => { setStep(3); setIsProcessing(false); setPaymentError(""); }}
                      className="text-sm text-[#7a2d2d] font-medium hover:underline">
                      ← Go Back
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
