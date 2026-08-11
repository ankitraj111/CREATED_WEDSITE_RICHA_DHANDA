"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

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
  { value: "Visa Refusal / Appeal", label: "Visa Refusal / Appeal", icon: "⚖️" },
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
                            const dateStr = date.toISOString().split("T")[0];
                            const isSelected = selectedDate === dateStr;
                            const isToday = new Date().toDateString() === date.toDateString();
                            const isSun = date.getDay() === 0;
                            return (
                              <button key={i} disabled={!selectable} onClick={() => handleDateSelect(dateStr)}
                                className={`
                                  h-9 w-full rounded-lg text-sm font-medium transition-colors
                                  ${isSelected ? "bg-[#0a1628] text-white font-semibold" : ""}
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
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <h2 className="font-serif text-xl font-bold text-gray-900 mb-1">Your Details</h2>
                        <p className="text-gray-500 text-sm">{formatDate(selectedDate)} at {selectedSlot}</p>
                      </div>
                      <button onClick={() => setStep(2)}
                        className="text-sm text-[#7a2d2d] font-medium hover:underline flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Change
                      </button>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-5">

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                              errors.name
                                ? "border-red-400 bg-red-50 focus:border-red-500"
                                : "border-gray-300 bg-white focus:border-[#0a1628]"
                            } text-gray-900`} />
                          {errors.name && <p className="text-red-500 text-xs mt-1">Please enter your full name</p>}
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                            placeholder="+91 XXXXX XXXXX"
                            className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                              errors.phone
                                ? "border-red-400 bg-red-50 focus:border-red-500"
                                : "border-gray-300 bg-white focus:border-[#0a1628]"
                            } text-gray-900`} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">Enter a valid phone number</p>}
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                            errors.email
                              ? "border-red-400 bg-red-50 focus:border-red-500"
                              : "border-gray-300 bg-white focus:border-[#0a1628]"
                          } text-gray-900`} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">Enter a valid email address</p>}
                      </div>

                      {/* Service */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Type of Matter <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {SERVICES.map((svc) => (
                            <button key={svc.value} type="button"
                              onClick={() => { setFormData((p) => ({ ...p, service: svc.value })); setErrors((p) => ({ ...p, service: false })); }}
                              className={`p-3 rounded-lg border text-left transition-colors ${
                                formData.service === svc.value
                                  ? "border-[#0a1628] bg-[#0a1628]/5"
                                  : "border-gray-200 bg-white hover:border-gray-400"
                              } ${errors.service ? "border-red-200" : ""}`}>
                              <span className="text-lg block mb-1">{svc.icon}</span>
                              <span className="text-xs font-medium text-gray-700 leading-tight block">{svc.label}</span>
                            </button>
                          ))}
                        </div>
                        {errors.service && <p className="text-red-500 text-xs mt-1">Please select a service type</p>}
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Additional Notes <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                          placeholder="Briefly describe your situation or any specific questions..."
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#0a1628] outline-none transition-colors text-sm text-gray-900 resize-none" />
                      </div>

                      {/* Booking Summary */}
                      <div className="rounded-lg border border-gray-200 divide-y divide-gray-100">
                        <div className="px-4 py-3 bg-gray-50 rounded-t-lg">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Summary</p>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2.5">
                          <span className="text-sm text-gray-500">Date & Time</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {new Date(selectedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {selectedSlot}
                          </span>
                        </div>
                        <div className="flex justify-between items-center px-4 py-2.5 rounded-b-lg">
                          <span className="text-sm text-gray-500">Consultation Fee</span>
                          <span className="text-sm font-bold text-gray-900">₹499</span>
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
                        className="w-full py-3.5 rounded-lg bg-[#7a2d2d] hover:bg-[#602323] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2.5 shadow-sm">
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
                            Pay ₹499 &amp; Book Consultation
                          </>
                        )}
                      </button>
                      <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
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
