import {
  Wallet,
  DollarSign,
  Clock3,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Landmark,
  Receipt,
  Download,
  TrendingUp,
} from "lucide-react";
import { useMemo } from "react";
import { useCreatorPayments } from "@/hooks/useCreator";

export default function CreatorWalletPage() {
  const { data, isLoading } = useCreatorPayments();

  const transactions = data?.payments || [];

  const availableBalance = useMemo(() => {
    return transactions
      .filter((t) => t.paymentStatus === "finished")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const pendingBalance = useMemo(() => {
    return transactions
      .filter((t) => t.paymentStatus === "pending")
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [transactions]);

  const totalEarnings = useMemo(() => {
    return transactions.reduce(
      (sum, t) => sum + Number(t.amount),
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

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
            Creator Wallet
          </p>

          <h1 className="text-5xl font-black mt-3">
            Earnings Wallet
          </h1>

          <p className="text-zinc-500 mt-3">
            Track your earnings, withdrawals and payouts.
          </p>

        </div>

        <button className="px-7 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-2 transition">

          <ArrowUpRight size={18} />

          Withdraw Funds

        </button>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Available"
          value={`$${availableBalance.toFixed(2)}`}
          icon={<Wallet />}
          color="text-green-400"
        />

        <Card
          title="Pending"
          value={`$${pendingBalance.toFixed(2)}`}
          icon={<Clock3 />}
          color="text-yellow-400"
        />

        <Card
          title="Lifetime Earnings"
          value={`$${totalEarnings.toFixed(2)}`}
          icon={<DollarSign />}
          color="text-sky-400"
        />

        <Card
          title="Transactions"
          value={transactions.length}
          icon={<Receipt />}
          color="text-purple-400"
        />

      </div>

      {/* BALANCE */}

      <div className="rounded-[36px] overflow-hidden bg-gradient-to-br from-yellow-500/10 via-black to-black border border-yellow-500/20 p-10">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">

              Available Balance

            </p>

            <h2 className="text-6xl font-black mt-5">

              ${availableBalance.toFixed(2)}

            </h2>

            <p className="text-zinc-500 mt-5 max-w-lg">

              Your available earnings can be withdrawn to your preferred
              payout account at any time.

            </p>

          </div>

          <div className="flex flex-col justify-end gap-4">

            <button className="px-8 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black">

              Withdraw Now

            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-yellow-500 transition font-bold">

              View Payout History

            </button>

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <QuickButton
          icon={<ArrowUpRight />}
          title="Withdraw"
        />

        <QuickButton
          icon={<CreditCard />}
          title="Payout Method"
        />

        <QuickButton
          icon={<Download />}
          title="Export Report"
        />

        <QuickButton
          icon={<Landmark />}
          title="Bank Account"
        />

      </div>

      {/* RECENT TRANSACTIONS */}

      <div className="rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden">

        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-yellow-400" />

            <h2 className="text-2xl font-black">

              Recent Earnings

            </h2>

          </div>

          <button className="text-zinc-500 hover:text-white">

            View All

          </button>

        </div>

        {transactions.length === 0 ? (

          <div className="py-24 text-center text-zinc-500">

            No earnings yet.

          </div>

        ) : (

          transactions.map((payment) => (

            <div
              key={payment._id}
              className="flex justify-between items-center px-8 py-6 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition"
            >

              <div className="flex items-center gap-5">

                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">

                  {payment.paymentStatus === "finished" ? (

                    <ArrowDownRight
                      className="text-green-400"
                    />

                  ) : (

                    <Clock3
                      className="text-yellow-400"
                    />

                  )}

                </div>

                <div>

                  <h3 className="font-bold">

                    Subscription Revenue

                  </h3>

                  <p className="text-zinc-500 text-sm">

                    {new Date(
                      payment.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>

              <div className="text-right">

                <h3 className="font-black text-lg">

                  +${payment.amount}

                </h3>

                <p
                  className={`capitalize text-sm ${
                    payment.paymentStatus === "finished"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {payment.paymentStatus}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

      <div className="flex justify-between">

        <div>

          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-4">
            {value}
          </h2>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </div>
  );
}

function QuickButton({
  icon,
  title,
}) {
  return (
    <button className="rounded-2xl bg-zinc-900 border border-white/5 hover:border-yellow-500 transition py-7 flex flex-col items-center gap-4">

      <div className="text-yellow-400">
        {icon}
      </div>

      <span className="font-bold">
        {title}
      </span>

    </button>
  );
}