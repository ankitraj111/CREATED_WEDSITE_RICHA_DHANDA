import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendLeadNotification } from "@/lib/leadEmail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, visa, message, notes, consultationDate, consultationTime, bookingType, paymentAmount, orderId } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (Email or Phone) are required." },
        { status: 400 }
      );
    }

    const actualService = service || visa || "General Legal Inquiry";
    const actualMessage = message || notes || "";

    // 1. Save lead into Firebase Firestore contacts collection
    if (db) {
      try {
        await addDoc(collection(db, "contacts"), {
          name,
          email: email || "",
          phone: phone || "",
          service: actualService,
          message: actualMessage,
          consultationDate: consultationDate || null,
          consultationTime: consultationTime || null,
          bookingType: !!bookingType,
          createdAt: serverTimestamp(),
        });
        console.log("[ContactAPI] Lead saved to Firebase Firestore contacts collection.");
      } catch (dbErr) {
        console.warn("[ContactAPI] Firebase save warning (non-critical):", dbErr);
      }
    }

    // 2. Multi-channel Email Notification (Resend + FormSubmit fallback)
    const emailResult = await sendLeadNotification({
      name,
      email,
      phone,
      service: actualService,
      message: actualMessage,
      consultationDate,
      consultationTime,
      bookingType,
      paymentAmount,
      orderId,
    });

    return NextResponse.json({
      success: true,
      message: "Lead received and processed successfully.",
      emailSent: emailResult.success,
      deliveryMethod: (emailResult as any).deliveryMethod,
      emailId: (emailResult as any).emailId,
      error: (emailResult as any).error,
    });
  } catch (error) {
    console.error("[ContactAPI] Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing request." },
      { status: 500 }
    );
  }
}
