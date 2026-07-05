import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Wallet,
  FileText,
  UserCheck,
  Crown,
  Film,
  DollarSign,
  Bell,
  Upload,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useAdminStats } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";


export default function AdminOverview() {
const navigate = useNavigate();
const {
    data,
    isLoading,
} = useAdminStats();
console.log("ADMIN DATA:", data);
console.log("STATS:", data?.stats);
const statsData = data?.stats;
  const stats = [
    {
        label: "Total Fans",
        value: statsData?.totalFans ?? 0,
        change: "",
        trend: "up",
        icon: Users,
    },
    {
        label: "Creators",
        value: statsData?.totalCreators ?? 0,
        change: "",
        trend: "up",
        icon: UserCheck,
    },
    {
        label: "Pending Applications",
        value: statsData?.pendingApplications ?? 0,
        change: "",
        trend: "neutral",
        icon: FileText,
    },
    {
        label: "Brand Videos",
        value: statsData?.totalBrandVideos ?? 0,
        change: "",
        trend: "up",
        icon: Film,
    },
    {
        label: "VIP Members",
        value: statsData?.vipMembers ?? 0,
        change: "",
        trend: "up",
        icon: Crown,
    },
    {
        label: "Elite Members",
        value: statsData?.eliteMembers ?? 0,
        change: "",
        trend: "up",
        icon: Crown,
    },
    {
        label: "Pending Review",
        value: statsData?.pendingContent ?? 0,
        change: "",
        trend: "neutral",
        icon: Film,
    },
    {
        label: "Revenue",
        value: `$${statsData?.totalRevenue ?? 0}`,
        change: "",
        trend: "up",
        icon: DollarSign,
    },
];
  const notifications =
    data?.latestUsers?.map((user) => ({
        text: `${user.name} joined as ${user.role}`,
    })) || [];

  const pendingCreators =
    data?.pendingCreators || [];
if (isLoading) {
    return (
        <div className="py-40 text-center">
            Loading dashboard...
        </div>
    );
}
  return (
    <div className="space-y-10">
      {/* Header */}

      <div className="flex justify-between items-end">
        <div>
          <p className="uppercase tracking-[.3em] text-xs font-black text-amber-500">
            Admin Dashboard
          </p>

          <h1 className="text-4xl font-black mt-3">
            System Overview
          </h1>

          <p className="text-zinc-500 mt-3">
            Everything happening across Bryson Tyler.
          </p>
        </div>

        <button className="rounded-2xl bg-amber-500 px-6 py-3 text-black font-black hover:bg-amber-400 transition">
          Generate Report
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-white/5 bg-[#080808] p-6 hover:border-amber-500/30 transition"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-amber-500">
                <s.icon size={22} />
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-black ${
                  s.trend === "up"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : s.trend === "down"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {s.trend === "up" && <ArrowUpRight size={12} />}
                {s.trend === "down" && <ArrowDownRight size={12} />}
                {s.change}
              </div>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[.25em] text-zinc-500 font-bold">
              {s.label}
            </p>

            <h2 className="mt-2 text-3xl font-black">
              {s.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Notifications + Quick Actions */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
          <div className="flex items-center gap-3 mb-8">
            <Bell className="text-amber-500" />
            <h2 className="text-xl font-black">
              Recent Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {notifications.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-black/30 px-5 py-4 text-sm"
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        {/* <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
          <h2 className="text-xl font-black mb-8">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button className="rounded-2xl bg-amber-500 py-5 text-black font-black hover:bg-amber-400 transition flex flex-col items-center gap-2">
              <Upload size={20} />
              Upload Brand Video
            </button>

            <button className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2">
              <UserCheck size={20} />
              Review Creators
            </button>

            <button className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2">
              <Wallet size={20} />
              Memberships
            </button>

            <button className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2">
              <FileText size={20} />
              Reports
            </button>
          </div>
        </div> */}
        <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
  <h2 className="text-xl font-black mb-8">
            Quick Actions
          </h2>
                    <div className="grid grid-cols-2 gap-4">

  <button
    onClick={() => navigate("/admin/gallery")}
    className="rounded-2xl bg-amber-500 py-5 text-black font-black hover:bg-amber-400 transition flex flex-col items-center gap-2"
  >
    <Upload size={20} />
    Upload Brand Video
  </button>

  <button
    onClick={() => navigate("/admin/pending-creators")}
    className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2"
  >
    <UserCheck size={20} />
    Review Creators
  </button>

  <button
    onClick={() => navigate("/admin/memberships")}
    className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2"
  >
    <Wallet size={20} />
    Memberships
  </button>

  <button
    onClick={() => navigate("/admin/reports")}
    className="rounded-2xl bg-zinc-900 py-5 hover:bg-zinc-800 transition flex flex-col items-center gap-2"
  >
    <FileText size={20} />
    Reports
  </button>
  </div>

</div>
      </div>

      {/* Pending Creators */}

      <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-black">
            Pending Creator Applications
          </h2>

          <button className="text-amber-500 font-bold text-sm">
            View All
          </button>
        </div>

        <div className="space-y-5">
  {pendingCreators.map((creator) => (
    <div
      key={creator.name}
      className="
        rounded-2xl
        bg-black/30
        p-5
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        "
      >
        {/* Creator Info */}
        <div>
          <h3 className="font-black text-lg">
            {creator.name}
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Applied{" "}
            {new Date(creator.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Actions */}
       
      </div>
    </div>
  ))}
</div>
      </div>

      {/* Bottom Summary */}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
          <h2 className="text-xl font-black mb-6">
            Brand Gallery
          </h2>

          <div className="space-y-4">
<Summary
title="Published Videos"
value={statsData?.publishedVideos ?? 0}
/>
<Summary
title="Featured Videos"
value={statsData?.featuredVideos ?? 0}
/>
<Summary
title="Draft Videos"
value={statsData?.draftVideos ?? 0}
/>
            <Summary title="Scheduled Uploads" value="2" />
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">
          <h2 className="text-xl font-black mb-6">
            Membership Breakdown
          </h2>

          <div className="space-y-4">
<Summary
title="FREE Members"
value={statsData?.freeMembers ?? 0}
/>
<Summary
title="VIP Members"
value={statsData?.vipMembers ?? 0}
/>
<Summary
title="ELITE Members"
value={statsData?.eliteMembers ?? 0}
/>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ title, value }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-black/30 px-5 py-4">
      <span className="text-zinc-400">{title}</span>

      <span className="font-black text-xl">
        {value}
      </span>
    </div>
  );
}