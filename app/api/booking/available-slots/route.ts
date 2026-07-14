import { NextResponse } from "next/server";
import { getAvailableSlots, BUSINESS_HOURS } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
  }

  const date = new Date(dateStr);
  const dayOfWeek = date.getDay();

  // Check if it's a business day
  if (!BUSINESS_HOURS[dayOfWeek]) {
    return NextResponse.json({ slots: [], message: "Office is closed on this day" });
  }

  try {
    // Get slots from Google Calendar
    const calendarSlots = await getAvailableSlots(dateStr);

    // Also check Firebase for already-booked slots
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("date", "==", dateStr), where("status", "==", "confirmed"));
    const snapshot = await getDocs(q);
    const bookedTimes = snapshot.docs.map((doc) => doc.data().time);

    // Mark booked slots as unavailable
    const slots = calendarSlots.map((slot) => ({
      ...slot,
      available: slot.available && !bookedTimes.includes(slot.time),
    }));

    return NextResponse.json({ slots });
  } catch (error) {
    console.error("Error fetching slots:", error);
    return NextResponse.json({ error: "Failed to fetch available slots" }, { status: 500 });
  }
}
