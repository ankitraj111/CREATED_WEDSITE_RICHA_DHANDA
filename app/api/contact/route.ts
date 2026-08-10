import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "Advocatericha29@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message, consultationDate, consultationTime, bookingType } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (Email or Phone) are required." },
        { status: 400 }
      );
    }

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const apiKey = process.env.RESEND_API_KEY;

    const emailSubject = bookingType
      ? `🚨 New Legal Consultation Booking: ${name}`
      : `📩 New Website Lead: ${name} (${service || "General Inquiry"})`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background-color: #ffffff;">
        <div style="border-bottom: 2px solid #8B1538; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #0B1426; margin: 0; font-size: 20px;">Advocate Richa Dhanda — New Website Lead</h2>
          <p style="color: #8B1538; margin: 4px 0 0 0; font-size: 13px; font-weight: bold;">Official Client Inquiry Notification</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
          <tr>
            <td style="padding: 10px; font-weight: bold; width: 140px; background-color: #f9fafb; border: 1px solid #f3f4f6;">Full Name:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6;"><strong>${name}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Email:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6;"><a href="mailto:${email}">${email || "Not Provided"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Phone / Mobile:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6;"><a href="tel:${phone}">${phone || "Not Provided"}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Service / Visa Type:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6;"><span style="background-color: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${service || "General Legal Query"}</span></td>
          </tr>
          ${
            consultationDate || consultationTime
              ? `
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Consultation Time:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6; color: #1e40af; font-weight: bold;">📅 ${consultationDate || ""} ${consultationTime ? `at ${consultationTime}` : ""}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Message / Notes:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6; white-space: pre-wrap;">${message || "No additional message provided."}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Submission Time:</td>
            <td style="padding: 10px; border: 1px solid #f3f4f6; color: #6b7280; font-size: 12px;">${submissionTime}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 11px;">
          This is an automated notification from <a href="https://advocate-richa-dhanda.vercel.app" style="color: #2563eb;">advocate-richa-dhanda.vercel.app</a>
        </div>
      </div>
    `;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const data = await resend.emails.send({
        from: "Advocate Richa Dhanda Leads <onboarding@resend.dev>",
        to: [RECIPIENT_EMAIL],
        subject: emailSubject,
        html: htmlContent,
      });

      console.log("Resend email sent successfully:", data);
      return NextResponse.json({ success: true, message: "Lead submitted successfully and email sent." });
    } else {
      console.warn("RESEND_API_KEY variable is missing. Simulated submission recorded.");
      return NextResponse.json({
        success: true,
        message: "Lead recorded (Resend API Key pending in Vercel environment variables).",
      });
    }
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { error: "Internal Server Error processing request." },
      { status: 500 }
    );
  }
}
