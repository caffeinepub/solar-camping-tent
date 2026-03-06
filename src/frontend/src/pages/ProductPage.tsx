import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useActor } from "../hooks/useActor";

/* ─── SEO ─────────────────────────────────────────────────────── */
function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/* ─── Product Data ───────────────────────────────────────────── */
const PRODUCT_ID = 1n;

const GALLERY_IMAGES = [
  {
    src: "/assets/generated/product-solar-tent-main.dim_800x800.jpg",
    alt: "SunCamp Solo Solar Camping Tent - Main View",
  },
  {
    src: "/assets/generated/gallery-forest.dim_800x600.jpg",
    alt: "SunCamp Solo Tent set up in a lush forest",
  },
  {
    src: "/assets/generated/product-tent-gallery-2.dim_800x600.jpg",
    alt: "Solar panel close-up on rain fly",
  },
  {
    src: "/assets/generated/product-tent-gallery-3.dim_800x600.jpg",
    alt: "Interior USB charging port",
  },
  {
    src: "/assets/generated/product-tent-gallery-4.dim_800x600.jpg",
    alt: "Quick setup action shot",
  },
  {
    src: "/assets/generated/product-tent-gallery-5.dim_800x600.jpg",
    alt: "Tent packed into stuff sack",
  },
  {
    src: "/assets/generated/product-tent-gallery-6.dim_800x600.jpg",
    alt: "Tent glowing at night with charging light",
  },
];

const SPECS = [
  { label: "Capacity", value: "1 Person" },
  { label: "Weight", value: "1.8 kg" },
  { label: "Solar Panel", value: "1W Monocrystalline" },
  { label: "USB Output", value: "5V/1A (Standard USB-A)" },
  { label: "Fabric", value: "210D Ripstop Nylon" },
  { label: "Waterproof Rating", value: "2000mm HH" },
  { label: "Setup Time", value: "< 60 seconds" },
  { label: "Packed Size", value: "45 × 15 cm" },
  { label: "Color", value: "Forest Green + Orange" },
  { label: "Poles", value: "Fiberglass" },
];

const KEY_BENEFITS = [
  {
    icon: "⚡",
    title: "Never Run Out of Battery",
    desc: "The integrated 1W solar panel on the rain fly harvests sunlight all day — charge your phone, GPS, or headlamp directly from the sun, no power bank needed.",
  },
  {
    icon: "🌧️",
    title: "Stay Dry in Any Weather",
    desc: "2000mm waterproof-rated ripstop nylon and taped seams keep the interior bone-dry in heavy rain. Rated for monsoon conditions.",
  },
  {
    icon: "⏱️",
    title: "Set Up in 60 Seconds",
    desc: "Color-coded fiberglass poles and a pre-attached rain fly mean you can have full shelter in under a minute — even in the dark.",
  },
  {
    icon: "🔌",
    title: "Charge Any USB Device",
    desc: "Standard USB-A port inside the tent works with every phone, GPS device, headlamp, and camera charger. Universal compatibility.",
  },
  {
    icon: "🎒",
    title: "Go Light, Go Far",
    desc: "At just 1.8 kg total packed weight, the SunCamp Solo won't slow you down on multi-day treks. Fits in any 45L+ backpack.",
  },
  {
    icon: "🏔️",
    title: "Built to Last",
    desc: "Tear-resistant 210D ripstop nylon, reinforced pole sleeves, and double-stitched guy-line attachment points are engineered for repeated expeditions.",
  },
];

const BOX_CONTENTS = [
  "1× SunCamp Solar Tent Body",
  "1× Rain Fly with Integrated 1W Solar Panel",
  "2× Fiberglass Tent Poles",
  "6× Aluminium Tent Pegs",
  "1× Guylines (pre-attached)",
  "1× Carry / Stuff Sack",
  "1× Quick Setup Guide",
];

const FAQS = [
  {
    q: "Does the solar panel work on cloudy days?",
    a: "Yes, but at reduced efficiency — expect approximately 20–30% of full capacity on overcast days. A full sunny day provides enough charge for 1–2 full phone charges.",
  },
  {
    q: "Is it suitable for monsoon camping?",
    a: "Yes. The tent's 2000mm waterproof head rating is suitable for heavy rain including monsoon conditions. All seams are factory-taped for zero water ingress.",
  },
  {
    q: "Can I charge two devices simultaneously?",
    a: "No. The Solo model has a single USB-A port (5V/1A). For multi-device charging, consider the SunCamp Duo or Pro with dual USB ports.",
  },
  {
    q: "How long does it take to fully charge a phone?",
    a: "In direct full sunlight, expect approximately 2–3 hours for a 4000mAh phone battery from 0–100%. Partial sun will extend charging time accordingly.",
  },
  {
    q: "What is the return policy?",
    a: "We offer a 7-day return window from the date of delivery. The product must be unused, in its original packaging. Refunds are processed within 5–7 business days after inspection.",
  },
  {
    q: "Does it come with a warranty?",
    a: "Yes — every SunCamp Solar Tent comes with a 1-year manufacturing defect warranty. This covers the tent body, poles, and solar panel. Accidental damage is excluded.",
  },
];

const MOCK_REVIEWS = [
  {
    name: "Rohit Sharma",
    rating: 5,
    text: "Took this to the Kedarkantha trek. Set up in under 2 minutes and the solar charging worked brilliantly. Charged my phone twice a day with ease. Absolutely love this tent!",
    date: "Dec 2024",
  },
  {
    name: "Priya Nair",
    rating: 5,
    text: "Solo female trekker here — this tent gave me peace of mind knowing my phone would always be charged for emergencies. Lightweight and genuinely waterproof. 10/10.",
    date: "Nov 2024",
  },
  {
    name: "Arjun Mehta",
    rating: 4,
    text: "Great tent for the price. The solar charging works well in direct sun but slower on cloudy days, which is expected. Build quality feels premium. Slightly snug for tall people.",
    date: "Oct 2024",
  },
];

/* ─── Star Rating ─────────────────────────────────────────────── */
function StarRating({
  rating,
  interactive = false,
  onRatingChange,
}: {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (r: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${interactive ? "cursor-pointer w-6 h-6" : "w-4 h-4"} transition-colors ${
            i <= (interactive ? hovered || rating : Math.round(rating))
              ? "text-amber-brand fill-amber-brand"
              : "text-muted-foreground"
          }`}
          onClick={() => interactive && onRatingChange?.(i)}
          onMouseEnter={() => interactive && setHovered(i)}
          onMouseLeave={() => interactive && setHovered(0)}
        />
      ))}
    </div>
  );
}

/* ─── Image Gallery ──────────────────────────────────────────── */
function ImageGallery() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-earth border border-border">
        <img
          src={GALLERY_IMAGES[activeIdx].src}
          alt={GALLERY_IMAGES[activeIdx].alt}
          className="w-full h-full object-cover"
        />
        {/* Prev/Next */}
        <button
          type="button"
          onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
          disabled={activeIdx === 0}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-md hover:bg-white disabled:opacity-30 transition"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() =>
            setActiveIdx((i) => Math.min(GALLERY_IMAGES.length - 1, i + 1))
          }
          disabled={activeIdx === GALLERY_IMAGES.length - 1}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 text-foreground flex items-center justify-center shadow-md hover:bg-white disabled:opacity-30 transition"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-7 gap-2">
        {GALLERY_IMAGES.map((img, i) => (
          <button
            key={img.src}
            type="button"
            data-ocid={`product.gallery.item.${i + 1}`}
            onClick={() => setActiveIdx(i)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-150 ${
              activeIdx === i
                ? "border-forest shadow-nature-sm"
                : "border-border hover:border-forest/40"
            }`}
            aria-label={`View ${img.alt}`}
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
  );
}

/* ─── Trust Badges ───────────────────────────────────────────── */
function TrustBadgeRow() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {[
        { icon: ShieldCheck, label: "Secure Payment" },
        { icon: Truck, label: "Free Shipping" },
        { icon: Check, label: "1 Year Warranty" },
        { icon: RotateCcw, label: "7 Day Returns" },
      ].map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center text-center gap-1.5 p-3 rounded-xl bg-forest/5 border border-forest/15"
        >
          <Icon className="w-4 h-4 text-forest" />
          <span className="text-xs font-bold text-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Reviews Section ────────────────────────────────────────── */
function ReviewsSection() {
  const { actor, isFetching } = useActor();
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const avgRatingQuery = useQuery({
    queryKey: ["avgRating", PRODUCT_ID.toString()],
    queryFn: async () => {
      if (!actor) return 0;
      return actor.getAverageRating(PRODUCT_ID);
    },
    enabled: !!actor && !isFetching,
  });

  const reviewsQuery = useQuery({
    queryKey: ["reviews", PRODUCT_ID.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews(PRODUCT_ID);
    },
    enabled: !!actor && !isFetching,
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      await actor.submitReview(
        PRODUCT_ID,
        BigInt(reviewRating),
        reviewText,
        reviewName,
      );
    },
    onSuccess: () => {
      toast.success("Thank you! Your review has been submitted.");
      setReviewName("");
      setReviewRating(5);
      setReviewText("");
      reviewsQuery.refetch();
      avgRatingQuery.refetch();
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });

  const handleSubmitReview = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!reviewName.trim() || !reviewText.trim()) {
        toast.error("Please fill in your name and review.");
        return;
      }
      submitMutation.mutate();
    },
    [reviewName, reviewText, submitMutation],
  );

  // Combine mock reviews with backend reviews
  const backendReviews = reviewsQuery.data ?? [];
  const avgRating = avgRatingQuery.data;

  const displayAvg =
    avgRating && avgRating > 0
      ? avgRating
      : MOCK_REVIEWS.reduce((s, r) => s + r.rating, 0) / MOCK_REVIEWS.length;

  const totalReviews = MOCK_REVIEWS.length + backendReviews.length;

  return (
    <section className="py-16 bg-background border-t border-earth-dark">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-8">
          Customer Reviews
        </h2>

        {/* Average rating */}
        <div className="flex items-center gap-6 mb-10 p-6 bg-earth rounded-2xl border border-earth-dark">
          <div className="text-center">
            <div className="font-display font-black text-5xl text-foreground">
              {displayAvg.toFixed(1)}
            </div>
            <StarRating rating={displayAvg} />
            <p className="text-muted-foreground text-sm mt-1">
              {totalReviews} reviews
            </p>
          </div>
          <Separator orientation="vertical" className="h-20" />
          <div className="space-y-1.5 flex-1">
            {[5, 4, 3, 2, 1].map((star) => {
              const count =
                MOCK_REVIEWS.filter((r) => r.rating === star).length +
                backendReviews.filter((r) => Number(r.rating) === star).length;
              const pct = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2 text-xs">
                  <span className="w-6 text-right font-semibold text-muted-foreground">
                    {star}★
                  </span>
                  <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-brand rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review list */}
        <div className="grid md:grid-cols-2 gap-5 mb-12">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.name}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white text-sm font-black">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {review.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {review.date}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-foreground text-sm leading-relaxed">
                {review.text}
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-forest" />
                <span className="text-xs text-forest font-semibold">
                  Verified Purchase
                </span>
              </div>
            </div>
          ))}

          {backendReviews.map((review) => (
            <div
              key={`${review.reviewerName}-${review.timestamp}`}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-brand flex items-center justify-center text-accent-foreground text-sm font-black">
                    {review.reviewerName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">
                      {review.reviewerName}
                    </p>
                  </div>
                </div>
                <StarRating rating={Number(review.rating)} />
              </div>
              <p className="text-foreground text-sm leading-relaxed">
                {review.reviewText}
              </p>
            </div>
          ))}
        </div>

        {/* Write a review */}
        <div className="bg-earth rounded-2xl border border-earth-dark p-8">
          <h3 className="font-display font-black text-2xl text-foreground mb-6">
            Write a Review
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="font-semibold text-foreground">
                Your Name *
              </Label>
              <Input
                data-ocid="product.review.input"
                placeholder="Rahul Sharma"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="font-semibold text-foreground">
                Your Rating *
              </Label>
              <StarRating
                rating={reviewRating}
                interactive
                onRatingChange={setReviewRating}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="font-semibold text-foreground">
                Your Review *
              </Label>
              <Textarea
                data-ocid="product.review.textarea"
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              data-ocid="product.review.submit_button"
              disabled={submitMutation.isPending}
              className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold transition-all duration-150 active:scale-[0.98]"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─── ProductPage ────────────────────────────────────────────── */
export default function ProductPage() {
  usePageTitle("SunCamp Solo Solar Camping Tent - ₹5,999 | Buy Online India");

  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { actor, isFetching } = useActor();

  const avgRatingQuery = useQuery({
    queryKey: ["avgRating", PRODUCT_ID.toString()],
    queryFn: async () => {
      if (!actor) return 4.8;
      return actor.getAverageRating(PRODUCT_ID);
    },
    enabled: !!actor && !isFetching,
  });

  const handleAddToCart = () => {
    addItem({
      productId: PRODUCT_ID,
      productName: "SunCamp Solo Solar Camping Tent",
      price: 5999,
      image: "/assets/generated/product-solar-tent-main.dim_800x800.jpg",
      quantity,
    });
    toast.success("Added to cart! 🛒");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate({ to: "/checkout", search: { plan: "solo" } });
  };

  const avgRating = avgRatingQuery.data ?? 4.8;
  const displayRating = avgRating > 0 ? avgRating : 4.8;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-earth border-b border-earth-dark pt-20">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/shop"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Shop
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground font-semibold text-sm">
                  Solar Camping Tent
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Product Hero */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image gallery */}
          <ImageGallery />

          {/* Product info */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-forest mb-2">
                Solar Camping Tent
              </p>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground leading-tight mb-3">
                SunCamp Solo Solar Camping Tent
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRating rating={displayRating} />
                <span className="text-sm font-bold text-foreground">
                  {displayRating.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">
                  (250 reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-forest/5 rounded-2xl border border-forest/15 p-5">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-display font-black text-4xl text-forest">
                  ₹5,999
                </span>
                <span className="text-muted-foreground text-lg line-through">
                  ₹7,999
                </span>
                <span className="bg-amber-brand text-accent-foreground text-xs font-black px-2.5 py-1 rounded-full shadow-amber">
                  Save ₹2,000 (25% OFF)
                </span>
              </div>
              <p className="text-xs text-forest font-semibold">
                🎉 Launch Offer Price — Limited Time
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Inclusive of all taxes. Free delivery on prepaid orders.
              </p>
            </div>

            {/* Trust badges */}
            <TrustBadgeRow />

            {/* Quantity */}
            <div className="space-y-2">
              <Label className="font-semibold text-foreground text-sm">
                Quantity
              </Label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-earth transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4 text-foreground" />
                  </button>
                  <input
                    type="number"
                    data-ocid="product.quantity.input"
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.min(
                          10,
                          Math.max(1, Number.parseInt(e.target.value) || 1),
                        ),
                      )
                    }
                    className="w-14 h-10 text-center font-bold text-foreground border-x border-border bg-background text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-earth transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4 text-foreground" />
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">In Stock</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button
                size="lg"
                data-ocid="product.add_to_cart.button"
                onClick={handleAddToCart}
                className="flex-1 btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold text-base transition-all duration-150 active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                data-ocid="product.buy_now.button"
                onClick={handleBuyNow}
                className="flex-1 bg-forest hover:bg-forest-dark text-primary-foreground font-bold text-base shadow-[0_2px_0_oklch(0.22_0.08_155)] hover:shadow-[0_1px_0_oklch(0.22_0.08_155)] hover:translate-y-px transition-all duration-150 active:scale-[0.98]"
              >
                Buy Now
              </Button>
            </div>

            {/* Short description */}
            <p className="text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
              Adventure without limits. Built for solo trekkers with a 1W
              monocrystalline solar panel, waterproof ripstop nylon, and
              60-second setup. Charges your phone directly from the sun — no
              power bank required.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* ── Content Sections ── */}

      {/* 1. Product Overview */}
      <section className="py-16 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-6">
            Product Overview
          </h2>
          <div className="prose prose-lg max-w-none text-foreground">
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Adventure without limits. The{" "}
              <strong className="text-foreground">
                SunCamp Solo Solar Camping Tent
              </strong>{" "}
              is engineered for solo trekkers and weekend adventurers who refuse
              to let a dead battery end the journey. With an integrated{" "}
              <strong className="text-foreground">1W solar panel</strong> on the
              rain fly, you can charge your phone, GPS, or headlamp directly
              from the sun — no power banks required.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mt-4">
              Designed for <strong className="text-foreground">1 person</strong>
              , it weighs just{" "}
              <strong className="text-foreground">1.8 kg</strong> and sets up in
              under <strong className="text-foreground">60 seconds</strong>. The{" "}
              <strong className="text-foreground">
                2000mm waterproof-rated
              </strong>{" "}
              210D ripstop nylon keeps you dry in heavy rain, including monsoon
              conditions. Whether you're camping in the Himalayas, the Western
              Ghats, or a weekend forest retreat, the SunCamp Solo keeps you
              connected and powered.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mt-4">
              The standard{" "}
              <strong className="text-foreground">USB-A port</strong> inside the
              tent works with every phone charger, GPS device, and headlamp —
              universal compatibility with no adapters required. Pack it in its
              compact 45 × 15 cm stuff sack, slip it into your backpack, and
              head into the wild knowing your technology works as hard as you
              do.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Key Benefits */}
      <section className="py-16 bg-earth border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-10">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {KEY_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-card rounded-2xl border border-earth-dark hover:border-forest/30 hover:-translate-y-1 hover:shadow-card-hover p-6 transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{benefit.icon}</span>
                <h3 className="font-display font-black text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Technical Specifications */}
      <section className="py-16 bg-background border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-8">
            Technical Specifications
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {SPECS.map((spec, i) => (
                  <tr
                    key={spec.label}
                    className={`${i % 2 === 0 ? "bg-background" : "bg-earth"} border-b border-border last:border-0`}
                  >
                    <td className="px-6 py-4 font-bold text-foreground w-1/3">
                      {spec.label}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {spec.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. How Solar Charging Works */}
      <section className="py-16 bg-earth border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-4">
            How Solar Charging Works
          </h2>
          <p className="text-muted-foreground mb-8 text-base">
            Simple physics, powerful results — harnessing the sun to keep your
            devices alive anywhere.
          </p>

          <img
            src="/assets/generated/solar-charging-diagram.dim_800x400.jpg"
            alt="Solar charging diagram showing how sunlight powers the tent's USB port"
            className="w-full rounded-2xl border border-border mb-10"
            loading="lazy"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                step: "01",
                title: "Sunlight Hits the Panel",
                desc: "The 1W monocrystalline solar panel on the rain fly absorbs sunlight throughout the day, converting it to DC electricity with up to 23% efficiency.",
              },
              {
                step: "02",
                title: "Energy Flows to USB",
                desc: "The solar panel connects directly to the built-in USB-A port inside the tent via a weatherproof cable routed through the fly. No battery storage required.",
              },
              {
                step: "03",
                title: "Charge Your Devices",
                desc: "Plug in your phone, GPS, headlamp, or any USB-A device. In 2–3 hours of direct sun, most phones will charge 80–100%. Works while you're out trekking.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <div className="w-10 h-10 rounded-full bg-amber-brand flex items-center justify-center shadow-amber mb-4">
                  <span className="font-display font-black text-sm text-accent-foreground">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-display font-black text-lg text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-forest rounded-2xl p-6 text-white">
            <p className="font-semibold leading-relaxed">
              💡 <strong>Real-world performance:</strong> In 6–8 hours of direct
              Indian summer sun, the 1W panel generates approximately 6–8 Wh of
              energy — enough to charge a 4000mAh smartphone once fully. On
              partially cloudy days, expect 20–30% efficiency. Place the rain
              fly at an angle facing south for maximum power generation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. What's in the Box */}
      <section className="py-16 bg-background border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-8">
            What's in the Box
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {BOX_CONTENTS.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 p-4 rounded-xl bg-earth border border-earth-dark"
              >
                <div className="w-7 h-7 rounded-full bg-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-foreground font-medium text-sm">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-amber-brand/10 border border-amber-brand/25 flex items-start gap-3 max-w-2xl">
            <Package className="w-5 h-5 text-amber-brand mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              All items are packed in a recyclable cardboard box with protective
              foam inserts. The stuff sack doubles as a durable daily carry bag.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews */}
      <ReviewsSection />

      {/* 7. Delivery Information */}
      <section className="py-16 bg-earth border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-8">
            Delivery Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-forest" />
              </div>
              <h3 className="font-display font-black text-lg text-foreground mb-2">
                Estimated Delivery
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <strong className="text-foreground">4–7 business days</strong>{" "}
                across India. Free shipping on all prepaid orders. COD available
                at ₹99 extra.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 rounded-full bg-amber-brand/10 flex items-center justify-center mb-4">
                <Package className="w-5 h-5 text-amber-brand" />
              </div>
              <h3 className="font-display font-black text-lg text-foreground mb-2">
                Delivery Partners
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We ship via{" "}
                <strong className="text-foreground">
                  Delhivery, Blue Dart
                </strong>{" "}
                and <strong className="text-foreground">Shiprocket</strong>.
                Partner assigned automatically based on your pin code for
                fastest delivery.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center mb-4">
                <Check className="w-5 h-5 text-forest" />
              </div>
              <h3 className="font-display font-black text-lg text-foreground mb-2">
                Order Tracking
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tracking details sent to your email within{" "}
                <strong className="text-foreground">24 hours</strong> of
                dispatch. Real-time updates via Delhivery/Blue Dart portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 bg-background border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i + 1}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-forest/40 transition-all"
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

      {/* Sticky Buy Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-border shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.15)] md:hidden p-4">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div>
            <div className="font-display font-black text-xl text-forest leading-none">
              ₹5,999
            </div>
            <div className="text-xs text-muted-foreground line-through">
              ₹7,999
            </div>
          </div>
          <Button
            data-ocid="product.add_to_cart.button"
            onClick={handleAddToCart}
            className="flex-1 btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold active:scale-[0.98]"
          >
            Add to Cart
          </Button>
          <Button
            data-ocid="product.buy_now.button"
            onClick={handleBuyNow}
            className="flex-1 bg-forest hover:bg-forest-dark text-primary-foreground font-bold"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
