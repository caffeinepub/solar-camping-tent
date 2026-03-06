# Solar Camping Tent — Razorpay Integration

## Current State
The checkout page (`CheckoutPage.tsx`) has a custom-built payment UI that mimics Razorpay's look with manually built tabs for Cards, UPI, Net Banking, Wallets, EMI, and Bank Transfer. Clicking "Pay Now" simply simulates a 2-second delay and shows a success state. There is no actual payment SDK loaded.

## Requested Changes (Diff)

### Add
- Load the real Razorpay Checkout JS SDK (`https://checkout.razorpay.com/v1/checkout.js`) via a `<script>` tag injected dynamically in the CheckoutPage.
- A `useRazorpay` custom hook that:
  - Loads the Razorpay script once, caches it (idempotent).
  - Exposes `openRazorpay(options)` to launch the native Razorpay modal.
- A Razorpay configuration object built from the selected plan price (in paise), pre-filled with customer name, email, phone from the shipping form.
- A `RAZORPAY_KEY_ID` config value (test key placeholder `rzp_test_YOUR_KEY_HERE`) at the top of CheckoutPage so the user can replace it.
- Razorpay `handler` callback: on successful payment, capture `razorpay_payment_id` and show the existing SuccessState with that payment ID in the order details card.
- Razorpay `modal.ondismiss` callback: reset `isPaying` back to false so the button re-enables.
- Razorpay theming: `color: "#D97706"` (amber brand), `description: "SunCamp Gear — SolarTent"`.
- Show a "Setup your Razorpay Key" banner at the top of the payment section when the key is still the placeholder, guiding the merchant to replace it.

### Modify
- `handlePayNow`: Instead of the fake timeout, validate the shipping form first, then call `openRazorpay()` to launch the real modal.
- The custom payment tabs UI (Cards, UPI, Net Banking, etc.) is replaced with a single "Pay Securely with Razorpay" button section that shows accepted payment method icons (UPI, Visa, Mastercard, RuPay, Netbanking) as a visual trust strip below the button — since Razorpay's own modal handles all method selection.
- Order summary card: show the Payment ID returned from Razorpay in the success screen.
- The "Pay Now" button label updated to "Pay with Razorpay" with the Razorpay logo/icon treatment.

### Remove
- The 6-tab custom payment section (Cards, UPI, Net Banking, Wallets, EMI, Bank Transfer tabs) — the real Razorpay modal natively provides all these options.
- The fake 2-second `setTimeout` simulation.

## Implementation Plan
1. Add `useRazorpay` hook in `src/hooks/useRazorpay.ts` — dynamically injects the Razorpay checkout script, returns `{ isLoaded, openRazorpay }`.
2. Rewrite the `PaymentSection` component in `CheckoutPage.tsx` to show a clean Razorpay pay button with payment method icons strip.
3. Update `handlePayNow` to call `openRazorpay` with order amount (in paise), currency INR, pre-filled customer data, theme color, and success/dismiss callbacks.
4. Add a setup banner for the placeholder key.
5. Pass `paymentId` from Razorpay handler into `SuccessState` to display it.
6. Validate and deploy.
