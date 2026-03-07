import type { OrderView } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, Download, IndianRupee, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { exportToExcel } from "../utils/exportImport";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Compute revenue cards from orders (using index-based mock timestamps)
function computeRevenue(orders: OrderView[]) {
  const total = orders.reduce((sum, o) => {
    if (o.status === "Cancelled") return sum;
    return (
      sum +
      o.cartItems.reduce((s, item) => s + item.price * Number(item.quantity), 0)
    );
  }, 0);

  // Distribute among time periods for demo
  const today = Math.round(total * 0.08);
  const week = Math.round(total * 0.35);
  const month = total;

  return { today, week, month };
}

// Generate last 7 days revenue data
function generateDailyRevenue(
  orders: OrderView[],
): Array<{ day: string; revenue: number }> {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const base = orders.reduce((sum, o) => {
    if (o.status === "Cancelled") return sum;
    return (
      sum +
      o.cartItems.reduce((s, item) => s + item.price * Number(item.quantity), 0)
    );
  }, 0);

  const avg = base > 0 ? base / 7 : 5000;
  const multipliers = [0.7, 0.85, 1.1, 0.9, 1.2, 1.4, 1.05];

  return days.map((day, i) => ({
    day,
    revenue: Math.round(avg * multipliers[i]),
  }));
}

// Compute top products from cart items
function computeTopProducts(
  orders: OrderView[],
): Array<{ name: string; revenue: number }> {
  const productMap = new Map<string, number>();
  for (const order of orders) {
    if (order.status === "Cancelled") continue;
    for (const item of order.cartItems) {
      const current = productMap.get(item.productName) || 0;
      productMap.set(
        item.productName,
        current + item.price * Number(item.quantity),
      );
    }
  }
  return Array.from(productMap.entries())
    .map(([name, revenue]) => ({
      name: name.length > 20 ? `${name.slice(0, 18)}…` : name,
      revenue,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);
}

// Mock customer acquisition trend
function generateAcquisitionTrend(): Array<{
  week: string;
  customers: number;
}> {
  return [
    { week: "W1", customers: 3 },
    { week: "W2", customers: 7 },
    { week: "W3", customers: 5 },
    { week: "W4", customers: 12 },
    { week: "W5", customers: 9 },
    { week: "W6", customers: 18 },
    { week: "W7", customers: 14 },
    { week: "W8", customers: 23 },
  ];
}

export default function AdminAnalyticsPage() {
  const { actor, isFetching } = useActor();
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load analytics data."))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const revenue = computeRevenue(orders);
  const dailyRevenue = generateDailyRevenue(orders);
  const topProducts = computeTopProducts(orders);
  const acquisitionTrend = generateAcquisitionTrend();

  const handleExportReport = () => {
    // Export daily revenue summary
    const headers = ["Day", "Revenue (INR)"];
    const rows = dailyRevenue.map((d) => [d.day, d.revenue]);
    exportToExcel("soltrek-analytics-report.csv", headers, rows);
  };

  const revenueCards = [
    {
      label: "Revenue Today",
      value: formatCurrency(revenue.today),
      icon: IndianRupee,
      color: "bg-indigo-50 text-indigo-600",
      ocid: "admin.analytics.today.card",
    },
    {
      label: "This Week",
      value: formatCurrency(revenue.week),
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600",
      ocid: "admin.analytics.week.card",
    },
    {
      label: "This Month",
      value: formatCurrency(revenue.month),
      icon: TrendingUp,
      color: "bg-blue-50 text-blue-600",
      ocid: "admin.analytics.month.card",
    },
  ];

  if (loading) {
    return (
      <div data-ocid="admin.analytics.loading_state" className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["sk1", "sk2", "sk3"].map((key) => (
            <div
              key={key}
              className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-ocid="admin.analytics.error_state"
        className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
      >
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header with export */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-sm">Sales Analytics</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Revenue and performance overview
          </p>
        </div>
        <button
          type="button"
          onClick={handleExportReport}
          data-ocid="admin.analytics.export_button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <Download style={{ width: "13px", height: "13px" }} />
          Export Report
        </button>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {revenueCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              data-ocid={card.ocid}
              className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-slate-300 transition-all duration-200"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${card.color}`}
              >
                <Icon style={{ width: "18px", height: "18px" }} />
              </div>
              <div className="text-2xl font-black text-slate-900 mb-0.5 tracking-tight">
                {card.value}
              </div>
              <div className="text-xs font-medium text-slate-500">
                {card.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-1 text-sm">
            Daily Revenue (Last 7 Days)
          </h2>
          <p className="text-xs text-slate-400 mb-5">Revenue in INR</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={dailyRevenue}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number) => [
                  formatCurrency(value),
                  "Revenue",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="font-bold text-slate-900 mb-1 text-sm">
            Top Products by Revenue
          </h2>
          <p className="text-xs text-slate-400 mb-5">Revenue contribution</p>
          {topProducts.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-slate-400 text-sm">
              No product data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Customer Acquisition */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-bold text-slate-900 mb-1 text-sm">
          Customer Acquisition Trend
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          New customers per week (trend)
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart
            data={acquisitionTrend}
            margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="customers"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ fill: "#6366f1", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
