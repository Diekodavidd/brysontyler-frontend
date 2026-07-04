import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Users,
  DollarSign,
  Video,
  Ban,
  XCircle,
} from "lucide-react";

import { useAllCreators } from "@/hooks/useAdmin";

export default function AdminCreatorsPage() {
  const [search, setSearch] = useState("");
  const [selectedCreator, setSelectedCreator] = useState(null);

  const { data, isLoading } = useAllCreators();

const creators = data?.creators || [];

 const filtered = useMemo(() => {
  return creators.filter((creator) => {
    const name =
      creator.name?.toLowerCase() || "";

    const stageName =
      creator.creatorApplication?.stageName?.toLowerCase() ||
      "";

    return (
      name.includes(search.toLowerCase()) ||
      stageName.includes(search.toLowerCase())
    );
  });
}, [creators, search]);
if (isLoading) {
  return (
    <div className="py-40 text-center">
      Loading creators...
    </div>
  );
}
  return (
    <>
      <div className="space-y-8">
        {/* Header */}

        <div className="flex justify-between items-end">
          <div>
            <p className="uppercase tracking-[.3em] text-xs text-amber-500 font-black">
              Creators
            </p>

            <h1 className="text-4xl font-black mt-3">
              Creator Management
            </h1>

            <p className="text-zinc-500 mt-3">
              View every approved creator on the platform.
            </p>
          </div>

          <button className="rounded-2xl bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400 transition">
            Export Creators
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-5 gap-5">
          <Stat
  title="Creators"
  value={creators.length}
  icon={Users}
/>

<Stat
  title="Approved"
  value={
    creators.filter(
      (c) =>
        c.creatorApproval?.status === "approved"
    ).length
  }
  icon={ShieldCheck}
/>

<Stat
  title="KYC Verified"
  value={
    creators.filter(
      (c) => c.isKYCVerified
    ).length
  }
  icon={Video}
/>

<Stat
  title="Active"
  value={
    creators.filter(
      (c) =>
        c.creatorApproval?.status === "approved"
    ).length
  }
  icon={DollarSign}
/>

<Stat
  title="Rejected"
  value={
    creators.filter(
      (c) =>
        c.creatorApproval?.status === "rejected"
    ).length
  }
  icon={Ban}
/>
        </div>

        {/* Search */}

        <div className="flex justify-between gap-5">
          <div className="relative w-[420px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search creators..."
              className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-4 outline-none focus:border-amber-500"
            />
          </div>

          <button className="rounded-2xl border border-white/10 bg-[#090909] px-6 hover:border-amber-500 flex items-center gap-2">
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl border border-white/5">
          <table className="w-full">
            <thead className="bg-[#090909]">
              <tr className="text-left text-zinc-500 text-xs uppercase tracking-widest">
                <th className="p-5">Creator</th>
                <th>Subscribers</th>
                <th>Videos</th>
                <th>Revenue</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

          <tbody>
  {filtered.map((creator) => (
    <tr
      key={creator._id}
      className="border-t border-white/5 hover:bg-white/[0.02]"
    >
      <td className="p-5">
        <div className="flex items-center gap-4">
          <img
            src={
              creator.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(creator.name)
            }
            alt=""
            className="h-14 w-14 rounded-2xl object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black">
                {creator.name}
              </h3>

              {creator.creatorApproval?.status ===
                "approved" && (
                <ShieldCheck
                  size={16}
                  className="text-emerald-400"
                />
              )}
            </div>

            <p className="text-zinc-500 text-sm">
              {creator.creatorApplication?.stageName ||
                creator.email}
            </p>
          </div>
        </div>
      </td>

      <td>-</td>

      <td>-</td>

      <td>-</td>

      <td>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            creator.creatorApproval?.status ===
            "approved"
              ? "bg-green-500/10 text-green-400"
              : creator.creatorApproval?.status ===
                "rejected"
              ? "bg-red-500/10 text-red-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {creator.creatorApproval?.status}
        </span>
      </td>

      <td>
        <button
          onClick={() =>
            setSelectedCreator(creator)
          }
          className="rounded-xl border border-white/10 p-3 hover:border-amber-500"
        >
          <Eye size={18} />
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>

      {/* Profile Modal */}

      {selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-[#0b0b0b] border border-white/10">

            <img
              src={selectedCreator.cover}
              className="h-72 w-full object-cover"
            />

            <div className="p-10">

              <div className="-mt-24 flex justify-between">

                <div className="flex gap-6">

                  <img
                    src={selectedCreator.avatar}
                    className="h-40 w-40 rounded-3xl border-4 border-[#0b0b0b] object-cover"
                  />

                  <div className="pt-24">

                    <h2 className="text-4xl font-black">
                      {selectedCreator.name}
                    </h2>

                    <p className="mt-2 text-zinc-500">
                      {selectedCreator.username}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedCreator(null)
                  }
                >
                  <XCircle size={30} />
                </button>

              </div>

              <div className="grid md:grid-cols-4 gap-5 mt-10">

                <Info title="Email" value={selectedCreator.email} />
                <Info title="Country" value={selectedCreator.country} />
                <Info title="Joined" value={selectedCreator.joined} />
                <Info title="Membership" value={selectedCreator.membership} />

                <Info title="Subscribers" value={selectedCreator.subscribers} />
                <Info title="Videos" value={selectedCreator.videos} />
                <Info title="Revenue" value={selectedCreator.revenue} />
                <Info title="Status" value={selectedCreator.status} />

              </div>

              <div className="mt-10 rounded-3xl bg-black/30 p-6">
                <h3 className="font-black mb-4">
                  Bio
                </h3>

                <p className="text-zinc-400">
                  {selectedCreator.bio}
                </p>
              </div>

              <div className="flex gap-4 mt-10">

                <button className="rounded-2xl bg-amber-500 px-6 py-4 text-black font-black flex items-center gap-2">

                  <Eye size={18} />

                  View Content

                </button>

                <button className="rounded-2xl bg-green-500 px-6 py-4 text-black font-black flex items-center gap-2">

                  <CheckCircle2 size={18} />

                  Verify

                </button>

                <button className="rounded-2xl bg-red-500 px-6 py-4 font-black flex items-center gap-2">

                  <Ban size={18} />

                  Suspend

                </button>

              </div>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-[#080808] border border-white/5 p-6">
      <div className="flex justify-between">
        <Icon className="text-amber-500" />
        <span className="text-3xl font-black">{value}</span>
      </div>

      <p className="mt-6 uppercase tracking-[.25em] text-xs text-zinc-500 font-bold">
        {title}
      </p>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl bg-black/30 p-5">
      <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 font-bold break-words">
        {value}
      </h3>
    </div>
  );
}