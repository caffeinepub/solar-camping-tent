import { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function ShippingPage() {
  useEffect(() => {
    document.title = "Shipping Policy | SolTrek";
  }, []);

  return (
    <PolicyLayout
      title="Shipping Policy"
      subtitle="Last updated: March 2025"
      activeLink="/shipping"
    >
      <h2>Overview</h2>
      <p>
        At SolTrek, we work hard to get your adventure gear to you as quickly
        and safely as possible. This policy covers all orders placed on our
        website (soltrek.in) for delivery within India.
      </p>

      <h2>Processing Time</h2>
      <p>
        All orders are processed within <strong>24–48 hours</strong> of order
        placement (excluding Sundays and public holidays). You will receive an
        order confirmation email immediately after placing your order, followed
        by a shipping confirmation email with tracking details within 24–48
        hours of dispatch.
      </p>

      <h2>Estimated Delivery Time</h2>
      <p>
        Standard delivery takes <strong>4–7 business days</strong> after
        dispatch. Business days are Monday through Saturday, excluding national
        and state public holidays.
      </p>
      <ul>
        <li>
          <strong>Metro cities</strong> (Delhi, Mumbai, Bengaluru, Chennai,
          Hyderabad, Kolkata, Pune): 3–5 business days
        </li>
        <li>
          <strong>Tier-2 and Tier-3 cities</strong>: 4–6 business days
        </li>
        <li>
          <strong>Remote and rural areas</strong>: 6–10 business days
        </li>
      </ul>

      <h2>Shipping Charges</h2>
      <ul>
        <li>
          <strong>Prepaid orders</strong>: FREE shipping across India
        </li>
        <li>
          <strong>Cash on Delivery (COD)</strong>: ₹99 handling charge per order
        </li>
      </ul>
      <p>
        Shipping charges (if applicable) will be clearly shown at checkout
        before you confirm payment.
      </p>

      <h2>Delivery Partners</h2>
      <p>
        We partner with India's most reliable courier networks to ensure safe
        delivery:
      </p>
      <ul>
        <li>
          <strong>Delhivery</strong> – Pan-India coverage including remote areas
        </li>
        <li>
          <strong>Blue Dart</strong> – Express delivery for metro and major
          cities
        </li>
        <li>
          <strong>Shiprocket</strong> – Intelligent multi-carrier routing for
          fastest delivery
        </li>
      </ul>
      <p>
        The delivery partner is automatically assigned based on your pin code
        and order weight to ensure the fastest and most reliable delivery to
        your location.
      </p>

      <h2>Order Tracking</h2>
      <p>Once your order is dispatched, you will receive an email with:</p>
      <ul>
        <li>Your tracking number</li>
        <li>The delivery partner's name</li>
        <li>A direct link to track your shipment in real-time</li>
      </ul>
      <p>
        You can also track your order by visiting the delivery partner's website
        and entering your tracking number. Tracking updates are typically
        available within 24 hours of dispatch.
      </p>

      <h2>Remote Area Shipping</h2>
      <p>
        We ship to all serviceable pin codes in India, including remote and
        northeastern states. Please note:
      </p>
      <ul>
        <li>
          Delivery to remote areas (Ladakh, Arunachal Pradesh, Andaman &
          Nicobar, etc.) may take 8–12 business days
        </li>
        <li>
          Some pin codes may not be serviceable for COD — prepaid payment is
          required in such cases
        </li>
        <li>
          Additional handling charges may apply for certain remote pin codes
        </li>
      </ul>
      <p>
        If your pin code is not serviceable, you will be notified during
        checkout. Please contact our support team at{" "}
        <strong>support@soltrek.in</strong> to arrange alternative delivery
        options.
      </p>

      <h2>Shipping Delays</h2>
      <p>
        While we strive to meet estimated delivery timelines, delays can occur
        due to:
      </p>
      <ul>
        <li>Extreme weather events (floods, storms, heavy snowfall)</li>
        <li>Natural disasters or national emergencies</li>
        <li>Courier operational issues or network disruptions</li>
        <li>High-volume periods (festivals, sale events)</li>
        <li>Incorrect or incomplete delivery address</li>
      </ul>
      <p>
        In case of a significant delay, we will proactively notify you via
        email. For any delivery concerns, please contact us at{" "}
        <strong>support@soltrek.in</strong> or WhatsApp{" "}
        <strong>+91 98765 43210</strong>.
      </p>

      <h2>Undelivered or Returned Packages</h2>
      <p>
        If a package cannot be delivered (incorrect address, recipient
        unavailable after 3 attempts, etc.), it will be returned to our
        warehouse. We will contact you to re-arrange delivery. Please note:
      </p>
      <ul>
        <li>Re-shipment will incur standard shipping charges</li>
        <li>
          Packages returned due to incorrect address will not qualify for free
          re-shipping
        </li>
      </ul>

      <h2>Contact Us</h2>
      <p>For all shipping-related queries, please reach out to us:</p>
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
