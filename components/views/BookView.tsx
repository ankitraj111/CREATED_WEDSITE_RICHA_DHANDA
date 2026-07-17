"use client";

import { useState, useEffect, FormEvent } from "react";

interface SlotData {
  time: string;
  available: boolean;
}

export default function BookView() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const WHATSAPP_NUMBER = "919254067300";

  // Check if date is a Sunday
  const isSunday = (dateStr: string) => {
    return new Date(dateStr).getDay() === 0;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  // Check if a date is selectable (tomorrow to 30 days from now, and not Sunday)
  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    
    return date > today && date <= maxDate && date.getDay() !== 0;
  };

  // Fetch available slots when date changes
  useEffect(() => {
    if (!selectedDate) return;
    if (isSunday(selectedDate)) {
      setSlots([]);
      return;
    }

    setLoadingSlots(true);
    setSelectedSlot("");

    fetch(`/api/booking/available-slots?date=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setSlots(data.slots || []);
        setLoadingSlots(false);
      })
      .catch(() => {
        // Fallback: generate slots client-side
        const day = new Date(selectedDate).getDay();
        const endHour = day === 6 ? 14 : 18;
        const fallbackSlots: SlotData[] = [];
        for (let h = 10; h < endHour; h++) {
          for (let m = 0; m < 60; m += 30) {
            const displayHour = h > 12 ? h - 12 : h;
            const ampm = h >= 12 ? "PM" : "AM";
            fallbackSlots.push({
              time: `${displayHour}:${m.toString().padStart(2, "0")} ${ampm}`,
              available: true,
            });
          }
        }
        setSlots(fallbackSlots);
        setLoadingSlots(false);
      });
  }, [selectedDate]);

  const validateField = (id: string, value: string): boolean => {
    if (id === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (id === "phone") return /^[+]?[\d\s\-()]{7,}$/.test(value);
    return value.trim().length > 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleDateSelect = (dateStr: string) => {
    if (isSunday(dateStr)) return;
    setSelectedDate(dateStr);
    setStep(2);
  };

  const handleSlotSelect = (time: string) => {
    setSelectedSlot(time);
    setStep(3);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};
    if (!validateField("name", formData.name)) newErrors.name = true;
    if (!validateField("phone", formData.phone)) newErrors.phone = true;
    if (!validateField("email", formData.email)) newErrors.email = true;
    if (!validateField("service", formData.service)) newErrors.service = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Directly confirm booking without payment
    setIsProcessing(true);
    setPaymentError("");
    try {
      const bookingDetails = {
        ...formData,
        date: selectedDate,
        time: selectedSlot,
      };
      const res = await fetch("/api/booking/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });
      const data = await res.json();
      if (data.success) {
        setBookingId(data.bookingId || "BOOK" + Date.now());
        setBookingConfirmed(true);
        setStep(5);
      } else {
        // Still confirm locally even if API fails
        setBookingId("BOOK" + Date.now());
        setBookingConfirmed(true);
        setStep(5);
      }
    } catch {
      // Confirm locally if API is unavailable
      setBookingId("BOOK" + Date.now());
      setBookingConfirmed(true);
      setStep(5);
    }
    setIsProcessing(false);
  };



  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get day name for date
  const getDayInfo = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDay();
    if (day === 0) return { closed: true, label: "Sunday — Closed" };
    if (day === 6) return { closed: false, label: "Saturday — 10:00 AM – 2:00 PM" };
    return { closed: false, label: "10:00 AM – 6:00 PM" };
  };

  // Confirmation view
  if (bookingConfirmed) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white py-20">
        <div className="max-w-xl mx-auto px-5">
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 text-center border border-[#e5e0d8]">
            {/* Success icon */}
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="font-serif text-3xl font-bold text-[#111827] mb-3">
              Booking Confirmed! ✅
            </h2>
            <p className="text-[#6b7280] mb-8">
              Your consultation has been successfully booked!
            </p>

            {/* Booking details card */}
            <div className="bg-[#faf8f5] rounded-2xl p-6 mb-8 text-left space-y-4">
              <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
                <span className="text-sm text-[#6b7280]">Booking ID</span>
                <span className="font-mono text-sm font-semibold text-[#111827]">
                  #{bookingId.substring(0, 8).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
                <span className="text-sm text-[#6b7280]">Date</span>
                <span className="font-semibold text-[#111827]">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
                <span className="text-sm text-[#6b7280]">Time</span>
                <span className="font-semibold text-[#111827]">{selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
                <span className="text-sm text-[#6b7280]">Duration</span>
                <span className="font-semibold text-[#111827]">30 Minutes</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#e5e0d8] pb-3">
                <span className="text-sm text-[#6b7280]">Service</span>
                <span className="font-semibold text-[#111827]">{formData.service}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6b7280]">Fee</span>
                <span className="font-bold text-lg text-emerald-600">Free</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi, I have booked a consultation.\n\nBooking ID: #${bookingId.substring(0, 8).toUpperCase()}\nDate: ${formatDate(selectedDate)}\nTime: ${selectedSlot}\nService: ${formData.service}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#20bd5a] transition-all duration-300 shadow-lg hover:shadow-xl mb-4"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.376 0-4.569-.816-6.308-2.18l-.44-.352-3.2 1.073 1.073-3.2-.352-.44A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              Send Booking Details on WhatsApp
            </a>

            <button
              onClick={() => {
                setStep(1);
                setSelectedDate("");
                setSelectedSlot("");
                setFormData({ name: "", phone: "", email: "", service: "", notes: "" });
                setBookingConfirmed(false);
                setBookingId("");
              }}
              className="text-[#a67c00] font-medium hover:underline"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#faf8f5] to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7a2d2d] via-[#8b3a3a] to-[#0a1628] py-16 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#d4af37]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#d4af37]/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[#f0d78c] text-sm font-semibold mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            30-Minute Professional Consultation
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Book Your <span className="text-[#f0d78c]">Consultation</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Schedule a personalized 30-minute session with Advocate Richa Dhanda.
            Get expert guidance on your immigration matter.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25">
            <span className="text-white font-semibold text-lg">Free</span>
            <span className="text-white/70 text-sm">consultation</span>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-2 mb-10">
          {[
            { num: 1, label: "Select Date" },
            { num: 2, label: "Choose Time" },
            { num: 3, label: "Your Details" },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <button
                onClick={() => {
                  if (s.num < step) setStep(s.num);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  step >= s.num
                    ? "bg-[#7a2d2d] text-white shadow-md"
                    : "bg-[#f0ece4] text-[#9ca3af]"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step > s.num
                      ? "bg-white text-[#7a2d2d]"
                      : step === s.num
                      ? "bg-[#d4af37] text-white"
                      : "bg-[#d1d5db] text-white"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < 3 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    step > s.num ? "bg-[#7a2d2d]" : "bg-[#e5e0d8]"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5e0d8]">
              <h2 className="font-serif text-2xl font-bold text-[#111827] mb-2">
                📅 Select a Date
              </h2>
              <p className="text-[#6b7280] mb-6">
                Choose your preferred consultation date
              </p>

              <div className="space-y-4">
                {/* Custom Inline Calendar */}
                <div className="bg-[#faf8f5] rounded-xl border border-[#e5e0d8] overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5e0d8] bg-white">
                    <button 
                      onClick={prevMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                    </button>
                    <div className="font-semibold text-lg text-gray-800">
                      {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <button 
                      onClick={nextMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {generateCalendarDays().map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} className="p-2" />;
                        
                        const isSelectable = isDateSelectable(date);
                        const dateStr = date.toISOString().split("T")[0];
                        const isSelected = selectedDate === dateStr;
                        const isToday = new Date().toDateString() === date.toDateString();
                        
                        return (
                          <button
                            key={i}
                            disabled={!isSelectable}
                            onClick={() => handleDateSelect(dateStr)}
                            className={`
                              h-10 w-full rounded-lg text-sm font-medium transition-all flex items-center justify-center
                              ${!isSelectable ? 'text-gray-300 cursor-not-allowed bg-transparent' : 'hover:bg-gray-100 text-gray-700 cursor-pointer'}
                              ${isSelected ? '!bg-[#d4af37] !text-black shadow-md' : ''}
                              ${isToday && !isSelected ? 'border border-[#d4af37] text-[#d4af37]' : ''}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {selectedDate && isSunday(selectedDate) && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                    <span className="text-2xl">🚫</span>
                    <div>
                      <p className="font-semibold text-red-700">Office Closed on Sunday</p>
                      <p className="text-sm text-red-600">Please select another day.</p>
                    </div>
                  </div>
                )}

                <div className="bg-[#faf8f5] rounded-xl p-5 border border-[#e5e0d8]">
                  <h3 className="font-semibold text-[#111827] mb-3 flex items-center gap-2">
                    🕐 Office Hours
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#4b5563]">
                      <span>Mon – Fri</span>
                      <span className="font-medium text-[#111827]">10:00 AM – 6:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#4b5563]">
                      <span>Saturday</span>
                      <span className="font-medium text-[#111827]">10:00 AM – 2:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#4b5563]">
                      <span>Sunday</span>
                      <span className="font-medium text-red-500">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Time Slot Selection */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5e0d8]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#111827]">
                    🕐 Choose a Time Slot
                  </h2>
                  <p className="text-[#6b7280] mt-1">
                    {formatDate(selectedDate)} • {getDayInfo(selectedDate).label}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-[#a67c00] hover:underline font-medium"
                >
                  Change Date
                </button>
              </div>

              {loadingSlots ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
                  <span className="ml-3 text-[#6b7280]">Loading available slots...</span>
                </div>
              ) : slots.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-4xl mb-4 block">😔</span>
                  <p className="text-[#6b7280]">No slots available for this date.</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-[#a67c00] font-medium hover:underline"
                  >
                    Select another date
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => handleSlotSelect(slot.time)}
                      className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                        selectedSlot === slot.time
                          ? "border-[#d4af37] bg-[#d4af37] text-white shadow-lg"
                          : slot.available
                          ? "border-[#e5e0d8] bg-[#faf8f5] text-[#111827] hover:border-[#d4af37] hover:bg-[#fdf9ed] cursor-pointer"
                          : "border-[#f3f4f6] bg-[#f9fafb] text-[#d1d5db] cursor-not-allowed line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: User Details Form */}
        {step === 3 && (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#e5e0d8]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#111827]">
                    📝 Your Details
                  </h2>
                  <p className="text-[#6b7280] mt-1">
                    {formatDate(selectedDate)} at {selectedSlot}
                  </p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="text-sm text-[#a67c00] hover:underline font-medium"
                >
                  Change Time
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all bg-[#faf8f5] text-[#111827] ${
                      errors.name
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#e5e0d8] focus:border-[#d4af37]"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">Please enter your name</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all bg-[#faf8f5] text-[#111827] ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#e5e0d8] focus:border-[#d4af37]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid phone number</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all bg-[#faf8f5] text-[#111827] ${
                      errors.email
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#e5e0d8] focus:border-[#d4af37]"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">Please enter a valid email</p>
                  )}
                </div>

                {/* Service */}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 outline-none transition-all bg-[#faf8f5] text-[#111827] ${
                      errors.service
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#e5e0d8] focus:border-[#d4af37]"
                    }`}
                  >
                    <option value="">Select service…</option>
                    <option value="Work Visa">Work Visa</option>
                    <option value="Student Visa">Student Visa</option>
                    <option value="PR Application">PR Application</option>
                    <option value="Family Immigration">Family Immigration</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Citizenship & OCI">Citizenship & OCI</option>
                    <option value="Visa Refusal / Appeal">Visa Refusal / Appeal</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-xs mt-1">Please select a service</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-[#374151] mb-1.5">
                    Brief Description <span className="text-[#9ca3af]">(Optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us briefly about your case…"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e0d8] focus:border-[#d4af37] outline-none transition-all bg-[#faf8f5] text-[#111827] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7a2d2d] to-[#0a1628] text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking →"
                  )}
                </button>
              </form>
            </div>
          </div>
        )}


      </div>

      {/* Trust badges */}
      <div className="max-w-4xl mx-auto px-5 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📅", title: "Easy Booking", desc: "Book in just 3 steps" },
            { icon: "⚡", title: "Instant Confirmation", desc: "Get booking ID immediately" },
            { icon: "📞", title: "Direct Consultation", desc: "One-on-one with Advocate Richa" },
          ].map((badge) => (
            <div
              key={badge.title}
              className="bg-white rounded-xl p-5 border border-[#e5e0d8] text-center shadow-sm"
            >
              <span className="text-2xl mb-2 block">{badge.icon}</span>
              <p className="font-semibold text-[#111827] text-sm">{badge.title}</p>
              <p className="text-[#9ca3af] text-xs mt-1">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
