import type { OrderView } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";

type StatusFilter = "All" | "Pending" | "Shipped" | "Delivered" | "Cancelled";

const STATUS_FILTERS: StatusFilter[] = [
  "All",
  "Pending",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border border-amber-200",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-200",
  Delivered: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Cancelled: "bg-red-100 text-red-700 border border-red-200",
};

// Generate mock dates for orders since backend doesn't store timestamps
function getMockDate(orderId: number): string {
  const base = new Date(2026, 0, 1);
  base.setDate(base.getDate() + (orderId % 60));
  return base.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminOrdersPage() {
  const { actor, isFetching } = useActor();
  const [orders, setOrders] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("All");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getAllOrders()
      .then(setOrders)
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const handleStatusChange = async (orderId: bigint, newStatus: string) => {
    setUpdatingId(Number(orderId));
    try {
      await actor?.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) =>
          o.orderId === orderId ? { ...o, status: newStatus } : o,
        ),
      );
    } catch {
      // silently fail — order still shows in list
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = orders.filter((o) => {
    const matchesFilter = activeFilter === "All" || o.status === activeFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      o.customerName.toLowerCase().includes(q) ||
      Number(o.orderId).toString().includes(q) ||
      o.email.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Filter Tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                data-ocid="admin.orders.tab"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
                {filter !== "All" && (
                  <span className="ml-1.5 opacity-70">
                    ({orders.filter((o) => o.status === filter).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              style={{ width: "14px", height: "14px" }}
            />
            <input
              type="text"
              placeholder="Search by name or order ID…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="admin.orders.search_input"
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div
            data-ocid="admin.orders.loading_state"
            className="p-8 text-center"
          >
            <div className="space-y-3">
              {["sk1", "sk2", "sk3", "sk4", "sk5"].map((key) => (
                <div
                  key={key}
                  className="h-12 bg-slate-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        ) : error ? (
          <div data-ocid="admin.orders.error_state" className="p-8 text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="admin.orders.empty_state"
            className="p-12 text-center"
          >
            <ShoppingCartIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No orders found</p>
            <p className="text-slate-400 text-sm mt-1">
              {search
                ? "Try a different search term"
                : "Orders will appear here"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="admin.orders.table">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Order ID
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Products
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Payment
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((order, idx) => {
                  const total = order.cartItems.reduce(
                    (sum, item) => sum + item.price * Number(item.quantity),
                    0,
                  );
                  const orderNum = Number(order.orderId);
                  const isUpdating = updatingId === orderNum;

                  return (
                    <tr
                      key={orderNum}
                      data-ocid={`admin.orders.row.${idx + 1}`}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="font-mono text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          #{orderNum}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800 text-sm">
                          {order.customerName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <div className="text-xs text-slate-600 max-w-[180px]">
                          {order.cartItems
                            .map(
                              (item) =>
                                `${item.productName} ×${Number(item.quantity)}`,
                            )
                            .join(", ")}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-slate-900">
                          {formatCurrency(total)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-slate-500">
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.orderId, e.target.value)
                          }
                          disabled={isUpdating}
                          data-ocid={`admin.orders.status.select.${idx + 1}`}
                          className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                            STATUS_COLORS[order.status] ||
                            "bg-slate-100 text-slate-600 border-slate-200"
                          } ${isUpdating ? "opacity-50 cursor-wait" : ""}`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell">
                        <span className="text-xs text-slate-400">
                          {getMockDate(orderNum)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
    >
      <title>Shopping Cart</title>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
