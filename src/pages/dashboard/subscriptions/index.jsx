import {
  CreditCard,
  Calendar,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  useSubscriptions,
  useCancelSubscription,
} from "@/hooks/useSubscription";
import { X, UserPlus } from "lucide-react";
import { useCreators } from "@/hooks/useCreator";
import { useNavigate } from "react-router-dom";

export default function FanSubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [showCreators, setShowCreators] =
  useState(false);

const navigate = useNavigate();

const { data, isLoading } = useSubscriptions();
const { data: creatorsData } =
  useCreators();

const { mutate: cancelSubscription } =
  useCancelSubscription();


const subscriptions = data?.subscriptions || [];
const creators =
  creatorsData?.creators || [];

const availableCreators =
  creators.filter(
    (creator) =>
      !subscriptions.some(
        (sub) =>
          sub.creatorId?._id === creator._id
      )
  );
 const filtered = useMemo(() => {
  return subscriptions.filter((sub) =>
    sub.creatorId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
}, [subscriptions, search]);

const activePlans = subscriptions.filter(
  (s) => s.status === "active"
).length;

const monthlySpend = subscriptions
  .filter((s) => s.status === "active")
  .reduce((sum, s) => sum + s.amount, 0);

const expiringSoon = subscriptions.filter((s) => {
  const days =
    (new Date(s.endDate) - new Date()) /
    (1000 * 60 * 60 * 24);

  return days <= 7 && days >= 0;
}).length;

const totalCreators = subscriptions.length;


if (isLoading) {
  return (
    <div className="h-[70vh] flex items-center justify-center text-zinc-500">
      Loading subscriptions...
    </div>
  );
}
  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
            Memberships
          </p>

          <h1 className="text-5xl font-black mt-3">
            My Subscriptions
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage every creator you're subscribed to.
          </p>

        </div>

      <button
  onClick={() => setShowCreators(true)}
  className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition"
>
  Discover More Creators
</button>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">
        

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
          <p className="text-xs uppercase text-zinc-500 font-bold tracking-widest">
            Active Plans
          </p>

          <h2 className="text-4xl font-black mt-3">
            {activePlans}
          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
          <p className="text-xs uppercase text-zinc-500 font-bold tracking-widest">
            Monthly Spend
          </p>

          <h2 className="text-4xl font-black mt-3 text-yellow-400">
${monthlySpend}          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
          <p className="text-xs uppercase text-zinc-500 font-bold tracking-widest">
            Expiring Soon
          </p>

          <h2 className="text-4xl font-black mt-3">
{expiringSoon}          </h2>
        </div>

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-7">
          <p className="text-xs uppercase text-zinc-500 font-bold tracking-widest">
            Total Creators
          </p>

          <h2 className="text-4xl font-black mt-3">
            {totalCreators}
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-zinc-900 border border-white/5 rounded-3xl p-5 flex gap-4">

        <div className="flex-1 relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search creators..."
            className="w-full bg-black rounded-2xl pl-12 pr-4 py-4 outline-none border border-white/5 focus:border-yellow-500"
          />

        </div>

        <button className="px-6 rounded-2xl bg-black border border-white/10 hover:border-yellow-500 transition">

          <Filter />

        </button>

      </div>

      {/* Subscription Cards */}

      <div className="grid lg:grid-cols-2 gap-6">

        {filtered.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 border border-white/5 rounded-3xl p-7 hover:border-yellow-500/40 transition"
          >

            <div className="flex justify-between items-start">

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-xl">
{item.creatorId?.name
  ?.split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)}
                  </div>

                <div>

                  <h2 className="text-2xl font-black">
{item.creatorId?.name}
                  </h2>

                  <p className="text-zinc-500">
                    {/* {item.plan} */}
                    Premium Membership
                  </p>

                </div>

              </div>

              {item.status === "active" ? (
                <span className="flex items-center gap-2 text-green-400 font-bold">
                  <CheckCircle2 size={16} />
{item.status}
                </span>
              ) : (
                <span className="flex items-center gap-2 text-red-400 font-bold">
                  <XCircle size={16} />
                  {item.status}
                </span>
              )}

            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">

              <div>

                <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                  Price
                </div>

                <div className="mt-2 flex items-center gap-2 font-bold">

                  <CreditCard size={17} />

${item.amount}/month
                </div>

              </div>

              <div>

                <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                  Renewal
                </div>

                <div className="mt-2 flex items-center gap-2 font-bold">

                  <Calendar size={17} />

{new Date(item.endDate).toLocaleDateString()}
                </div>

              </div>

            </div>

            <div className="flex gap-4 mt-8">

              <button
  onClick={() =>
    navigate(`/creator/${item.creatorId._id}`)
  }
  className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-2xl font-black"
>
  Visit Creator
</button>

              <button
  onClick={() => cancelSubscription(item._id)}
  className="flex-1 bg-black border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white py-3 rounded-2xl font-black"
>
  Cancel
</button>

            </div>

          </div>

        ))}

      </div>
{showCreators && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">

    <div className="w-[92%] max-w-6xl h-[85vh] bg-zinc-950 rounded-3xl border border-white/10 flex flex-col overflow-hidden">

      <div className="flex justify-between items-center p-8 border-b border-white/10">

        <div>

          <h2 className="text-3xl font-black">
            Discover Creators
          </h2>

          <p className="text-zinc-500 mt-2">
            Find new creators to subscribe to.
          </p>

        </div>

        <button
          onClick={() =>
            setShowCreators(false)
          }
        >
          <X size={28} />
        </button>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 p-8 overflow-y-auto">

        {availableCreators.map((creator) => (

          <div
            key={creator._id}
            className="rounded-3xl bg-zinc-900 border border-white/5 p-6 hover:border-yellow-500/40 transition"
          >

            <div className="w-20 h-20 rounded-full bg-yellow-500 text-black flex items-center justify-center text-2xl font-black">

              {creator.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}

            </div>

            <h3 className="text-2xl font-black mt-6">
              {creator.name}
            </h3>

            <p className="text-zinc-500 mt-2 line-clamp-2">
              {creator.bio || "No bio available."}
            </p>

            <div className="flex gap-3 mt-8">

              <button
                onClick={() =>
                  navigate(`/creator/${creator._id}`)
                }
                className="flex-1 bg-yellow-500 text-black py-3 rounded-2xl font-black"
              >
                View
              </button>

              <button
                className="flex items-center justify-center gap-2 flex-1 border border-white/10 rounded-2xl py-3 hover:border-yellow-500"
              >
                <UserPlus size={18} />
                Subscribe
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
)}
    </div>
  );
}