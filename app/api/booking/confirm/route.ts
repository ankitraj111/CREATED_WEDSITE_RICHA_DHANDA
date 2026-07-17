import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { addEventToCalendar } from "@/lib/google-calendar";

export async function POST(req: Request) {
  try {
    const bookingDetails = await req.json();

    let bookingId = "BOOK" + Date.now();

    // Save booking to Firebase
    if (db) {
      const bookingRef = await addDoc(collection(db, "bookings"), {
        ...bookingDetails,
        amount: 0,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      });
      bookingId = bookingRef.id;
    }

    // Add to Google Calendar
    let calendarEventId = null;
    try {
      calendarEventId = await addEventToCalendar({
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
