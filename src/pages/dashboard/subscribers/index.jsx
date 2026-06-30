import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Mail,
  Shield,
} from "lucide-react";

import { useSubscribers } from "@/hooks/useSubscribers";

export default function SubscribersPage() {
  const [search, setSearch] = useState("");

  const {
    data: subscribers = [],
    isLoading,
  } = useSubscribers();

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
    </>
  );
}