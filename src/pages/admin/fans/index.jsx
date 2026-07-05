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
  XCircle,
  Trash2,
} from "lucide-react";

import {
  useAllFans,
  useDeleteUser,
} from "@/hooks/useAdmin";

export default function FansPage() {
  const [search, setSearch] = useState("");
  const [selectedFan, setSelectedFan] = useState(null);

  const { data, isLoading } = useAllFans();

  const deleteMutation = useDeleteUser();

  const fans = data?.fans || [];

  const filteredFans = useMemo(() => {
    return fans.filter((fan) => {
      const term = search.toLowerCase();

      return (
        fan.name?.toLowerCase().includes(term) ||
        fan.email?.toLowerCase().includes(term)
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
      <div className="py-40 text-center text-zinc-500">
        Loading fans...
      </div>
    );
  }

  return (
    <>
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
            onChange={(e) => setSearch(e.target.value)}
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
                      {fan.membership?.plan || "-"}
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
                      {fan.membership?.status || "-"}
                    </span>

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => setSelectedFan(fan)}
                        className="rounded-xl bg-white/5 p-3 hover:bg-amber-500 hover:text-black transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="rounded-xl bg-blue-500/10 p-3 text-blue-400 hover:bg-blue-500 hover:text-white transition"
                      >
                        <Mail size={18} />
                      </button>

                      <button
                        className="rounded-xl bg-red-500/10 p-3 text-red-400 hover:bg-red-500 hover:text-white transition"
                      >
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
                {/* Fan Details Modal */}

        {selectedFan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">

            <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#0b0b0b]">

              {/* Cover */}

              <img
                src={
                  selectedFan.coverImage ||
                  "https://placehold.co/1400x350/111111/444444?text=Fan+Profile"
                }
                alt=""
                className="h-72 w-full object-cover"
              />

              <div className="p-10">

                {/* Header */}

                <div className="-mt-24 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                  <div className="flex flex-col gap-6 sm:flex-row">

                    <img
                      src={
                        selectedFan.profileImage ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          selectedFan.name
                        )}`
                      }
                      alt={selectedFan.name}
                      className="h-40 w-40 rounded-3xl border-4 border-[#0b0b0b] object-cover"
                    />

                    <div className="pt-4 sm:pt-20">

                      <h2 className="text-4xl font-black">
                        {selectedFan.name}
                      </h2>

                      <p className="mt-2 text-zinc-500 break-all">
                        {selectedFan.email}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => setSelectedFan(null)}
                    className="self-start rounded-2xl border border-white/10 p-3 hover:border-red-500"
                  >
                    <XCircle size={28} />
                  </button>

                </div>

                {/* Information */}

                <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                  <Info
                    title="Email"
                    value={selectedFan.email}
                  />

                  <Info
                    title="Country"
                    value={selectedFan.country || "-"}
                  />

                  <Info
                    title="Joined"
                    value={
                      selectedFan.createdAt
                        ? new Date(
                            selectedFan.createdAt
                          ).toLocaleDateString()
                        : "-"
                    }
                  />

                  <Info
                    title="Membership"
                    value={selectedFan.membership?.plan || "FREE"}
                  />

                  <Info
                    title="Membership Status"
                    value={selectedFan.membership?.status || "-"}
                  />

                  <Info
                    title="Renewal"
                    value={
                      selectedFan.membership?.endDate
                        ? new Date(
                            selectedFan.membership.endDate
                          ).toLocaleDateString()
                        : "-"
                    }
                  />

                  <Info
                    title="KYC"
                    value={
                      selectedFan.isKYCVerified
                        ? "Verified"
                        : "Pending"
                    }
                  />

                  <Info
                    title="Role"
                    value={selectedFan.role}
                  />

                </div>

                {/* Bio */}

                <div className="mt-10 rounded-3xl bg-black/30 p-6">

                  <h3 className="mb-4 font-black">
                    Bio
                  </h3>

                  <p className="leading-7 text-zinc-400">
                    {selectedFan.bio || "No bio available."}
                  </p>

                </div>

                {/* Actions */}

                <div className="mt-10 flex flex-wrap gap-4">

                  <button
                    className="rounded-2xl bg-blue-500 px-6 py-4 font-black text-white flex items-center gap-2"
                  >
                    <Mail size={18} />
                    Send Email
                  </button>

                  <button
                    className="rounded-2xl bg-red-500 px-6 py-4 font-black flex items-center gap-2"
                  >
                    <Ban size={18} />
                    Suspend User
                  </button>

                  <button
                    onClick={() =>
                      deleteMutation.mutate(selectedFan._id)
                    }
                    disabled={deleteMutation.isPending}
                    className="rounded-2xl bg-red-700 px-6 py-4 font-black flex items-center gap-2 hover:bg-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={18} />

                    {deleteMutation.isPending
                      ? "Deleting..."
                      : "Delete User"}
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
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
    purple: "bg-purple-500/10 text-purple-400",
  };

  return (
    <div className="rounded-[28px] border border-white/5 bg-[#090909] p-6">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${colors[color]}`}
        >
          <Icon size={22} />
        </div>

        <span className="text-4xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-6 uppercase tracking-[.25em] text-xs font-black text-zinc-500">
        {title}
      </p>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-black/30 p-5">

      <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 break-words font-bold text-white">
        {value || "-"}
      </h3>

    </div>
  );
}