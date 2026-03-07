import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useNavigate,
} from "@tanstack/react-router";
import {
  Battery,
  Check,
  ChevronDown,
  CloudRain,
  Facebook,
  Feather,
  Instagram,
  Loader2,
  Menu,
  Star,
  Sun,
  Twitter,
  Usb,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "./admin-panel/components/AdminLayout";
import AdminAnalyticsPage from "./admin-panel/pages/AdminAnalyticsPage";
import AdminCustomersPage from "./admin-panel/pages/AdminCustomersPage";
import AdminDashboardPage from "./admin-panel/pages/AdminDashboardPage";
import AdminLoginPage from "./admin-panel/pages/AdminLoginPage";
import AdminOrdersPage from "./admin-panel/pages/AdminOrdersPage";
import AdminProductsPage from "./admin-panel/pages/AdminProductsPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import { CartProvider } from "./contexts/CartContext";
import { useActor } from "./hooks/useActor";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProductPage from "./pages/ProductPage";
import ReturnsPage from "./pages/ReturnsPage";
import ShippingPage from "./pages/ShippingPage";
import ShopPage from "./pages/ShopPage";
import TermsPage from "./pages/TermsPage";

/* ─── Scroll Animation Hook ─────────────────────────────────── */
function useFadeInUp() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <img
        src="/assets/generated/hero-tent.dim_1600x900.jpg"
        alt="Solar Camping Tent in dramatic mountain setting"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Subtle green tint overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-forest-dark/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto animate-[fade-in-up_0.9s_ease-out_forwards]">
        {/* Eyebrow tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-brand/20 border border-amber-brand/40 mb-7 backdrop-blur-sm">
          <Sun className="w-3.5 h-3.5 text-amber-brand" />
          <span className="text-amber-brand text-xs font-black tracking-[0.18em] uppercase">
            Solar-Powered Camping
          </span>
        </div>

        {/* Thin ornamental rule under eyebrow — signature detail */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/30" />
          <div className="w-1 h-1 rounded-full bg-amber-brand/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/30" />
        </div>

        {/* Three-line cinematic headline */}
        <h1 className="font-display font-black text-white hero-headline mb-3">
          Power Your
        </h1>
        <h1 className="font-display font-black text-amber-brand italic hero-headline mb-3">
          Adventure
        </h1>
        <h1 className="font-display font-black text-white hero-headline mb-8">
          Anywhere
        </h1>

        <p className="text-white/80 text-lg sm:text-xl font-medium max-w-xl mx-auto mb-10 leading-relaxed tracking-wide">
          Suraj ki power, Har camp ke sath
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            data-ocid="hero.primary_button"
            onClick={() => navigate({ to: "/shop" })}
            className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-black text-base px-9 py-6 transition-all duration-150 active:scale-[0.98]"
          >
            Shop Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            data-ocid="hero.secondary_button"
            onClick={() => navigate({ to: "/product/solar-camping-tent" })}
            className="border-2 border-white/70 text-white bg-white/5 hover:bg-white/15 hover:border-white font-bold text-base px-9 py-6 transition-all duration-150 active:scale-[0.98] backdrop-blur-sm"
          >
            View Solar Tent
          </Button>
        </div>

        {/* Stats bar */}
        <div className="mt-14 inline-flex flex-wrap gap-0 justify-center rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm overflow-hidden divide-x divide-white/10">
          {[
            { value: "1W", label: "Solar Panel" },
            { value: "1.8kg", label: "Total Weight" },
            { value: "₹5,999", label: "Launch Price" },
            { value: "60s", label: "Setup Time" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-6 py-4">
              <div className="font-display text-2xl sm:text-3xl font-black text-amber-brand">
                {stat.value}
              </div>
              <div className="text-white/60 text-xs font-semibold tracking-widest uppercase mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-subtle">
        <ChevronDown className="w-7 h-7 text-white/60" />
      </div>
    </section>
  );
}

/* ─── Benefits ───────────────────────────────────────────────── */
const benefits = [
  {
    icon: Sun,
    title: "Built-in Solar Panel",
    desc: "1W monocrystalline solar panel charges your phone directly from sunlight. No power banks required.",
  },
  {
    icon: CloudRain,
    title: "2000mm Waterproof",
    desc: "Engineered to withstand India's heaviest monsoon rains. Rated 2000mm HH with taped seams.",
  },
  {
    icon: Zap,
    title: "60-Second Setup",
    desc: "Color-coded poles and intuitive design get you shelter in under a minute — even in the dark.",
  },
  {
    icon: Usb,
    title: "Universal USB Charging",
    desc: "Standard USB-A port inside the tent charges phones, GPS devices, headlamps, and cameras.",
  },
  {
    icon: Feather,
    title: "Ultra-Lightweight",
    desc: "Only 1.8 kg. Built with 210D ripstop nylon — trail-tested across Himalayan altitudes.",
  },
  {
    icon: Battery,
    title: "1-Year Warranty",
    desc: "Manufacturing defect warranty on tent body, poles, and solar panel. Real support from real adventurers.",
  },
];

function Benefits() {
  const ref = useFadeInUp();

  return (
    <section id="features" className="py-24 bg-background scroll-mt-20">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Why SolTrek
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
              Built for the Wilderness.{" "}
              <span className="text-forest italic">Powered by the Sun.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Every feature is engineered for adventurers who refuse to
              compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="group bg-card rounded-2xl border border-earth-dark/70 p-7 hover:border-forest/35 hover:-translate-y-2 hover:shadow-card-hover transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="icon-container w-12 h-12 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-forest" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display font-black text-lg text-foreground mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
const steps = [
  {
    num: "01",
    icon: Sun,
    title: "Collect",
    desc: "The integrated 1W monocrystalline solar panel on the rain fly absorbs sunlight throughout the day.",
  },
  {
    num: "02",
    icon: Battery,
    title: "Convert",
    desc: "Solar energy converts to DC electricity and routes via weatherproof cable to the USB port inside.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Charge",
    desc: "Plug in your phone, GPS, or headlamp via standard USB-A. Full phone charge in 2–3 hours of sun.",
  },
];

function HowItWorks() {
  const ref = useFadeInUp();

  return (
    <section
      id="how-it-works"
      className="py-24 bg-earth section-divider-top scroll-mt-20"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Technology
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Simple. <span className="text-forest italic">Smart.</span> Solar.
            </h2>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col md:flex-row gap-8 md:gap-0">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px bg-gradient-to-r from-amber-brand via-amber-brand/50 to-amber-brand" />

            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="flex-1 flex flex-col items-center text-center px-6 relative"
                >
                  {/* Number badge */}
                  <div className="w-14 h-14 rounded-full bg-amber-brand flex items-center justify-center shadow-amber mb-6 relative z-10">
                    <span className="font-display font-black text-lg text-accent-foreground">
                      {step.num}
                    </span>
                  </div>

                  {/* Arrow (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="md:hidden w-px h-8 bg-amber-brand/40 my-2" />
                  )}

                  <div className="w-16 h-16 rounded-2xl bg-forest/10 flex items-center justify-center mb-5">
                    <Icon className="w-8 h-8 text-forest" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-display font-black text-2xl text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Call-out box */}
          <div className="mt-16 rounded-2xl bg-forest p-8 sm:p-10 text-center relative overflow-hidden">
            {/* Decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-brand/10 rounded-full blur-3xl pointer-events-none" />
            <p className="relative text-white/90 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              In 6–8 hours of direct Indian summer sun, the SolTrek Solo
              generates enough power to fully charge a smartphone{" "}
              <strong className="text-amber-brand font-black">
                once completely
              </strong>{" "}
              — while you&apos;re out on the trail, nature does the work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Gallery ────────────────────────────────────────────────── */
const galleryImages = [
  {
    src: "/assets/generated/gallery-forest.dim_800x600.jpg",
    alt: "Solar tent in lush forest",
  },
  {
    src: "/assets/generated/gallery-lake.dim_800x600.jpg",
    alt: "Solar tent beside alpine lake",
  },
  {
    src: "/assets/generated/gallery-solar-detail.dim_800x600.jpg",
    alt: "Close-up of solar panels",
  },
  {
    src: "/assets/generated/gallery-desert.dim_800x600.jpg",
    alt: "Solar tent in desert canyon",
  },
  {
    src: "/assets/generated/gallery-alpine.dim_800x600.jpg",
    alt: "Solar tent on alpine ridge",
  },
  {
    src: "/assets/generated/gallery-night-interior.dim_800x600.jpg",
    alt: "Tent interior at night with charging devices",
  },
];

function Gallery() {
  const ref = useFadeInUp();
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="py-24 bg-background section-divider-top scroll-mt-20"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Gallery
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
              See It <span className="text-forest italic">in the Wild</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {galleryImages.map((img, i) => (
              <button
                type="button"
                key={img.src}
                data-ocid={`gallery.item.${i + 1}`}
                className="gallery-img-wrap rounded-xl overflow-hidden aspect-[4/3] cursor-zoom-in focus-visible:ring-2 focus-visible:ring-forest"
                onClick={() => setLightboxIdx(i)}
                aria-label={`View: ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox dialog */}
      <Dialog
        open={lightboxIdx !== null}
        onOpenChange={(open) => !open && setLightboxIdx(null)}
      >
        <DialogContent className="max-w-5xl p-0 bg-black border-0 overflow-hidden">
          {lightboxIdx !== null && (
            <img
              src={galleryImages[lightboxIdx].src}
              alt={galleryImages[lightboxIdx].alt}
              className="w-full h-auto max-h-[90vh] object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────── */
const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Himachal Trek, Hampta Pass",
    initials: "RS",
    stars: 5,
    quote:
      "Took this to Hampta Pass. By day 2, every other trekker's phone was dead — mine had 80% battery. The solar charging actually works. Absolutely game-changing for Himalayan treks.",
  },
  {
    name: "Priya Nair",
    role: "Solo Trekker, Western Ghats",
    initials: "PN",
    stars: 5,
    quote:
      "As a solo female trekker, having a charged phone for emergencies is non-negotiable. This tent solved that problem completely. Waterproofing held through a Western Ghats monsoon day.",
  },
  {
    name: "Arjun Mehta",
    role: "Trail Runner, Uttarakhand",
    initials: "AM",
    stars: 5,
    quote:
      "1.8 kg is light enough for my fast-and-light style. Set up in under 60 seconds — timed it. The build quality is premium and the solar panel actually delivers.",
  },
  {
    name: "Ananya Bose",
    role: "Weekend Camper, Coorg",
    initials: "AB",
    stars: 4,
    quote:
      "Weekend camping in Coorg — tent was perfect. Charged my phone and camera battery over the weekend. The setup instructions are super clear. Great value at ₹5,999.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i <= count ? "text-amber-brand fill-amber-brand" : "text-muted-foreground"}`}
        />
      ))}
    </div>
  );
}

function Testimonials() {
  const ref = useFadeInUp();

  return (
    <section
      id="testimonials"
      className="py-24 bg-earth section-divider-top scroll-mt-20"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Reviews
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Trusted by <span className="text-forest italic">Adventurers</span>{" "}
              Across India
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border border-earth-dark/60 p-8 hover:border-forest/25 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
              >
                <StarRating count={t.stars} />
                <p className="text-foreground text-base leading-relaxed mt-4 mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-black">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-sm text-foreground">
                      {t.name}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ────────────────────────────────────────────────── */
type PricingTier = {
  id: string;
  name: string;
  price: string;
  recommended?: boolean;
  features: string[];
  ocid: string;
  btnOcid: string;
};

const pricingTiers: PricingTier[] = [
  {
    id: "solo",
    name: "Solo",
    price: "₹5,999",
    ocid: "pricing.item.1",
    btnOcid: "pricing.solo.button",
    features: [
      "1-person capacity",
      "1W solar panel",
      "USB-A charging port",
      "2000mm waterproof",
      "1.8 kg total weight",
      "1-year warranty",
    ],
  },
  {
    id: "duo",
    name: "Duo",
    price: "₹8,999",
    recommended: true,
    ocid: "pricing.item.2",
    btnOcid: "pricing.duo.button",
    features: [
      "2-person capacity",
      "2W solar panel",
      "2× USB-A ports",
      "2000mm waterproof",
      "2.4 kg total weight",
      "Free stuff sack included",
      "1-year warranty",
    ],
  },
  {
    id: "family",
    name: "Pro",
    price: "₹12,999",
    ocid: "pricing.item.3",
    btnOcid: "pricing.pro.button",
    features: [
      "2-person capacity",
      "5W solar panel + 10000mAh battery",
      "3× USB-A ports",
      "2000mm waterproof + IPX6 fly",
      "LED interior lighting",
      "Free footprint + stuff sack",
      "1-year warranty",
    ],
  },
];

function Pricing() {
  const ref = useFadeInUp();
  const navigate = useNavigate();

  return (
    <section
      id="pricing"
      className="py-24 bg-background section-divider-top scroll-mt-20"
    >
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Pricing
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
              Choose Your <span className="text-forest italic">Solar Tent</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Free delivery across India. 7-day returns. 1-year warranty on
              every tent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                data-ocid={tier.ocid}
                className={`rounded-2xl border-2 p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-nature relative ${
                  tier.recommended
                    ? "border-amber-brand shadow-amber bg-card"
                    : "border-border bg-card"
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-brand text-accent-foreground text-xs font-black px-4 py-1.5 rounded-full shadow-amber uppercase tracking-wide">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-display font-black text-2xl text-foreground mb-1">
                    {tier.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-black text-4xl text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      / one-time
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.recommended ? "text-amber-brand" : "text-forest"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  data-ocid={tier.btnOcid}
                  size="lg"
                  onClick={() =>
                    navigate({
                      to: "/checkout",
                      search: { plan: tier.id },
                    })
                  }
                  className={`w-full font-bold transition-all duration-150 active:scale-[0.98] ${
                    tier.recommended
                      ? "btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground"
                      : "bg-forest hover:bg-forest-dark text-primary-foreground shadow-[0_2px_0_oklch(0.22_0.08_155)] hover:shadow-[0_1px_0_oklch(0.22_0.08_155)] hover:translate-y-px"
                  }`}
                >
                  Buy Solar Tent
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How long does it take to charge a phone?",
    a: "In direct sunlight, a 4000mAh smartphone charges in approximately 2–3 hours from 0–100%. In partial shade or cloudy conditions, expect longer charging times.",
  },
  {
    q: "Is it suitable for India's monsoon season?",
    a: "Yes. The SolTrek Solo has a 2000mm waterproof head rating with factory-taped seams. We've tested it in Coorg and Kodaikanal during peak monsoon — it stays bone dry inside.",
  },
  {
    q: "How fast is the setup really?",
    a: "Under 60 seconds with the color-coded pole system. Most customers master it in under 30 seconds by the second or third time. A quick setup video is included with every purchase.",
  },
  {
    q: "Does it work on cloudy or overcast days?",
    a: "Yes, at reduced efficiency — expect 20–30% capacity on overcast days. On bright cloudy days (common in Indian hill stations), you'll still generate useful charge.",
  },
  {
    q: "What devices can I charge?",
    a: "Any device with a USB-A cable: smartphones, GPS trackers, headlamps, cameras, Bluetooth speakers, and smart watches. Works with all major brands including iPhone (with cable), Android, and GPS devices.",
  },
  {
    q: "What is the return policy?",
    a: "7-day returns from delivery date on all unused, unused items in original packaging. Defective items are replaced or refunded at no cost at any time during the 1-year warranty period.",
  },
  {
    q: "Does it come with a warranty?",
    a: "Yes — 1-year manufacturing defect warranty covering tent body, poles, seams, zipper, and the solar panel. Real support via WhatsApp and email, Mon–Sat 9AM–7PM.",
  },
];

function FAQ() {
  const ref = useFadeInUp();

  return (
    <section
      id="faq"
      className="py-24 bg-earth section-divider-top scroll-mt-20"
    >
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <div className="fade-in-up" ref={ref}>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              FAQ
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Got Questions?{" "}
              <span className="text-forest italic">
                We&apos;ve Got Answers.
              </span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`item-${i + 1}`}
                data-ocid={`faq.item.${i + 1}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-forest/40 data-[state=open]:shadow-nature transition-all duration-200"
              >
                <AccordionTrigger className="font-bold text-left text-foreground hover:no-underline py-5 hover:text-forest transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ─── Newsletter ─────────────────────────────────────────────── */
function Newsletter() {
  const ref = useFadeInUp();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const { actor } = useActor();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      setStatus("loading");
      try {
        if (actor) {
          await actor.subscribe(email.trim());
        }
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
      }
    },
    [email, actor],
  );

  return (
    <section id="newsletter" className="py-24 bg-forest">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <div className="fade-in-up" ref={ref}>
          <div className="w-16 h-16 rounded-2xl bg-amber-brand/20 flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8 text-amber-brand" strokeWidth={1.5} />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
            Join India&apos;s Solar{" "}
            <span className="text-amber-brand italic">Adventure Community</span>
          </h2>
          <p className="text-white/75 text-lg mb-10 leading-relaxed">
            Get exclusive deals, trekking tips, and gear launches — straight to
            your inbox.
          </p>

          {status === "success" ? (
            <div
              data-ocid="newsletter.success_state"
              className="bg-amber-brand/15 border border-amber-brand/40 rounded-xl px-8 py-6 text-white text-lg font-semibold"
            >
              <span className="text-amber-brand text-2xl mr-2">✓</span>
              You&apos;re in! Check your inbox for a welcome from the wild.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
            >
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-ocid="newsletter.input"
                className="bg-white/10 border-white/25 text-white placeholder:text-white/50 focus:border-amber-brand focus:ring-amber-brand flex-1 h-12"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                data-ocid="newsletter.submit_button"
                className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold h-12 px-7 whitespace-nowrap transition-all duration-150 active:scale-[0.98] disabled:opacity-70"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span data-ocid="newsletter.loading_state">
                      Subscribing…
                    </span>
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          {status === "error" && (
            <p
              data-ocid="newsletter.error_state"
              className="mt-4 text-red-300 text-sm font-medium"
            >
              Something went wrong. Please try again.
            </p>
          )}

          <p className="text-white/40 text-xs mt-5">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── HomePage ───────────────────────────────────────────────── */
function HomePage() {
  useEffect(() => {
    document.title =
      "SolTrek - Solar Powered Camping Tents | Smart Outdoor Adventure";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

/* ─── Layout Wrapper (for pages with standard Navbar/Footer) ─── */
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

/* ─── Router Setup ───────────────────────────────────────────── */
const rootRoute = createRootRoute({
  component: () => (
    <CartProvider>
      <Outlet />
      <Toaster richColors position="top-right" />
    </CartProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: () => (
    <>
      <CheckoutPage />
      <WhatsAppButton />
    </>
  ),
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: () => (
    <PageLayout>
      <ShopPage />
    </PageLayout>
  ),
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/solar-camping-tent",
  component: () => (
    <PageLayout>
      <ProductPage />
    </PageLayout>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <PageLayout>
      <AboutPage />
    </PageLayout>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <PageLayout>
      <ContactPage />
    </PageLayout>
  ),
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shipping",
  component: () => (
    <PageLayout>
      <ShippingPage />
    </PageLayout>
  ),
});

const returnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/returns",
  component: () => (
    <PageLayout>
      <ReturnsPage />
    </PageLayout>
  ),
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: () => (
    <PageLayout>
      <PrivacyPage />
    </PageLayout>
  ),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: () => (
    <PageLayout>
      <TermsPage />
    </PageLayout>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <PageLayout>
      <CartPage />
    </PageLayout>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <PageLayout>
      <BlogPage />
    </PageLayout>
  ),
});

/* ─── Admin Routes ───────────────────────────────────────────── */
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-dashboard",
  component: () => (
    <AdminLayout pageTitle="Dashboard">
      <AdminDashboardPage />
    </AdminLayout>
  ),
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-orders",
  component: () => (
    <AdminLayout pageTitle="Orders Management">
      <AdminOrdersPage />
    </AdminLayout>
  ),
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-customers",
  component: () => (
    <AdminLayout pageTitle="Customer Database">
      <AdminCustomersPage />
    </AdminLayout>
  ),
});

const adminProductsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-products",
  component: () => (
    <AdminLayout pageTitle="Product Inventory">
      <AdminProductsPage />
    </AdminLayout>
  ),
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-analytics",
  component: () => (
    <AdminLayout pageTitle="Analytics">
      <AdminAnalyticsPage />
    </AdminLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  checkoutRoute,
  shopRoute,
  productRoute,
  aboutRoute,
  contactRoute,
  shippingRoute,
  returnsRoute,
  privacyRoute,
  termsRoute,
  cartRoute,
  blogRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminOrdersRoute,
  adminCustomersRoute,
  adminProductsRoute,
  adminAnalyticsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
  return <RouterProvider router={router} />;
}
