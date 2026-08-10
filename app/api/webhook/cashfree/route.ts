import { NextResponse } from "next/server";
import { cashfree } from "@/lib/cashfree";
import { createCalendarEvent } from "@/lib/google-calendar";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-webhook-signature") || "";
    const timestamp = request.headers.get("x-webhook-timestamp") || "";

    // Verify Webhook Signature if signature headers are present
    if (signature && timestamp) {
      try {
        cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
      } catch (err) {
        console.error("Invalid Cashfree webhook signature:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    // Handle PAYMENT_SUCCESS event
    if (event.type === "PAYMENT_SUCCESS_WEBHOOK" || event.type === "PAYMENT_SUCCESS") {
      const data = event.data;
      const orderId = data.order?.order_id;
      const paymentAmount = data.order?.order_amount;
      const customerEmail = data.customer_details?.customer_email;
      const customerName = data.customer_details?.customer_name;
      const customerPhone = data.customer_details?.customer_phone;

      console.log(`Cashfree Webhook Received: Order ${orderId} PAID successfully`);

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
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
