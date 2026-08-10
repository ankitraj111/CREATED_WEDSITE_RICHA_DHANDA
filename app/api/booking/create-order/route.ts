import { NextResponse } from "next/server";
import { cashfree } from "@/lib/cashfree";

const CONSULTATION_FEE = 499; // ₹499

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }



    const orderId = `BOOK_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

    const orderRequest = {
      order_amount: CONSULTATION_FEE,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: `CUST_${Date.now()}`,
        customer_name: name,
        customer_email: email,
        customer_phone: phone.replace(/[^0-9+]/g, ""),
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app"}/book?order_id=${orderId}`,
      },
      order_note: `Legal Consultation - ${service || "General"} | ${date} at ${time}`,
    };

    const response = await cashfree.PGCreateOrder(orderRequest);

    if (response?.data) {
      return NextResponse.json({
        success: true,
        orderId: orderId,
        paymentSessionId: response.data.payment_session_id,
        orderAmount: CONSULTATION_FEE,
        bookingDetails: { name, email, phone, service, date, time, notes },
      });
    } else {
      console.error("Cashfree PGCreateOrder returned no data");
      return NextResponse.json(
        { error: "Failed to create payment order" },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error creating Cashfree order:", error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data?.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
