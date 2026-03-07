import { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function ReturnsPage() {
  useEffect(() => {
    document.title = "Returns & Refunds Policy | SolTrek";
  }, []);

  return (
    <PolicyLayout
      title="Returns & Refund Policy"
      subtitle="We want you to love your gear. If something isn't right, we'll make it right."
      activeLink="/returns"
    >
      <h2>Our Return Promise</h2>
      <p>
        At SolTrek, we stand behind the quality of everything we sell. If you're
        not completely satisfied with your purchase, we offer a straightforward{" "}
        <strong>7-day return window</strong> from the date of delivery — no
        questions asked for unused items.
      </p>

      <h2>Return Eligibility</h2>
      <p>
        To qualify for a return, your item must meet the following conditions:
      </p>
      <ul>
        <li>
          Returned within <strong>7 days</strong> from the delivery date
        </li>
        <li>
          Product must be <strong>unused, unwashed, and undamaged</strong>
        </li>
        <li>All original tags, labels, and packaging must be intact</li>
        <li>
          All accessories and components included in the original box must be
          returned
        </li>
        <li>Original invoice / order confirmation must be provided</li>
      </ul>

      <h2>Non-Returnable Items</h2>
      <p>The following items cannot be returned or refunded:</p>
      <ul>
        <li>Products that have been used outdoors or show signs of use</li>
        <li>Items returned after 7 days of delivery</li>
        <li>Products damaged due to misuse, accidents, or improper storage</li>
        <li>
          Products with removed or tampered serial numbers / warranty stickers
        </li>
        <li>
          Items purchased during final sale or clearance events (marked as
          non-returnable)
        </li>
      </ul>

      <h2>Defective or Damaged Items</h2>
      <p>
        If you receive a defective or damaged product, we will replace or refund
        it at no extra cost — even outside the standard 7-day window, as long as
        it falls within the warranty period.
      </p>
      <p>
        To report a defective item, please email us at{" "}
        <strong>support@soltrek.in</strong> with:
      </p>
      <ul>
        <li>Your order number</li>
        <li>Clear photos of the defect / damage</li>
        <li>A brief description of the issue</li>
      </ul>
      <p>
        We will assess your claim within 2 business days and arrange a
        replacement or refund accordingly.
      </p>

      <h2>How to Initiate a Return</h2>
      <ol>
        <li>
          Email <strong>support@soltrek.in</strong> with your order number and
          reason for return
        </li>
        <li>
          Our team will review your request and send you a{" "}
          <strong>Return Authorization Number (RAN)</strong> within 2 business
          days
        </li>
        <li>
          Pack the product securely in its original packaging and include the
          RAN on the outer box
        </li>
        <li>
          Ship the package to our warehouse address (we will provide this in the
          return authorization email)
        </li>
        <li>
          Once received, we will inspect the item within{" "}
          <strong>2–3 business days</strong>
        </li>
        <li>
          Refund or replacement will be processed after successful inspection
        </li>
      </ol>
      <p>
        <strong>Note:</strong> Return shipping costs are borne by the customer
        unless the item is defective or damaged due to our error.
      </p>

      <h2>Refund Process</h2>
      <p>
        Once your return is inspected and approved, your refund will be
        processed within <strong>5–7 business days</strong>. Refunds are issued
        via the{" "}
        <strong>same payment method used for the original purchase</strong>:
      </p>
      <ul>
        <li>
          <strong>Credit / Debit Card</strong>: Refunded to the original card
          (2–5 business days to reflect)
        </li>
        <li>
          <strong>UPI / Net Banking</strong>: Credited to the original account
          (1–3 business days)
        </li>
        <li>
          <strong>Wallets (Paytm, PhonePe, etc.)</strong>: Refunded to the
          original wallet (1–2 business days)
        </li>
        <li>
          <strong>Cash on Delivery</strong>: Refunded via bank transfer or UPI
          (you will need to provide account details)
        </li>
      </ul>
      <p>
        You will receive an email confirmation when your refund is processed. If
        you have not received your refund within 10 business days of our
        confirmation, please contact your bank before reaching out to us.
      </p>

      <h2>Exchange / Replacement Policy</h2>
      <p>
        For defective or damaged items, we offer a{" "}
        <strong>free replacement</strong> of the same product. We do not offer
        size exchanges for tents and gear, as all products are sold in standard
        configurations.
      </p>

      <h2>Warranty Claims</h2>
      <p>
        All SolTrek Solar Tents come with a{" "}
        <strong>1-year manufacturing defect warranty</strong>. Warranty claims
        cover:
      </p>
      <ul>
        <li>
          Solar panel failure or significant efficiency degradation ({">"}20%
          loss)
        </li>
        <li>Pole breakage under normal use</li>
        <li>Seam failure causing water ingress</li>
        <li>Zipper failure</li>
        <li>USB port malfunction</li>
      </ul>
      <p>
        Warranty does not cover: accidental damage, normal wear and tear, UV
        degradation after 12 months, or damage caused by improper storage or
        misuse.
      </p>

      <h2>Contact Us</h2>
      <p>For return and refund queries, please contact:</p>
      <ul>
        <li>
          <strong>Email</strong>: support@soltrek.in
        </li>
        <li>
          <strong>Phone</strong>: +91 98765 43210 (Mon–Sat, 9AM–7PM IST)
        </li>
        <li>
          <strong>WhatsApp</strong>: +91 98765 43210
        </li>
      </ul>
    </PolicyLayout>
  );
}
