import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

const NAV_LINKS = [
  { label: "Shop", to: "/shop" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const routerState = useRouterState();
  const isHome = routerState.location.pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // For home page: transparent until scrolled; for other pages: always solid
  const solidBg = !isHome || scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidBg
          ? "bg-white/95 backdrop-blur-md shadow-xs border-b border-earth-dark"
          : "bg-transparent"
      }`}
    >
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          data-ocid="nav.link.1"
        >
          <img
            src="/assets/generated/soltrek-logo-transparent.dim_400x400.png"
            alt="SolTrek logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <li key={link.label}>
              <Link
                to={link.to}
                data-ocid={`nav.link.${i + 2}`}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-amber-brand ${
                  solidBg ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop: Cart + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            aria-label="Shopping cart"
            data-ocid="nav.cart_button"
            onClick={() => navigate({ to: "/cart" })}
            className={`relative p-2 rounded-lg transition-colors hover:bg-amber-brand/10 ${
              solidBg ? "text-foreground" : "text-white"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-brand text-accent-foreground text-[10px] font-black border-0 shadow-amber">
                {totalItems > 9 ? "9+" : totalItems}
              </Badge>
            )}
          </button>
          <Link to="/shop">
            <Button className="btn-amber-stamp bg-amber-brand text-accent-foreground hover:bg-amber-dark font-bold px-5 transition-all duration-150 active:scale-[0.98]">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            aria-label="Shopping cart"
            data-ocid="nav.cart_button"
            onClick={() => navigate({ to: "/cart" })}
            className={`relative p-2 rounded-lg transition-colors ${
              solidBg ? "text-foreground" : "text-white"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-brand text-accent-foreground text-[10px] font-black border-0 shadow-amber">
                {totalItems > 9 ? "9+" : totalItems}
              </Badge>
            )}
          </button>
          <button
            type="button"
            className="p-2 rounded-md transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileOpen ? (
              <X
                className={`w-6 h-6 ${solidBg ? "text-foreground" : "text-white"}`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${solidBg ? "text-foreground" : "text-white"}`}
              />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-earth-dark shadow-nature px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1 mb-4">
            <li>
              <Link
                to="/"
                data-ocid="nav.link.1"
                className="block py-2.5 px-3 rounded-md text-foreground font-semibold hover:bg-earth transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
            </li>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  data-ocid={`nav.link.${i + 2}`}
                  className="block py-2.5 px-3 rounded-md text-foreground font-semibold hover:bg-earth transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/shop" onClick={() => setMobileOpen(false)}>
            <Button className="w-full btn-amber-stamp bg-amber-brand text-accent-foreground hover:bg-amber-dark font-bold active:scale-[0.98]">
              Shop Now
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
