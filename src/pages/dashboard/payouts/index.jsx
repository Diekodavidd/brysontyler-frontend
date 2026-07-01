import {
  Wallet,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  Download,
  Receipt,
} from "lucide-react";
import { useMemo } from "react";
import { useCreatorPayments } from "@/hooks/useCreator";

export default function CreatorPayoutsPage() {
  const { data, isLoading } = useCreatorPayments();

  const payouts = data?.payments || [];

  const availableBalance = useMemo(() => {
    return payouts
      .filter((p) => p.paymentStatus === "finished")
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payouts]);

  const pendingBalance = useMemo(() => {
    return payouts
      .filter((p) => p.paymentStatus === "pending")
      .reduce((sum, p) => sum + Number(p.amount), 0);
  }, [payouts]);

  const totalEarned = useMemo(() => {
    return payouts.reduce(
      (sum, p) => sum + Number(p.amount),
      0
    );
  }, [payouts]);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        Loading payouts...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
            Earnings
          </p>

          <h1 className="text-5xl font-black mt-3">
            Payouts
          </h1>

          <p className="text-zinc-500 mt-3">
            View your earnings, withdrawals and payout history.
          </p>

        </div>

        <button className="px-6 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-2">

          <Wallet size={18} />

          Withdraw Funds

        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

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
          value={`$${totalEarned.toFixed(2)}`}
          icon={<DollarSign />}
          color="text-sky-400"
        />

        <Card
          title="Withdrawals"
          value={
            payouts.filter(
              (p) =>
                p.paymentStatus === "withdrawn"
            ).length
          }
          icon={<ArrowUpRight />}
          color="text-purple-400"
        />

      </div>

      {/* Withdraw Card */}

      <div className="rounded-[34px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-8">

        <div className="flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">

              Available Balance

            </p>

            <h2 className="text-6xl font-black mt-5">

              ${availableBalance.toFixed(2)}

            </h2>

            <p className="text-zinc-500 mt-4">

              Withdraw your available earnings anytime.

            </p>

          </div>

          <div className="flex items-end">

            <button className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 font-black">

              Request Withdrawal

            </button>

          </div>

        </div>

      </div>

      {/* History */}

      <div className="rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden">

        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">

          <div className="flex items-center gap-3">

            <Receipt className="text-yellow-400" />

            <h2 className="text-2xl font-black">

              Payout History

            </h2>

          </div>

          <button className="flex items-center gap-2 text-zinc-400 hover:text-white">

            <Download size={18} />

            Export

          </button>

        </div>

        {payouts.length === 0 ? (

          <div className="p-20 text-center text-zinc-500">

            No payout history yet.

          </div>

        ) : (

          payouts.map((payment) => (

            <div
              key={payment._id}
              className="flex justify-between items-center px-8 py-6 border-b border-white/5 last:border-none hover:bg-white/[0.02]"
            >

              <div className="flex items-center gap-5">

                <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center">

                  {payment.paymentStatus ===
                  "finished" ? (

                    <CheckCircle2 className="text-green-400" />

                  ) : (

                    <Clock3 className="text-yellow-400" />

                  )}

                </div>

                <div>

                  <h3 className="font-bold">

                    Creator Subscription

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

                  ${payment.amount}

                </h3>

                <p
                  className={`capitalize text-sm ${
                    payment.paymentStatus ===
                    "finished"
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

          <p className="uppercase tracking-widest text-xs text-zinc-500 font-bold">
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