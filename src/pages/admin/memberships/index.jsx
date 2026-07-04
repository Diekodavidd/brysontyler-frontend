import { useMemo, useState } from "react";
import {
  Users,
  Crown,
  Star,
  Wallet,
  Search,
  Eye,
  TrendingUp,
} from "lucide-react";

import { useMemberships } from "@/hooks/useAdmin";

export default function MembershipPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useMemberships();

  const members = data?.members || [];
  const stats = data?.stats || {};

  const filtered = useMemo(() => {
    return members.filter((member) => {
      const name = member.name?.toLowerCase() || "";
      const email = member.email?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [members, search]);

  const free = filtered.filter(
    (m) => m.membership?.plan === "FREE"
  );

  const vip = filtered.filter(
    (m) => m.membership?.plan === "VIP"
  );

  const elite = filtered.filter(
    (m) => m.membership?.plan === "Elite"
  );

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        Loading memberships...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-end">

        <div>

          <p className="uppercase tracking-[.35em] text-xs font-black text-amber-500">
            Membership
          </p>

          <h1 className="text-4xl font-black mt-3">
            Membership Overview
          </h1>

          <p className="text-zinc-500 mt-3">
            View all subscribers grouped by membership plan.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 gap-6">

        <StatCard
          icon={Users}
          title="Total Members"
          value={stats.total ?? members.length}
          color="blue"
        />

        <StatCard
          icon={Star}
          title="FREE"
          value={stats.free ?? free.length}
          color="green"
        />

        <StatCard
          icon={Crown}
          title="VIP"
          value={stats.vip ?? vip.length}
          color="amber"
        />

        <StatCard
          icon={Wallet}
          title="ELITE"
          value={stats.elite ?? elite.length}
          color="red"
        />

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          className="absolute left-5 top-4 text-zinc-500"
          size={18}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search member..."
          className="w-full rounded-2xl border border-white/10 bg-[#090909] py-4 pl-14 pr-5 outline-none focus:border-amber-500"
        />

      </div>

      <MembershipSection
        title="FREE MEMBERS"
        members={free}
        color="green"
      />

      <MembershipSection
        title="VIP MEMBERS"
        members={vip}
        color="amber"
      />

      <MembershipSection
        title="ELITE MEMBERS"
        members={elite}
        color="red"
      />

    </div>
  );
}
function MembershipSection({
  title,
  members,
  color,
}) {
  return (
    <div className="rounded-[30px] overflow-hidden border border-white/5 bg-[#090909]">

      <div className="border-b border-white/5 px-8 py-6 flex justify-between items-center">

        <h2 className="text-2xl font-black">
          {title}
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-xs font-black ${
            color === "green"
              ? "bg-green-500/10 text-green-400"
              : color === "amber"
              ? "bg-amber-500/10 text-amber-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {members.length} Members
        </span>

      </div>

      <table className="w-full">

        <thead className="bg-black/20">

          <tr className="text-zinc-500 text-sm">

            <th className="text-left px-8 py-5">
              Name
            </th>

            <th className="text-left">
              Email
            </th>

            <th className="text-left">
              Joined
            </th>

            <th className="text-left">
              Renewal
            </th>

            <th className="text-left">
              Status
            </th>

            <th className="text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {members.map((member) => (

            <tr
              key={member._id}
              className="border-t border-white/5 hover:bg-white/5"
            >

              <td className="px-8 py-5">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      member.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        member.name
                      )}`
                    }
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="font-bold">
                      {member.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {member.membership?.plan}
                    </p>

                  </div>

                </div>

              </td>

              <td>{member.email}</td>

              <td>
                {new Date(
                  member.createdAt
                ).toLocaleDateString()}
              </td>

              <td>
                {member.membership?.endDate
                  ? new Date(
                      member.membership.endDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>

                <span
                  className={`rounded-full px-3 py-2 text-xs font-black ${
                    member.membership?.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {member.membership?.status || "-"}
                </span>

              </td>

              <td>

                <div className="flex justify-center">

                  <button className="rounded-xl bg-white/5 p-3 hover:bg-amber-500 hover:text-black transition">

                    <Eye size={18} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

          {!members.length && (

            <tr>

              <td
                colSpan={6}
                className="py-12 text-center text-zinc-500"
              >
                No members found.
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}
function StatCard({
  icon: Icon,
  title,
  value,
  color,
}) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-green-500/10 text-green-400",
    amber: "bg-amber-500/10 text-amber-400",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-[28px] border border-white/5 bg-[#090909] p-6">

      <div className="flex justify-between items-center">

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${colors[color]}`}
        >
          <Icon size={22} />
        </div>

        <TrendingUp className="text-emerald-400" />

      </div>

      <h2 className="text-4xl font-black mt-8">
        {value}
      </h2>

      <p className="mt-2 uppercase tracking-[.25em] text-xs text-zinc-500 font-black">
        {title}
      </p>

    </div>
  );
}