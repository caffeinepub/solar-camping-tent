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
import { useActor } from "@/hooks/useActor";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Home,
  Loader2,
  Lock,
  Shield,
  Smartphone,
  Sun,
  Tag,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

/* ─── Indian States & Cities ─────────────────────────────────── */
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

const CITIES_BY_STATE: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry",
    "Tirupati",
    "Kakinada",
    "Kadapa",
    "Anantapur",
  ],
  "Arunachal Pradesh": [
    "Itanagar",
    "Naharlagun",
    "Pasighat",
    "Tezpur",
    "Bomdila",
    "Ziro",
    "Along",
    "Tezu",
    "Roing",
    "Aalo",
  ],
  Assam: [
    "Guwahati",
    "Silchar",
    "Dibrugarh",
    "Jorhat",
    "Nagaon",
    "Tinsukia",
    "Tezpur",
    "Bongaigaon",
    "Dhubri",
    "Diphu",
  ],
  Bihar: [
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Purnia",
    "Darbhanga",
    "Bihar Sharif",
    "Arrah",
    "Begusarai",
    "Katihar",
  ],
  Chhattisgarh: [
    "Raipur",
    "Bhilai",
    "Korba",
    "Bilaspur",
    "Durg",
    "Rajnandgaon",
    "Jagdalpur",
    "Ambikapur",
    "Raigarh",
    "Chirmiri",
  ],
  Goa: [
    "Panaji",
    "Margao",
    "Vasco da Gama",
    "Mapusa",
    "Ponda",
    "Bicholim",
    "Curchorem",
    "Sanquelim",
    "Cuncolim",
    "Canacona",
  ],
  Gujarat: [
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Gandhinagar",
    "Junagadh",
    "Anand",
    "Navsari",
    "Morbi",
    "Nadiad",
  ],
  Haryana: [
    "Faridabad",
    "Gurugram",
    "Panipat",
    "Ambala",
    "Yamunanagar",
    "Rohtak",
    "Hisar",
    "Karnal",
    "Sonipat",
    "Panchkula",
  ],
  "Himachal Pradesh": [
    "Shimla",
    "Dharamshala",
    "Solan",
    "Mandi",
    "Palampur",
    "Baddi",
    "Nahan",
    "Paonta Sahib",
    "Sundarnagar",
    "Chamba",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Deoghar",
    "Phusro",
    "Hazaribagh",
    "Giridih",
    "Ramgarh",
    "Medininagar",
  ],
  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubli",
    "Mangaluru",
    "Belagavi",
    "Davanagere",
    "Ballari",
    "Vijayapura",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Hassan",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Kollam",
    "Alappuzha",
    "Palakkad",
    "Kannur",
    "Kottayam",
    "Malappuram",
  ],
  "Madhya Pradesh": [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Dewas",
    "Satna",
    "Ratlam",
    "Rewa",
    "Murwara",
    "Singrauli",
  ],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Thane",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Nanded",
    "Kolhapur",
    "Sangli",
    "Jalgaon",
    "Akola",
  ],
  Manipur: [
    "Imphal",
    "Thoubal",
    "Bishnupur",
    "Churachandpur",
    "Kakching",
    "Senapati",
    "Ukhrul",
    "Moreh",
    "Jiribam",
    "Kangpokpi",
  ],
  Meghalaya: [
    "Shillong",
    "Tura",
    "Nongstoin",
    "Jowai",
    "Baghmara",
    "Williamnagar",
    "Resubelpara",
    "Ampati",
    "Mawkyrwat",
    "Mairang",
  ],
  Mizoram: [
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Serchhip",
    "Kolasib",
    "Lawngtlai",
    "Mamit",
    "Saiha",
    "Hnahthial",
    "Khawzawl",
  ],
  Nagaland: [
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Tuensang",
    "Wokha",
    "Zunheboto",
    "Phek",
    "Mon",
    "Longleng",
    "Kiphire",
  ],
  Odisha: [
    "Bhubaneswar",
    "Cuttack",
    "Rourkela",
    "Brahmapur",
    "Sambalpur",
    "Puri",
    "Balasore",
    "Bhadrak",
    "Baripada",
    "Jharsuguda",
  ],
  Punjab: [
    "Ludhiana",
    "Amritsar",
    "Jalandhar",
    "Patiala",
    "Bathinda",
    "Mohali",
    "Pathankot",
    "Hoshiarpur",
    "Batala",
    "Moga",
  ],
  Rajasthan: [
    "Jaipur",
    "Jodhpur",
    "Kota",
    "Bikaner",
    "Ajmer",
    "Udaipur",
    "Bhilwara",
    "Alwar",
    "Bharatpur",
    "Sikar",
    "Pali",
    "Sri Ganganagar",
  ],
  Sikkim: [
    "Gangtok",
    "Namchi",
    "Gyalshing",
    "Mangan",
    "Ravangla",
    "Singtam",
    "Jorethang",
    "Rangpo",
    "Rongli",
    "Yuksom",
  ],
  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
    "Tiruppur",
    "Vellore",
    "Erode",
    "Thoothukudi",
    "Dindigul",
    "Thanjavur",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Karimnagar",
    "Ramagundam",
    "Khammam",
    "Mahbubnagar",
    "Nalgonda",
    "Adilabad",
    "Suryapet",
  ],
  Tripura: [
    "Agartala",
    "Dharmanagar",
    "Udaipur",
    "Kailashahar",
    "Belonia",
    "Khowai",
    "Ambassa",
    "Sabroom",
    "Sonamura",
    "Bishalgarh",
  ],
  "Uttar Pradesh": [
    "Lucknow",
    "Kanpur",
    "Agra",
    "Varanasi",
    "Meerut",
    "Allahabad",
    "Bareilly",
    "Aligarh",
    "Moradabad",
    "Ghaziabad",
    "Noida",
    "Mathura",
    "Firozabad",
    "Saharanpur",
  ],
  Uttarakhand: [
    "Dehradun",
    "Haridwar",
    "Roorkee",
    "Haldwani",
    "Rudrapur",
    "Kashipur",
    "Rishikesh",
    "Kotdwar",
    "Mussoorie",
    "Almora",
  ],
  "West Bengal": [
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Asansol",
    "Siliguri",
    "Malda",
    "Bardhaman",
    "Kharagpur",
    "Haldia",
    "Raiganj",
  ],
  "Andaman and Nicobar Islands": [
    "Port Blair",
    "Car Nicobar",
    "Diglipur",
    "Rangat",
    "Mayabunder",
    "Havelock Island",
    "Neil Island",
    "Bambooflat",
    "Garacharma",
    "Tirur",
  ],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Daman",
    "Diu",
    "Silvassa",
    "Amli",
    "Khanvel",
    "Naroli",
  ],
  Delhi: [
    "New Delhi",
    "Central Delhi",
    "North Delhi",
    "South Delhi",
    "East Delhi",
    "West Delhi",
    "North East Delhi",
    "North West Delhi",
    "South West Delhi",
    "Shahdara",
  ],
  "Jammu and Kashmir": [
    "Srinagar",
    "Jammu",
    "Anantnag",
    "Sopore",
    "Baramulla",
    "Udhampur",
    "Kathua",
    "Poonch",
    "Rajouri",
    "Leh",
  ],
  Ladakh: [
    "Leh",
    "Kargil",
    "Nubra",
    "Zanskar",
    "Drass",
    "Padum",
    "Nyoma",
    "Durbuk",
    "Khaltse",
    "Sankoo",
  ],
  Lakshadweep: [
    "Kavaratti",
    "Agatti",
    "Amini",
    "Andrott",
    "Kalpeni",
    "Kadmat",
    "Kiltan",
    "Chetlat",
    "Bitra",
    "Minicoy",
  ],
  Puducherry: [
    "Puducherry",
    "Karaikal",
    "Mahe",
    "Yanam",
    "Ozhukarai",
    "Villianur",
    "Ariyankuppam",
    "Nettapakkam",
    "Mannadipet",
    "Bahour",
  ],
};

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
    price: 7999,
    displayPrice: "₹7,999",
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
    price: 9999,
    displayPrice: "₹9,999",
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

/* ─── Coupon definitions (mirrors CartPage) ─────────────────── */
type Coupon = {
  code: string;
  type: "percent" | "flat";
  value: number;
  label: string;
};
const VALID_COUPONS: Coupon[] = [
  { code: "SOLAR10", type: "percent", value: 10, label: "10% off" },
  { code: "SOLTREK15", type: "percent", value: 15, label: "15% off" },
  { code: "CAMP500", type: "flat", value: 500, label: "₹500 off" },
  {
    code: "FIRST20",
    type: "percent",
    value: 20,
    label: "20% off on first order",
  },
];

function calcDiscount(coupon: Coupon | null, subtotal: number): number {
  if (!coupon) return 0;
  return coupon.type === "percent"
    ? Math.round((subtotal * coupon.value) / 100)
    : Math.min(coupon.value, subtotal);
}

/* ─── Dummy Razorpay Modal ───────────────────────────────────── */
type PaymentTab = "upi" | "card" | "netbanking" | "wallet" | "emi";

const BANKS = [
  { code: "SBI", label: "State Bank of India" },
  { code: "HDFC", label: "HDFC Bank" },
  { code: "ICICI", label: "ICICI Bank" },
  { code: "AXIS", label: "Axis Bank" },
  { code: "KOTAK", label: "Kotak Mahindra Bank" },
  { code: "PNB", label: "Punjab National Bank" },
];

const WALLETS = [
  { id: "paytm", label: "Paytm" },
  { id: "phonepe", label: "PhonePe" },
  { id: "amazon", label: "Amazon Pay" },
  { id: "mobikwik", label: "MobiKwik" },
];

const EMI_OPTIONS = [
  { months: 3, bank: "HDFC Bank", interest: "No Cost" },
  { months: 6, bank: "ICICI Bank", interest: "No Cost" },
  { months: 9, bank: "Axis Bank", interest: "1.5% p.m." },
  { months: 12, bank: "SBI", interest: "1.5% p.m." },
];

function DummyRazorpayModal({
  finalPrice,
  customerName,
  customerEmail,
  onSuccess,
  onDismiss,
}: {
  plan: Plan;
  finalPrice: number;
  customerName: string;
  customerEmail: string;
  onSuccess: (paymentId: string) => void;
  onDismiss: () => void;
}) {
  const displayFinal = `₹${finalPrice.toLocaleString("en-IN")}`;
  const [activeTab, setActiveTab] = useState<PaymentTab>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedEmi, setSelectedEmi] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [upiStep, setUpiStep] = useState<"input" | "pending" | "done">("input");

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  const generatePaymentId = () =>
    `pay_${Math.random().toString(36).substring(2, 18).toUpperCase()}`;

  const handleUpiVerify = () => {
    if (!upiId.includes("@")) {
      toast.error("Please enter a valid UPI ID (e.g. name@upi)");
      return;
    }
    setUpiStep("pending");
    setTimeout(() => {
      setUpiStep("done");
    }, 2000);
  };

  const handleUpiPay = () => {
    setIsPaying(true);
    setTimeout(() => {
      onSuccess(generatePaymentId());
    }, 1500);
  };

  const handleCardPay = () => {
    if (!cardNumber || !cardExpiry || !cardCvv || !cardName) {
      toast.error("Please fill in all card details.");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      onSuccess(generatePaymentId());
    }, 2000);
  };

  const handleNetBankingPay = () => {
    if (!selectedBank) {
      toast.error("Please select your bank.");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      onSuccess(generatePaymentId());
    }, 1800);
  };

  const handleWalletPay = () => {
    if (!selectedWallet) {
      toast.error("Please select a wallet.");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      onSuccess(generatePaymentId());
    }, 1500);
  };

  const handleEmiPay = () => {
    if (!selectedEmi) {
      toast.error("Please select an EMI plan.");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      onSuccess(generatePaymentId());
    }, 2000);
  };

  const tabs: { id: PaymentTab; label: string; icon: React.ReactNode }[] = [
    { id: "upi", label: "UPI", icon: <Smartphone className="w-4 h-4" /> },
    { id: "card", label: "Card", icon: <CreditCard className="w-4 h-4" /> },
    {
      id: "netbanking",
      label: "Net Banking",
      icon: <Shield className="w-4 h-4" />,
    },
    { id: "wallet", label: "Wallet", icon: <Zap className="w-4 h-4" /> },
    { id: "emi", label: "EMI", icon: <Lock className="w-4 h-4" /> },
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onDismiss()}
      onKeyDown={(e) => e.key === "Escape" && onDismiss()}
    >
      {/* Modal */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        {/* Razorpay Header */}
        <div className="bg-[#2D6FDB] px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {/* Razorpay logo-style mark */}
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5"
                fill="none"
                aria-label="Razorpay"
              >
                <title>Razorpay</title>
                <path d="M4 20L10 4L14 12L18 8L20 20H4Z" fill="#2D6FDB" />
              </svg>
            </div>
            <div>
              <div className="text-white font-black text-sm leading-tight">
                SolTrek
              </div>
              <div className="text-white/70 text-xs">Secure Payment</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-white/70 text-[11px]">Amount</div>
              <div className="text-white font-black text-base">
                {displayFinal}
              </div>
            </div>
            <button
              type="button"
              onClick={onDismiss}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customer info strip */}
        <div className="bg-[#1A5CC8] px-5 py-2 flex items-center gap-2 flex-shrink-0">
          <Lock className="w-3 h-3 text-white/60" />
          <span className="text-white/70 text-[11px] font-medium truncate">
            {customerEmail || customerName || "Secure checkout"}
          </span>
          <span className="ml-auto text-white/50 text-[10px] font-semibold uppercase tracking-wider">
            Powered by Razorpay
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-white flex-shrink-0 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              data-ocid={`payment.tab.${tab.id}`}
              className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-[11px] font-semibold transition-all min-w-[60px] border-b-2 ${
                activeTab === tab.id
                  ? "border-[#2D6FDB] text-[#2D6FDB]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content — scrollable */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* ── UPI Tab ── */}
          {activeTab === "upi" && (
            <div className="space-y-4" data-ocid="payment.upi.panel">
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">
                  Pay via UPI
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Enter your UPI ID (e.g. name@okaxis, name@paytm)
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      setUpiStep("input");
                    }}
                    data-ocid="payment.upi_input"
                    className="flex-1 border-gray-300 focus:border-[#2D6FDB]"
                    disabled={upiStep === "pending" || isPaying}
                  />
                  {upiStep === "input" && (
                    <Button
                      type="button"
                      onClick={handleUpiVerify}
                      className="bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-bold px-4"
                    >
                      Verify
                    </Button>
                  )}
                </div>
              </div>

              {upiStep === "pending" && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 border border-blue-200">
                  <Loader2 className="w-4 h-4 text-[#2D6FDB] animate-spin" />
                  <span className="text-sm text-[#2D6FDB] font-semibold">
                    Verifying UPI ID…
                  </span>
                </div>
              )}

              {upiStep === "done" && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700 font-semibold">
                      UPI ID verified
                    </span>
                  </div>
                  <Button
                    type="button"
                    onClick={handleUpiPay}
                    disabled={isPaying}
                    data-ocid="payment.upi.pay_button"
                    className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black py-5 text-base"
                  >
                    {isPaying ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                        Processing…
                      </>
                    ) : (
                      <>Pay {displayFinal}</>
                    )}
                  </Button>
                </div>
              )}

              <div className="border-t border-gray-100 pt-3">
                <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2">
                  Also pay via UPI apps
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => setUpiId(`demo@${app.toLowerCase()}`)}
                      className="flex flex-col items-center p-2 rounded-lg border border-gray-200 hover:border-[#2D6FDB] hover:bg-blue-50 transition-all text-[11px] font-semibold text-gray-600"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-1">
                        <Smartphone className="w-3.5 h-3.5 text-[#2D6FDB]" />
                      </div>
                      {app}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Card Tab ── */}
          {activeTab === "card" && (
            <div className="space-y-4" data-ocid="payment.card.panel">
              <p className="text-sm font-bold text-gray-800">
                Credit / Debit Card
              </p>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                    Card Number
                  </Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    data-ocid="payment.card_number_input"
                    className="border-gray-300 focus:border-[#2D6FDB] font-mono tracking-widest"
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Expiry (MM/YY)
                    </Label>
                    <Input
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      data-ocid="payment.card_expiry_input"
                      className="border-gray-300 focus:border-[#2D6FDB]"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                      CVV
                    </Label>
                    <Input
                      placeholder="•••"
                      type="password"
                      value={cardCvv}
                      onChange={(e) =>
                        setCardCvv(
                          e.target.value.replace(/\D/g, "").slice(0, 4),
                        )
                      }
                      data-ocid="payment.card_cvv_input"
                      className="border-gray-300 focus:border-[#2D6FDB]"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-600 mb-1 block">
                    Name on Card
                  </Label>
                  <Input
                    placeholder="RAHUL SHARMA"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value.toUpperCase())}
                    data-ocid="payment.card_name_input"
                    className="border-gray-300 focus:border-[#2D6FDB] uppercase"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px] text-gray-500">
                  Your card details are protected with 256-bit SSL encryption
                </span>
              </div>

              <Button
                type="button"
                onClick={handleCardPay}
                disabled={isPaying}
                data-ocid="payment.card.pay_button"
                className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black py-5 text-base"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Processing…
                  </>
                ) : (
                  <>Pay {displayFinal}</>
                )}
              </Button>

              {/* Card network logos */}
              <div className="flex items-center justify-center gap-3">
                {["Visa", "Mastercard", "RuPay", "Amex"].map((n) => (
                  <span
                    key={n}
                    className="text-[10px] font-black text-gray-400 border border-gray-200 rounded px-2 py-0.5"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Net Banking Tab ── */}
          {activeTab === "netbanking" && (
            <div className="space-y-4" data-ocid="payment.netbanking.panel">
              <p className="text-sm font-bold text-gray-800">Net Banking</p>
              <div className="grid grid-cols-2 gap-2">
                {BANKS.map((bank) => (
                  <button
                    key={bank.code}
                    type="button"
                    data-ocid={`payment.bank.${bank.code.toLowerCase()}`}
                    onClick={() => setSelectedBank(bank.code)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedBank === bank.code
                        ? "border-[#2D6FDB] bg-blue-50 ring-1 ring-[#2D6FDB]"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-1.5">
                      <span className="text-[9px] font-black text-[#2D6FDB]">
                        {bank.code.slice(0, 2)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-700 leading-tight">
                      {bank.label}
                    </p>
                  </button>
                ))}
              </div>

              <Button
                type="button"
                onClick={handleNetBankingPay}
                disabled={isPaying || !selectedBank}
                data-ocid="payment.netbanking.pay_button"
                className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black py-5 text-base disabled:opacity-50"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Redirecting to Bank…
                  </>
                ) : (
                  <>Pay {displayFinal}</>
                )}
              </Button>
            </div>
          )}

          {/* ── Wallet Tab ── */}
          {activeTab === "wallet" && (
            <div className="space-y-4" data-ocid="payment.wallet.panel">
              <p className="text-sm font-bold text-gray-800">Mobile Wallets</p>
              <div className="space-y-2">
                {WALLETS.map((wallet) => (
                  <button
                    key={wallet.id}
                    type="button"
                    data-ocid={`payment.wallet.${wallet.id}`}
                    onClick={() => setSelectedWallet(wallet.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                      selectedWallet === wallet.id
                        ? "border-[#2D6FDB] bg-blue-50 ring-1 ring-[#2D6FDB]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                      <Smartphone className="w-4 h-4 text-[#2D6FDB]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {wallet.label}
                    </span>
                    {selectedWallet === wallet.id && (
                      <Check className="w-4 h-4 text-[#2D6FDB] ml-auto" />
                    )}
                  </button>
                ))}
              </div>

              <Button
                type="button"
                onClick={handleWalletPay}
                disabled={isPaying || !selectedWallet}
                data-ocid="payment.wallet.pay_button"
                className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black py-5 text-base disabled:opacity-50"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Processing…
                  </>
                ) : (
                  <>Pay {displayFinal}</>
                )}
              </Button>
            </div>
          )}

          {/* ── EMI Tab ── */}
          {activeTab === "emi" && (
            <div className="space-y-4" data-ocid="payment.emi.panel">
              <p className="text-sm font-bold text-gray-800">EMI Options</p>
              <div className="space-y-2">
                {EMI_OPTIONS.map((emi) => {
                  const monthlyAmount = Math.ceil(finalPrice / emi.months);
                  const emiKey = `${emi.months}-${emi.bank}`;
                  return (
                    <button
                      key={emiKey}
                      type="button"
                      data-ocid={`payment.emi.${emi.months}m`}
                      onClick={() => setSelectedEmi(emiKey)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        selectedEmi === emiKey
                          ? "border-[#2D6FDB] bg-blue-50 ring-1 ring-[#2D6FDB]"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-left">
                        <p className="text-sm font-bold text-gray-800">
                          {emi.months} Months · {emi.bank}
                        </p>
                        <p
                          className={`text-xs font-semibold mt-0.5 ${emi.interest === "No Cost" ? "text-green-600" : "text-gray-500"}`}
                        >
                          {emi.interest === "No Cost"
                            ? "✓ No Cost EMI"
                            : `${emi.interest} interest`}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-800">
                          ₹{monthlyAmount.toLocaleString("en-IN")}/mo
                        </p>
                        {selectedEmi === emiKey && (
                          <Check className="w-4 h-4 text-[#2D6FDB] ml-auto mt-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button
                type="button"
                onClick={handleEmiPay}
                disabled={isPaying || !selectedEmi}
                data-ocid="payment.emi.pay_button"
                className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black py-5 text-base disabled:opacity-50"
              >
                {isPaying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                    Processing…
                  </>
                ) : (
                  <>Pay {displayFinal}</>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-gray-50 border-t border-gray-200 flex-shrink-0">
          <Lock className="w-3 h-3 text-gray-400" />
          <span className="text-[11px] text-gray-400 font-semibold">
            Secured by{" "}
            <span className="text-[#2D6FDB] font-black">Razorpay</span>
          </span>
        </div>
      </div>
    </div>
  );
}

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
function OrderSummary({
  plan,
  appliedCoupon,
  discountAmount,
  finalPrice,
  onCouponApplied,
  onCouponRemoved,
}: {
  plan: Plan;
  appliedCoupon: Coupon | null;
  discountAmount: number;
  finalPrice: number;
  onCouponApplied: (coupon: Coupon) => void;
  onCouponRemoved: () => void;
}) {
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApply = () => {
    const code = couponInput.trim().toUpperCase();
    const found = VALID_COUPONS.find((c) => c.code === code);
    if (!found) {
      setCouponError("Invalid coupon code. Please try again.");
      return;
    }
    setCouponError("");
    onCouponApplied(found);
  };

  const handleRemove = () => {
    setCouponInput("");
    setCouponError("");
    onCouponRemoved();
  };

  return (
    <Card className="border-border shadow-nature-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-black text-foreground">
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold text-foreground">
              ₹{plan.price.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Delivery</span>
            <span className="font-semibold text-forest text-xs">
              FREE across India
            </span>
          </div>
          {appliedCoupon && discountAmount > 0 && (
            <div className="flex items-center justify-between text-green-700">
              <span className="flex items-center gap-1 font-semibold text-xs">
                <Tag className="w-3 h-3" />
                Coupon ({appliedCoupon.code})
              </span>
              <span className="font-bold text-xs">
                −₹{discountAmount.toLocaleString("en-IN")}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Return Policy</span>
            <span className="font-semibold text-xs text-muted-foreground">
              7-day return
            </span>
          </div>
        </div>

        {/* Coupon input */}
        <div className="space-y-2">
          {!appliedCoupon ? (
            <>
              <div className="flex gap-2">
                <Input
                  data-ocid="checkout.coupon_input"
                  placeholder="Coupon code"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    setCouponError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleApply()}
                  className="flex-1 text-sm uppercase tracking-wide"
                />
                <button
                  type="button"
                  data-ocid="checkout.coupon_apply_button"
                  onClick={handleApply}
                  className="px-3 py-2 text-xs font-bold rounded-md border border-forest text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <div className="flex items-center gap-1.5 text-xs text-red-500">
                  <XCircle className="w-3 h-3 flex-shrink-0" />
                  {couponError}
                </div>
              )}
              <p className="text-[11px] text-muted-foreground">
                Try: SOLAR10 · SOLTREK15 · CAMP500 · FIRST20
              </p>
            </>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-xs font-black text-green-800">
                    {appliedCoupon.code}
                  </p>
                  <p className="text-[11px] text-green-600">
                    {appliedCoupon.label} applied
                  </p>
                </div>
              </div>
              <button
                type="button"
                data-ocid="checkout.coupon_remove_button"
                onClick={handleRemove}
                className="text-green-600 hover:text-red-500 transition-colors"
                aria-label="Remove coupon"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <span className="font-black text-foreground text-base">Total</span>
          <div className="text-right">
            {appliedCoupon && discountAmount > 0 && (
              <p className="text-xs text-muted-foreground line-through">
                ₹{plan.price.toLocaleString("en-IN")}
              </p>
            )}
            <span className="font-display font-black text-2xl text-foreground">
              ₹{finalPrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Payment Section ────────────────────────────────────────── */
function PaymentSection({
  finalPrice,
  onPayNow,
}: {
  plan: Plan;
  finalPrice: number;
  onPayNow: () => void;
}) {
  const displayFinal = `₹${finalPrice.toLocaleString("en-IN")}`;
  return (
    <Card className="border-border shadow-nature-sm">
      <CardHeader className="pb-3">
        <CardTitle className="font-display text-lg font-black text-foreground flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-amber-brand" />
          Payment
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Razorpay Branding Strip */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#2D6FDB]/8 border border-[#2D6FDB]/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2D6FDB] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4"
                fill="none"
                aria-label="Razorpay"
              >
                <title>Razorpay</title>
                <path d="M4 20L10 4L14 12L18 8L20 20H4Z" fill="white" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black text-foreground">
                Powered by Razorpay
              </p>
              <p className="text-[11px] text-muted-foreground">
                India's most trusted payment gateway
              </p>
            </div>
          </div>
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Pay Button */}
        <Button
          data-ocid="checkout.pay_button"
          size="lg"
          onClick={onPayNow}
          className="w-full bg-[#2D6FDB] hover:bg-[#1A5CC8] text-white font-black text-base py-6 rounded-xl transition-all duration-150 active:scale-[0.98] shadow-md hover:shadow-lg"
        >
          <Lock className="w-4 h-4 mr-2" />
          Pay with Razorpay — {displayFinal}
        </Button>

        {/* Payment Methods Strip */}
        <div className="space-y-2">
          <p className="text-[11px] text-muted-foreground text-center font-semibold uppercase tracking-wider">
            Accepted Payment Methods
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {[
              "UPI",
              "Visa",
              "Mastercard",
              "RuPay",
              "Net Banking",
              "Wallets",
              "EMI",
            ].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 rounded-full border border-border bg-muted text-[11px] font-semibold text-muted-foreground"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        <TrustBadges />
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

type FormErrors = Partial<Record<keyof FormData, string>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
}

function validatePincode(pin: string) {
  return /^\d{6}$/.test(pin);
}

function CustomerForm({
  form,
  setForm,
  onContinue,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onContinue: () => void;
}) {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const set = (key: keyof FormData) => (val: string) => {
    setForm({ ...form, [key]: val });
    // Clear error on change
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const touch = (key: keyof FormData) => () =>
    setTouched((prev) => ({ ...prev, [key]: true }));

  const getFieldError = (
    key: keyof FormData,
    val: string,
  ): string | undefined => {
    if (!val)
      return `${key === "pincode" ? "PIN code" : key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    if (key === "email" && !validateEmail(val))
      return "Please enter a valid email address";
    if (key === "phone" && !validatePhone(val))
      return "Mobile number must be exactly 10 digits";
    if (key === "pincode" && !validatePincode(val))
      return "PIN code must be exactly 6 digits";
    return undefined;
  };

  const handleContinue = () => {
    const newErrors: FormErrors = (
      Object.keys(form) as (keyof FormData)[]
    ).reduce((acc, key) => {
      const err = getFieldError(key, form[key]);
      if (err) acc[key] = err;
      return acc;
    }, {} as FormErrors);
    setErrors(newErrors);
    const allTouched = (Object.keys(form) as (keyof FormData)[]).reduce(
      (acc, k) => {
        acc[k] = true;
        return acc;
      },
      {} as Record<keyof FormData, boolean>,
    );
    setTouched(allTouched);
    if (Object.keys(newErrors).length === 0) onContinue();
  };

  const fieldError = (key: keyof FormData) =>
    touched[key] ? getFieldError(key, form[key]) : errors[key];

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
            onBlur={touch("name")}
            autoComplete="name"
            required
            className={
              fieldError("name")
                ? "border-red-500 focus-visible:ring-red-400"
                : ""
            }
          />
          {fieldError("name") && (
            <p className="text-xs text-red-500 mt-0.5">{fieldError("name")}</p>
          )}
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
              onBlur={touch("email")}
              autoComplete="email"
              required
              className={
                fieldError("email")
                  ? "border-red-500 focus-visible:ring-red-400"
                  : ""
              }
            />
            {fieldError("email") && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldError("email")}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-sm font-semibold text-foreground"
            >
              Mobile Number *
            </Label>
            <Input
              id="phone"
              type="tel"
              data-ocid="checkout.phone_input"
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) =>
                set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))
              }
              onBlur={touch("phone")}
              autoComplete="tel"
              maxLength={10}
              required
              className={
                fieldError("phone")
                  ? "border-red-500 focus-visible:ring-red-400"
                  : ""
              }
            />
            {fieldError("phone") && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldError("phone")}
              </p>
            )}
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
            onBlur={touch("address")}
            autoComplete="street-address"
            required
            className={
              fieldError("address")
                ? "border-red-500 focus-visible:ring-red-400"
                : ""
            }
          />
          {fieldError("address") && (
            <p className="text-xs text-red-500 mt-0.5">
              {fieldError("address")}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="state"
              className="text-sm font-semibold text-foreground"
            >
              State *
            </Label>
            <Select
              value={form.state}
              onValueChange={(val) => {
                setForm({ ...form, state: val, city: "" });
                setTouched((prev) => ({ ...prev, state: true, city: false }));
              }}
            >
              <SelectTrigger
                id="state"
                data-ocid="checkout.state_select"
                className={`w-full ${fieldError("state") ? "border-red-500 focus:ring-red-400" : ""}`}
              >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="max-h-72 overflow-y-auto">
                {INDIAN_STATES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("state") && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldError("state")}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="city"
              className="text-sm font-semibold text-foreground"
            >
              City *
            </Label>
            <Select
              value={form.city}
              onValueChange={(val) => {
                set("city")(val);
                setTouched((prev) => ({ ...prev, city: true }));
              }}
              disabled={!form.state}
            >
              <SelectTrigger
                id="city"
                data-ocid="checkout.city_select"
                className={`w-full ${fieldError("city") ? "border-red-500 focus:ring-red-400" : ""} ${!form.state ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <SelectValue
                  placeholder={
                    form.state ? "Select city" : "Select state first"
                  }
                />
              </SelectTrigger>
              <SelectContent className="max-h-72 overflow-y-auto">
                {(CITIES_BY_STATE[form.state] ?? []).map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError("city") && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldError("city")}
              </p>
            )}
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
              onBlur={touch("pincode")}
              autoComplete="postal-code"
              required
              className={
                fieldError("pincode")
                  ? "border-red-500 focus-visible:ring-red-400"
                  : ""
              }
            />
            {fieldError("pincode") && (
              <p className="text-xs text-red-500 mt-0.5">
                {fieldError("pincode")}
              </p>
            )}
          </div>
        </div>

        <Button
          data-ocid="checkout.continue_button"
          onClick={handleContinue}
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
  paymentId,
  finalPrice,
  discountAmount,
  couponCode,
  onGoHome,
}: {
  plan: Plan;
  name: string;
  paymentId?: string;
  finalPrice: number;
  discountAmount: number;
  couponCode: string;
  onGoHome: () => void;
}) {
  return (
    <div
      data-ocid="checkout.success_state"
      className="min-h-screen bg-background flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full text-center space-y-6">
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

        <Card className="border-forest/20 bg-forest/5 text-left">
          <CardContent className="pt-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Product</span>
              <span className="font-semibold text-foreground">
                SolarTent — {plan.name}
              </span>
            </div>
            {discountAmount > 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Original Price</span>
                  <span className="font-semibold text-foreground line-through text-muted-foreground">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-green-700">
                  <span className="flex items-center gap-1 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    Coupon {couponCode && `(${couponCode})`}
                  </span>
                  <span className="font-bold">
                    −₹{discountAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-black text-foreground text-base">
                ₹{finalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="font-semibold text-forest">
                Free · 5–7 business days
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment ID</span>
              <span className="font-mono font-semibold text-foreground text-xs">
                {paymentId ||
                  `ST${Math.floor(100000 + Math.random() * 900000)}`}
              </span>
            </div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              A confirmation email has been sent to your inbox.
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
  const cartTotal = searchParams.get("total");
  const cartLabel = searchParams.get("label");
  const urlCoupon = searchParams.get("coupon") ?? "";
  const urlDiscount = Number(searchParams.get("discount") ?? 0);
  const urlSubtotal = Number(searchParams.get("subtotal") ?? 0);

  // If coming from cart, build a dynamic plan from the actual cart subtotal
  const basePlan: Plan =
    planId === "cart" && (cartTotal || urlSubtotal)
      ? {
          id: "cart",
          name: cartLabel ?? "Cart",
          price: urlSubtotal || Number(cartTotal),
          displayPrice: `₹${(urlSubtotal || Number(cartTotal)).toLocaleString("en-IN")}`,
          features: [
            "All items from your cart",
            "Free shipping across India",
            "1-year warranty",
            "7-day returns",
          ],
        }
      : (PLANS[planId] ?? PLANS.duo);

  const { actor } = useActor();

  // Coupon state — pre-populate if coming from cart with an already-applied coupon
  const initialCoupon = urlCoupon
    ? (VALID_COUPONS.find((c) => c.code === urlCoupon) ?? null)
    : null;
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(
    initialCoupon,
  );

  const discountAmount = appliedCoupon
    ? calcDiscount(appliedCoupon, basePlan.price)
    : urlDiscount > 0 && initialCoupon
      ? urlDiscount
      : 0;
  const finalPrice = basePlan.price - discountAmount;

  // Keep plan.displayPrice always pointing at the original subtotal
  const plan = basePlan;

  const handleCouponApplied = useCallback((coupon: Coupon) => {
    setAppliedCoupon(coupon);
  }, []);

  const handleCouponRemoved = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string>("");
  const sessionId = useRef<string>(
    `session_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  );

  const validateForm = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      toast.error("Please fill in all shipping details before payment.");
      return false;
    }
    if (!validateEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!validatePhone(form.phone)) {
      toast.error("Mobile number must be exactly 10 digits.");
      return false;
    }
    if (!validatePincode(form.pincode)) {
      toast.error("PIN code must be exactly 6 digits.");
      return false;
    }
    return true;
  };

  const handlePayNow = () => {
    if (!validateForm()) return;
    setShowModal(true);
  };

  const handlePaymentSuccess = async (pid: string) => {
    setShowModal(false);
    setPaymentId(pid);
    // Save order to backend so admin panel can track it
    if (actor) {
      try {
        const sid = sessionId.current;
        // Add the selected product to cart first (use finalPrice so admin sees correct amount)
        await actor.addToCart(
          sid,
          BigInt(planId === "solo" ? 1 : planId === "duo" ? 2 : 3),
          `SolTrek ${plan.name} Solar Camping Tent`,
          finalPrice,
          BigInt(1),
        );
        // Place the order
        const orderResult = await actor.placeOrder(
          sid,
          form.name,
          form.email,
          form.phone,
          form.address,
          form.city,
          form.state,
          form.pincode,
          pid, // payment method = payment ID for traceability
        );
        // Record placement timestamp so admin panel can auto-advance to Shipped after 30 min
        try {
          const stored = JSON.parse(
            localStorage.getItem("soltrek_order_times") || "{}",
          );
          // orderResult is the new orderId (bigint)
          stored[String(orderResult)] = Date.now();
          localStorage.setItem("soltrek_order_times", JSON.stringify(stored));
        } catch {
          // ignore storage errors
        }
      } catch {
        // Order save failed silently — payment already succeeded
      }
    }
    setIsSuccess(true);
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  if (isSuccess) {
    return (
      <SuccessState
        plan={plan}
        name={form.name}
        paymentId={paymentId}
        finalPrice={finalPrice}
        discountAmount={discountAmount}
        couponCode={appliedCoupon?.code ?? ""}
        onGoHome={handleGoHome}
      />
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
            {discountAmount > 0 ? (
              <>
                <span className="line-through text-muted-foreground mr-1">
                  {plan.displayPrice}
                </span>
                <span className="font-semibold text-forest">
                  ₹{finalPrice.toLocaleString("en-IN")}
                </span>
              </>
            ) : (
              <span className="font-semibold text-foreground">
                {plan.displayPrice}
              </span>
            )}
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

            {/* Payment section (mobile: below form) */}
            <div id="payment-section" className="lg:hidden">
              <PaymentSection
                plan={plan}
                finalPrice={finalPrice}
                onPayNow={handlePayNow}
              />
            </div>
          </div>

          {/* Right: Order summary + payment */}
          <div className="space-y-6 lg:sticky lg:top-20">
            <OrderSummary
              plan={plan}
              appliedCoupon={appliedCoupon}
              discountAmount={discountAmount}
              finalPrice={finalPrice}
              onCouponApplied={handleCouponApplied}
              onCouponRemoved={handleCouponRemoved}
            />
            <div className="hidden lg:block">
              <PaymentSection
                plan={plan}
                finalPrice={finalPrice}
                onPayNow={handlePayNow}
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

      {/* Dummy Razorpay Modal */}
      {showModal && (
        <DummyRazorpayModal
          plan={plan}
          finalPrice={finalPrice}
          customerName={form.name}
          customerEmail={form.email}
          onSuccess={handlePaymentSuccess}
          onDismiss={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
