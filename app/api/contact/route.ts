import { NextResponse } from "next/server";
import { Resend } from "resend";

const RECIPIENT_EMAIL = "Advocatericha29@gmail.com";

export const dynamic = "force-dynamic";

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

      // Send notification email to advocate
      const { data, error: sendError } = await resend.emails.send({
        from: "Advocate Richa Dhanda Leads <onboarding@resend.dev>",
        to: ["advocatericha29@gmail.com"],
        subject: emailSubject,
        html: htmlContent,
      });

      if (sendError) {
        console.error("Resend advocate email failed:", sendError);
        return NextResponse.json(
          { error: sendError.message || "Failed to send email" },
          { status: 500 }
        );
      }

      console.log("Resend advocate email sent successfully:", data);

      // Send confirmation email to customer (only for paid bookings)
      if (bookingType && email) {
        try {
          const customerHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #0B1426 0%, #1a2744 100%); padding: 32px 24px; text-align: center;">
                <h1 style="color: #d4af37; margin: 0; font-size: 22px; font-weight: bold;">⚖️ Booking Confirmed</h1>
                <p style="color: #ffffff; margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Your legal consultation has been scheduled</p>
              </div>

              <div style="padding: 24px;">
                <p style="color: #374151; font-size: 14px; margin: 0 0 20px 0;">
                  Dear <strong>${name}</strong>,
                </p>
                <p style="color: #374151; font-size: 14px; margin: 0 0 20px 0;">
                  Thank you for booking a consultation with <strong>Advocate Richa Dhanda</strong>. Your payment has been received and your appointment is confirmed.
                </p>

                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                  <div style="background-color: #0B1426; padding: 12px 16px;">
                    <p style="color: #d4af37; margin: 0; font-size: 13px; font-weight: bold;">APPOINTMENT DETAILS</p>
                  </div>
                  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                      <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6; width: 140px;">Advocate</td>
                      <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Adv. Richa Dhanda</td>
                    </tr>
                    ${consultationDate ? `<tr>
                      <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Date</td>
                      <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">📅 ${consultationDate}</td>
                    </tr>` : ""}
                    ${consultationTime ? `<tr>
                      <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Time</td>
                      <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">🕐 ${consultationTime}</td>
                    </tr>` : ""}
                    <tr>
                      <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Duration</td>
                      <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">30 Minutes</td>
                    </tr>
                    ${service ? `<tr>
                      <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Service</td>
                      <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${service}</td>
                    </tr>` : ""}
                    <tr>
                      <td style="padding: 12px 16px; color: #6b7280;">Amount Paid</td>
                      <td style="padding: 12px 16px; color: #059669; font-weight: bold;">₹499 ✅</td>
                    </tr>
                  </table>
                </div>

                <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
                  <p style="color: #92400e; font-size: 13px; margin: 0;">
                    📞 <strong>Note:</strong> Advocate Richa Dhanda or her team will contact you on your registered phone number/email before the consultation.
                  </p>
                </div>

                <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0; text-align: center;">
                  For any queries, contact us at <a href="mailto:Advocatericha29@gmail.com" style="color: #2563eb;">Advocatericha29@gmail.com</a>
                </p>
              </div>

              <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                  This is an automated confirmation from <a href="https://advocate-richa-dhanda.vercel.app" style="color: #2563eb;">advocate-richa-dhanda.vercel.app</a>
                </p>
              </div>
            </div>
          `;

          await resend.emails.send({
            from: "Advocate Richa Dhanda <onboarding@resend.dev>",
            to: [email],
            subject: `✅ Booking Confirmed — Consultation with Adv. Richa Dhanda${consultationDate ? ` on ${consultationDate}` : ""}`,
            html: customerHtml,
          });
          console.log("Customer confirmation email sent to:", email);
        } catch (custEmailError) {
          console.warn("Customer confirmation email failed (non-critical):", custEmailError);
          // Don't fail the request if customer email fails
        }
      }

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
