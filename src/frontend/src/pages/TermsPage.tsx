import { useEffect } from "react";
import PolicyLayout from "./PolicyLayout";

export default function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | SolTrek";
  }, []);

  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website or placing an order."
      activeLink="/terms"
    >
      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using the SolTrek website (soltrek.in) or placing an
        order with us, you agree to be bound by these Terms & Conditions. If you
        do not agree to these terms, please do not use our website.
      </p>

      <h2>Website Usage Rules</h2>
      <p>When using our website, you agree to:</p>
      <ul>
        <li>
          Use the website only for lawful purposes and in accordance with these
          terms
        </li>
        <li>
          Not attempt to gain unauthorized access to any part of the website or
          its servers
        </li>
        <li>
          Not engage in scraping, crawling, or automated data collection without
          our written permission
        </li>
        <li>
          Not reproduce, distribute, or create derivative works from our content
          without permission
        </li>
        <li>
          Not submit false or misleading information during checkout or contact
          forms
        </li>
        <li>
          Not use the website to transmit spam, malware, or any harmful content
        </li>
        <li>Maintain the confidentiality of any account credentials</li>
      </ul>

      <h2>Eligibility</h2>
      <p>By placing an order on our website, you confirm that you are:</p>
      <ul>
        <li>At least 18 years of age</li>
        <li>
          Legally capable of entering into a binding contract under Indian law
        </li>
        <li>Providing accurate and complete information during checkout</li>
        <li>
          Placing an order for personal use or as an authorised representative
          of a business
        </li>
      </ul>

      <h2>Product Information</h2>
      <p>
        We make every effort to ensure product descriptions, images, and
        specifications are accurate. However, we reserve the right to:
      </p>
      <ul>
        <li>Correct any errors or omissions in product information</li>
        <li>
          Update product specifications without prior notice (improvements,
          component changes)
        </li>
        <li>Withdraw products from sale at any time</li>
        <li>Limit order quantities at our discretion</li>
      </ul>
      <p>
        Actual product colours may vary slightly from images due to monitor
        calibration differences. This does not constitute grounds for a return.
      </p>

      <h2>Payment Terms</h2>
      <p>
        By placing an order, you agree to pay the full amount displayed at
        checkout, including:
      </p>
      <ul>
        <li>Product price (inclusive of applicable GST)</li>
        <li>Shipping charges (if applicable for COD orders)</li>
        <li>
          Any applicable transaction fees (charged by your bank, not by us)
        </li>
      </ul>
      <p>
        All prices are displayed in Indian Rupees (INR). We accept payment via
        Razorpay's supported methods: UPI, credit/debit cards, net banking,
        wallets, and EMI. We do not accept cash payments.
      </p>
      <p>
        Orders are confirmed only after successful payment authorization. We
        reserve the right to cancel orders where payment fails or fraud is
        suspected. In such cases, any amount charged will be fully refunded
        within 5–7 business days.
      </p>

      <h2>Shipping Conditions</h2>
      <p>By placing an order, you confirm that:</p>
      <ul>
        <li>The delivery address provided is accurate and complete</li>
        <li>A responsible person will be available to receive the delivery</li>
        <li>
          You accept our estimated delivery timelines (4–7 business days, see
          Shipping Policy)
        </li>
      </ul>
      <p>
        Title (ownership) of products passes to you upon successful delivery.
        Risk passes to you upon delivery to the address provided. We are not
        responsible for loss or damage after successful delivery.
      </p>
      <p>
        For our complete shipping terms, please review our{" "}
        <a href="/shipping">Shipping Policy</a>.
      </p>

      <h2>Returns and Refunds</h2>
      <p>
        Our return and refund policy is governed by our separate{" "}
        <a href="/returns">Returns & Refund Policy</a>, which forms part of
        these Terms & Conditions. Key points:
      </p>
      <ul>
        <li>7-day return window from delivery date for unused items</li>
        <li>Defective items replaced or refunded at our cost</li>
        <li>Refunds processed via the original payment method</li>
      </ul>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable Indian law, SolTrek's
        total liability for any claim arising from your use of our website or
        products shall not exceed the amount you paid for the specific product
        giving rise to the claim.
      </p>
      <p>We shall not be liable for:</p>
      <ul>
        <li>Indirect, incidental, or consequential damages</li>
        <li>Loss of profits, data, or business opportunities</li>
        <li>Personal injury arising from misuse of our products</li>
        <li>
          Delays or failures due to circumstances beyond our control (force
          majeure)
        </li>
        <li>Third-party services or websites linked from our website</li>
      </ul>
      <p>
        Nothing in these terms excludes or limits liability for death or
        personal injury caused by our negligence, fraud, or any liability that
        cannot be excluded under Indian law.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on the SolTrek website — including text, images, logos,
        product designs, graphics, videos, and software — is owned by or
        licensed to SolTrek and protected by Indian and international copyright,
        trademark, and intellectual property laws.
      </p>
      <p>You may not:</p>
      <ul>
        <li>
          Reproduce, copy, or republish any content without written permission
        </li>
        <li>Use our brand name, logo, or trademarks without authorization</li>
        <li>Create derivative works based on our content</li>
        <li>
          Use our content for commercial purposes without a license agreement
        </li>
      </ul>
      <p>
        For licensing or collaboration inquiries, contact us at{" "}
        <strong>support@soltrek.in</strong>.
      </p>

      <h2>User Reviews and Content</h2>
      <p>
        By submitting a review or any content on our website, you grant us a
        non-exclusive, royalty-free license to use, display, and modify that
        content for marketing and promotional purposes. You warrant that your
        review is genuine, accurate, and does not infringe any third-party
        rights.
      </p>
      <p>
        We reserve the right to remove reviews that are abusive, defamatory,
        misleading, or violate these terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms & Conditions are governed by and construed in accordance
        with the laws of India. Any disputes arising from your use of our
        website or products shall be subject to the exclusive jurisdiction of
        the courts of Bengaluru, Karnataka.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update these Terms & Conditions at any time. Continued use of our
        website after changes are posted constitutes acceptance of the updated
        terms. The date of last update is shown at the top of this page.
      </p>

      <h2>Contact Us</h2>
      <p>For any questions about these Terms & Conditions:</p>
      <ul>
        <li>
          <strong>Email</strong>: legal@soltrek.in
        </li>
        <li>
          <strong>Address</strong>: SolTrek, 12, Tech Park Road, Whitefield,
          Bengaluru – 560066
        </li>
      </ul>
    </PolicyLayout>
  );
}
