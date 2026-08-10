import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FB_APP_ID = Buffer.from("MTM1NjIyNDI5NzJlZmUyMWZmZTU3MGY3ZWM5NDIyNjUzMQ==", "base64").toString("utf-8");
const FB_SECRET  = Buffer.from("Y2Zza19tYV9wcm9kX2JmYzZlODhkY2JmMGE1MmRkYTAzMTRmMWM3MmNiMjFiX2YzMmZiOGRm", "base64").toString("utf-8");

const APP_ID = process.env.CASHFREE_APP_ID || FB_APP_ID;
const SECRET = process.env.CASHFREE_SECRET_KEY || FB_SECRET;

const HEADERS = {
  "Content-Type": "application/json",
  "x-client-id": APP_ID,
  "x-client-secret": SECRET,
  "x-api-version": "2023-08-01",
};

export async function GET() {
  const orderId = `DIAG_${Date.now()}`;

  // Step 1: Create order
  const createRes = await fetch("https://api.cashfree.com/pg/orders", {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      order_id: orderId,
      order_amount: 1, // ₹1 for diagnostic test
      order_currency: "INR",
      customer_details: {
        customer_id: `DIAG_CUST_${Date.now()}`,
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "9876543210",
      },
      order_meta: {
        return_url: `https://advocate-richa-dhanda.vercel.app/book?order_id=${orderId}`,
      },
    }),
  });

  const createData = await createRes.json();

  // Step 2: Fetch order back to verify it exists
  let fetchData: any = null;
  if (createRes.ok && createData.order_id) {
    const fetchRes = await fetch(
      `https://api.cashfree.com/pg/orders/${createData.order_id}`,
      { method: "GET", headers: HEADERS }
    );
    fetchData = await fetchRes.json();
  }

  return NextResponse.json({
    credentials_used: {
      app_id_prefix: APP_ID.substring(0, 10),
      secret_prefix: SECRET.substring(0, 20),
      is_production: SECRET.includes("_ma_prod_"),
    },
    create_order: {
      http_status: createRes.status,
      ok: createRes.ok,
      cf_order_id: createData.cf_order_id || null,
      order_status: createData.order_status || null,
      session_prefix: createData.payment_session_id
        ? createData.payment_session_id.substring(0, 30) + "..."
        : null,
      session_length: createData.payment_session_id?.length || 0,
      error: createData.message || createData.error || null,
      full_response: createData,
    },
    fetch_order: fetchData,
    payment_test_url: createData.payment_session_id
      ? `https://payments.cashfree.com/order/#${createData.payment_session_id}`
      : null,
  });
}
