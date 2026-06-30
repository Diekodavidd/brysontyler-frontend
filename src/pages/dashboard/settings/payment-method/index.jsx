import { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  CheckCircle2,
} from "lucide-react";

export default function PaymentMethodsPage() {
  const [cards, setCards] = useState([
    {
      id: 1,
      brand: "Visa",
      last4: "4242",
      expiry: "08/28",
      default: true,
    },
    {
      id: 2,
      brand: "Mastercard",
      last4: "8821",
      expiry: "11/27",
      default: false,
    },
  ]);

  const makeDefault = (id) => {
    setCards(
      cards.map((card) => ({
        ...card,
        default: card.id === id,
      }))
    );
  };

  const removeCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="space-y-10">

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

      <div className="space-y-5">

        {cards.map((card) => (

          <div
            key={card.id}
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
                  {card.brand} •••• {card.last4}
                </h2>

                <p className="text-zinc-500 text-sm">
                  Expires {card.expiry}
                </p>

                {card.default && (
                  <div className="flex items-center gap-2 mt-2 text-green-400 text-xs font-bold uppercase">
                    <CheckCircle2 size={14} />
                    Default Payment Method
                  </div>
                )}
              </div>

            </div>

            <div className="flex items-center gap-3">

              {!card.default && (
                <button
                  onClick={() => makeDefault(card.id)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-yellow-500 hover:text-black transition font-bold text-sm"
                >
                  Make Default
                </button>
              )}

              <button
                onClick={() => removeCard(card.id)}
                className="w-10 h-10 rounded-xl bg-zinc-800 hover:bg-red-500 transition flex items-center justify-center"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

      <button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 py-4 rounded-2xl transition">

        <Plus size={18} />

        Add New Card

      </button>

    </div>
  );
}