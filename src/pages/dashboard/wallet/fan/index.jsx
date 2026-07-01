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

   {/* Wallet Overview */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

  <div className="rounded-3xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-black p-7">

    <Coins size={30} />

    <p className="uppercase text-xs font-black mt-5">
      Coin Balance
    </p>

    <h2 className="text-4xl font-black mt-2">
      {user?.coinBalance || 0}
    </h2>

    <p className="mt-3 font-semibold">
      ≈ ${(user?.coinBalance / 100).toFixed(2)}
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <Wallet className="text-green-400" size={28} />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Wallet Balance
    </p>

    <h2 className="text-4xl font-black mt-2">
      $0.00
    </h2>

    <p className="text-zinc-500 mt-3">
      Available Credit
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <ArrowUpRight
      className="text-red-400"
      size={28}
    />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Total Spent
    </p>

    <h2 className="text-4xl font-black mt-2">
      ${totalSpent.toFixed(2)}
    </h2>

    <p className="text-zinc-500 mt-3">
      Lifetime Spending
    </p>

  </div>

  <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

    <CreditCard
      className="text-yellow-400"
      size={28}
    />

    <p className="uppercase text-xs mt-5 text-zinc-500 font-bold">
      Membership
    </p>

    <h2 className="text-4xl font-black mt-2">
      {user?.membership?.plan || "FREE"}
    </h2>

    <p className="text-green-400 mt-3">
      Active
    </p>

  </div>

</div>

{/* Coin Conversion */}

<div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-black p-8">

  <div className="flex items-center justify-between flex-wrap gap-8">

    <div>

      <h2 className="text-2xl font-black">
        Coin Conversion
      </h2>

      <p className="text-zinc-500 mt-3">
        Coins are used for premium videos,
        livestreams, tipping creators and
        exclusive content.
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

      <div className="rounded-2xl bg-black/40 px-6 py-5 text-center">

        <h3 className="font-black">
          500
        </h3>

        <p className="text-zinc-500">
          $5
        </p>

      </div>

      <div className="rounded-2xl bg-black/40 px-6 py-5 text-center">

        <h3 className="font-black">
          1000
        </h3>

        <p className="text-zinc-500">
          $10
        </p>

      </div>

      <div className="rounded-2xl bg-black/40 px-6 py-5 text-center">

        <h3 className="font-black">
          2500
        </h3>

        <p className="text-zinc-500">
          $25
        </p>

      </div>

      <div className="rounded-2xl bg-black/40 px-6 py-5 text-center">

        <h3 className="font-black">
          5000
        </h3>

        <p className="text-zinc-500">
          $50
        </p>

      </div>

    </div>

  </div>

</div>

      {/* Quick Actions */}

     {/* Coin Packages */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

  {[
    {
      coins: 500,
      price: 5,
    },
    {
      coins: 1000,
      price: 10,
    },
    {
      coins: 2500,
      price: 25,
    },
    {
      coins: 5000,
      price: 50,
    },
  ].map((pkg) => (

    <div
      key={pkg.coins}
      className="rounded-3xl bg-zinc-900 border border-white/5 p-7 hover:border-yellow-500 transition"
    >

      <Coins
        className="text-yellow-400"
        size={32}
      />

      <h2 className="text-4xl font-black mt-5">

        {pkg.coins}

      </h2>

      <p className="text-zinc-500 mt-2">

        Coins

      </p>

      <h3 className="text-3xl font-black mt-6">

        ${pkg.price}

      </h3>

      <button
        className="mt-8 w-full rounded-2xl bg-yellow-500 text-black py-3 font-black hover:bg-yellow-400"
      >

        Buy Coins

      </button>

    </div>

  ))}

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