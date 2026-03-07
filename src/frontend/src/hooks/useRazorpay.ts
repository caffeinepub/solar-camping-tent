/* Dummy Razorpay hook — no external SDK loaded */
export type RazorpayOptions = {
  key?: string;
  amount: number; // in paise
  currency?: string;
  name?: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler?: (response: { razorpay_payment_id: string }) => void;
  modal?: { ondismiss?: () => void };
};

// This hook is kept for API compatibility but the actual modal is
// rendered inline in CheckoutPage using React state.
// isLoaded is always true — no external script needed.
export function useRazorpay() {
  return {
    isLoaded: true,
    // openRazorpay is intentionally a no-op here; CheckoutPage manages the modal directly.
    openRazorpay: (_options: RazorpayOptions) => {},
  };
}
