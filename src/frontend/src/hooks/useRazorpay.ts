/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Razorpay: any;
  }
}

export type RazorpayOptions = {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description?: string;
  image?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  handler?: (response: { razorpay_payment_id: string }) => void;
  modal?: {
    ondismiss?: () => void;
  };
};

import { useEffect, useState } from "react";

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

export function useRazorpay() {
  const [isLoaded, setIsLoaded] = useState(
    typeof window !== "undefined" && !!window.Razorpay,
  );

  useEffect(() => {
    // Already available on window
    if (window.Razorpay) {
      setIsLoaded(true);
      return;
    }

    // Script already injected but not yet loaded
    const existing = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => setIsLoaded(true));
      return;
    }

    // Inject script
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  const openRazorpay = (options: RazorpayOptions) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded yet");
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return { isLoaded, openRazorpay };
}
