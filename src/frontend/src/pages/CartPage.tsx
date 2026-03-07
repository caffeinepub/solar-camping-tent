import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useEffect } from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Shopping Cart | SolTrek";
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div
          className="container max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center"
          data-ocid="cart.empty_state"
        >
          <div className="w-20 h-20 rounded-full bg-earth flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="font-display font-black text-3xl text-foreground mb-3">
            Your Cart is Empty
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Add some solar-powered adventure gear to get started!
          </p>
          <Link to="/shop">
            <Button className="btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold px-8 py-6 text-base">
              Browse the Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-foreground mb-2">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground mb-8">
          {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Items */}
          <div className="space-y-4">
            {items.map((item, i) => (
              <div
                key={item.productId.toString()}
                data-ocid={`cart.item.${i + 1}`}
                className="bg-card rounded-2xl border border-border p-5 flex items-start gap-4"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-earth flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm leading-tight mb-1 truncate">
                    {item.productName}
                  </h3>
                  <p className="font-display font-black text-lg text-foreground">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-border rounded-lg overflow-hidden">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        data-ocid={`cart.quantity.button.${i + 1}`}
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-earth transition-colors text-foreground"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center hover:bg-earth transition-colors text-foreground"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${i + 1}`}
                      onClick={() => removeItem(item.productId)}
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right flex-shrink-0">
                  <p className="font-display font-black text-base text-foreground">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex justify-start pt-2">
              <Link
                to="/shop"
                className="text-sm font-bold text-forest hover:text-amber-brand transition-colors flex items-center gap-1"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 lg:sticky lg:top-24 space-y-4">
            <h2 className="font-display font-black text-xl text-foreground">
              Order Summary
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})
                </span>
                <span className="font-semibold text-foreground">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-forest text-xs">
                  FREE (prepaid)
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-black text-foreground">Total</span>
              <span className="font-display font-black text-2xl text-foreground">
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <Button
              data-ocid="cart.primary_button"
              size="lg"
              onClick={() =>
                navigate({
                  to: "/checkout",
                  search: {
                    plan: "cart",
                    total: totalPrice,
                    label: `${totalItems} item${totalItems !== 1 ? "s" : ""}`,
                  },
                })
              }
              className="w-full btn-amber-stamp bg-amber-brand hover:bg-amber-dark text-accent-foreground font-bold text-base transition-all duration-150 active:scale-[0.98]"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Trust row */}
            <div className="space-y-2 pt-2">
              {[
                { icon: ShieldCheck, text: "Secure SSL encrypted checkout" },
                { icon: Truck, text: "Free shipping on prepaid orders" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <Icon className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
