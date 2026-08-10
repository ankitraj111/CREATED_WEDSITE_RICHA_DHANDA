import { NextResponse } from "next/server";
import { getAvailableSlots, BUSINESS_HOURS } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(request: Request) {
  // Rate Limiting — max 30 requests per IP per minute
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimitResult = rateLimit(ip, 30, 60 * 1000);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rateLimitResult.retryAfterSeconds} seconds.` },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get("date");

  if (!dateStr) {
    return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
  }

  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();

  // Check if it's a business day
  if (!BUSINESS_HOURS[dayOfWeek]) {
    return NextResponse.json({ slots: [], message: "Office is closed on this day" });
  }

  try {
    // Get slots from Google Calendar
    const calendarSlots = await getAvailableSlots(dateStr);

    // Also check Firebase for already-booked slots
    let bookedTimes: string[] = [];
    if (db) {
      const bookingsRef = collection(db, "bookings");
      const q = query(bookingsRef, where("date", "==", dateStr), where("status", "==", "confirmed"));
      const snapshot = await getDocs(q);
      bookedTimes = snapshot.docs.map((doc) => doc.data().time);
    }

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
