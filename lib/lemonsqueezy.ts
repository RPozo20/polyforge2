import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";

/**
 * Ensures that the Lemon Squeezy SDK is configured before making API calls.
 */
export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) {
    console.warn("LEMONSQUEEZY_API_KEY is not set. Checkout features will not work.");
    return;
  }
  
  lemonSqueezySetup({
    apiKey,
    onError: (error) => console.error("Lemon Squeezy API Error:", error),
  });
}
