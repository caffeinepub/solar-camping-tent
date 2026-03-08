import type { CustomerView } from "@/backend";
import {
  AlertCircle,
  Download,
  RefreshCw,
  Search,
  Upload,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useAdminActor } from "../hooks/useAdminActor";
import { exportToExcel, parseCSVImport } from "../utils/exportImport";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(timestamp: bigint): string {
  if (!timestamp || timestamp === 0n) return "—";
  const ms = Number(timestamp) / 1_000_000;
  if (ms < 1_000_000_000_000) return "—";
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminCustomersPage() {
  const { actor, actorError } = useAdminActor();
  const [customers, setCustomers] = useState<CustomerView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [importMessage, setImportMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actorError) {
      setLoading(false);
      setError("Unable to connect to the backend. Please refresh the page.");
      return;
    }
    if (!actor) return;
    setLoading(true);
    setError("");
    actor
      .getAllCustomers()
      .then(setCustomers)
      .catch(() => setError("Failed to load customers. Try refreshing."))
      .finally(() => setLoading(false));
  }, [actor, actorError]);

  // Auto-dismiss import success message after 3 seconds
  useEffect(() => {
    if (!importMessage) return;
    const timer = setTimeout(() => setImportMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [importMessage]);

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  const handleExport = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "City",
      "Total Orders",
      "Total Spent (INR)",
      "Last Order Date",
    ];
    const rows = filtered.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.city || "",
      Number(c.totalOrders),
      c.totalSpending,
      formatDate(c.lastOrderDate),
    ]);
    exportToExcel("soltrek-customers.csv", headers, rows);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const rows = await parseCSVImport(file);
      const dataRows = rows.length > 1 ? rows.length - 1 : rows.length;
      setImportMessage(
        `${dataRows} customer${dataRows !== 1 ? "s" : ""} imported successfully`,
      );
    } catch {
      setImportMessage("Failed to read file. Please check the CSV format.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">
              Customer Database
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {customers.length} total customers
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            {/* Export / Import buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={handleExport}
                data-ocid="admin.customers.export_button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                <Download style={{ width: "13px", height: "13px" }} />
                Export Customers
              </button>
              <button
                type="button"
                onClick={handleImportClick}
                data-ocid="admin.customers.import_button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors"
              >
                <Upload style={{ width: "13px", height: "13px" }} />
                Import
              </button>
              {/* Hidden file input for CSV import */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleImportFile}
                data-ocid="admin.customers.upload_button"
                className="hidden"
                aria-label="Import customers CSV file"
              />
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                style={{ width: "14px", height: "14px" }}
              />
              <input
                type="text"
                placeholder="Search by name, email or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="admin.customers.search_input"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Import success / error message */}
        {importMessage && (
          <div
            className={`mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
              importMessage.includes("Failed")
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
            }`}
          >
            {importMessage.includes("Failed") ? (
              <AlertCircle style={{ width: "14px", height: "14px" }} />
            ) : (
              <span className="text-emerald-600">✓</span>
            )}
            {importMessage}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div
            data-ocid="admin.customers.loading_state"
            className="p-8 space-y-3"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5"].map((key) => (
              <div
                key={key}
                className="h-12 bg-slate-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div
            data-ocid="admin.customers.error_state"
            className="p-8 text-center"
          >
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-ocid="admin.customers.empty_state"
            className="p-12 text-center"
          >
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No customers found</p>
            <p className="text-slate-400 text-sm mt-1">
              {search
                ? "Try a different search term"
                : "Customers will appear here after orders are placed"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="admin.customers.table">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Phone
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    City
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Orders
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Total Spent
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                    Last Order
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((customer, idx) => (
                  <tr
                    key={customer.email}
                    data-ocid={`admin.customers.row.${idx + 1}`}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-700 text-xs font-bold">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800 text-sm">
                            {customer.name}
                          </div>
                          <div className="text-xs text-slate-400">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-sm text-slate-600">
                        {customer.phone}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-sm text-slate-600">
                        {customer.city || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-bold">
                        {Number(customer.totalOrders)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-bold text-slate-900">
                        {formatCurrency(customer.totalSpending)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-xs text-slate-400">
                        {formatDate(customer.lastOrderDate)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
