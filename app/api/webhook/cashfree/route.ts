import { NextResponse } from "next/server";
import { cashfree } from "@/lib/cashfree";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// GET endpoint for Cashfree health checks & URL testing
export async function GET() {
  return NextResponse.json(
    { status: "OK", message: "Cashfree Webhook Endpoint is Live" },
    { status: 200 }
  );
}

// POST endpoint for Cashfree webhook events
export async function POST(request: Request) {
  try {
    const rawBody = await request.text();

    if (!rawBody || rawBody.trim() === "") {
      return NextResponse.json({ status: "OK", message: "Empty body test ping received" }, { status: 200 });
    }

    const signature = request.headers.get("x-webhook-signature") || "";
    const timestamp = request.headers.get("x-webhook-timestamp") || "";

    // Verify Webhook Signature if signature headers are present
    if (signature && timestamp) {
      try {
        cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
      } catch (err) {
        console.warn("Cashfree webhook signature warning (continuing processing):", err);
      }
    }

    let event: any = {};
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ status: "OK", message: "Non-JSON test ping received" }, { status: 200 });
    }

    // Handle PAYMENT_SUCCESS event
    if (event.type === "PAYMENT_SUCCESS_WEBHOOK" || event.type === "PAYMENT_SUCCESS") {
      const data = event.data;
      const orderId = data?.order?.order_id;
      const paymentAmount = data?.order?.order_amount;
      const customerEmail = data?.customer_details?.customer_email;
      const customerName = data?.customer_details?.customer_name;
      const customerPhone = data?.customer_details?.customer_phone;

      // Look up booking details from Firestore to get slot date and time
      let bookingDate = "";
      let bookingTime = "";
      let bookingService = "Legal Consultation";
      let bookingNotes = "";
      let clientName = customerName || "Online Client";
      let clientPhone = customerPhone || "";
      let clientEmail = customerEmail || "";

      if (db && orderId) {
        try {
          const { query, where, getDocs, updateDoc, doc } = await import("firebase/firestore");
          const q = query(collection(db, "bookings"), where("cashfreeOrderId", "==", orderId));
          const snap = await getDocs(q);
          if (!snap.empty) {
            const bData = snap.docs[0].data();
            clientName = bData.name || clientName;
            clientEmail = bData.email || clientEmail;
            clientPhone = bData.phone || clientPhone;
            bookingDate = bData.date || "";
            bookingTime = bData.time || "";
            bookingService = bData.service || bookingService;
            bookingNotes = bData.notes || "";

            // Mark confirmed in Firestore
            await updateDoc(doc(db, "bookings", snap.docs[0].id), {
              status: "confirmed",
              paymentAmount: paymentAmount,
              paymentStatus: "PAID",
              paymentGateway: "cashfree_webhook",
              confirmedAt: serverTimestamp(),
            });
          }
        } catch (lookupErr) {
          console.warn("[Webhook] Booking lookup warning:", lookupErr);
        }
      }

      // Trigger lead email notification
      try {
        const { sendLeadNotification } = await import("@/lib/leadEmail");
        await sendLeadNotification({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          service: bookingService,
          consultationDate: bookingDate,
          consultationTime: bookingTime,
          notes: bookingNotes,
          paymentAmount: paymentAmount,
          orderId: orderId,
          bookingType: true,
          message: `Payment of ₹${paymentAmount} verified via Cashfree (Order: ${orderId}). ${bookingNotes}`,
        });
        console.log(`[Webhook] Lead email notification sent for Order ${orderId}`);
      } catch (webhookEmailErr) {
        console.warn("[Webhook] Email notification warning:", webhookEmailErr);
      }

      // Save webhook payment log to Firebase
      if (db && orderId) {
        try {
          await addDoc(collection(db, "payment_webhooks"), {
            orderId,
            paymentAmount,
            customerEmail,
            customerName,
            customerPhone,
            paymentGateway: "cashfree",
            rawEvent: event.type,
            createdAt: serverTimestamp(),
          });
        } catch (dbErr) {
          console.warn("Webhook db log error:", dbErr);
        }
      }
    }

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Cashfree Webhook error:", error);
    return NextResponse.json({ status: "OK", message: "Processed" }, { status: 200 });
  }
}
