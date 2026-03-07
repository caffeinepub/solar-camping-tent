import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const POLICY_LINKS = [
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Returns & Refunds", to: "/returns" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

export default function PolicyLayout({
  title,
  subtitle,
  children,
  activeLink,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  activeLink: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-forest-dark pt-24 pb-12">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-amber-brand font-black text-xs tracking-[0.2em] uppercase mb-3">
            SolTrek
          </p>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl leading-tight mb-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/70 text-base mt-2">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 items-start">
          {/* Sidebar nav */}
          <aside className="lg:sticky lg:top-24 space-y-1">
            <p className="text-xs font-black tracking-widest uppercase text-muted-foreground mb-3 px-3">
              Policy Pages
            </p>
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeLink === link.to
                    ? "bg-forest text-primary-foreground"
                    : "text-foreground hover:bg-earth hover:text-forest"
                }`}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            ))}
            <div className="pt-4 px-3">
              <p className="text-xs text-muted-foreground">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="text-forest hover:underline font-semibold"
                >
                  Contact us
                </Link>
              </p>
            </div>
          </aside>

          {/* Main content */}
          <main className="prose prose-sm sm:prose-base max-w-none text-foreground prose-headings:font-display prose-headings:font-black prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-forest prose-a:no-underline hover:prose-a:underline">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
