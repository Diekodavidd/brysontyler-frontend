import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Plus,
  Clock,
  Copy,
  Check,
  ArrowDownLeft,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export default function WalletPage() {
  const { user } = useAuthStore();
  const [copied, setCopied] = useState(false);

  // Dynamic balance with 2 decimal precision
  const balance = user?.coinBalance ?? 450.0;
  const isLowBalance = balance < 1000;

  // Fake data for UI preview
  const mockTransactions = [
    {
      id: 1,
      type: "Tip to Creator",
      amount: 500.0,
      date: "Jun 24, 2026",
      status: "Completed",
      incoming: false,
    },
    {
      id: 2,
      type: "Subscription",
      amount: 1200.0,
      date: "Jun 01, 2026",
      status: "Completed",
      incoming: false,
    },
    {
      id: 3,
      type: "Bonus Coins",
      amount: 200.0,
      date: "May 15, 2026",
      status: "Completed",
      incoming: true,
    },
  ];

  const handleCopyId = () => {
    const idToCopy = user?._id;

    if (!idToCopy) return;

    navigator.clipboard.writeText(idToCopy);
    setCopied(true);
    toast.success("Wallet ID copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleTopUp = () => {
    toast.info("Checkout initiated...");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-6 border-b border-zinc-800 pb-8 md:flex-row md:items-end">
        <div>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">
            Available Balance
          </h2>

          <div className="flex items-baseline gap-2">
            <span
              className={`text-5xl font-black tracking-tighter transition-colors ${
                isLowBalance ? "text-red-500" : "text-white"
              }`}
            >
              {balance.toFixed(2)}
            </span>

            <span
              className={`text-xl font-bold ${
                isLowBalance ? "text-red-500" : "text-yellow-500"
              }`}
            >
              BT COINS
            </span>
          </div>

          {isLowBalance && (
            <div className="mt-3 flex animate-pulse items-center gap-2 text-xs font-bold text-red-500">
              <AlertCircle size={14} />
              <span>Wallet balance is low. Kindly top up.</span>
            </div>
          )}

          <div
            onClick={handleCopyId}
            className="mt-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-zinc-800/50 p-2 transition-all hover:bg-zinc-800"
          >
            <span className="font-mono text-[10px] text-zinc-500">
              WALLET ID:{" "}
              {user?._id
                ? user._id.slice(0, 8) + "..."
                : "BT-X892-44"}
            </span>

            {copied ? (
              <Check size={12} className="text-green-500" />
            ) : (
              <Copy size={12} className="text-zinc-400" />
            )}
          </div>
        </div>

        <button
          onClick={handleTopUp}
          className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-yellow-400"
        >
          <Plus size={18} />
          Buy Coins
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Transaction History
        </h3>

        <div className="space-y-2">
          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/30 p-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    tx.incoming
                      ? "bg-green-900/20"
                      : "bg-zinc-900"
                  }`}
                >
                  {tx.incoming ? (
                    <ArrowDownLeft
                      size={18}
                      className="text-green-500"
                    />
                  ) : (
                    <Clock
                      size={18}
                      className="text-zinc-500"
                    />
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {tx.type}
                  </p>

                  <p className="text-[10px] uppercase text-zinc-500">
                    {tx.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`font-black ${
                    tx.incoming
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {tx.incoming ? "+" : "-"}
                  {tx.amount.toFixed(2)}
                </p>

                <p className="text-[10px] uppercase text-zinc-500">
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}