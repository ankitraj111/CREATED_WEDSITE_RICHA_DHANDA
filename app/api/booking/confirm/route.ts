import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createCalendarEvent } from "@/lib/google-calendar";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeBookingData, validateBookingData } from "@/lib/sanitize";

export async function POST(req: Request) {
  try {
    // Rate Limiting — max 5 bookings per IP per minute
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = rateLimit(ip, 5, 60 * 1000);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rateLimitResult.retryAfterSeconds} seconds.` },
        { status: 429 }
      );
    }

    const rawData = await req.json();

    // Input Sanitization
    const bookingDetails = sanitizeBookingData(rawData);

    // Server-side Validation
    const validation = validateBookingData(bookingDetails);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    let bookingId = "BOOK" + Date.now();

    // Save booking to Firebase
    if (db) {
      const bookingRef = await addDoc(collection(db, "bookings"), {
        ...bookingDetails,
        amount: 0,
        status: "confirmed",
        ip: ip,
        createdAt: new Date().toISOString(),
      });
      bookingId = bookingRef.id;
    }

    // Add to Google Calendar
    let calendarEventId = null;
    try {
      calendarEventId = await createCalendarEvent({
        date: bookingDetails.date,
        time: bookingDetails.time,
        name: bookingDetails.name,
        email: bookingDetails.email,
        phone: bookingDetails.phone,
        service: bookingDetails.service,
        notes: bookingDetails.notes,
      });
    } catch {
      // Calendar integration is optional
    }

    return NextResponse.json({
      success: true,
      bookingId,
      calendarEventId,
      message: "Booking confirmed successfully!",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to confirm booking" },
      { status: 500 }
    );
  }
}
