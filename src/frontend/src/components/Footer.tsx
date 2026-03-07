import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "Solar Camping Tent", to: "/product/solar-camping-tent" },
    { label: "Shop All Gear", to: "/shop" },
    { label: "New Arrivals", to: "/shop" },
  ],
  Company: [
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Blog", to: "#" },
  ],
  Support: [
    { label: "FAQ", to: "/contact#faq" },
    { label: "Shipping Policy", to: "/shipping" },
    { label: "Returns & Refunds", to: "/returns" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms & Conditions", to: "/terms" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-forest-dark text-white/85 pt-16 pb-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-06-at-10.39.20-PM-1.jpeg"
                alt="SolTrek logo"
                className="w-10 h-10 object-contain rounded-md"
              />
              <span className="font-display font-black text-xl text-white">
                SolTrek
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              Solar-powered camping gear for the modern adventurer. Never run
              out of battery in the wild again.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Facebook, label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={`https://www.${label.toLowerCase()}.com`}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-amber-brand hover:text-accent-foreground transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-black text-white text-xs tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-white/55 text-sm hover:text-amber-brand transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges strip */}
        <div className="border-t border-white/10 pt-8 mb-6">
          <div className="flex flex-wrap justify-center gap-4 text-white/40 text-xs">
            {[
              "🔒 SSL Secured",
              "🚚 Free Shipping",
              "↩ 7-Day Returns",
              "⭐ 1-Year Warranty",
              "🇮🇳 Made for India",
            ].map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-xs">
          <p>© {currentYear} SolTrek. All rights reserved.</p>
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-brand transition-colors duration-200"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
