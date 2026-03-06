import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActor } from "../hooks/useActor";

/* ─── Types ──────────────────────────────────────────────────── */
export interface CartItem {
  productId: bigint;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  sessionId: string;
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: bigint) => void;
  clearCart: () => void;
  isLoading: boolean;
}

/* ─── Helpers ────────────────────────────────────────────────── */
function getOrCreateSessionId(): string {
  const stored = localStorage.getItem("suncampgear_session_id");
  if (stored) return stored;
  const id = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  localStorage.setItem("suncampgear_session_id", id);
  return id;
}

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem("suncampgear_cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<{
      productId: string;
      productName: string;
      price: number;
      quantity: number;
      image?: string;
    }>;
    return parsed.map((item) => ({
      ...item,
      productId: BigInt(item.productId),
    }));
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  const serializable = items.map((item) => ({
    ...item,
    productId: item.productId.toString(),
  }));
  localStorage.setItem("suncampgear_cart", JSON.stringify(serializable));
}

/* ─── Context ────────────────────────────────────────────────── */
const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [sessionId] = useState(getOrCreateSessionId);
  const [isLoading] = useState(false);
  const { actor } = useActor();

  // Persist to localStorage on every items change
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      const qty = newItem.quantity ?? 1;
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === newItem.productId);
        if (existing) {
          return prev.map((i) =>
            i.productId === newItem.productId
              ? { ...i, quantity: i.quantity + qty }
              : i,
          );
        }
        return [...prev, { ...newItem, quantity: qty }];
      });

      // Sync to backend (fire-and-forget)
      if (actor) {
        actor
          .addToCart(
            sessionId,
            newItem.productId,
            newItem.productName,
            newItem.price,
            BigInt(qty),
          )
          .catch(() => {
            /* silent */
          });
      }
    },
    [actor, sessionId],
  );

  const removeItem = useCallback(
    (productId: bigint) => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      if (actor) {
        actor.removeFromCart(sessionId, productId).catch(() => {
          /* silent */
        });
      }
    },
    [actor, sessionId],
  );

  const clearCart = useCallback(() => {
    setItems([]);
    if (actor) {
      actor.clearCart(sessionId).catch(() => {
        /* silent */
      });
    }
  }, [actor, sessionId]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        sessionId,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
