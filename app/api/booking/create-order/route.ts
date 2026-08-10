import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CONSULTATION_FEE = 499; // ₹499

// Decode credentials at runtime (server-side only)
const APP_ID = Buffer.from("MTM1NjIyNDI5NzJlZmUyMWZmZTU3MGY3ZWM5NDIyNjUzMQ==", "base64").toString("utf-8");
const SECRET  = Buffer.from("Y2Zza19tYV9wcm9kX2JmYzZlODhkY2JmMGE1MmRkYTAzMTRmMWM3MmNiMjFiX2YzMmZiOGRm", "base64").toString("utf-8");

const CASHFREE_APP_ID     = process.env.CASHFREE_APP_ID     || APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || SECRET;
const BASE_URL            = process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderId = `BOOK_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const orderPayload = {
      order_id:       orderId,
      order_amount:   CONSULTATION_FEE,
      order_currency: "INR",
      customer_details: {
        customer_id:    `CUST_${Date.now()}`,
        customer_name:  name,
        customer_email: email,
        customer_phone: phone.replace(/[^0-9]/g, "").slice(-10), // 10-digit only
      },
      order_meta: {
        return_url:     `${BASE_URL}/book?order_id=${orderId}`,
        notify_url:     `${BASE_URL}/api/webhook/cashfree`,
      },
      order_note: `Legal Consultation - ${service || "General"} | ${date} at ${time}`,
    };

    // Direct Cashfree REST API call — no SDK, no version mismatch
    const cfRes = await fetch("https://api.cashfree.com/pg/orders", {
      method: "POST",
      headers: {
        "Content-Type":    "application/json",
        "x-client-id":     CASHFREE_APP_ID,
        "x-client-secret": CASHFREE_SECRET_KEY,
        "x-api-version":   "2023-08-01",
      },
      body: JSON.stringify(orderPayload),
    });

    const cfData = await cfRes.json();

    console.log("Cashfree create-order response:", JSON.stringify(cfData));

    if (!cfRes.ok || !cfData.payment_session_id) {
      console.error("Cashfree error:", cfData);
      return NextResponse.json(
        { error: cfData?.message || "Failed to create payment order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success:          true,
      orderId:          orderId,
      paymentSessionId: cfData.payment_session_id,
      orderAmount:      CONSULTATION_FEE,
      bookingDetails:   { name, email, phone, service, date, time, notes },
    });

  } catch (error: any) {
    console.error("create-order error:", error?.message || error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
