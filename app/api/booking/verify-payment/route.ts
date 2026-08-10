import { NextResponse } from "next/server";
import { cashfree } from "@/lib/cashfree";
import { createCalendarEvent } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, bookingDetails } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    // Verify payment status with Cashfree
    const response = await cashfree.PGFetchOrder(orderId);
    const orderData = response?.data;

    if (!orderData || orderData.order_status !== "PAID") {
      return NextResponse.json(
        {
          error: "Payment not completed",
          status: orderData?.order_status || "UNKNOWN",
        },
        { status: 400 }
      );
    }

    // Payment verified — proceed with booking
    let bookingId = "BOOK" + Date.now();

    // Save booking to Firebase
    if (db) {
      try {
        const bookingRef = await addDoc(collection(db, "bookings"), {
          ...bookingDetails,
          cashfreeOrderId: orderId,
          paymentAmount: orderData.order_amount,
          paymentStatus: orderData.order_status,
          cfPaymentId: orderData.cf_order_id,
          amount: orderData.order_amount,
          status: "confirmed",
          paymentGateway: "cashfree",
          createdAt: serverTimestamp(),
        });
        bookingId = bookingRef.id;
      } catch (dbError) {
        console.warn("Firebase save failed:", dbError);
      }
    }

    // Create Google Calendar event
    let calendarEventId = null;
    if (bookingDetails) {
      try {
        const event = await createCalendarEvent({
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone,
          service: bookingDetails.service,
          date: bookingDetails.date,
          time: bookingDetails.time,
          notes: bookingDetails.notes,
        });
        calendarEventId = event?.id || null;
      } catch (calError) {
        console.warn("Calendar event creation failed:", calError);
      }
    }

    // Send lead email notification
    if (bookingDetails) {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app"}/api/contact`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...bookingDetails,
              consultationDate: bookingDetails.date,
              consultationTime: bookingDetails.time,
              bookingType: true,
              message: `Payment of ₹${orderData.order_amount} received via Cashfree (Order: ${orderId}). ${bookingDetails.notes || ""}`,
            }),
          }
        ).catch(() => {});
      } catch {
        // Email notification is non-critical
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      calendarEventId,
      paymentAmount: orderData.order_amount,
      message: "Payment verified and booking confirmed!",
    });
  } catch (error: any) {
    console.error("Error verifying Cashfree payment:", error?.response?.data || error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
