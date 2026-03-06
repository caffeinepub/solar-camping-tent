import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { useActor } from "./hooks/useActor";

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

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-xs border-b border-earth-dark"
          : "bg-transparent"
      }`}
    >
      <nav className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          data-ocid="nav.link"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-brand shadow-amber">
            <Sun className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          <span
            className={`font-display font-black text-xl tracking-tight transition-colors ${
              scrolled ? "text-forest-dark" : "text-white"
            }`}
          >
            SolarTent
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <li key={link.label}>
              <a
                href={link.href}
                data-ocid={`nav.link.${i + 1}`}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-amber-brand ${
                  scrolled ? "text-foreground" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#pricing"
          className="hidden md:block"
          data-ocid="nav.primary_button"
        >
          <Button className="btn-amber-stamp bg-amber-brand text-accent-foreground hover:bg-amber-dark font-bold px-5 transition-all duration-150 active:scale-[0.98]">
            Shop Now
          </Button>
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-md transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X
              className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`}
            />
          ) : (
            <Menu
              className={`w-6 h-6 ${scrolled ? "text-foreground" : "text-white"}`}
            />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-earth-dark shadow-nature px-4 pb-6 pt-2">
          <ul className="flex flex-col gap-1 mb-4">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  data-ocid={`nav.link.${i + 1}`}
                  className="block py-2.5 px-3 rounded-md text-foreground font-semibold hover:bg-earth transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            className="w-full btn-amber-stamp bg-amber-brand text-accent-foreground hover:bg-amber-dark font-bold active:scale-[0.98]"
            data-ocid="nav.primary_button"
            onClick={() => {
              setMobileOpen(false);
              window.location.hash = "#pricing";
            }}
          >
            Shop Now
          </Button>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
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
          The world&apos;s smartest camping tent with built-in solar charging.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#pricing">
            <Button
              size="lg"
              data-ocid="hero.primary_button"
              className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-black text-base px-9 py-6 transition-all duration-150 active:scale-[0.98]"
            >
              Shop Now
            </Button>
          </a>
          <a href="#pricing">
            <Button
              size="lg"
              variant="outline"
              data-ocid="hero.secondary_button"
              className="border-2 border-white/70 text-white bg-white/5 hover:bg-white/15 hover:border-white font-bold text-base px-9 py-6 transition-all duration-150 active:scale-[0.98] backdrop-blur-sm"
            >
              Buy Solar Tent
            </Button>
          </a>
        </div>

        {/* Stats bar */}
        <div className="mt-14 inline-flex flex-wrap gap-0 justify-center rounded-2xl bg-white/8 border border-white/12 backdrop-blur-sm overflow-hidden divide-x divide-white/10">
          {[
            { value: "30W", label: "Solar Output" },
            { value: "10,000", label: "mAh Battery" },
            { value: "2.1 kg", label: "Total Weight" },
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
    title: "Built-in Solar Panels",
    desc: "Integrated 30W flexible solar cells charge your gear all day, even in partial shade.",
  },
  {
    icon: CloudRain,
    title: "IPX4 Weather Resistant",
    desc: "Engineered to withstand rain, wind, and harsh conditions so you're always protected.",
  },
  {
    icon: Zap,
    title: "60-Second Setup",
    desc: "Color-coded poles and intuitive design get you shelter in under a minute.",
  },
  {
    icon: Usb,
    title: "Dual USB-C Ports",
    desc: "Power your phone, headlamp, GPS, and more from inside the tent simultaneously.",
  },
  {
    icon: Feather,
    title: "Ultra-Lightweight",
    desc: "Only 2.1 kg. Built with aerospace-grade ripstop fabric for trail-tested durability.",
  },
  {
    icon: Battery,
    title: "48h Off-Grid Power",
    desc: "10,000 mAh internal battery keeps your devices running for days on end.",
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
              Why SolarTent
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
    desc: "Integrated 30W flexible solar panels absorb sunlight throughout the day, maximising every ray.",
  },
  {
    num: "02",
    icon: Battery,
    title: "Store",
    desc: "Energy flows into the built-in 10,000 mAh smart battery with intelligent charge management.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Power",
    desc: "Charge any device via dual USB-C fast-charge ports directly from inside your tent.",
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
              On a full sunny day, the SolarTent generates enough power to fully
              charge a smartphone{" "}
              <strong className="text-amber-brand font-black">
                5 times over
              </strong>{" "}
              — while keeping the battery topped for cloudy days.
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
    name: "Sarah K.",
    role: "Thru-Hiker, PCT",
    initials: "SK",
    stars: 5,
    quote:
      "Absolutely game-changing. I hiked the PCT and never ran out of battery. The setup is incredibly fast and the solar charging actually works — even on overcast Pacific Northwest days.",
  },
  {
    name: "Marcus R.",
    role: "Mountain Biker, Moab",
    initials: "MR",
    stars: 5,
    quote:
      "Packed it into Moab for a week. Charged my GPS, lights, and camera every single day. The IPX4 rating held up flawlessly in a surprise thunderstorm on day four.",
  },
  {
    name: "Priya M.",
    role: "Solo Backcountry Traveler",
    initials: "PM",
    stars: 5,
    quote:
      "Lightweight enough for solo backcountry trips. The dual USB-C ports mean I can charge two devices simultaneously — a game changer when you're deep in the wilderness.",
  },
  {
    name: "Tom & Julia B.",
    role: "Couple Campers",
    initials: "TB",
    stars: 4,
    quote:
      "We upgraded from a basic tent and the difference is night and day. The battery lasted 2 full days during an overcast weekend — exceeded our expectations entirely.",
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
              Worldwide
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
    price: "$299",
    ocid: "pricing.item.1",
    btnOcid: "pricing.solo.button",
    features: [
      "1-person capacity",
      "20W solar panel",
      "6,000 mAh battery",
      "1× USB-C port",
      "IPX4 weather rating",
      "1-year warranty",
    ],
  },
  {
    id: "duo",
    name: "Duo",
    price: "$449",
    recommended: true,
    ocid: "pricing.item.2",
    btnOcid: "pricing.duo.button",
    features: [
      "2-person capacity",
      "30W solar panel",
      "10,000 mAh battery",
      "2× USB-C ports",
      "IPX4 weather rating",
      "Free stuff sack included",
      "2-year warranty",
    ],
  },
  {
    id: "family",
    name: "Family",
    price: "$599",
    ocid: "pricing.item.3",
    btnOcid: "pricing.family.button",
    features: [
      "4-person capacity",
      "40W solar panel",
      "15,000 mAh battery",
      "4× USB-C ports",
      "IPX6 weather rating",
      "Free footprint + stuff sack",
      "3-year warranty + lifetime support",
    ],
  },
];

function Pricing() {
  const ref = useFadeInUp();

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
              Choose Your <span className="text-forest italic">Adventure</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              Every tier ships with free domestic delivery and a 30-day trial.
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
                    <span className="font-display font-black text-5xl text-foreground">
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
    q: "How long does the battery take to fully charge?",
    a: "In direct sunlight, the 10,000 mAh battery charges fully in approximately 4–6 hours. The 30W solar panel is optimised for efficiency even in partial cloud cover.",
  },
  {
    q: "What is the weather resistance rating?",
    a: "The Solar Tent is rated IPX4, meaning it can withstand splashing water from any direction. The Family tier is IPX6, offering full protection against heavy rain and wind-driven rain.",
  },
  {
    q: "How fast is the setup really?",
    a: "Most users set up the tent in under 60 seconds using our colour-coded pole system. Our instructional guide and video tutorial are included with every purchase.",
  },
  {
    q: "What devices can I charge?",
    a: "Any device with a USB-C connection: smartphones, tablets, GPS devices, headlamps, cameras, and portable speakers. The dual 18W fast-charge ports support all major device brands.",
  },
  {
    q: "Can the solar panels be used in cold weather?",
    a: "Yes. The flexible photovoltaic cells operate efficiently from −20°C to 60°C. Performance may reduce slightly in extreme cold, but the insulated battery maintains charge well.",
  },
  {
    q: "What happens on cloudy days?",
    a: "The panels still generate power in diffuse light, typically at 20–30% efficiency. The built-in battery stores enough energy from previous sunny days to keep you powered for up to 48 hours.",
  },
  {
    q: "What does the warranty cover?",
    a: "Solo comes with a 1-year warranty, Duo with 2 years, and Family with 3 years plus lifetime customer support. We cover manufacturing defects and panel degradation beyond 20%.",
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
            Join 50,000+ Outdoor{" "}
            <span className="text-amber-brand italic">Enthusiasts</span>
          </h2>
          <p className="text-white/75 text-lg mb-10 leading-relaxed">
            Get exclusive gear tips, new product launches, and adventure
            inspiration straight to your inbox.
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

/* ─── Footer ─────────────────────────────────────────────────── */
const footerLinks = {
  Product: ["Features", "How It Works", "Gallery", "Pricing"],
  Support: ["FAQ", "Contact", "Warranty", "Returns"],
  Company: ["About", "Blog", "Careers", "Press"],
};

const footerAnchors: Record<string, string> = {
  Features: "#features",
  "How It Works": "#how-it-works",
  Gallery: "#gallery",
  Pricing: "#pricing",
  FAQ: "#faq",
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  let ocidCounter = 0;

  return (
    <footer className="bg-forest-dark text-white/85 pt-16 pb-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-amber-brand flex items-center justify-center shadow-amber">
                <Sun className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-black text-xl text-white">
                SolarTent
              </span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Power Your Adventure. Anywhere.
            </p>
            <div className="flex gap-4">
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
                  data-ocid={`footer.link.${++ocidCounter}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-black text-white text-sm tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={footerAnchors[link] ?? "#"}
                      data-ocid={`footer.link.${++ocidCounter}`}
                      className="text-white/55 text-sm hover:text-amber-brand transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/40 text-xs">
          <p>© {currentYear} SolarTent. All rights reserved.</p>
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

/* ─── App ─────────────────────────────────────────────────────── */
export default function App() {
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
    </div>
  );
}
