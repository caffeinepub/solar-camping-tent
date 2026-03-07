import type { ProductInventory } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { AlertCircle, Check, Package, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";

function getStockStatus(stock: number): {
  label: string;
  className: string;
} {
  if (stock === 0)
    return {
      label: "Out of Stock",
      className: "bg-red-100 text-red-700 border border-red-200",
    };
  if (stock < 10)
    return {
      label: "Low Stock",
      className: "bg-amber-100 text-amber-700 border border-amber-200",
    };
  return {
    label: "In Stock",
    className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  };
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function AdminProductsPage() {
  const { actor, isFetching } = useActor();
  const [products, setProducts] = useState<ProductInventory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editValue, setEditValue] = useState("");
  const [savingId, setSavingId] = useState<bigint | null>(null);

  useEffect(() => {
    if (!actor || isFetching) return;
    setLoading(true);
    actor
      .getProductInventory()
      .then(setProducts)
      .catch(() => setError("Failed to load inventory."))
      .finally(() => setLoading(false));
  }, [actor, isFetching]);

  const lowStockProducts = products.filter((p) => Number(p.stock) < 10);

  const handleEditStart = (product: ProductInventory) => {
    setEditingId(product.productId);
    setEditValue(Number(product.stock).toString());
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditValue("");
  };

  const handleSave = async (productId: bigint) => {
    const newStock = Number.parseInt(editValue, 10);
    if (Number.isNaN(newStock) || newStock < 0) return;
    setSavingId(productId);
    try {
      await actor?.updateInventory(productId, BigInt(newStock));
      setProducts((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, stock: BigInt(newStock) } : p,
        ),
      );
      setEditingId(null);
      setEditValue("");
    } catch {
      // silently fail
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Low stock alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Low Stock Alert
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              {lowStockProducts.length} product
              {lowStockProducts.length > 1 ? "s" : ""} running low:{" "}
              {lowStockProducts.map((p) => p.productName).join(", ")}
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-slate-900 text-sm">
            Product Inventory
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {products.length} products
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div
            data-ocid="admin.products.loading_state"
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
            data-ocid="admin.products.error_state"
            className="p-8 text-center"
          >
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div
            data-ocid="admin.products.empty_state"
            className="p-12 text-center"
          >
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm" data-ocid="admin.products.table">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Product
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">
                    Category
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Price
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Stock
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product, idx) => {
                  const stockNum = Number(product.stock);
                  const status = getStockStatus(stockNum);
                  const isEditing = editingId === product.productId;
                  const isSaving = savingId === product.productId;

                  return (
                    <tr
                      key={Number(product.productId)}
                      data-ocid={`admin.products.row.${idx + 1}`}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800 text-sm">
                          {product.productName}
                        </div>
                        <div className="text-xs text-slate-400">
                          ID #{Number(product.productId)}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-900">
                          {formatCurrency(product.price)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {isEditing ? (
                          <input
                            type="number"
                            min="0"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            data-ocid={`admin.products.stock.input.${idx + 1}`}
                            className="w-20 bg-slate-50 border border-indigo-300 rounded-lg px-2 py-1 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          />
                        ) : (
                          <span
                            className={`font-bold text-sm ${stockNum < 10 ? "text-red-600" : "text-slate-900"}`}
                          >
                            {stockNum}
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        {isEditing ? (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleSave(product.productId)}
                              disabled={isSaving}
                              data-ocid={`admin.products.save_button.${idx + 1}`}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50"
                              aria-label="Save stock"
                            >
                              <Check
                                style={{ width: "14px", height: "14px" }}
                              />
                            </button>
                            <button
                              type="button"
                              onClick={handleEditCancel}
                              data-ocid={`admin.products.cancel_button.${idx + 1}`}
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors"
                              aria-label="Cancel edit"
                            >
                              <X style={{ width: "14px", height: "14px" }} />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleEditStart(product)}
                            data-ocid={`admin.products.edit_button.${idx + 1}`}
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-500 transition-colors"
                            aria-label="Edit stock"
                          >
                            <Pencil style={{ width: "14px", height: "14px" }} />
                          </button>
                        )}
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
