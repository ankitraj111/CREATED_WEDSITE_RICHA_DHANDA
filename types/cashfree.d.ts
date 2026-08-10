declare module "@cashfreepayments/cashfree-js" {
  export function load(options: { mode: "sandbox" | "production" }): Promise<{
    checkout: (options: {
      paymentSessionId: string;
      redirectTarget?: "_self" | "_blank" | "_modal" | HTMLElement;
      returnUrl?: string;
    }) => Promise<{ error?: { message?: string }; redirect?: boolean }>;
  }>;
}
