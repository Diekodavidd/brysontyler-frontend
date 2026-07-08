import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Search,
  Mail,
  Shield,
} from "lucide-react";

import { useCreatorSubscribers, useUpdateSubscriptionPrice } from "../../../hooks/useSubscribers";
import { useAuthStore } from "../../../store/useAuthStore";

export default function SubscribersPage() {
  const [search, setSearch] = useState("");
const [showPricingModal, setShowPricingModal] = useState(false);
 const {
  data,
  isLoading,
} = useCreatorSubscribers();
console.log(data);

const subscribers = data?.subscribers || [];
const user = useAuthStore(state => state.user);

console.log(subscribers, "SUBSCRIBERS DATA");
const subscriptionPrice =
  data?.subscriptionPrice ?? 0;

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const creator =
        subscriber.fanId || subscriber.user || {};

      return (
        creator.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        creator.email
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
    });
  }, [subscribers, search]);
const [price, setPrice] = useState(subscriptionPrice);

useEffect(() => {
  setPrice(subscriptionPrice);
}, [subscriptionPrice]);
const {
  mutate: updatePrice,
  isPending,
} = useUpdateSubscriptionPrice();

useEffect(() => {

    if (subscriptionPrice <= 19.9) {
        setShowPricingModal(true);
    }

}, [subscriptionPrice]);
  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        Loading subscribers...
      </div>
    );
  }
  return (
    <>
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black">
            Subscribers
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage your BTP community members
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-zinc-900 border border-white/5 px-4 py-3 rounded-full flex items-center gap-2">
            <Users
              size={18}
              className="text-yellow-500"
            />

            <span className="font-bold text-lg">
              {subscribers.length} Total
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

  <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
    <p className="text-zinc-500 text-xs uppercase tracking-widest">
      Total Subscribers
    </p>

    <h3 className="text-3xl font-black mt-3">
      {subscribers.length}
    </h3>
  </div>

  <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
    <p className="text-zinc-500 text-xs uppercase tracking-widest">
      Active
    </p>

    <h3 className="text-3xl font-black mt-3">
      {
        subscribers.filter(
          (sub) => sub.status === "active"
        ).length
      }
    </h3>
  </div>

  <div className="bg-zinc-900 border border-white/5 p-8 rounded-3xl">
    <p className="text-zinc-500 text-xs uppercase tracking-widest">
      Monthly Revenue
    </p>

    <h3 className="text-3xl font-black mt-3">
      $
      {subscribers.reduce(
        (sum, sub) => sum + (sub.amount || 0),
        0
      )}
    </h3>
  </div>

</div>

      <div className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <Search
            className="text-zinc-500"
            size={18}
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search subscribers..."
            className="bg-transparent outline-none w-full"
          />
        
        </div>
<div className="mb-10 rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-zinc-900 p-8">

    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

   <div>

    <p className="uppercase tracking-[0.25em] text-yellow-400 text-xs font-black">
        Subscription Pricing
    </p>

    <h2 className="text-4xl font-black mt-3">
        ${subscriptionPrice.toFixed(2)}
        <span className="text-xl text-zinc-400 font-medium">
            /month
        </span>
    </h2>
<div className="mt-5">

    {subscriptionPrice > 0 ? (
        <span className="inline-flex items-center rounded-full bg-green-500/10 text-green-400 px-4 py-2 text-sm font-semibold">
            ✓ Subscription pricing is active
        </span>
    ) : (
        <span className="inline-flex items-center rounded-full bg-red-500/10 text-red-400 px-4 py-2 text-sm font-semibold">
            Subscription price not set
        </span>
    )}

</div>
    <p className="text-zinc-400 mt-4 max-w-xl leading-7">
        Every fan who subscribes to your page will automatically pay
        <span className="text-white font-semibold">
            {" "}${subscriptionPrice.toFixed(2)} per month
        </span>
        until they cancel their subscription.
        You can change this price at any time.
    </p>

</div>
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

            {/* <input
                type="number"
                min={1}
                step="0.01"
                aria-describedby=""
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className="rounded-2xl bg-black border border-white/10 px-5 py-4 w-full sm:w-48"
            /> */}

              <button
    onClick={()=>setShowPricingModal(true)}
                className="px-8 py-5 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black disabled:opacity-50"
>
    Change Subscription Price
</button>

        </div>

    </div>

</div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/5">
              <th className="px-8 py-4">
                Subscriber
              </th>

              <th className="px-8 py-4">
                Tier
              </th>

              <th className="px-8 py-4">
                Joined
              </th>

              <th className="px-8 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">

  {filteredSubscribers.length ? (

    filteredSubscribers.map((subscriber) => {

      const fan = subscriber.fanId || {};

      return (

      <tr
  key={subscriber._id}
  className="hover:bg-white/5 transition"
>
  <td className="px-8 py-6">
    <div className="flex items-center gap-4">
      <img
        src={
          fan.profileImage ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(fan.name)
        }
        alt={fan.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      <div>
        <p className="font-bold">
          {fan.name}
        </p>

        <p className="text-xs text-zinc-500">
          {fan.email}
        </p>
      </div>
    </div>
  </td>

  <td className="px-8 py-6">
    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold">
      ${subscriber.amount}/mo
    </span>
  </td>

  <td className="px-8 py-6 text-zinc-400">
    {new Date(
      subscriber.createdAt
    ).toLocaleDateString()}
  </td>

  <td className="px-8 py-6 text-right">
    <div className="flex justify-end gap-2">
      <button className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">
        <Mail size={16} />
      </button>

      <button className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700">
        <Shield size={16} />
      </button>
    </div>
  </td>
</tr>

      );
    })

  ) : (

    <tr>

      <td
        colSpan={4}
        className="py-16 text-center text-zinc-500"
      >
        No subscribers yet.
      </td>

    </tr>

  )}

  {/* {subscribers.map((subscriber) => (
  <tr key={subscriber._id}>
    <td>
      <p>{subscriber.fanId.name}</p>
      <p>{subscriber.fanId.email}</p>
    </td>

    <td>${subscriber.amount}</td>

    <td>{subscriber.status}</td>

    <td>
      {new Date(
        subscriber.createdAt
      ).toLocaleDateString()}
    </td>
  </tr>
))} */}

</tbody>
        </table>
      </div>
      {showPricingModal && (

<div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

    <div className="w-full max-w-xl rounded-3xl bg-zinc-900 border border-yellow-500/20 p-8">

     <h2 className="text-3xl font-black">
    Subscription Pricing
</h2>

<p className="text-zinc-400 mt-4 leading-7">
    Choose how much fans will pay every month to access your
    subscriber-only content.

    <br /><br />

    You can update this price whenever you like. Existing
    subscriptions will not be affected until their next billing
    cycle.
</p>
        <div className="mt-8">

            <label className="text-sm text-zinc-500">
                Monthly Price (USD)
            </label>

            <input
                type="number"
                min="1"
                step="0.01"
                value={price}
                onChange={(e)=>setPrice(e.target.value)}
                className="mt-3 w-full rounded-2xl bg-black border border-white/10 px-5 py-4"
            />

        </div>

        <div className="flex gap-4 mt-8">

            <button
                onClick={()=>setShowPricingModal(false)}
                className="flex-1 rounded-xl border border-white/10 h-12"
            >
                Later
            </button>

            <button
                disabled={isPending}
                onClick={()=>{
                    updatePrice(Number(price),{
                        onSuccess:()=>{
                            setShowPricingModal(false);
                        }
                    });
                }}
                className="flex-1 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-black h-12"
            >
                {isPending ? "Saving..." : "Save Price"}
            </button>

        </div>

    </div>

</div>

)}
    </>
  );
}