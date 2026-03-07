import type { AdminStats, OrderView } from "@/backend";
import { useActor } from "@/hooks/useActor";
import {
  AlertCircle,
  ArrowUpRight,
  IndianRupee,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-200",
  Delivered: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Cancelled: "bg-red-100 text-red-700 border border-red-200",
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminDashboardPage() {
  const { actor, isFetching } = useActor();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    Promise.all([actor.getAdminStats(), actor.getAllOrders()])
      .then(([s, o]) => {
        setStats(s);
        setOrders(o);
      })
      .catch(() => setError("Failed to load dashboard data."))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  // Compute chart data from orders
  const chartData = [
    {
      name: "Pending",
      count: orders.filter((o) => o.status === "Pending").length,
    },
    {
      name: "Shipped",
      count: orders.filter((o) => o.status === "Shipped").length,
    },
    {
      name: "Delivered",
      count: orders.filter((o) => o.status === "Delivered").length,
    },
    {
      name: "Cancelled",
      count: orders.filter((o) => o.status === "Cancelled").length,
    },
  ];

  const recentOrders = [...orders].slice(0, 5);

  const kpiCards = stats
    ? [
        {
          label: "Total Orders",
          value: Number(stats.totalOrders).toString(),
          icon: ShoppingCart,
          color: "bg-indigo-50 text-indigo-600",
          ocid: "admin.dashboard.orders.card",
        },
        {
          label: "Total Revenue",
          value: formatCurrency(stats.revenue),
          icon: IndianRupee,
          color: "bg-emerald-50 text-emerald-600",
          ocid: "admin.dashboard.revenue.card",
        },
        {
          label: "Pending Orders",
          value: Number(stats.pendingOrders).toString(),
          icon: AlertCircle,
          color: "bg-amber-50 text-amber-600",
          ocid: "admin.dashboard.pending.card",
        },
        {
          label: "Total Customers",
          value: Number(stats.totalCustomers).toString(),
          icon: Users,
          color: "bg-blue-50 text-blue-600",
          ocid: "admin.dashboard.customers.card",
        },
        {
          label: "Low Stock Alerts",
          value: Number(stats.lowStockCount).toString(),
          icon: Package,
          color:
            Number(stats.lowStockCount) > 0
              ? "bg-red-50 text-red-600"
              : "bg-slate-50 text-slate-400",
          ocid: "admin.dashboard.stock.card",
        },
      ]
    : [];

  if (loading) {
    return (
      <div data-ocid="admin.dashboard.loading_state">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
          {["sk1", "sk2", "sk3", "sk4", "sk5"].map((key) => (
            <div
              key={key}
              className="h-28 bg-white rounded-2xl border border-slate-200 animate-pulse"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
          <div className="h-72 bg-white rounded-2xl border border-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        data-ocid="admin.dashboard.error_state"
        className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
      >
        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiCards.map((card) => {
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

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Orders by Status</h2>
            <span className="text-xs text-slate-400 font-medium">All time</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders Feed */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-900">Recent Orders</h2>
            <ArrowUpRight className="w-4 h-4 text-slate-400" />
          </div>

          {recentOrders.length === 0 ? (
            <div
              data-ocid="admin.dashboard.orders.empty_state"
              className="text-center py-10 text-slate-400 text-sm"
            >
              No orders yet
            </div>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order, idx) => {
                const total = order.cartItems.reduce(
                  (sum, item) => sum + item.price * Number(item.quantity),
                  0,
                );
                return (
                  <div
                    key={Number(order.orderId)}
                    data-ocid={`admin.dashboard.order.item.${idx + 1}`}
                    className="flex items-start justify-between gap-2 py-2.5 border-b border-slate-100 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 truncate">
                        {order.customerName}
                      </div>
                      <div className="text-xs text-slate-400">
                        #{Number(order.orderId)}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
                          STATUS_COLORS[order.status] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs font-bold text-slate-700">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
