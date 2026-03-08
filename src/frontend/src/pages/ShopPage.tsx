import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "@tanstack/react-router";
import { Filter, ShoppingCart, Star, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";

/* ─── SEO ─────────────────────────────────────────────────────── */
function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
    return () => {
      document.title =
        "SolTrek - Solar Powered Camping Tents | Smart Outdoor Adventure";
    };
  }, [title]);
}

/* ─── Types ──────────────────────────────────────────────────── */
type Category =
  | "All"
  | "Solar Camping Tent"
  | "Camping Accessories"
  | "Outdoor Power Gear"
  | "Adventure Essentials";

type SortOption = "featured" | "price-low" | "price-high" | "highest-rated";

interface Product {
  id: bigint;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  slug?: string;
}

/* ─── Product Data ───────────────────────────────────────────── */
const PRODUCTS: Product[] = [
  // Solar Camping Tent
  {
    id: 1n,
    name: "SolTrek Solo Solar Camping Tent",
    category: "Solar Camping Tent",
    price: 9999,
    description:
      "1-person solar tent with 10W panel, USB charging, and 60-second setup. Perfect for solo trekkers.",
    rating: 4.8,
    reviewCount: 247,
    image: "/assets/generated/product-solar-tent-main.dim_800x800.jpg",
    badge: "Best Seller",
    slug: "solar-camping-tent",
  },
  {
    id: 2n,
    name: "SolTrek Duo Solar Tent",
    category: "Solar Camping Tent",
    price: 12999,
    description:
      "2-person solar tent with dual USB ports, and reinforced waterproof fabric.",
    rating: 4.7,
    reviewCount: 183,
    image: "/assets/generated/gallery-forest.dim_800x600.jpg",
    badge: "New",
  },
  {
    id: 3n,
    name: "SolTrek Pro Solar Tent",
    category: "Solar Camping Tent",
    price: 14999,
    description:
      "Premium 2-person tent with solar panel, 10000mAh battery, and LED interior lighting.",
    rating: 4.9,
    reviewCount: 95,
    image: "/assets/generated/gallery-alpine.dim_800x600.jpg",
    badge: "Premium",
  },
  // Camping Accessories
  {
    id: 4n,
    name: "Foldable Camp Chair",
    category: "Camping Accessories",
    price: 1499,
    description:
      "Ultralight folding camp chair with carry bag. Supports up to 120 kg. Sets up in seconds.",
    rating: 4.5,
    reviewCount: 312,
    image: "/assets/generated/product-camping-accessories.dim_800x600.jpg",
  },
  {
    id: 5n,
    name: "LED Camping Lantern",
    category: "Camping Accessories",
    price: 899,
    description:
      "Solar-rechargeable LED lantern with 3 brightness modes. 12-hour runtime on full charge.",
    rating: 4.6,
    reviewCount: 428,
    image: "/assets/generated/gallery-night-interior.dim_800x600.jpg",
  },
  {
    id: 6n,
    name: "Ultralight Sleeping Bag",
    category: "Camping Accessories",
    price: 2499,
    description:
      "Mummy-style sleeping bag rated to -5°C. Weighs just 950g. Includes compression sack.",
    rating: 4.7,
    reviewCount: 201,
    image: "/assets/generated/gallery-desert.dim_800x600.jpg",
  },
  {
    id: 7n,
    name: "Trekking Poles Set",
    category: "Camping Accessories",
    price: 1999,
    description:
      "Collapsible aluminium trekking poles with cork grips. Adjusts 65–135 cm. Sold in pairs.",
    rating: 4.4,
    reviewCount: 167,
    image: "/assets/generated/product-camping-accessories.dim_800x600.jpg",
  },
  // Outdoor Power Gear
  {
    id: 8n,
    name: "Solar Power Bank 20000mAh",
    category: "Outdoor Power Gear",
    price: 3499,
    description:
      "Dual solar panels + 20000mAh battery. Charge 3 devices simultaneously. Dustproof & waterproof.",
    rating: 4.6,
    reviewCount: 389,
    image: "/assets/generated/product-outdoor-power-gear.dim_800x600.jpg",
    badge: "Popular",
  },
  {
    id: 9n,
    name: "Portable Solar Panel 40W",
    category: "Outdoor Power Gear",
    price: 4999,
    description:
      "Foldable 40W monocrystalline solar panel. Compatible with all USB-C and USB-A devices.",
    rating: 4.8,
    reviewCount: 156,
    image: "/assets/generated/gallery-solar-detail.dim_800x600.jpg",
  },
  {
    id: 10n,
    name: "Solar Camping Light String",
    category: "Outdoor Power Gear",
    price: 799,
    description:
      "10m solar fairy lights with 20 LEDs. Auto on/off at dusk. Weatherproof for outdoor use.",
    rating: 4.3,
    reviewCount: 542,
    image: "/assets/generated/product-outdoor-power-gear.dim_800x600.jpg",
  },
  // Adventure Essentials
  {
    id: 11n,
    name: "Wilderness First Aid Kit",
    category: "Adventure Essentials",
    price: 599,
    description:
      "85-piece compact first aid kit in waterproof case. Designed for trekking and camping.",
    rating: 4.7,
    reviewCount: 634,
    image: "/assets/generated/product-adventure-essentials.dim_800x600.jpg",
  },
  {
    id: 12n,
    name: "Multi-Tool Set Pro",
    category: "Adventure Essentials",
    price: 1299,
    description:
      "18-in-1 stainless steel multi-tool with pliers, knife, screwdrivers, and more.",
    rating: 4.5,
    reviewCount: 287,
    image: "/assets/generated/product-adventure-essentials.dim_800x600.jpg",
  },
  {
    id: 13n,
    name: "Waterproof Trekking Backpack 45L",
    category: "Adventure Essentials",
    price: 3999,
    description:
      "45L IPX4 backpack with rain cover, laptop sleeve, and hydration bladder compartment.",
    rating: 4.8,
    reviewCount: 213,
    image: "/assets/generated/gallery-lake.dim_800x600.jpg",
    badge: "Top Rated",
  },
  {
    id: 14n,
    name: "Headlamp Pro 800 Lumens",
    category: "Adventure Essentials",
    price: 999,
    description:
      "Rechargeable 800-lumen headlamp with red light mode. IPX6 waterproof, 60m beam range.",
    rating: 4.6,
    reviewCount: 381,
    image: "/assets/generated/product-adventure-essentials.dim_800x600.jpg",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Solar Camping Tent",
  "Camping Accessories",
  "Outdoor Power Gear",
  "Adventure Essentials",
];

/* ─── Star Rating ─────────────────────────────────────────────── */
function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i <= Math.round(rating)
                ? "text-amber-brand fill-amber-brand"
                : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground font-medium">
        {rating.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}

/* ─── Product Card ───────────────────────────────────────────── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    navigate({
      to: "/checkout",
      search: {
        plan: "cart",
        total: product.price,
        label: product.name,
      },
    });
  };

  return (
    <article
      data-ocid={`shop.product.item.${index + 1}`}
      className="group bg-card rounded-2xl border border-border hover:border-forest/30 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-earth">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-amber-brand text-accent-foreground font-bold text-xs border-0 shadow-amber">
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs font-bold tracking-widest uppercase text-forest mb-1.5 opacity-70">
          {product.category}
        </p>
        <h3 className="font-display font-black text-foreground text-base leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>
        <StarRating rating={product.rating} count={product.reviewCount} />

        <div className="mt-4 border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-display font-black text-xl text-foreground">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.slug && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: "/product/solar-camping-tent" })}
                className="text-xs font-bold border-border hover:border-forest hover:text-forest"
              >
                View Details
              </Button>
            )}
          </div>
          <Button
            size="sm"
            data-ocid={`shop.add_to_cart.button.${index + 1}`}
            onClick={handleAddToCart}
            className="w-full btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold text-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
          <Button
            size="sm"
            data-ocid={`shop.buy_now.button.${index + 1}`}
            onClick={handleBuyNow}
            className="w-full bg-forest hover:bg-forest-dark text-primary-foreground font-bold text-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            Buy Now
          </Button>
        </div>
      </div>
    </article>
  );
}

/* ─── Trust Badges ───────────────────────────────────────────── */
function TrustBadgesStrip() {
  const badges = [
    { icon: "🔒", label: "Secure Payment", desc: "SSL Encrypted" },
    { icon: "🚚", label: "Free Shipping", desc: "On prepaid orders" },
    { icon: "⭐", label: "1 Year Warranty", desc: "On all tents" },
    { icon: "↩", label: "7-Day Returns", desc: "Hassle-free" },
    { icon: "☎️", label: "24/7 Support", desc: "WhatsApp & Email" },
  ];

  return (
    <div className="bg-forest py-10">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="text-white font-bold text-sm">{b.label}</p>
                <p className="text-white/60 text-xs mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ShopPage ───────────────────────────────────────────────── */
export default function ShopPage() {
  usePageTitle(
    "Shop Outdoor Gear | Solar Camping Tents, Accessories | SolTrek",
  );

  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredAndSorted = useMemo(() => {
    let filtered =
      activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case "price-low":
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case "highest-rated":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [activeCategory, sortBy]);

  // Group by category for section display
  const groupedByCategory = useMemo(() => {
    if (activeCategory !== "All") return null;

    const groups: Record<string, Product[]> = {};
    for (const cat of CATEGORIES.slice(1)) {
      const catProducts = PRODUCTS.filter((p) => p.category === cat);
      if (catProducts.length > 0) groups[cat] = catProducts;
    }
    return groups;
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src="/assets/generated/shop-hero-banner.dim_1400x500.jpg"
          alt="SolTrek outdoor shop"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 via-forest-dark/50 to-transparent" />
        <div className="relative h-full container max-w-6xl mx-auto px-4 sm:px-6 flex flex-col justify-center pt-20">
          <p className="text-amber-brand font-black text-xs tracking-[0.2em] uppercase mb-2">
            SolTrek Store
          </p>
          <h1 className="font-display font-black text-gray-900 text-4xl sm:text-5xl lg:text-6xl leading-tight mb-3">
            Adventure Gear
          </h1>
          <p className="text-gray-800 text-lg max-w-md">
            Solar-powered tents and outdoor essentials for every expedition.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-earth-dark shadow-xs">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid={`shop.filter.tab.${i + 1}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-forest text-primary-foreground shadow-nature-sm"
                      : "bg-earth text-foreground hover:bg-earth-dark"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-muted-foreground font-semibold hidden sm:block">
                Sort:
              </span>
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as SortOption)}
              >
                <SelectTrigger
                  data-ocid="shop.sort.select"
                  className="h-8 text-xs font-bold w-44 border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="highest-rated">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals Section */}
      <section
        id="new-arrivals"
        className="container max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-2"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-amber-brand font-black text-xs tracking-[0.2em] uppercase">
              Just In
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
              New Arrivals
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {PRODUCTS.filter((p) => p.badge === "New").map((product, i) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* Products */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {activeCategory !== "All" ? (
          /* Single category grid */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-black text-2xl text-foreground">
                {activeCategory}
              </h2>
              <span className="text-muted-foreground text-sm">
                {filteredAndSorted.length} products
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredAndSorted.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          </div>
        ) : (
          /* All categories grouped */
          <div className="space-y-14">
            {groupedByCategory &&
              Object.entries(groupedByCategory).map(([cat, products]) => {
                const sorted = [...products].sort((a, b) => {
                  switch (sortBy) {
                    case "price-low":
                      return a.price - b.price;
                    case "price-high":
                      return b.price - a.price;
                    case "highest-rated":
                      return b.rating - a.rating;
                    default:
                      return 0;
                  }
                });

                return (
                  <section key={cat}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground">
                          {cat}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                          {sorted.length} products
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat as Category)}
                        className="text-sm font-bold text-forest hover:text-amber-brand transition-colors"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {sorted.map((product, i) => (
                        <ProductCard
                          key={product.id.toString()}
                          product={product}
                          index={i}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        )}
      </main>

      {/* Trust Badges */}
      <TrustBadgesStrip />
    </div>
  );
}
