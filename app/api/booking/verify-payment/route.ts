import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay";
import { createCalendarEvent } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails,
    } = body;

    // Verify payment signature
    const isValid = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
    }

    // Save booking to Firebase
    const bookingRef = await addDoc(collection(db, "bookings"), {
      ...bookingDetails,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: 499,
      status: "confirmed",
      createdAt: serverTimestamp(),
    });

    // Create Google Calendar event
    let calendarEventId = null;
    try {
      const event = await createCalendarEvent(bookingDetails);
      calendarEventId = event?.id || null;
    } catch (err) {
      console.error("Calendar event creation failed (non-critical):", err);
    }

    return NextResponse.json({
      success: true,
      bookingId: bookingRef.id,
      calendarEventId,
      message: "Booking confirmed successfully!",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
