import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FB_APP_ID = Buffer.from("MTM1NjIyNDI5NzJlZmUyMWZmZTU3MGY3ZWM5NDIyNjUzMQ==", "base64").toString("utf-8");
const FB_SECRET  = Buffer.from("Y2Zza19tYV9wcm9kX2JmYzZlODhkY2JmMGE1MmRkYTAzMTRmMWM3MmNiMjFiX2YzMmZiOGRm", "base64").toString("utf-8");

export async function GET() {
  const appId  = process.env.CASHFREE_APP_ID     || FB_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY || FB_SECRET;
  const envAppId  = process.env.CASHFREE_APP_ID     || "";
  const envSecret = process.env.CASHFREE_SECRET_KEY || "";

  return NextResponse.json({
    using_env_vars:      !!process.env.CASHFREE_APP_ID,
    appId_first_10:      appId.substring(0, 10),
    appId_last_4:        appId.slice(-4),
    appId_length:        appId.length,
    secret_first_20:     secret.substring(0, 20),
    secret_last_4:       secret.slice(-4),
    secret_length:       secret.length,
    is_production:       secret.includes("_ma_prod_"),
    env_appId_first_10:  envAppId.substring(0, 10) || "NOT_SET",
    env_secret_first_20: envSecret.substring(0, 20) || "NOT_SET",
    env: process.env.NODE_ENV,
  });
}
