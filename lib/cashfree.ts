import { Cashfree, CFEnvironment } from "cashfree-pg";

const environment =
  process.env.CASHFREE_MODE === "production"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

const clientId = process.env.CASHFREE_APP_ID || "";
const clientSecret = process.env.CASHFREE_SECRET_KEY || "";

export const cashfree = new Cashfree(environment, clientId, clientSecret);
