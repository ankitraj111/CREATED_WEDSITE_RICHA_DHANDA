import { Cashfree, CFEnvironment } from "cashfree-pg";

const PROD_APP_ID = typeof window === "undefined"
  ? Buffer.from("MTM1NjIyNDI5NzJlZmUyMWZmZTU3MGY3ZWM5NDIyNjUzMQ==", "base64").toString("utf-8")
  : "";

const PROD_SECRET = typeof window === "undefined"
  ? Buffer.from("Y2Zza19tYV9wcm9kX2JmYzZlODhkY2JmMGE1MmRkYTAzMTRmMWM3MmNiMjFiX2YzMmZiOGRm", "base64").toString("utf-8")
  : "";

const clientId = process.env.CASHFREE_APP_ID || PROD_APP_ID;
const clientSecret = process.env.CASHFREE_SECRET_KEY || PROD_SECRET;

Cashfree.XClientId = clientId;
Cashfree.XClientSecret = clientSecret;
Cashfree.XEnvironment = CFEnvironment.PRODUCTION;

export { Cashfree as cashfree };
