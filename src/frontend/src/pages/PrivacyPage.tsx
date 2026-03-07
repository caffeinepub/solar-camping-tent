import { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | SolTrek";
  }, []);

  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="We respect your privacy and are committed to protecting your personal data."
      activeLink="/privacy"
    >
      <h2>Introduction</h2>
      <p>
        SolTrek ("we", "us", or "our") operates the website soltrek.in. This
        Privacy Policy explains how we collect, use, disclose, and protect your
        personal information when you visit our website, make a purchase, or
        interact with us in any way. By using our website, you consent to the
        practices described in this policy.
      </p>

      <h2>Information We Collect</h2>
      <p>We collect the following categories of personal information:</p>
      <ul>
        <li>
          <strong>Order information</strong>: Name, email address, phone number,
          shipping address, and payment details when you place an order
        </li>
        <li>
          <strong>Account information</strong>: Email address and preferences if
          you create an account
        </li>
        <li>
          <strong>Communication data</strong>: Messages you send us via email,
          contact form, or WhatsApp
        </li>
        <li>
          <strong>Usage data</strong>: Pages visited, time spent on site,
          products viewed, and browser/device information
        </li>
        <li>
          <strong>Marketing preferences</strong>: Whether you have opted in to
          receive email marketing
        </li>
      </ul>

      <h2>Cookies and Tracking</h2>
      <p>
        Our website uses cookies and similar tracking technologies to enhance
        your browsing experience. These include:
      </p>
      <ul>
        <li>
          <strong>Essential cookies</strong>: Required for core website
          functions (shopping cart, checkout)
        </li>
        <li>
          <strong>Analytics cookies</strong>: Google Analytics to understand how
          visitors use our site
        </li>
        <li>
          <strong>Marketing cookies</strong>: Facebook Pixel and similar tools
          to show relevant ads
        </li>
        <li>
          <strong>Preference cookies</strong>: Remembering your language and
          currency settings
        </li>
      </ul>
      <p>
        You can control cookies through your browser settings. Disabling
        non-essential cookies will not affect your ability to browse or purchase
        from our website.
      </p>

      <h2>How We Use Your Information</h2>
      <p>We use your personal information to:</p>
      <ul>
        <li>Process and fulfil your orders</li>
        <li>
          Send order confirmations, shipping updates, and delivery notifications
        </li>
        <li>Respond to your customer service inquiries</li>
        <li>Send marketing emails (only if you have opted in)</li>
        <li>
          Improve our website and product offerings based on usage patterns
        </li>
        <li>Prevent fraud and ensure transaction security</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>Payment Security</h2>
      <p>
        All payment transactions on our website are processed through{" "}
        <strong>Razorpay</strong>, a PCI DSS compliant payment gateway. We do
        not store your full credit card or debit card numbers on our servers.
        Payment data is encrypted using <strong>256-bit SSL encryption</strong>{" "}
        during transmission.
      </p>
      <p>
        For UPI and bank transfers, transactions are processed through secure,
        RBI-approved payment rails. Your financial credentials are never stored
        or accessible to SolTrek employees.
      </p>

      <h2>Email Marketing</h2>
      <p>If you opt in to our email newsletter, we will send you:</p>
      <ul>
        <li>New product announcements and launches</li>
        <li>Exclusive discounts and seasonal offers</li>
        <li>Trekking tips and adventure content</li>
        <li>Company news and updates</li>
      </ul>
      <p>
        You can unsubscribe from marketing emails at any time by clicking the
        "Unsubscribe" link in any email, or by contacting us at
        support@soltrek.in. We will never sell or rent your email address to
        third parties.
      </p>

      <h2>Data Sharing</h2>
      <p>We share your information only in the following circumstances:</p>
      <ul>
        <li>
          <strong>Delivery partners</strong> (Delhivery, Blue Dart, Shiprocket)
          — to fulfil your order
        </li>
        <li>
          <strong>Payment processors</strong> (Razorpay) — to process
          transactions
        </li>
        <li>
          <strong>Analytics providers</strong> (Google Analytics, Facebook) — in
          anonymised/aggregated form
        </li>
        <li>
          <strong>Legal authorities</strong> — when required by law or court
          order
        </li>
      </ul>
      <p>
        We do not sell your personal data to third parties for marketing
        purposes.
      </p>

      <h2>Data Protection and Security</h2>
      <p>
        We implement appropriate technical and organisational measures to
        protect your personal data against unauthorised access, loss, or misuse.
        These include:
      </p>
      <ul>
        <li>SSL/TLS encryption for all data transmission</li>
        <li>Regular security audits and vulnerability testing</li>
        <li>Access controls limiting data access to authorised personnel</li>
        <li>Secure cloud storage with leading providers</li>
      </ul>

      <h2>Your Rights</h2>
      <p>
        Under applicable Indian data protection laws, you have the right to:
      </p>
      <ul>
        <li>
          <strong>Access</strong> the personal data we hold about you
        </li>
        <li>
          <strong>Correct</strong> inaccurate or incomplete personal data
        </li>
        <li>
          <strong>Delete</strong> your personal data (subject to legal retention
          requirements)
        </li>
        <li>
          <strong>Opt out</strong> of marketing communications at any time
        </li>
        <li>
          <strong>Lodge a complaint</strong> with the relevant data protection
          authority
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{" "}
        <strong>support@soltrek.in</strong>. We will respond within 30 days.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Our website is not directed at children under the age of 13. We do not
        knowingly collect personal information from children. If you believe we
        have inadvertently collected data from a child, please contact us
        immediately.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of significant changes via email or a prominent notice on our website.
        Continued use of our website after changes are posted constitutes
        acceptance of the updated policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        For any privacy-related queries or to exercise your rights, contact our
        Data Protection Officer:
      </p>
      <ul>
        <li>
          <strong>Email</strong>: privacy@soltrek.in
        </li>
        <li>
          <strong>Address</strong>: SolTrek, 12, Tech Park Road, Whitefield,
          Bengaluru – 560066
        </li>
      </ul>
    </PolicyLayout>
  );
}
