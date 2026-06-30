import {
  History,
  CreditCard,
  Users,
  Search,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useActivity } from "@/hooks/useActivity";

export default function FanHistoryPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useActivity();

  const history = data?.activity || [];

  const filtered = useMemo(() => {
    return history.filter((item) =>
      item.creator?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [history, search]);

  const paymentCount = history.filter(
    (item) => item.type === "payment"
  ).length;

  const subscriptionCount = history.filter(
    (item) => item.type === "subscription"
  ).length;

  const totalSpent = history.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const activeSubscriptions = history.filter(
    (item) =>
      item.type === "subscription" &&
      item.status === "active"
  ).length;

  const getIcon = (type) => {
    switch (type) {
      case "payment":
        return (
          <CreditCard
            className="text-yellow-400"
            size={22}
          />
        );

      case "subscription":
        return (
          <Users
            className="text-green-400"
            size={22}
          />
        );

      default:
        return (
          <History
            className="text-zinc-400"
            size={22}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        Loading activity...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
            History
          </p>

          <h1 className="text-5xl font-black mt-3">
            Activity History
          </h1>

          <p className="text-zinc-500 mt-3">
            Every video you've watched, livestream attended,
            likes, purchases and tips.
          </p>

        </div>

      </div>

      {/* Stats */}
<div className="grid md:grid-cols-4 gap-6">

  <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
    <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
      Payments
    </p>

    <h2 className="text-4xl font-black mt-3">
      {paymentCount}
    </h2>
  </div>

  <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
    <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
      Subscriptions
    </p>

    <h2 className="text-4xl font-black mt-3">
      {subscriptionCount}
    </h2>
  </div>

  <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
    <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
      Active Plans
    </p>

    <h2 className="text-4xl font-black mt-3">
      {activeSubscriptions}
    </h2>
  </div>

  <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
    <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
      Total Spent
    </p>

    <h2 className="text-4xl font-black mt-3 text-yellow-400">
      ${totalSpent}
    </h2>
  </div>

</div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-5 top-5 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search history..."
          className="w-full rounded-2xl border border-white/5 bg-zinc-900 py-4 pl-14 pr-5 outline-none focus:border-yellow-500"
        />

      </div>

      {/* Timeline */}

      <div className="bg-zinc-900 rounded-3xl border border-white/5 overflow-hidden">

        {filtered.map((item) => (

  <div
    key={item._id}
    className="flex justify-between items-center p-7 border-b border-white/5 last:border-none hover:bg-white/[0.02] transition"
  >

    <div className="flex items-center gap-5">

      <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center">
        {getIcon(item.type)}
      </div>

      <div>

        <h3 className="font-bold text-lg">

          {item.type === "payment"
            ? `Payment • ${item.paymentType.replace("_", " ")}`
            : "Subscription"}

        </h3>

        <p className="text-zinc-500 mt-1">
          {item.creator?.name}
        </p>

      </div>

    </div>

    <div className="text-right">

      <div className="flex items-center justify-end gap-2 text-sm text-zinc-400">

        <CalendarDays size={15} />

        {new Date(item.createdAt).toLocaleDateString()}

      </div>

      <div className="mt-2 text-sm font-bold">

        {item.type === "payment" ? (

          <span className="text-yellow-400">

            ${item.amount}

          </span>

        ) : (

          <span
            className={`${
              item.status === "active"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >

            {item.status.toUpperCase()}

          </span>

        )}

      </div>

    </div>

    <button className="ml-8 text-zinc-500 hover:text-white">

      <ChevronRight />

    </button>

  </div>

))}

      </div>

      {/* Bottom Card */}

    <div className="bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-3xl p-8">

  <h2 className="text-2xl font-black">
    Account Summary
  </h2>

  <p className="text-zinc-400 mt-5 leading-8">

    You've completed

    <span className="text-yellow-400 font-bold">
      {" "}
      {paymentCount} payment{paymentCount !== 1 && "s"}
    </span>

    {" "}and maintained{" "}

    <span className="text-yellow-400 font-bold">
      {subscriptionCount} subscription{subscriptionCount !== 1 && "s"}
    </span>

    {" "}with a total spend of{" "}

    <span className="text-yellow-400 font-bold">
      ${totalSpent}
    </span>.

  </p>

</div>

    </div>
  );
}