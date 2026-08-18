import { NextResponse } from "next/server";
import { cashfree } from "@/lib/cashfree";
import { createCalendarEvent } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from "firebase/firestore";

export const dynamic = "force-dynamic";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, bookingDetails: clientBookingDetails } = body;

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

    // Payment verified — fetch booking details from Firestore
    let bookingDetails = clientBookingDetails || null; // fallback from client sessionStorage
    let bookingDocId: string | null = null;
    let bookingId = "BOOK" + Date.now();

    if (db) {
      try {
        // Find the pending booking saved during create-order
        const q = query(
          collection(db, "bookings"),
          where("cashfreeOrderId", "==", orderId)
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const docSnap = snapshot.docs[0];
          const dbData = docSnap.data();
          bookingDocId = docSnap.id;
          bookingId = docSnap.id;

          // Use DB data as the source of truth (most reliable)
          bookingDetails = {
            name: dbData.name,
            email: dbData.email,
            phone: dbData.phone,
            service: dbData.service,
            date: dbData.date,
            time: dbData.time,
            notes: dbData.notes,
          };

          // Update booking status to confirmed
          await updateDoc(doc(db, "bookings", bookingDocId), {
            paymentAmount: orderData.order_amount,
            paymentStatus: orderData.order_status,
            cfPaymentId: orderData.cf_order_id,
            status: "confirmed",
            paymentGateway: "cashfree",
            confirmedAt: serverTimestamp(),
          });

          console.log(`[Booking] Confirmed booking ${bookingDocId} for order ${orderId}`);
        } else {
          console.warn(`[Booking] No pending booking found for order ${orderId}, using client fallback.`);
          // If no pending booking found (edge case), save a new one using client data
          if (bookingDetails) {
            const { addDoc: addDocFn } = await import("firebase/firestore");
            const bookingRef = await addDocFn(collection(db, "bookings"), {
              ...bookingDetails,
              cashfreeOrderId: orderId,
              paymentAmount: orderData.order_amount,
              paymentStatus: orderData.order_status,
              cfPaymentId: orderData.cf_order_id,
              amount: orderData.order_amount,
              status: "confirmed",
              paymentGateway: "cashfree",
              createdAt: serverTimestamp(),
              confirmedAt: serverTimestamp(),
            });
            bookingId = bookingRef.id;
          }
        }
      } catch (dbError) {
        console.warn("Firebase booking lookup/update failed:", dbError);
      }
    }

    // Create Google Calendar event
    let calendarEventId = null;
    if (bookingDetails?.date && bookingDetails?.time) {
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

    // Send email notifications (advocate + customer)
    if (bookingDetails?.name) {
      try {
        await fetch(`${BASE_URL}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...bookingDetails,
            consultationDate: bookingDetails.date,
            consultationTime: bookingDetails.time,
            bookingType: true,
            message: `Payment of ₹${orderData.order_amount} received via Cashfree (Order: ${orderId}). ${bookingDetails.notes || ""}`,
          }),
        }).catch(() => {});
      } catch {
        // Email notification is non-critical
      }
    }

    return NextResponse.json({
      success: true,
      bookingId,
      calendarEventId,
      paymentAmount: orderData.order_amount,
      bookingDetails, // Return full details for confirmation page
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
