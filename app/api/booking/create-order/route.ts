import { NextResponse } from "next/server";
import { createOrder } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, date, time, notes } = body;

    // Validate required fields
    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a unique receipt ID
    const receipt = `booking_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Create Razorpay order for ₹499
    const order = await createOrder(499, receipt);

    return NextResponse.json({
      orderId: order.id,
      amount: 499,
      currency: "INR",
      bookingDetails: { name, email, phone, service, date, time, notes },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
