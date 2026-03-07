import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Award, Heart, Leaf, Shield, TrendingUp, Zap } from "lucide-react";
import { useEffect } from "react";

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const TEAM_MEMBERS = [
  { name: "Vikram Reddy", role: "Co-Founder & CEO", initials: "VR" },
  { name: "Sanya Kapoor", role: "Co-Founder & Head of Design", initials: "SK" },
  { name: "Rajan Pillai", role: "Co-Founder & CTO", initials: "RP" },
  { name: "Ananya Bose", role: "Co-Founder & Operations", initials: "AB" },
  { name: "Deepak Verma", role: "Co-Founder & Marketing", initials: "DV" },
];

const CUSTOMER_PROMISES = [
  {
    icon: Award,
    title: "Premium Quality",
    desc: "Every product undergoes rigorous field testing in real Indian terrain — from Himalayan peaks to coastal monsoon forests. If it doesn't survive our testing, it doesn't ship to you.",
  },
  {
    icon: Heart,
    title: "Honest Pricing",
    desc: "We cut out middlemen and sell directly to adventurers. You pay factory-to-you prices. No inflated margins, no confusing discounts — just honest value.",
  },
  {
    icon: Shield,
    title: "Exceptional Support",
    desc: "Every purchase comes with a 1-year warranty and a real human support team available on WhatsApp and email, Mon–Sat 9AM–7PM IST. We actually pick up the phone.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    desc: "We release 2 product updates annually based directly on community feedback. Our customers are our R&D team — your field reports drive our next design iteration.",
  },
];

const SUSTAINABILITY_POINTS = [
  {
    icon: "☀️",
    title: "Solar in Manufacturing",
    desc: "Our assembly facility runs on 80% solar energy. We're working towards 100% by 2026.",
  },
  {
    icon: "📦",
    title: "Minimal Plastic Packaging",
    desc: "All packaging is 100% recyclable cardboard with soy-based ink printing. We've eliminated single-use plastic entirely.",
  },
  {
    icon: "🌱",
    title: "1% for the Planet",
    desc: "We donate 1% of every sale to Indian environmental causes — forest restoration, river cleanup, and wildlife corridor projects.",
  },
  {
    icon: "♾️",
    title: "Built for Longevity",
    desc: "We intentionally design products to last 5+ years. Replacement parts available for all products. Repair is always cheaper than replace.",
  },
];

export default function AboutPage() {
  usePageTitle("About SolTrek | Solar Camping Innovation from India");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-forest-dark">
        <img
          src="/assets/generated/about-team.dim_1200x600.jpg"
          alt="SolTrek founding team on a Himalayan trek"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/60 to-transparent" />
        <div className="relative z-10 container max-w-6xl mx-auto px-4 sm:px-6 pb-16 pt-28">
          <p className="text-amber-brand font-black text-xs tracking-[0.2em] uppercase mb-3">
            Our Story
          </p>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-2xl">
            Our Story Begins on a Trek
          </h1>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
                How We Started
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground leading-tight mb-6">
                Born from a Dead Battery{" "}
                <span className="text-forest italic">in the Himalayas</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  In 2019, a group of five trekkers from Bengaluru set out on a
                  week-long Himalayan trail. By day three, every phone was dead.
                  No emergency calls, no navigation, no photos of those
                  breathtaking views. Maps became useless. One minor trail
                  injury became a genuine scare because no one could call for
                  help.
                </p>
                <p>
                  That frustrating moment — sitting at 4,200 metres with five
                  dead phones — sparked an idea:{" "}
                  <strong className="text-foreground">
                    what if your tent could power your adventure?
                  </strong>
                </p>
                <p>
                  They spent two years developing the SolTrek Solar Tent,
                  combining lightweight camping design with integrated solar
                  technology. Eighteen prototypes. Twelve field tests across
                  four mountain ranges. Hundreds of hours of engineering. And
                  finally, a tent that charges your devices while you sleep
                  under the stars.
                </p>
                <p>
                  SolTrek was founded in 2021 in Bengaluru. Today we serve over
                  15,000 adventurers across India, from Leh to Arunachal, from
                  the Himalayas to the Nilgiris.
                </p>
              </div>
            </div>
            {/* Team initials */}
            <div className="space-y-4">
              <div className="bg-earth rounded-2xl border border-earth-dark p-8">
                <h3 className="font-display font-black text-xl text-foreground mb-6">
                  The Founding Five
                </h3>
                <div className="space-y-4">
                  {TEAM_MEMBERS.map((member) => (
                    <div key={member.name} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-forest flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {member.initials}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">
                          {member.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-forest">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-2xl border border-white/20 p-8">
              <div className="w-12 h-12 rounded-xl bg-amber-brand flex items-center justify-center mb-5">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <p className="text-amber-brand font-black text-xs tracking-widest uppercase mb-3">
                Our Mission
              </p>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-4">
                Smarter Adventures, Powered by the Sun
              </h2>
              <p className="text-white/80 leading-relaxed">
                Make outdoor adventures smarter using renewable energy — so no
                adventurer ever has to choose between going deeper into nature
                and staying connected.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl border border-white/20 p-8">
              <div className="w-12 h-12 rounded-xl bg-amber-brand flex items-center justify-center mb-5">
                <Leaf className="w-6 h-6 text-accent-foreground" />
              </div>
              <p className="text-amber-brand font-black text-xs tracking-widest uppercase mb-3">
                Our Vision
              </p>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight mb-4">
                Clean Energy for Every Campsite
              </h2>
              <p className="text-white/80 leading-relaxed">
                A future where every camper, trekker, and explorer has access to
                clean, solar-powered energy in the wild — from the highest
                Himalayan pass to the deepest jungle trail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Promise */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Our Promise to You
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground leading-tight">
              Four Commitments We Never Break
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CUSTOMER_PROMISES.map((promise) => {
              const Icon = promise.icon;
              return (
                <div
                  key={promise.title}
                  className="bg-card rounded-2xl border border-border hover:border-forest/30 hover:shadow-card-hover p-8 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-forest" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display font-black text-xl text-foreground mb-3">
                    {promise.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {promise.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-earth border-t border-earth-dark">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-black tracking-[0.2em] uppercase text-amber-brand mb-3">
              Planet First
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-foreground leading-tight mb-4">
              Our Sustainability Commitment
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Building gear that harnesses the sun means we take our
              responsibility to the planet seriously — in every part of our
              business.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUSTAINABILITY_POINTS.map((point) => (
              <div
                key={point.title}
                className="bg-white rounded-2xl border border-earth-dark p-6 hover:border-forest/30 hover:shadow-nature-sm transition-all duration-300"
              >
                <span className="text-3xl mb-4 block">{point.icon}</span>
                <h3 className="font-bold text-foreground text-sm mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-dark text-center">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-4">
            Ready to Power Your Adventure?
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Join 15,000+ adventurers who never worry about dead batteries in the
            wild.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold px-8 py-6 text-base transition-all">
                Shop Solar Gear
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-2 border-white/40 text-white bg-white/5 hover:bg-white/10 hover:border-white font-bold px-8 py-6 text-base transition-all"
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
