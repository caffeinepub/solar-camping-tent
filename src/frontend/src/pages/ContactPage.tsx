import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import {
  Check,
  ChevronRight,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useEffect, useState } from "react";

function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email Support",
    value: "support@suncampgear.com",
    href: "mailto:support@suncampgear.com",
    desc: "Response within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone Support",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    desc: "Mon–Sat 9AM–7PM IST",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "SunCamp Gear, 12, Tech Park Road, Whitefield, Bengaluru – 560066",
    href: "https://maps.google.com/?q=Whitefield+Bengaluru",
    desc: "Karnataka, India",
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "Monday – Saturday",
    href: null,
    desc: "9:00 AM – 7:00 PM IST",
  },
];

const FAQ_LINKS = [
  { label: "How do I track my order?", to: "/shipping" },
  { label: "What is the return policy?", to: "/returns" },
  { label: "How does solar charging work?", to: "/product/solar-camping-tent" },
  { label: "Do you offer bulk orders?", to: "/contact" },
  { label: "Shipping timeline and partners", to: "/shipping" },
];

const SUBJECTS = [
  "Order Query",
  "Return Request",
  "Product Information",
  "Bulk Orders",
  "Warranty Claim",
  "Technical Support",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  usePageTitle("Contact SunCamp Gear | Customer Support");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = (key: keyof FormState) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero strip */}
      <div className="bg-forest-dark pt-24 pb-14">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-amber-brand font-black text-xs tracking-[0.2em] uppercase mb-3">
            We're Here to Help
          </p>
          <h1 className="font-display font-black text-white text-4xl sm:text-5xl leading-tight mb-3">
            Get in Touch
          </h1>
          <p className="text-white/70 text-lg max-w-lg">
            Questions about your order, product, or just want to say hi? We're a
            real team of adventurers who actually respond.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Contact info */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const innerContent = (
                  <div className="bg-card rounded-2xl border border-border p-5 hover:border-forest/30 hover:shadow-nature-sm transition-all duration-200 h-full">
                    <div className="w-10 h-10 rounded-xl bg-forest/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-forest" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-1">
                      {item.label}
                    </p>
                    <p className="font-bold text-foreground text-sm mb-0.5">
                      {item.value}
                    </p>
                    <p className="text-muted-foreground text-xs">{item.desc}</p>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {innerContent}
                    </a>
                  );
                }
                return <div key={item.label}>{innerContent}</div>;
              })}
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210?text=Hi%20SunCamp%20Gear%2C%20I%20have%20a%20question%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 fill-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-base">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">
                  Fastest response — typically in under 30 minutes
                </p>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Bengaluru map placeholder */}
            <div className="rounded-2xl border border-border overflow-hidden bg-earth">
              <div className="h-40 bg-gradient-to-br from-forest/10 to-earth flex items-center justify-center relative">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-forest mx-auto mb-2" />
                  <p className="font-bold text-foreground text-sm">
                    Whitefield, Bengaluru
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Karnataka, India – 560066
                  </p>
                </div>
              </div>
              <div className="p-4 border-t border-border">
                <p className="text-sm font-semibold text-foreground">
                  SunCamp Gear HQ
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  12, Tech Park Road, Whitefield, Bengaluru – 560066
                </p>
                <a
                  href="https://maps.google.com/?q=Whitefield+Bengaluru+560066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-xs text-forest font-bold hover:text-amber-brand transition-colors"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* FAQ quick links */}
            <div className="bg-earth rounded-2xl border border-earth-dark p-6">
              <h3 className="font-display font-black text-lg text-foreground mb-4">
                Quick FAQ Links
              </h3>
              <div className="space-y-2">
                {FAQ_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white hover:shadow-xs transition-all text-sm font-medium text-foreground group"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact form */}
          <div className="bg-card rounded-2xl border border-border p-8 shadow-nature-sm">
            <h2 className="font-display font-black text-2xl text-foreground mb-2">
              Send Us a Message
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              We respond to all emails within 24 hours on business days.
            </p>

            {status === "success" ? (
              <div
                data-ocid="contact.form.success_state"
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-forest/15 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-forest" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-foreground mb-1">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Thank you for reaching out. We'll get back to you within 24
                    hours.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setStatus("idle")}
                  className="mt-4"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-name"
                      className="font-semibold text-sm"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="contact-name"
                      placeholder="Rahul Sharma"
                      value={form.name}
                      onChange={(e) => set("name")(e.target.value)}
                      required
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-email"
                      className="font-semibold text-sm"
                    >
                      Email *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="rahul@example.com"
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contact-phone"
                      className="font-semibold text-sm"
                    >
                      Phone
                    </Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder="+91 9XXXXXXXXX"
                      value={form.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      autoComplete="tel"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-semibold text-sm">Subject *</Label>
                    <Select
                      value={form.subject}
                      onValueChange={set("subject")}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="contact-message"
                    className="font-semibold text-sm"
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="contact-message"
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  data-ocid="contact.form.submit_button"
                  disabled={status === "loading"}
                  className="w-full btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold transition-all duration-150 active:scale-[0.98]"
                  size="lg"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" className="text-forest hover:underline">
                    Privacy Policy
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
