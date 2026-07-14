import { google } from "googleapis";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

// Create OAuth2 client
export function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL || "https://advocate-richa-dhanda.vercel.app"}/api/auth/callback/google`
  );
}

// Generate auth URL for initial setup
export function getAuthUrl() {
  const oauth2Client = getOAuth2Client();
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });
}

// Store refresh token in Firebase
export async function storeRefreshToken(token: string) {
  await setDoc(doc(db, "settings", "google_calendar"), {
    refreshToken: token,
    updatedAt: new Date().toISOString(),
  });
}

// Get refresh token from Firebase
export async function getRefreshToken(): Promise<string | null> {
  const docSnap = await getDoc(doc(db, "settings", "google_calendar"));
  if (docSnap.exists()) {
    return docSnap.data().refreshToken;
  }
  return null;
}

// Get authenticated calendar client
export async function getCalendarClient() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return null;
  }
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials({ refresh_token: refreshToken });
  return google.calendar({ version: "v3", auth: oauth2Client });
}

// Business hours configuration
export const BUSINESS_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null, // Sunday - closed
  1: { start: 10, end: 18 }, // Monday 10AM-6PM
  2: { start: 10, end: 18 }, // Tuesday
  3: { start: 10, end: 18 }, // Wednesday
  4: { start: 10, end: 18 }, // Thursday
  5: { start: 10, end: 18 }, // Friday
  6: { start: 10, end: 14 }, // Saturday 10AM-2PM
};

const SLOT_DURATION_MINUTES = 30;

// Generate all possible slots for a given date
function generateAllSlots(date: Date): { time: string; hour: number; minute: number }[] {
  const dayOfWeek = date.getDay();
  const hours = BUSINESS_HOURS[dayOfWeek];
  if (!hours) return [];

  const slots: { time: string; hour: number; minute: number }[] = [];
  for (let h = hours.start; h < hours.end; h++) {
    for (let m = 0; m < 60; m += SLOT_DURATION_MINUTES) {
      const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      const displayHour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayTime = `${displayHour}:${m.toString().padStart(2, "0")} ${ampm}`;
      slots.push({ time: displayTime, hour: h, minute: m });
    }
  }
  return slots;
}

// Get available slots for a date (check Google Calendar for conflicts)
export async function getAvailableSlots(dateStr: string) {
  const date = new Date(dateStr);
  const allSlots = generateAllSlots(date);
  if (allSlots.length === 0) return [];

  const calendar = await getCalendarClient();

  if (!calendar) {
    // If no calendar connected, return all slots (check only Firebase)
    return allSlots.map((s) => ({ time: s.time, available: true }));
  }

  try {
    // Set timezone to IST
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        timeZone: "Asia/Kolkata",
        items: [{ id: "primary" }],
      },
    });

    const busySlots = response.data.calendars?.primary?.busy || [];

    return allSlots.map((slot) => {
      const slotStart = new Date(date);
      slotStart.setHours(slot.hour, slot.minute, 0, 0);
      const slotEnd = new Date(slotStart);
      slotEnd.setMinutes(slotEnd.getMinutes() + SLOT_DURATION_MINUTES);

      const isBusy = busySlots.some((busy) => {
        const busyStart = new Date(busy.start!);
        const busyEnd = new Date(busy.end!);
        return slotStart < busyEnd && slotEnd > busyStart;
      });

      return { time: slot.time, available: !isBusy };
    });
  } catch {
    // If Calendar API fails, return all slots as available
    return allSlots.map((s) => ({ time: s.time, available: true }));
  }
}

// Create a calendar event for a booking
export async function createCalendarEvent(booking: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  const calendar = await getCalendarClient();
  if (!calendar) return null;

  // Parse the time string
  const timeParts = booking.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!timeParts) return null;

  let hour = parseInt(timeParts[1]);
  const minute = parseInt(timeParts[2]);
  const ampm = timeParts[3].toUpperCase();

  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;

  const startDate = new Date(booking.date);
  startDate.setHours(hour, minute, 0, 0);
  const endDate = new Date(startDate);
  endDate.setMinutes(endDate.getMinutes() + SLOT_DURATION_MINUTES);

  try {
    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: `Consultation - ${booking.name}`,
        description: `Client: ${booking.name}\nPhone: ${booking.phone}\nEmail: ${booking.email}\nService: ${booking.service}\nNotes: ${booking.notes || "N/A"}`,
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "Asia/Kolkata",
        },
        attendees: booking.email ? [{ email: booking.email }] : [],
        reminders: {
          useDefault: false,
          overrides: [
            { method: "email", minutes: 60 },
            { method: "popup", minutes: 30 },
          ],
        },
      },
    });
    return event.data;
  } catch {
    console.error("Failed to create calendar event");
    return null;
  }
}
