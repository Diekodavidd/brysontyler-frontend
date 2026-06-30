import { CreditCard, Plus, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function PaymentMethodsPage() {
  const user = useAuthStore((state) => state.user);

  const cards = user?.paymentMethods || [];

  return (
    <div className="space-y-10">
      {/* Header */}

      <div>
        <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
          Payment Methods
        </p>

        <h1 className="text-4xl font-black mt-2">
          Billing & Cards
        </h1>

        <p className="text-zinc-500 mt-3">
          Manage your saved payment methods for subscriptions and purchases.
        </p>
      </div>

      {/* Cards */}

      {cards.length === 0 ? (
        <div className="bg-zinc-900 border border-dashed border-white/10 rounded-3xl p-14 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500/10 flex items-center justify-center">
            <CreditCard
              className="text-yellow-400"
              size={34}
            />
          </div>

          <h2 className="text-2xl font-black mt-6">
            No Payment Methods
          </h2>

          <p className="text-zinc-500 mt-3 max-w-md mx-auto">
            You haven't added any payment methods yet.
            Add a card to subscribe to creators, purchase
            coins and unlock premium content.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex justify-between items-center hover:border-yellow-500/40 transition"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">
                  <CreditCard
                    className="text-yellow-400"
                    size={24}
                  />
                </div>

                <div>
                  <h2 className="font-bold text-lg">
                    {card.brand || "Card"} ••••{" "}
                    {card.last4 || "****"}
                  </h2>

                  <p className="text-zinc-500 text-sm">
                    Expires {card.expiry || "--/--"}
                  </p>

                  {card.default && (
                    <div className="flex items-center gap-2 mt-2 text-green-400 text-xs font-bold uppercase">
                      <CheckCircle2 size={14} />
                      Default Payment Method
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}

      <button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-4 rounded-2xl transition">
        <Plus size={18} />
        Add New Card
      </button>
    </div>
  );
}