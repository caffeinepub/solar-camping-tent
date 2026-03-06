import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Home,
  Loader2,
  Lock,
  QrCode,
  Shield,
  Smartphone,
  Sun,
  Wallet,
} from "lucide-react";
import { useState } from "react";

/* ─── Indian States ─────────────────────────────────────────── */
const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

/* ─── Plan Data ──────────────────────────────────────────────── */
type Plan = {
  id: string;
  name: string;
  price: number;
  displayPrice: string;
  features: string[];
};

const PLANS: Record<string, Plan> = {
  solo: {
    id: "solo",
    name: "Solo",
    price: 5999,
    displayPrice: "₹5,999",
    features: [
      "1-person capacity",
      "1W solar panel",
      "USB-A charging port",
      "2000mm waterproof",
      "1.8 kg total weight",
      "1-year warranty",
    ],
  },
  duo: {
    id: "duo",
    name: "Duo",
    price: 8999,
    displayPrice: "₹8,999",
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
  family: {
    id: "family",
    name: "Pro",
    price: 12999,
    displayPrice: "₹12,999",
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
};

const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

/* ─── EMI Options ────────────────────────────────────────────── */
function getEmiMonthly(total: number, months: number) {
  return Math.round(total / months);
}

/* ─── Bank Grid ──────────────────────────────────────────────── */
const BANKS = ["SBI", "ICICI", "Axis", "HDFC", "Kotak", "PNB"];
const WALLETS = ["Paytm", "PhonePe", "Amazon Pay", "Mobikwik"];
const EMI_MONTHS = [3, 6, 9, 12];

/* ─── Trust Badges ───────────────────────────────────────────── */
function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
      {[
        { icon: Lock, label: "256-bit SSL" },
        { icon: Shield, label: "Razorpay Secured" },
        { icon: Check, label: "100% Safe" },
      ].map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest/8 border border-forest/15 text-xs font-semibold text-forest"
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Order Summary ──────────────────────────────────────────── */
function OrderSummary({ plan }: { plan: Plan }) {
  return (
    <Card className="border-border shadow-nature-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-black text-foreground">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Product */}
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center flex-shrink-0">
            <Sun className="w-6 h-6 text-forest" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground text-sm">
              SolarTent — {plan.name} Edition
            </p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Solar Camping Tent
            </p>
          </div>
          <div className="font-black text-foreground text-sm whitespace-nowrap">
            {plan.displayPrice}
          </div>
        </div>

        {/* Features list */}
        <ul className="space-y-1.5">
          {plan.features.map((f) => (
            <li
              key={f}
              className="flex items-center gap-2 text-xs text-muted-foreground"
            >
              <Check className="w-3.5 h-3.5 text-forest flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <Separator />

        {/* Delivery info */}
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="font-semibold text-forest text-xs">
              FREE across India
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Return Policy</span>
            <span className="font-semibold text-xs text-muted-foreground">
              30-day return
            </span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="font-black text-foreground text-base">Total</span>
          <span className="font-display font-black text-2xl text-foreground">
            {plan.displayPrice}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Payment Methods ────────────────────────────────────────── */
function PaymentSection({
  plan,
  onPayNow,
  isPaying,
}: {
  plan: Plan;
  onPayNow: () => void;
  isPaying: boolean;
}) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [selectedEmi, setSelectedEmi] = useState<number | null>(null);

  return (
    <Card className="border-border shadow-nature-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-black text-foreground">
          Select Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cards">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 h-auto gap-1 bg-muted p-1 rounded-xl mb-4">
            {[
              {
                value: "cards",
                label: "Cards",
                ocid: "checkout.payment_tab.1",
              },
              { value: "upi", label: "UPI", ocid: "checkout.payment_tab.2" },
              {
                value: "netbanking",
                label: "Net Banking",
                ocid: "checkout.payment_tab.3",
              },
              {
                value: "wallets",
                label: "Wallets",
                ocid: "checkout.payment_tab.4",
              },
              { value: "emi", label: "EMI", ocid: "checkout.payment_tab.5" },
              {
                value: "bank-transfer",
                label: "Bank Transfer",
                ocid: "checkout.payment_tab.6",
              },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid={tab.ocid}
                className="text-xs font-bold py-2 px-1 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs rounded-lg"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-4 mt-0">
            <div className="flex items-center gap-2 mb-3">
              {["VISA", "MC", "RuPay"].map((brand) => (
                <span
                  key={brand}
                  className="px-2 py-0.5 rounded border border-border text-xs font-black text-muted-foreground bg-background"
                >
                  {brand}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">
                  Card Number
                </Label>
                <Input
                  data-ocid="checkout.card_number_input"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className="font-mono tracking-wider"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-foreground">
                    Expiry
                  </Label>
                  <Input
                    data-ocid="checkout.card_expiry_input"
                    placeholder="MM / YY"
                    maxLength={7}
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm font-semibold text-foreground">
                    CVV
                  </Label>
                  <Input
                    data-ocid="checkout.card_cvv_input"
                    placeholder="• • •"
                    maxLength={4}
                    type="password"
                    className="font-mono"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">
                  Name on Card
                </Label>
                <Input placeholder="RAHUL SHARMA" className="uppercase" />
              </div>
            </div>
          </TabsContent>

          {/* UPI Tab */}
          <TabsContent value="upi" className="space-y-5 mt-0">
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold text-foreground">
                UPI ID
              </Label>
              <Input
                data-ocid="checkout.upi_input"
                placeholder="yourname@upi"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                e.g. name@gpay, number@paytm, yourname@okaxis
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* QR code placeholder */}
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-muted border border-border">
              <div className="w-32 h-32 rounded-xl bg-background border-2 border-dashed border-border flex flex-col items-center justify-center gap-2">
                <QrCode className="w-10 h-10 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-semibold">
                  QR Code
                </span>
              </div>
              <p className="text-sm font-semibold text-foreground text-center">
                Scan with any UPI app to pay
              </p>
              <p className="text-xs text-muted-foreground text-center">
                Works with GPay, PhonePe, Paytm, BHIM &amp; all UPI apps
              </p>
            </div>
          </TabsContent>

          {/* Net Banking Tab */}
          <TabsContent value="netbanking" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Select your bank to continue
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BANKS.map((bank, i) => (
                <button
                  key={bank}
                  type="button"
                  data-ocid={`checkout.bank.button.${i + 1}`}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-3 rounded-xl border-2 text-sm font-bold transition-all duration-150 text-left hover:border-forest/40 hover:bg-forest/5 active:scale-[0.98] ${
                    selectedBank === bank
                      ? "border-forest bg-forest/8 text-forest"
                      : "border-border text-foreground"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center mb-2">
                    <span className="text-xs font-black text-forest">
                      {bank.slice(0, 2)}
                    </span>
                  </div>
                  {bank}
                </button>
              ))}
            </div>
            {selectedBank && (
              <p className="mt-3 text-xs text-muted-foreground">
                You will be redirected to <strong>{selectedBank}</strong>{" "}
                internet banking page.
              </p>
            )}
          </TabsContent>

          {/* Wallets Tab */}
          <TabsContent value="wallets" className="mt-0">
            <p className="text-sm text-muted-foreground mb-4">
              Pay using your mobile wallet
            </p>
            <div className="grid grid-cols-2 gap-2">
              {WALLETS.map((wallet, i) => {
                const walletColors: Record<string, string> = {
                  Paytm: "bg-sky-50 text-sky-700",
                  PhonePe: "bg-purple-50 text-purple-700",
                  "Amazon Pay": "bg-orange-50 text-orange-700",
                  Mobikwik: "bg-blue-50 text-blue-700",
                };
                return (
                  <button
                    key={wallet}
                    type="button"
                    data-ocid={`checkout.wallet.button.${i + 1}`}
                    onClick={() => setSelectedWallet(wallet)}
                    className={`p-4 rounded-xl border-2 flex items-center gap-3 text-sm font-bold transition-all duration-150 hover:border-forest/40 active:scale-[0.98] ${
                      selectedWallet === wallet
                        ? "border-forest bg-forest/8"
                        : "border-border"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${walletColors[wallet] ?? "bg-muted text-muted-foreground"}`}
                    >
                      <Wallet className="w-4 h-4" />
                    </div>
                    <span className="text-foreground">{wallet}</span>
                  </button>
                );
              })}
            </div>
          </TabsContent>

          {/* EMI Tab */}
          <TabsContent value="emi" className="mt-0">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-brand/10 border border-amber-brand/25 mb-4">
              <Smartphone className="w-4 h-4 text-amber-brand mt-0.5 flex-shrink-0" />
              <p className="text-xs font-semibold text-foreground">
                No Cost EMI available on all major Credit &amp; Debit cards
              </p>
            </div>
            <div className="space-y-2">
              {EMI_MONTHS.map((months, i) => {
                const monthly = getEmiMonthly(plan.price, months);
                return (
                  <button
                    key={months}
                    type="button"
                    data-ocid={`checkout.emi.button.${i + 1}`}
                    onClick={() => setSelectedEmi(months)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center justify-between text-sm transition-all duration-150 hover:border-forest/40 hover:bg-forest/5 active:scale-[0.98] ${
                      selectedEmi === months
                        ? "border-forest bg-forest/8"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          selectedEmi === months
                            ? "border-forest"
                            : "border-muted-foreground"
                        }`}
                      >
                        {selectedEmi === months && (
                          <div className="w-2 h-2 rounded-full bg-forest" />
                        )}
                      </div>
                      <span className="font-bold text-foreground">
                        {months} months
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-foreground">
                        {formatINR(monthly)}/mo
                      </span>
                      <span className="block text-xs text-forest font-semibold">
                        No Cost EMI
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </TabsContent>

          {/* Bank Transfer Tab */}
          <TabsContent value="bank-transfer" className="space-y-4 mt-0">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted border border-border mb-2">
              <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Transfer directly to our bank account. Payment verified within 1
                business day.
              </p>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">
                  Account Number
                </Label>
                <Input
                  placeholder="Enter your account number"
                  className="font-mono"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold text-foreground">
                  IFSC Code
                </Label>
                <Input
                  placeholder="e.g. HDFC0001234"
                  className="font-mono uppercase"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-3">
          <Button
            data-ocid="checkout.pay_button"
            size="lg"
            onClick={onPayNow}
            disabled={isPaying}
            className="w-full btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-black text-base py-6 transition-all duration-150 active:scale-[0.98] disabled:opacity-70"
          >
            {isPaying ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay Now {plan.displayPrice}
              </>
            )}
          </Button>
          <TrustBadges />
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Customer Details Form ──────────────────────────────────── */
type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

function CustomerForm({
  form,
  setForm,
  onContinue,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onContinue: () => void;
}) {
  const set = (key: keyof FormData) => (val: string) =>
    setForm({ ...form, [key]: val });

  return (
    <Card className="border-border shadow-nature-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-black text-foreground">
          Shipping Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Full Name *
          </Label>
          <Input
            id="name"
            data-ocid="checkout.name_input"
            placeholder="Rahul Sharma"
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            autoComplete="name"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-semibold text-foreground"
            >
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              data-ocid="checkout.email_input"
              placeholder="rahul@example.com"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-foreground"
            >
              Phone Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              data-ocid="checkout.phone_input"
              placeholder="+91 9XXXXXXXXX"
              value={form.phone}
              onChange={(e) => set("phone")(e.target.value)}
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="address"
            className="text-sm font-semibold text-foreground"
          >
            Address Line 1 *
          </Label>
          <Input
            id="address"
            data-ocid="checkout.address_input"
            placeholder="Flat / House No., Street, Locality"
            value={form.address}
            onChange={(e) => set("address")(e.target.value)}
            autoComplete="street-address"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="city"
              className="text-sm font-semibold text-foreground"
            >
              City *
            </Label>
            <Input
              id="city"
              data-ocid="checkout.city_input"
              placeholder="Mumbai"
              value={form.city}
              onChange={(e) => set("city")(e.target.value)}
              autoComplete="address-level2"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="state"
              className="text-sm font-semibold text-foreground"
            >
              State *
            </Label>
            <Select value={form.state} onValueChange={set("state")}>
              <SelectTrigger
                id="state"
                data-ocid="checkout.state_select"
                className="w-full"
              >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="pincode"
              className="text-sm font-semibold text-foreground"
            >
              PIN Code *
            </Label>
            <Input
              id="pincode"
              data-ocid="checkout.pincode_input"
              placeholder="400001"
              maxLength={6}
              value={form.pincode}
              onChange={(e) =>
                set("pincode")(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              autoComplete="postal-code"
              required
            />
          </div>
        </div>

        <Button
          data-ocid="checkout.continue_button"
          onClick={onContinue}
          className="w-full md:hidden btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold transition-all duration-150 active:scale-[0.98]"
        >
          Continue to Payment
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

/* ─── Success State ──────────────────────────────────────────── */
function SuccessState({
  plan,
  name,
  onGoHome,
}: {
  plan: Plan;
  name: string;
  onGoHome: () => void;
}) {
  return (
    <div
      data-ocid="checkout.success_state"
      className="min-h-screen bg-background flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full text-center space-y-6">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-forest/15 flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-forest" strokeWidth={2.5} />
        </div>

        <div>
          <h1 className="font-display font-black text-3xl text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground">
            {name
              ? `Thank you, ${name.split(" ")[0]}!`
              : "Thank you for your order!"}{" "}
            Your SolarTent{" "}
            <strong className="text-foreground">{plan.name} Edition</strong> is
            on its way.
          </p>
        </div>

        {/* Order details card */}
        <Card className="border-forest/20 bg-forest/5 text-left">
          <CardContent className="pt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Product</span>
              <span className="font-semibold text-foreground">
                SolarTent — {plan.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-black text-foreground">
                {plan.displayPrice}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold text-forest">
                Free · 5–7 business days
              </span>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to your inbox. Order ID:{" "}
              <span className="font-mono font-semibold text-foreground">
                ST{Math.floor(100000 + Math.random() * 900000)}
              </span>
            </p>
          </CardContent>
        </Card>

        <Button
          data-ocid="checkout.back_to_home_button"
          size="lg"
          onClick={onGoHome}
          className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold px-10 transition-all duration-150 active:scale-[0.98]"
        >
          <Home className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
}

/* ─── CheckoutPage ───────────────────────────────────────────── */
export default function CheckoutPage() {
  const searchParams = new URLSearchParams(window.location.search);
  const planId = searchParams.get("plan") ?? "duo";
  const plan = PLANS[planId] ?? PLANS.duo;

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [isPaying, setIsPaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayNow = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  if (isSuccess) {
    return (
      <SuccessState plan={plan} name={form.name} onGoHome={handleGoHome} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <a
            href="/"
            data-ocid="checkout.back_button"
            className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Back to Home</span>
          </a>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition-colors">
              Home
            </a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-semibold">Checkout</span>
          </div>

          {/* Logo — centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-brand flex items-center justify-center shadow-amber">
                <Sun className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-black text-lg text-foreground tracking-tight">
                SolarTent
              </span>
            </div>
          </div>

          {/* Spacer for symmetry */}
          <div className="w-20 hidden sm:block" />
        </div>
      </header>

      {/* Main */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-1">
            Secure Checkout
          </h1>
          <p className="text-muted-foreground text-sm">
            Complete your order for the SolarTent {plan.name} Edition —{" "}
            <span className="font-semibold text-foreground">
              {plan.displayPrice}
            </span>
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">
          {/* Left: Customer form */}
          <div className="space-y-6">
            <CustomerForm
              form={form}
              setForm={setForm}
              onContinue={() => {
                const paymentEl = document.getElementById("payment-section");
                paymentEl?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* Payment section (desktop: left, mobile: below order summary) */}
            <div id="payment-section" className="lg:hidden">
              <PaymentSection
                plan={plan}
                onPayNow={handlePayNow}
                isPaying={isPaying}
              />
            </div>
          </div>

          {/* Right: Order summary + payment */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <OrderSummary plan={plan} />
            <div className="hidden lg:block">
              <PaymentSection
                plan={plan}
                onPayNow={handlePayNow}
                isPaying={isPaying}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="border-t border-border py-6 mt-8">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} SolarTent. All rights reserved.</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-brand transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
