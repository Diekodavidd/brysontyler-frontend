import {
  Wallet,
  Coins,
  CreditCard,
  ArrowUpRight,
  Plus,
  Download,
  Receipt,
  ArrowDownLeft,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { usePayments } from "@/hooks/usePayment";

export default function FanWalletPage() {
 const navigate = useNavigate();

const user = useAuthStore((state) => state.user);

const { data, isLoading } = usePayments();

const transactions = data?.payments || [];

const totalSpent = useMemo(() => {
  return transactions.reduce(
    (sum, tx) => sum + Number(tx.amount),
    0
  );
}, [transactions]);

if (isLoading) {
  return (
    <div className="h-[70vh] flex items-center justify-center text-zinc-500">
      Loading wallet...
    </div>
  );
}

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
            Wallet
          </p>

          <h1 className="text-5xl font-black mt-3">
            My Wallet
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage your balance, coins and payment methods.
          </p>

        </div>

        <button className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition flex items-center gap-2">
          <Plus size={18} />
          Add Funds
        </button>

      </div>

      {/* Balance Cards */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-7">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                Wallet Balance
              </p>

              <h2 className="text-4xl font-black mt-3">
${totalSpent.toFixed(2)}              </h2>

            </div>

            <Wallet className="text-green-400" size={28} />

          </div>

        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-7">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                Coins
              </p>

              <h2 className="text-4xl font-black mt-3">
{user?.coinBalance}              </h2>

            </div>

            <Coins className="text-yellow-400" size={28} />

          </div>

        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-7">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                Total Spent
              </p>

              <h2 className="text-4xl font-black mt-3">
{user?.coinBalance}              </h2>

            </div>

            <ArrowUpRight className="text-red-400" size={28} />

          </div>

        </div>

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-7">

          <div className="flex justify-between">

            <div>

              <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                Refunds
              </p>

              <h2 className="text-4xl font-black mt-3">
$0.00              </h2>

            </div>

            <ArrowDownLeft className="text-sky-400" size={28} />

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <button className="bg-zinc-900 border border-white/5 rounded-2xl py-6 hover:border-yellow-500 transition font-bold">
          Buy Coins
        </button>

        <button className="bg-zinc-900 border border-white/5 rounded-2xl py-6 hover:border-yellow-500 transition font-bold">
          Add Funds
        </button>

        <button className="bg-zinc-900 border border-white/5 rounded-2xl py-6 hover:border-yellow-500 transition font-bold">
          Payment Methods
        </button>

        <button className="bg-zinc-900 border border-white/5 rounded-2xl py-6 hover:border-yellow-500 transition font-bold">
          Download Statement
        </button>

      </div>

      {/* Transactions */}

      <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">

        <div className="flex items-center gap-3 px-8 py-6 border-b border-white/5">

          <Receipt className="text-yellow-400" />

          <h2 className="text-xl font-black">
            Transaction History
          </h2>

        </div>

        <div>

          {transactions.map((tx) => (

            <div
              key={tx._id}
              className="flex justify-between items-center px-8 py-6 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition"
            >

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">

                  {tx.type === "deposit" ? (
                    <Download className="text-green-400" size={20} />
                  ) : (
                    <CreditCard className="text-yellow-400" size={20} />
                  )}

                </div>

                <div>

                  <h3 className="font-bold">
Subscription to {tx.creatorId?.name}
                  </h3>

                  <p className="text-zinc-500 text-sm">
{new Date(tx.createdAt).toLocaleString()}
                  </p>

                </div>

              </div>

              <div
                className={`font-black text-lg ${
tx.paymentStatus === "completed"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
-${tx.amount}              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}