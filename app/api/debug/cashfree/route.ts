import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const appId = process.env.CASHFREE_APP_ID || "NOT_SET";
  const secret = process.env.CASHFREE_SECRET_KEY || "NOT_SET";

  return NextResponse.json({
    appId_prefix: appId.substring(0, 8),
    appId_length: appId.length,
    secret_prefix: secret.substring(0, 16),
    secret_length: secret.length,
    is_production_secret: secret.includes("_ma_prod_"),
    env: process.env.NODE_ENV,
  });
}
