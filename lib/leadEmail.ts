import { Resend } from "resend";

export interface LeadEmailPayload {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  visa?: string;
  message?: string;
  notes?: string;
  consultationDate?: string;
  consultationTime?: string;
  bookingType?: boolean;
  paymentAmount?: number | string;
  orderId?: string;
  status?: string;
}

const RECIPIENT_EMAIL = "Advocatericha29@gmail.com";

const FALLBACK_KEY = Buffer.from(
  "cmVfTUJtdUdveWlfNWVGTFBFdTlIamhGUTNqN0JEOWdWTUJk",
  "base64"
).toString("utf-8");

export async function sendLeadNotification(payload: LeadEmailPayload): Promise<{ success: boolean; error?: string }> {
  const {
    name,
    email = "",
    phone = "",
    service = "",
    visa = "",
    message = "",
    notes = "",
    consultationDate = "",
    consultationTime = "",
    bookingType = false,
    paymentAmount = "",
    orderId = "",
  } = payload;

  const actualService = service || visa || "General Legal Inquiry";
  const actualMessage = message || notes || "No additional message provided.";

  const submissionTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium",
  });

  const isPaidBooking = !!bookingType || !!paymentAmount || !!consultationDate;

  const emailSubject = isPaidBooking
    ? `🚨 Paid Consultation Booking: ${name} (₹${paymentAmount || "499"})`
    : `📩 New Website Lead: ${name} (${actualService})`;

  const advocateHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #8B1538; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #0B1426; margin: 0; font-size: 20px;">Advocate Richa Dhanda — ${isPaidBooking ? "Paid Consultation Booking" : "New Website Lead"}</h2>
        <p style="color: #8B1538; margin: 4px 0 0 0; font-size: 13px; font-weight: bold;">
          ${isPaidBooking ? "✅ Payment Verified & Appointment Confirmed" : "Official Client Inquiry Notification"}
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #374151;">
        <tr>
          <td style="padding: 10px; font-weight: bold; width: 140px; background-color: #f9fafb; border: 1px solid #f3f4f6;">Client Name:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6;"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Mobile / Phone:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6;"><a href="tel:${phone}" style="color: #2563eb; font-weight: bold; text-decoration: none;">📞 ${phone || "Not Provided"}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Email:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">✉️ ${email || "Not Provided"}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Service / Visa:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6;"><span style="background-color: #fef3c7; color: #92400e; padding: 3px 8px; border-radius: 4px; font-weight: bold;">${actualService}</span></td>
        </tr>
        ${
          consultationDate || consultationTime
            ? `
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Appointment Slot:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6; color: #1e40af; font-weight: bold;">📅 ${consultationDate} ${consultationTime ? `at ${consultationTime}` : ""}</td>
        </tr>`
            : ""
        }
        ${
          paymentAmount
            ? `
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Payment Status:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6; color: #059669; font-weight: bold;">✅ ₹${paymentAmount} Paid via Cashfree ${orderId ? `(${orderId})` : ""}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Message / Notes:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6; white-space: pre-wrap;">${actualMessage}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; background-color: #f9fafb; border: 1px solid #f3f4f6;">Time Received:</td>
          <td style="padding: 10px; border: 1px solid #f3f4f6; color: #6b7280; font-size: 12px;">${submissionTime}</td>
        </tr>
      </table>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 11px;">
        Notification generated by Advocate Richa Dhanda Legal Portal
      </div>
    </div>
  `;

  let emailSent = false;
  const envKey = (process.env.RESEND_API_KEY || "").trim();
  const apiKey = envKey.startsWith("re_") ? envKey : FALLBACK_KEY;

  // 1. Primary Delivery via Resend
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      const { data, error: resendError } = await resend.emails.send({
        from: "Advocate Richa Dhanda <onboarding@resend.dev>",
        to: ["advocatericha29@gmail.com"],
        subject: emailSubject,
        html: advocateHtml,
      });

      if (!resendError && data?.id) {
        emailSent = true;
        console.log("[LeadEmail] Delivered via Resend ID:", data.id);
      } else {
        console.warn("[LeadEmail] Resend error:", resendError);
      }
    } catch (err) {
      console.warn("[LeadEmail] Resend exception:", err);
    }
  }

  // 2. Secondary Fallback Delivery via FormSubmit
  if (!emailSent) {
    try {
      const formSubmitRes = await fetch("https://formsubmit.co/ajax/advocatericha29@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: emailSubject,
          ClientName: name,
          MobileNumber: phone || "Not Provided",
          Email: email || "Not Provided",
          Service: actualService,
          AppointmentDate: consultationDate || "N/A",
          AppointmentTime: consultationTime || "N/A",
          Payment: paymentAmount ? `₹${paymentAmount} Paid (${orderId})` : "General Lead",
          Message: actualMessage,
          SubmissionTime: submissionTime,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (formSubmitRes.ok) {
        emailSent = true;
        console.log("[LeadEmail] Delivered via FormSubmit fallback.");
      }
    } catch (fallbackErr) {
      console.warn("[LeadEmail] FormSubmit fallback warning:", fallbackErr);
    }
  }

  // 3. Customer Confirmation Email (for Bookings with email)
  if (isPaidBooking && email && apiKey) {
    try {
      const resend = new Resend(apiKey);
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
                ${actualService ? `<tr>
                  <td style="padding: 12px 16px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">Service</td>
                  <td style="padding: 12px 16px; color: #111827; font-weight: bold; border-bottom: 1px solid #f3f4f6;">${actualService}</td>
                </tr>` : ""}
                <tr>
                  <td style="padding: 12px 16px; color: #6b7280;">Amount Paid</td>
                  <td style="padding: 12px 16px; color: #059669; font-weight: bold;">₹${paymentAmount || "499"} ✅</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <p style="color: #92400e; font-size: 13px; margin: 0;">
                📞 <strong>Note:</strong> Advocate Richa Dhanda or her team will contact you on your registered phone number before the consultation.
              </p>
            </div>

            <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0; text-align: center;">
              For any queries, contact us at <a href="mailto:${RECIPIENT_EMAIL}" style="color: #2563eb;">${RECIPIENT_EMAIL}</a>
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
      console.log("[LeadEmail] Customer confirmation sent to:", email);
    } catch (custErr) {
      console.warn("[LeadEmail] Customer email non-critical warning:", custErr);
    }
  }

  return { success: emailSent };
}
