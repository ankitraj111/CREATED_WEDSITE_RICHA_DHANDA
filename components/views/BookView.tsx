"use client";

import { useState, useEffect, FormEvent } from "react";

interface SlotData {
  time: string;
  available: boolean;
}

const SERVICES = [
  { value: "Work Visa", label: "Work Visa", icon: "✈️" },
  { value: "Student Visa", label: "Student Visa", icon: "🎓" },
  { value: "PR Application", label: "PR / Residency", icon: "🏠" },
  { value: "Family Immigration", label: "Family Immigration", icon: "👨‍👩‍👧" },
  { value: "Business Visa", label: "Business Visa", icon: "💼" },
  { value: "Citizenship & OCI", label: "Citizenship & OCI", icon: "🇮🇳" },
  { value: "Visa Refusal / Appeal", label: "Visa Refusal", icon: "⚖️" },
  { value: "Other", label: "Other Matter", icon: "📋" },
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
  const [focusedField, setFocusedField] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date(); d.setDate(1); return d;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get("order_id");
    if (orderIdParam) {
      setIsProcessing(true); setStep(4);
      fetch("/api/booking/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderIdParam }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) { setBookingId(data.bookingId || orderIdParam); setBookingConfirmed(true); setStep(5); }
          else { setPaymentError(data.error || "Payment verification failed."); setStep(3); }
        })
        .catch(() => { setPaymentError("Payment verification failed. Please contact us."); setStep(3); })
        .finally(() => setIsProcessing(false));
    }
  }, []);

  const isSunday = (d: string) => new Date(d).getDay() === 0;
  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
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
        const day = new Date(selectedDate).getDay();
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
      form.appendChild(input); document.body.appendChild(form); form.submit();
    } catch (error) {
      setPaymentError(error instanceof Error ? error.message : "Failed to initiate payment.");
      setStep(3); setIsProcessing(false);
    }
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const getDayInfo = (dateStr: string) => {
    const day = new Date(dateStr).getDay();
    if (day === 0) return { closed: true, label: "Sunday — Closed" };
    if (day === 6) return { closed: false, label: "Saturday — 10:00 AM – 2:00 PM" };
    return { closed: false, label: "Monday – Friday — 10:00 AM – 6:00 PM" };
  };

  const resetAll = () => {
    setStep(1); setSelectedDate(""); setSelectedSlot("");
    setFormData({ name: "", phone: "", email: "", service: "", notes: "" });
    setBookingConfirmed(false); setBookingId(""); setPaymentError("");
  };

  // ─── CONFIRMATION SCREEN ───────────────────────────────────────────────────
  if (bookingConfirmed) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628] flex items-center justify-center py-16 px-4">
        <style>{`
          @keyframes scaleIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          @keyframes drawCheck { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
          @keyframes confettiFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(120px) rotate(720deg); opacity: 0; }
          }
          .scale-in { animation: scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          .confetti-piece { animation: confettiFall 1.5s ease-out forwards; }
        `}</style>
        <div className="max-w-lg w-full">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Gold Top Bar */}
            <div className="h-2 bg-gradient-to-r from-[#d4af37] via-[#f5e7a0] to-[#d4af37]" />
            <div className="p-8 lg:p-10 text-center">
              {/* Animated Success Icon */}
              <div className="relative w-24 h-24 mx-auto mb-6 scale-in">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-200">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
                      style={{ strokeDasharray: 100, strokeDashoffset: 0, animation: "drawCheck 0.6s 0.3s ease forwards" }} />
                  </svg>
                </div>
                {/* Confetti dots */}
                {["top-0 right-0 bg-[#d4af37]","top-2 left-0 bg-emerald-400","bottom-0 right-2 bg-[#7a2d2d]","bottom-1 left-1 bg-blue-400"].map((c, i) => (
                  <div key={i} className={`absolute w-3 h-3 rounded-full confetti-piece ${c}`}
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>

              <h2 className="font-serif text-3xl font-bold text-[#111827] mb-2">Booking Confirmed!</h2>
              <p className="text-[#6b7280] mb-8">Your consultation is successfully scheduled. We look forward to meeting you.</p>

              {/* Booking Receipt Card */}
              <div className="bg-gradient-to-b from-[#faf8f5] to-white border border-[#e5e0d8] rounded-2xl overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-[#0a1628] to-[#7a2d2d] px-6 py-4 text-left">
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Booking Confirmation</p>
                  <p className="font-mono text-[#f5e7a0] text-lg font-bold mt-1">#{bookingId.substring(0, 12).toUpperCase()}</p>
                </div>
                <div className="p-6 space-y-4">
                  {[
                    { label: "Advocate", value: "Adv. Richa Dhanda" },
                    { label: "Date", value: selectedDate ? formatDate(selectedDate) : "—" },
                    { label: "Time", value: selectedSlot || "—" },
                    { label: "Duration", value: "30 Minutes" },
                    { label: "Service", value: formData.service || "—" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center border-b border-[#f0ece4] pb-3 last:border-0 last:pb-0">
                      <span className="text-sm text-[#6b7280] font-medium">{row.label}</span>
                      <span className="text-sm font-semibold text-[#111827]">{row.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-sm text-[#6b7280] font-medium">Amount Paid</span>
                    <span className="text-lg font-bold text-emerald-600">₹499</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left flex gap-3">
                <span className="text-xl">📧</span>
                <p className="text-sm text-amber-800">A confirmation has been sent to <strong>{formData.email || "your email"}</strong>. Please check your inbox.</p>
              </div>

              <button onClick={resetAll}
                className="w-full py-3.5 rounded-xl border-2 border-[#d4af37] text-[#a67c00] font-semibold hover:bg-[#fdf9ed] transition-colors">
                Book Another Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ─── MAIN PAGE ─────────────────────────────────────────────────────────────
  const grouped = groupSlots(slots);

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4); }
          70% { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
          100% { box-shadow: 0 0 0 0 rgba(212,175,55,0); }
        }
        .shimmer-gold {
          background: linear-gradient(90deg, #c9a227, #f5e7a0, #d4af37, #b8960c, #f5e7a0, #c9a227);
          background-size: 300% auto;
          animation: shimmer 4s linear infinite;
        }
        .shimmer-gold:hover { animation: shimmer 2s linear infinite; }
        .fade-up { animation: fadeUp 0.4s ease forwards; }
        .float-slow { animation: float 4s ease-in-out infinite; }
        .pulse-gold { animation: pulse-ring 2s ease-out infinite; }
        .input-float-label { position: relative; }
        .input-float-label input:focus + label,
        .input-float-label input:not(:placeholder-shown) + label {
          top: -10px; font-size: 11px; color: #a67c00; background: white; padding: 0 4px;
        }
        .step-line-fill { transition: width 0.5s ease; }
      `}</style>

      <section className="min-h-screen bg-[#f7f5f2]">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#4a1515] py-16 lg:py-20">
          {/* Decorative orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#7a2d2d]/30 rounded-full blur-3xl translate-y-1/2" />
          <div className="absolute top-1/2 left-10 w-32 h-32 bg-[#d4af37]/5 rounded-full blur-2xl" />

          <div className="relative max-w-5xl mx-auto px-5 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d4af37]/40 bg-[#d4af37]/10 backdrop-blur-sm text-[#f5e7a0] text-sm font-semibold mb-5">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              30-Minute Expert Consultation — ₹499
            </div>

            <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
              Book Your{" "}
              <span className="text-[#d4af37]">Legal Consultation</span>
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Get expert immigration & legal guidance from Advocate Richa Dhanda — one-on-one, tailored to your case.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: "⚖️", label: "Licensed Advocate" },
                { icon: "🔒", label: "Secure Payment" },
                { icon: "⭐", label: "500+ Satisfied Clients" },
                { icon: "📅", label: "Instant Confirmation" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm text-white/85 text-sm">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT SIDEBAR ──────────────────────────────────────────── */}
            <div className="w-full lg:w-80 lg:sticky lg:top-8 flex-shrink-0 space-y-4">

              {/* Advocate Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e2d9]">
                <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f5e7a0] to-[#d4af37]" />
                <div className="p-6 text-center">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0a1628] to-[#7a2d2d] flex items-center justify-center text-2xl font-bold text-[#d4af37] font-serif shadow-xl pulse-gold mx-auto">
                      RD
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#111827]">Adv. Richa Dhanda</h3>
                  <p className="text-[#6b7280] text-sm mt-0.5">Immigration & Legal Expert</p>
                  <div className="flex justify-center items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs text-[#6b7280] ml-1">(500+ clients)</span>
                  </div>
                </div>

                {/* Fee Card */}
                <div className="mx-4 mb-4 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#1a2f5e] p-5 text-center">
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Consultation Fee</p>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-3xl font-bold text-[#d4af37]">₹499</span>
                  </div>
                  <p className="text-white/50 text-xs">One-time session fee</p>
                </div>

                {/* Includes */}
                <div className="px-5 pb-5 space-y-2.5">
                  {[
                    "30-minute dedicated session",
                    "Expert case-specific guidance",
                    "Immigration law consultation",
                    "Personalised advice & next steps",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-[#a67c00]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-sm text-[#4b5563]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-2xl shadow-sm border border-[#e8e2d9] p-5 space-y-3">
                {[
                  { icon: "🔒", title: "Secure Payment", sub: "Powered by Cashfree PG" },
                  { icon: "✅", title: "Instant Confirmation", sub: "Booking ID on payment" },
                  { icon: "📞", title: "Direct 1-on-1 Session", sub: "No intermediaries" },
                ].map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#faf8f5] border border-[#e8e2d9] flex items-center justify-center text-lg flex-shrink-0">
                      {b.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">{b.title}</p>
                      <p className="text-xs text-[#9ca3af]">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: BOOKING WIZARD ─────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl shadow-xl border border-[#e8e2d9] overflow-hidden">
                {/* Gold top accent */}
                <div className="h-1.5 bg-gradient-to-r from-[#d4af37] via-[#f5e7a0] to-[#d4af37]" />

                {/* Progress Stepper */}
                {step <= 3 && (
                  <div className="px-6 lg:px-10 pt-8 pb-6 border-b border-[#f0ece4]">
                    <div className="flex items-center">
                      {[
                        { num: 1, label: "Select Date" },
                        { num: 2, label: "Time Slot" },
                        { num: 3, label: "Your Details" },
                      ].map((s, i) => (
                        <div key={s.num} className="flex items-center flex-1 last:flex-none">
                          <button
                            onClick={() => { if (s.num < step) setStep(s.num); }}
                            className="flex flex-col items-center gap-1.5 group"
                            disabled={s.num >= step}
                          >
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                              step > s.num
                                ? "bg-[#d4af37] text-white shadow-md shadow-[#d4af37]/30"
                                : step === s.num
                                ? "bg-[#0a1628] text-white shadow-md"
                                : "bg-[#f0ece4] text-[#9ca3af]"
                            }`}>
                              {step > s.num ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : s.num}
                            </div>
                            <span className={`text-xs font-semibold hidden sm:block ${
                              step >= s.num ? "text-[#111827]" : "text-[#9ca3af]"
                            }`}>{s.label}</span>
                          </button>
                          {i < 2 && (
                            <div className="flex-1 mx-2 h-0.5 bg-[#f0ece4] rounded-full overflow-hidden mb-4">
                              <div
                                className="h-full bg-gradient-to-r from-[#d4af37] to-[#a67c00] rounded-full step-line-fill"
                                style={{ width: step > s.num ? "100%" : "0%" }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 lg:p-10">

                  {/* ── STEP 1: DATE ──────────────────────────────────── */}
                  {step === 1 && (
                    <div className="fade-up">
                      <div className="mb-6">
                        <h2 className="font-serif text-2xl font-bold text-[#111827]">Select a Date</h2>
                        <p className="text-[#6b7280] mt-1">Choose your preferred consultation date (Mon–Sat)</p>
                      </div>

                      {/* Calendar */}
                      <div className="border border-[#e8e2d9] rounded-2xl overflow-hidden">
                        {/* Month Nav */}
                        <div className="flex items-center justify-between px-6 py-4 bg-[#faf8f5] border-b border-[#e8e2d9]">
                          <button onClick={prevMonth}
                            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-[#e8e2d9] transition-all text-[#4b5563]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M15 18l-6-6 6-6" />
                            </svg>
                          </button>
                          <h3 className="font-semibold text-[#111827] text-lg">
                            {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                          </h3>
                          <button onClick={nextMonth}
                            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white border border-transparent hover:border-[#e8e2d9] transition-all text-[#4b5563]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M9 18l6-6-6-6" />
                            </svg>
                          </button>
                        </div>

                        {/* Day headers */}
                        <div className="px-4 pt-4 pb-2 grid grid-cols-7 gap-1">
                          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                            <div key={d} className={`text-center text-xs font-semibold py-1 ${d === "Sun" ? "text-red-400" : "text-[#9ca3af]"}`}>{d}</div>
                          ))}
                        </div>

                        {/* Days grid */}
                        <div className="px-4 pb-4 grid grid-cols-7 gap-1">
                          {generateCalendarDays().map((date, i) => {
                            if (!date) return <div key={`e-${i}`} />;
                            const selectable = isDateSelectable(date);
                            const dateStr = date.toISOString().split("T")[0];
                            const isSelected = selectedDate === dateStr;
                            const isToday = new Date().toDateString() === date.toDateString();
                            const isSun = date.getDay() === 0;
                            return (
                              <button key={i} disabled={!selectable} onClick={() => handleDateSelect(dateStr)}
                                className={`
                                  h-11 w-full rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center relative
                                  ${isSelected ? "bg-[#d4af37] text-white shadow-lg shadow-[#d4af37]/30 scale-105 font-bold" : ""}
                                  ${!selectable && !isSun ? "text-[#d1d5db] cursor-not-allowed" : ""}
                                  ${isSun ? "text-red-300 cursor-not-allowed" : ""}
                                  ${selectable && !isSelected ? "hover:bg-[#fdf9ed] hover:text-[#a67c00] cursor-pointer text-[#374151]" : ""}
                                  ${isToday && !isSelected ? "ring-2 ring-[#d4af37] ring-offset-1" : ""}
                                `}>
                                {date.getDate()}
                                {isSun && <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-300" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-[#6b7280]">
                        {[
                          { color: "bg-[#d4af37]", label: "Selected" },
                          { color: "ring-2 ring-[#d4af37] ring-offset-1 bg-white", label: "Today" },
                          { color: "bg-red-100", label: "Closed (Sunday)" },
                          { color: "bg-[#f3f4f6]", label: "Unavailable" },
                        ].map((l) => (
                          <div key={l.label} className="flex items-center gap-1.5">
                            <div className={`w-4 h-4 rounded-md ${l.color}`} />
                            <span>{l.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Office hours */}
                      <div className="mt-6 bg-[#faf8f5] rounded-xl border border-[#e8e2d9] p-5">
                        <h4 className="font-semibold text-[#111827] text-sm mb-3 flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-xs">🕐</span>
                          Office Hours
                        </h4>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          {[
                            { day: "Mon – Fri", hours: "10:00 AM – 6:00 PM", available: true },
                            { day: "Saturday", hours: "10:00 AM – 2:00 PM", available: true },
                            { day: "Sunday", hours: "Closed", available: false },
                          ].map((r) => (
                            <div key={r.day} className="text-center p-3 rounded-lg bg-white border border-[#f0ece4]">
                              <p className="font-semibold text-[#374151] text-xs">{r.day}</p>
                              <p className={`text-xs mt-1 ${r.available ? "text-[#6b7280]" : "text-red-400"}`}>{r.hours}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── STEP 2: TIME SLOTS ────────────────────────────── */}
                  {step === 2 && (
                    <div className="fade-up">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-[#111827]">Choose a Time Slot</h2>
                          <p className="text-[#6b7280] mt-1">{formatDate(selectedDate)} • {getDayInfo(selectedDate).label}</p>
                        </div>
                        <button onClick={() => setStep(1)}
                          className="flex items-center gap-1 text-sm text-[#a67c00] font-semibold hover:underline mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                          Change Date
                        </button>
                      </div>

                      {loadingSlots ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-4">
                          <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
                          <p className="text-[#6b7280] text-sm">Loading available slots...</p>
                        </div>
                      ) : slots.length === 0 ? (
                        <div className="text-center py-16">
                          <div className="text-5xl mb-4">😔</div>
                          <p className="font-semibold text-[#374151]">No slots available for this date</p>
                          <p className="text-[#6b7280] text-sm mt-1 mb-6">Please try selecting a different date.</p>
                          <button onClick={() => setStep(1)}
                            className="px-6 py-2.5 rounded-xl bg-[#fdf9ed] border border-[#d4af37] text-[#a67c00] font-semibold text-sm hover:bg-[#fdf5d5] transition-colors">
                            ← Select Another Date
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {[
                            { label: "🌅 Morning", slots: grouped.morning },
                            { label: "☀️ Afternoon", slots: grouped.afternoon },
                            { label: "🌆 Evening", slots: grouped.evening },
                          ].filter((g) => g.slots.length > 0).map((group) => (
                            <div key={group.label}>
                              <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-widest mb-3">{group.label}</p>
                              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
                                {group.slots.map((slot) => (
                                  <button key={slot.time} disabled={!slot.available} onClick={() => handleSlotSelect(slot.time)}
                                    className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                                      selectedSlot === slot.time
                                        ? "border-[#d4af37] bg-[#d4af37] text-white shadow-lg shadow-[#d4af37]/30 scale-105"
                                        : slot.available
                                        ? "border-[#e8e2d9] bg-[#faf8f5] text-[#374151] hover:border-[#d4af37] hover:bg-[#fdf9ed] cursor-pointer"
                                        : "border-[#f3f4f6] bg-[#f9fafb] text-[#d1d5db] cursor-not-allowed line-through"
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

                  {/* ── STEP 3: FORM ──────────────────────────────────── */}
                  {step === 3 && (
                    <div className="fade-up">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="font-serif text-2xl font-bold text-[#111827]">Your Details</h2>
                          <p className="text-[#6b7280] mt-1">{formatDate(selectedDate)} at {selectedSlot}</p>
                        </div>
                        <button onClick={() => setStep(2)}
                          className="flex items-center gap-1 text-sm text-[#a67c00] font-semibold hover:underline mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                          Change Time
                        </button>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-5">
                        {/* Name & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div>
                            <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                              Full Name <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                              </span>
                              <input type="text" name="name" value={formData.name} onChange={handleChange}
                                onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField("")}
                                placeholder="Enter your full name"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${
                                  errors.name ? "border-red-400 bg-red-50" : focusedField === "name" ? "border-[#d4af37] bg-white shadow-sm" : "border-[#e8e2d9] bg-[#faf8f5]"
                                } text-[#111827]`} />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> Please enter your name</p>}
                          </div>

                          {/* Phone */}
                          <div>
                            <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                              Phone Number <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </span>
                              <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField("")}
                                placeholder="+91 XXXXX XXXXX"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${
                                  errors.phone ? "border-red-400 bg-red-50" : focusedField === "phone" ? "border-[#d4af37] bg-white shadow-sm" : "border-[#e8e2d9] bg-[#faf8f5]"
                                } text-[#111827]`} />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> Enter a valid phone number</p>}
                          </div>
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                            Email Address <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </span>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                              onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField("")}
                              placeholder="you@example.com"
                              className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 outline-none transition-all text-sm ${
                                errors.email ? "border-red-400 bg-red-50" : focusedField === "email" ? "border-[#d4af37] bg-white shadow-sm" : "border-[#e8e2d9] bg-[#faf8f5]"
                              } text-[#111827]`} />
                          </div>
                          {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><span>⚠</span> Enter a valid email address</p>}
                        </div>

                        {/* Service Cards */}
                        <div>
                          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2.5">
                            Type of Matter <span className="text-red-400">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {SERVICES.map((svc) => (
                              <button key={svc.value} type="button"
                                onClick={() => { setFormData((p) => ({ ...p, service: svc.value })); if (errors.service) setErrors((p) => ({ ...p, service: false })); }}
                                className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                                  formData.service === svc.value
                                    ? "border-[#d4af37] bg-[#fdf9ed] shadow-sm"
                                    : "border-[#e8e2d9] bg-[#faf8f5] hover:border-[#d4af37]/50 hover:bg-[#fdf9ed]/50"
                                } ${errors.service ? "border-red-200" : ""}`}>
                                <span className="text-xl mb-1 block">{svc.icon}</span>
                                <span className="text-xs font-semibold text-[#374151] leading-tight block">{svc.label}</span>
                              </button>
                            ))}
                          </div>
                          {errors.service && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><span>⚠</span> Please select a service type</p>}
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                            Brief Description <span className="text-[#9ca3af] font-normal normal-case">(Optional)</span>
                          </label>
                          <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                            placeholder="Tell us briefly about your situation or specific questions..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-[#e8e2d9] focus:border-[#d4af37] outline-none transition-all bg-[#faf8f5] text-[#111827] resize-none text-sm" />
                        </div>

                        {/* Booking Summary */}
                        <div className="bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] rounded-xl border border-[#e8e2d9] p-4">
                          <p className="text-xs font-bold text-[#374151] uppercase tracking-wider mb-3">Booking Summary</p>
                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div>
                              <p className="text-xs text-[#9ca3af]">Date</p>
                              <p className="text-sm font-semibold text-[#111827] mt-0.5">
                                {new Date(selectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                              </p>
                            </div>
                            <div className="border-x border-[#e8e2d9]">
                              <p className="text-xs text-[#9ca3af]">Time</p>
                              <p className="text-sm font-semibold text-[#111827] mt-0.5">{selectedSlot}</p>
                            </div>
                            <div>
                              <p className="text-xs text-[#9ca3af]">Fee</p>
                              <p className="text-sm font-bold text-[#d4af37] mt-0.5">₹499</p>
                            </div>
                          </div>
                        </div>

                        {/* Error */}
                        {paymentError && (
                          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            <span className="text-lg flex-shrink-0">⚠️</span>
                            <p>{paymentError}</p>
                          </div>
                        )}

                        {/* CTA Button */}
                        <button type="submit" disabled={isProcessing}
                          className={`w-full py-4 rounded-xl text-white font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                            isProcessing ? "opacity-70 cursor-not-allowed bg-[#374151]" : "shimmer-gold hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                          }`}>
                          {isProcessing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Creating Secure Session...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                              </svg>
                              Pay ₹499 &amp; Book Consultation
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </>
                          )}
                        </button>
                        <p className="text-center text-xs text-[#9ca3af] flex items-center justify-center gap-1.5">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          256-bit SSL encrypted · Powered by Cashfree Payments
                        </p>
                      </form>
                    </div>
                  )}

                  {/* ── STEP 4: PAYMENT PROCESSING ────────────────────── */}
                  {step === 4 && (
                    <div className="fade-up text-center py-10">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a67c00] flex items-center justify-center shadow-xl shadow-[#d4af37]/30 float-slow">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h2 className="font-serif text-2xl font-bold text-[#111827] mb-2">Redirecting to Cashfree</h2>
                      <p className="text-[#6b7280] mb-6 max-w-sm mx-auto">
                        Please complete your payment of <strong className="text-[#111827]">₹499</strong> on the Cashfree payment page.
                      </p>
                      <div className="flex justify-center mb-6">
                        <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
                      </div>
                      <p className="text-sm text-[#9ca3af] mb-6">Waiting for payment confirmation...</p>
                      <button onClick={() => { setStep(3); setIsProcessing(false); setPaymentError(""); }}
                        className="text-sm text-[#a67c00] font-semibold hover:underline flex items-center gap-1 mx-auto">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Go Back
                      </button>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
