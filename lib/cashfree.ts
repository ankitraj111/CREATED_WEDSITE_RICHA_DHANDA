import { Cashfree, CFEnvironment } from "cashfree-pg";

const clientId = process.env.CASHFREE_APP_ID || "";
const clientSecret = process.env.CASHFREE_SECRET_KEY || "";

// Auto-detect environment: PRODUCTION if key starts with numbers or mode === production, otherwise SANDBOX
const environment =
  process.env.CASHFREE_MODE === "production" || (!clientId.startsWith("TEST") && clientId.length > 0)
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

export const cashfree = new Cashfree(environment, clientId, clientSecret);
