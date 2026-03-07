import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WHATSAPP_NUMBER = "919876543210";

const QUICK_REPLIES = [
  {
    label: "Product details",
    message: "Hi, I want to know about: Product details",
  },
  {
    label: "Shipping info",
    message: "Hi, I want to know about: Shipping info",
  },
  {
    label: "Order tracking",
    message: "Hi, I want to know about: Order tracking",
  },
  { label: "Bulk orders", message: "Hi, I want to know about: Bulk orders" },
];

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick replies popup */}
      {open && (
        <div className="bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.25)] border border-earth-dark w-72 overflow-hidden animate-[fade-in-up_0.2s_ease-out_forwards]">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">SolTrek Support</p>
                <p className="text-white/80 text-xs">
                  Typically replies instantly
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-[#f0fdf4] rounded-xl p-3 mb-3 text-sm text-gray-700 border border-green-100">
              👋 Hi! How can we help you today? Choose a topic below:
            </div>
            <div className="space-y-2">
              {QUICK_REPLIES.map((reply, i) => (
                <a
                  key={reply.label}
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(reply.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid={`whatsapp.quick_reply.${i + 1}`}
                  className="block w-full text-left px-3 py-2.5 rounded-xl border border-[#25D366]/30 text-sm font-medium text-[#128C7E] hover:bg-[#f0fdf4] hover:border-[#25D366] transition-all duration-150"
                >
                  {reply.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_-4px_rgba(37,211,102,0.6)] hover:bg-[#1ebe5d] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 fill-white" />
        )}
      </button>
    </div>
  );
}
