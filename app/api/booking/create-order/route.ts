import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic";

const CONSULTATION_FEE = 499; // ₹499

const CASHFREE_APP_ID     = process.env.CASHFREE_APP_ID     || "";
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY || "";
const BASE_URL            = process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Backend duplicate-booking guard: verify slot is not already confirmed in Firestore
    if (db) {
      try {
        const existingQ = query(
          collection(db, "bookings"),
          where("date", "==", date),
          where("time", "==", time),
          where("status", "==", "confirmed")
        );
        const existingSnap = await getDocs(existingQ);
        if (!existingSnap.empty) {
          return NextResponse.json(
            { error: "This slot is already booked. Please choose a different date or time." },
            { status: 409 }
          );
        }
      } catch (dbCheckErr) {
        console.warn("Slot collision check failed (proceeding with caution):", dbCheckErr);
      }
    }

    if (!CASHFREE_APP_ID || !CASHFREE_SECRET_KEY) {
      console.error("Cashfree credentials not configured in environment variables.");
      return NextResponse.json({ error: "Payment gateway not configured." }, { status: 500 });
    }

    const orderId = `BOOK_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Clean customer phone: keep only digits, take last 10
    const cleanPhone = phone.replace(/[^\d]/g, "").slice(-10);

    const host = request.headers.get("host") || "advocate-richa-dhanda-ankitsah9525-5536s-projects.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const originUrl = request.headers.get("origin") || `${protocol}://${host}`;

    const orderPayload = {
      order_id:       orderId,
      order_amount:   CONSULTATION_FEE,
      order_currency: "INR",
      customer_details: {
        customer_id:    `CUST_${Date.now()}`,
        customer_name:  name,
        customer_email: email,
        customer_phone: cleanPhone || "9999999999",
      },
      order_meta: {
        return_url:     `${originUrl}/book?order_id=${orderId}`,
        notify_url:     `${originUrl}/api/webhook/cashfree`,
      },
      order_note: `Legal Consultation - ${service || "General"} | ${date} at ${time}`,
    };

    // Save pending booking to Firestore BEFORE payment
    // This ensures booking details are available even if client state is lost
    if (db) {
      try {
        await addDoc(collection(db, "bookings"), {
          name,
          email,
          phone,
          service: service || "",
          date,
          time,
          notes: notes || "",
          cashfreeOrderId: orderId,
          amount: CONSULTATION_FEE,
          status: "pending",
          createdAt: serverTimestamp(),
        });
        console.log(`[Booking] Pending booking saved for order: ${orderId}`);
      } catch (dbError) {
        console.warn("Firebase pending booking save failed:", dbError);
        // Continue with payment even if DB save fails — verify-payment has fallback
      }
    }

    // Direct Cashfree REST API call
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
