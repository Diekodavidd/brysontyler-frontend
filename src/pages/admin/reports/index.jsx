import { useState } from "react";

import {
  BarChart3,
  Users,
  DollarSign,
  Eye,
  Download,
  Calendar,
  TrendingUp,
  Video,
  Wallet,
  Loader2,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

import { useAdminReports } from "@/hooks/useAdmin";

export default function AdminReportsPage() {

  const [range, setRange] =
    useState("30");

  const {
    data,
    isLoading,
    isError,
    error,
  } = useAdminReports(range);

  if (isLoading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">

        <Loader2
          className="animate-spin text-amber-500"
          size={40}
        />

        <p className="mt-5 font-bold">
          Loading analytics...
        </p>

        <p className="mt-2 text-zinc-500">
          Gathering platform performance data.
        </p>

      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">

        <h2 className="text-xl font-black text-red-400">
          Failed to load reports
        </h2>

        <p className="mt-3 text-zinc-500">
          {error?.message ||
            "Something went wrong."}
        </p>

      </div>
    );
  }

  const stats =
    data?.stats || {};

  const topCreators =
    data?.topCreators || [];

  const revenueChart =
    data?.revenueChart || [];

  const membershipGrowth =
    data?.membershipGrowth || [];

  const statCards = [

    {
      title: "Platform Revenue",

      value:
        `$${Number(
          stats.platformRevenue || 0
        ).toLocaleString()}`,

      change:
        `${stats.revenueChange >= 0 ? "+" : ""}${stats.revenueChange || 0}%`,

      icon: DollarSign,

      color: "text-green-400",

      bg: "bg-green-500/10",
    },

    {
      title: "Total Users",

      value:
        Number(
          stats.totalUsers || 0
        ).toLocaleString(),

      change:
        `+${Number(
          stats.newUsers || 0
        ).toLocaleString()}`,

      icon: Users,

      color: "text-blue-400",

      bg: "bg-blue-500/10",
    },

    {
      title: "Video Views",

      value:
        Number(
          stats.videoViews || 0
        ).toLocaleString(),

      change: "Total",

      icon: Eye,

      color: "text-purple-400",

      bg: "bg-purple-500/10",
    },

    {
      title: "Published Videos",

      value:
        Number(
          stats.publishedVideos || 0
        ).toLocaleString(),

      change:
        `+${Number(
          stats.newPublishedVideos || 0
        ).toLocaleString()}`,

      icon: Video,

      color: "text-yellow-400",

      bg: "bg-yellow-500/10",
    },

  ];

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

        <div>

          <p className="uppercase tracking-[.35em] text-xs font-black text-amber-500">
            Analytics
          </p>

          <h1 className="mt-3 text-4xl font-black">
            Reports Dashboard
          </h1>

          <p className="mt-3 text-zinc-500">
            Real-time platform analytics, financial reports and creator insights.
          </p>

        </div>

        <div className="flex gap-4">

          <select
            value={range}
            onChange={(e) =>
              setRange(e.target.value)
            }
            className="rounded-xl border border-white/10 bg-[#090909] px-5 py-3 outline-none"
          >

            <option value="7">
              Last 7 Days
            </option>

            <option value="30">
              Last 30 Days
            </option>

            <option value="90">
              Last 90 Days
            </option>

            <option value="365">
              This Year
            </option>

          </select>

          <button
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400"
          >

            <Download size={18} />

            Export

          </button>

        </div>

      </div>


      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {statCards.map((stat) => {

          const Icon =
            stat.icon;

          return (

            <div
              key={stat.title}
              className="rounded-[28px] border border-white/5 bg-[#090909] p-6"
            >

              <div className="flex items-center justify-between">

                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.bg}`}
                >

                  <Icon
                    className={stat.color}
                    size={22}
                  />

                </div>

                <span className="text-green-400 text-sm font-bold">
                  {stat.change}
                </span>

              </div>

              <h2 className="mt-6 text-4xl font-black">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs uppercase tracking-[.25em] text-zinc-500">
                {stat.title}
              </p>

            </div>

          );

        })}

      </div>


      {/* EXTRA STATS */}

      <div className="grid md:grid-cols-3 gap-6">

        <MiniStat
          title="Creators"
          value={stats.totalCreators}
        />

        <MiniStat
          title="Fans"
          value={stats.totalFans}
        />

        <MiniStat
          title="Active Memberships"
          value={stats.activeMemberships}
        />

      </div>


      {/* CHARTS */}

      <div className="grid xl:grid-cols-2 gap-8">


        {/* REVENUE */}

        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Revenue Overview
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Revenue generated during selected period.
              </p>

            </div>

            <BarChart3
              className="text-amber-500"
            />

          </div>

          <div className="mt-10 h-80">

            {revenueChart.length ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={revenueChart}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    strokeOpacity={0.1}
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.15}
                  />

                </AreaChart>

              </ResponsiveContainer>

            ) : (

              <EmptyChart
                icon={BarChart3}
                text="No revenue data available for this period."
              />

            )}

          </div>

        </div>


        {/* MEMBERSHIPS */}

        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-black">
                Membership Growth
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                New memberships created during selected period.
              </p>

            </div>

            <TrendingUp
              className="text-green-400"
            />

          </div>

          <div className="mt-10 h-80">

            {membershipGrowth.length ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={membershipGrowth}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    strokeOpacity={0.1}
                  />

                  <XAxis
                    dataKey="_id"
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 11 }}
                  />

                  <Tooltip />

                  <Bar
                    dataKey="memberships"
                    fill="#22c55e"
                    radius={[
                      6,
                      6,
                      0,
                      0,
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            ) : (

              <EmptyChart
                icon={TrendingUp}
                text="No membership data available for this period."
              />

            )}

          </div>

        </div>

      </div>


      {/* TOP CREATORS */}

      <div className="rounded-[30px] border border-white/5 bg-[#090909] overflow-hidden">

        <div className="border-b border-white/5 p-6">

          <h2 className="text-2xl font-black">
            Top Performing Creators
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Ranked by total content views.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-black/20">

              <tr className="text-left text-sm text-zinc-500">

                <th className="px-8 py-5">
                  Creator
                </th>

                <th>
                  Videos
                </th>

                <th>
                  Views
                </th>

              </tr>

            </thead>

            <tbody>

              {topCreators.map(
                (creator) => (

                  <tr
                    key={creator._id || creator.name}
                    className="border-t border-white/5 hover:bg-white/5"
                  >

                    <td className="px-8 py-6 font-bold">
                      {creator.name}
                    </td>

                    <td>
                      {Number(
                        creator.videos || 0
                      ).toLocaleString()}
                    </td>

                    <td className="text-green-400 font-bold">
                      {Number(
                        creator.views || 0
                      ).toLocaleString()}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* QUICK REPORTS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {[
          "Monthly Revenue Report",
          "Membership Analytics",
          "Creator Performance",
          "Platform Growth",
          "Subscription Report",
          "Gallery Performance",
        ].map((report) => (

          <div
            key={report}
            className="rounded-[26px] border border-white/5 bg-[#090909] p-6 hover:border-amber-500/30 transition"
          >

            <Calendar
              className="text-amber-500"
            />

            <h3 className="mt-5 text-xl font-black">
              {report}
            </h3>

            <p className="mt-3 text-sm text-zinc-500">
              Download the latest generated report.
            </p>

            <button
              className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-black hover:bg-amber-400"
            >

              <Download size={18} />

              Download

            </button>

          </div>

        ))}

      </div>


      {/* FOOTER */}

      <div className="rounded-[30px] border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <h2 className="text-2xl font-black">
            Generate Complete Platform Report
          </h2>

          <p className="mt-2 text-zinc-500">
            Export users, creators, payouts, memberships and revenue into one report.
          </p>

        </div>

        <button
          className="rounded-2xl bg-amber-500 px-8 py-4 font-black text-black hover:bg-amber-400 flex items-center gap-3"
        >

          <Wallet size={20} />

          Generate Report

        </button>

      </div>

    </div>

  );
}


function MiniStat({
  title,
  value,
}) {

  return (

    <div className="rounded-[24px] border border-white/5 bg-[#090909] p-6">

      <p className="text-xs uppercase tracking-[.25em] text-zinc-500 font-black">
        {title}
      </p>

      <p className="mt-3 text-3xl font-black">
        {Number(
          value || 0
        ).toLocaleString()}
      </p>

    </div>

  );

}


function EmptyChart({
  icon: Icon,
  text,
}) {

  return (

    <div className="h-full flex flex-col items-center justify-center">

      <Icon
        size={55}
        className="text-zinc-700"
      />

      <p className="mt-5 text-zinc-500">
        {text}
      </p>

    </div>

  );

}