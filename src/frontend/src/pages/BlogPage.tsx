import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { useEffect } from "react";

const blogPosts = [
  {
    id: 1,
    title: "How Solar Charging Works in the Himalayas",
    excerpt:
      "From Hampta Pass to Roopkund, we tested the SolTrek Solo in some of India's toughest high-altitude conditions. Here's what we learned about solar charging above 4,000 metres.",
    category: "Gear Reviews",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    image: "/assets/generated/gallery-alpine.dim_800x600.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Top 7 Camping Spots Near Bangalore for Weekend Getaways",
    excerpt:
      "You don't need to fly to Manali for a great camping experience. These 7 spots within 200 km of Bangalore are perfect for a quick solar-powered escape.",
    category: "Adventure Tips",
    date: "Feb 20, 2026",
    readTime: "4 min read",
    image: "/assets/generated/gallery-forest.dim_800x600.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Why Every Trekker Needs a Solar-Powered Tent in 2026",
    excerpt:
      "Phone batteries die. Power banks run out. In remote areas, the nearest charging point can be days away. Solar tents are no longer a luxury — they're essential.",
    category: "Sustainability",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    image: "/assets/generated/gallery-solar-detail.dim_800x600.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Camping in Monsoon India: A Complete Gear Guide",
    excerpt:
      "Monsoon camping in India is a unique experience — if you have the right gear. Learn which tents, clothing, and electronics survive the heaviest downpours.",
    category: "Gear Reviews",
    date: "Jan 31, 2026",
    readTime: "7 min read",
    image: "/assets/generated/gallery-lake.dim_800x600.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Packing Light: The 1.8 kg Camp Setup That Does Everything",
    excerpt:
      "Ultra-light camping doesn't mean giving up comfort or power. Here's our minimalist but fully-featured 1.8 kg camp kit for solo Himalayan treks.",
    category: "Adventure Tips",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    image: "/assets/generated/gallery-desert.dim_800x600.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "Inside the Tent: A Night at Kedarkantha in December",
    excerpt:
      "Temperature: -8°C. Elevation: 3,950m. Phone battery: 100% at sunrise. Our correspondent reports from one of India's most popular winter treks.",
    category: "Stories",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    image: "/assets/generated/gallery-night-interior.dim_800x600.jpg",
    featured: false,
  },
];

const categories = [
  "All",
  "Gear Reviews",
  "Adventure Tips",
  "Sustainability",
  "Stories",
];

function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    "Gear Reviews": "bg-forest/10 text-forest border-forest/20",
    "Adventure Tips": "bg-amber-brand/10 text-amber-700 border-amber-brand/20",
    Sustainability: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Stories: "bg-sky-50 text-sky-700 border-sky-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[category] ?? "bg-muted text-muted-foreground border-border"}`}
    >
      <Tag className="w-3 h-3" />
      {category}
    </span>
  );
}

export default function BlogPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Blog | SolTrek – Solar Camping Tips & Adventure Stories";
    window.scrollTo(0, 0);
  }, []);

  const featured = blogPosts.find((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero banner */}
      <section className="bg-earth py-16 border-b border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
            SolTrek Journal
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
            Adventure <span className="text-forest italic">Stories & Tips</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Gear guides, trek reports, sustainability stories, and honest advice
            from India's solar camping community.
          </p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Featured post */}
        {featured && (
          <div
            data-ocid="blog.item.1"
            className="group mb-14 rounded-3xl overflow-hidden border border-earth-dark hover:border-forest/30 hover:shadow-card-hover transition-all duration-300 bg-card"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <CategoryBadge category={featured.category} />
                  <span className="bg-amber-brand text-accent-foreground text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                    Featured
                  </span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-3xl text-foreground leading-tight mb-4 group-hover:text-forest transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    data-ocid="blog.featured.button"
                    className="text-forest font-bold hover:text-forest hover:bg-forest/10 gap-1.5"
                  >
                    Read More <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10" data-ocid="blog.filter.tab">
          {categories.map((cat, i) => (
            <button
              key={cat}
              type="button"
              data-ocid={`blog.category.tab.${i + 1}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-150 ${
                cat === "All"
                  ? "bg-forest text-white border-forest"
                  : "bg-card text-muted-foreground border-border hover:border-forest/40 hover:text-forest"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <article
              key={post.id}
              data-ocid={`blog.item.${i + 2}`}
              className="group bg-card rounded-2xl border border-earth-dark overflow-hidden hover:border-forest/30 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <CategoryBadge category={post.category} />
                </div>
                <h3 className="font-display font-black text-lg text-foreground leading-snug mb-3 group-hover:text-forest transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-earth-dark">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-forest opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 rounded-2xl bg-forest p-10 text-center">
          <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
            Never Miss a Story
          </h3>
          <p className="text-white/70 text-base mb-6 max-w-md mx-auto">
            Get the latest trek reports, gear tips, and exclusive deals straight
            to your inbox.
          </p>
          <Button
            data-ocid="blog.newsletter_button"
            onClick={() => navigate({ to: "/" })}
            className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold px-8 active:scale-[0.98]"
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
}
