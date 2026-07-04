import { useMemo, useState } from "react";
import {
  Users,
  Search,
  Eye,
  Ban,
  Mail,
  Crown,
  DollarSign,
  Activity,
} from "lucide-react";

import { useAllFans } from "@/hooks/useAdmin";

export default function FansPage() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAllFans();

  const fans = data?.fans || [];

  const filteredFans = useMemo(() => {
    return fans.filter((fan) => {
      const name = fan.name?.toLowerCase() || "";
      const email = fan.email?.toLowerCase() || "";

      return (
        name.includes(search.toLowerCase()) ||
        email.includes(search.toLowerCase())
      );
    });
  }, [fans, search]);

  const premiumFans = filteredFans.filter(
    (fan) => fan.membership?.plan !== "FREE"
  );

  const activeFans = filteredFans.filter(
    (fan) => fan.membership?.status === "active"
  );

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        Loading fans...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-end">

        <div>

          <p className="uppercase tracking-[.35em] text-xs text-amber-500 font-black">
            Community
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Fans
          </h1>

          <p className="mt-3 text-zinc-500">
            View and manage every fan registered on the platform.
          </p>

        </div>

      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 gap-6">

        <StatCard
          icon={Users}
          title="Total Fans"
          value={fans.length}
          color="blue"
        />

        <StatCard
          icon={Crown}
          title="Premium Fans"
          value={premiumFans.length}
          color="amber"
        />

        <StatCard
          icon={DollarSign}
          title="Revenue"
          value="$0"
          color="green"
        />

        <StatCard
          icon={Activity}
          title="Active Members"
          value={activeFans.length}
          color="purple"
        />

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-5 top-4 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search fan..."
          className="w-full rounded-2xl border border-white/10 bg-[#090909] py-4 pl-14 pr-5 outline-none focus:border-amber-500"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-[30px] border border-white/5 bg-[#090909]">

        <table className="w-full">

          <thead className="bg-black/20">

            <tr className="text-left text-sm text-zinc-500">

              <th className="px-8 py-5">
                Fan
              </th>

              <th>Membership</th>

              <th>Total Spent</th>

              <th>Joined</th>

              <th>Renewal</th>

              <th>Last Active</th>

              <th>Status</th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
                        {filteredFans.map((fan) => (

              <tr
                key={fan._id}
                className="border-t border-white/5 hover:bg-white/5"
              >

                <td className="px-8 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        fan.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          fan.name
                        )}`
                      }
                      alt={fan.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />

                    <div>

                      <h3 className="font-bold">
                        {fan.name}
                      </h3>

                      <p className="text-sm text-zinc-500">
                        {fan.email}
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-2 text-xs font-black ${
                      fan.membership?.plan === "FREE"
                        ? "bg-green-500/10 text-green-400"
                        : fan.membership?.plan === "VIP"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {fan.membership?.plan}
                  </span>

                </td>

                <td className="font-bold text-green-400">
                  $0
                </td>

                <td>
                  {new Date(
                    fan.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  {fan.membership?.endDate
                    ? new Date(
                        fan.membership.endDate
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td>-</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-2 text-xs font-black ${
                      fan.membership?.status === "active"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {fan.membership?.status}
                  </span>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button className="rounded-xl bg-white/5 p-3 hover:bg-amber-500 hover:text-black transition">

                      <Eye size={18} />

                    </button>

                    <button className="rounded-xl bg-blue-500/10 p-3 text-blue-400 hover:bg-blue-500 hover:text-white transition">

                      <Mail size={18} />

                    </button>

                    <button className="rounded-xl bg-red-500/10 p-3 text-red-400 hover:bg-red-500 hover:text-white transition">

                      <Ban size={18} />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

            {!filteredFans.length && (

              <tr>

                <td
                  colSpan={8}
                  className="py-12 text-center text-zinc-500"
                >
                  No fans found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

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