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
} from "lucide-react";

export default function AdminReportsPage() {
  const [range, setRange] = useState("30");

  const stats = [
    {
      title: "Platform Revenue",
      value: "$184,250",
      change: "+18.4%",
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Users",
      value: "18,420",
      change: "+452",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Video Views",
      value: "1.82M",
      change: "+11%",
      icon: Eye,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Published Videos",
      value: "426",
      change: "+16",
      icon: Video,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
  ];

  const topCreators = [
    {
      name: "Bryson Tyler",
      subscribers: 18245,
      revenue: "$58,430",
      videos: 81,
    },
    {
      name: "Michael Cole",
      subscribers: 9244,
      revenue: "$21,840",
      videos: 44,
    },
    {
      name: "James Arthur",
      subscribers: 8012,
      revenue: "$18,300",
      videos: 36,
    },
    {
      name: "Alex Stone",
      subscribers: 6452,
      revenue: "$14,980",
      videos: 31,
    },
  ];

  const reports = [
    "Monthly Revenue Report",
    "Membership Analytics",
    "Creator Performance",
    "Platform Growth",
    "Subscription Report",
    "Gallery Performance",
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-end justify-between">

        <div>

          <p className="uppercase tracking-[.35em] text-xs font-black text-amber-500">

            Analytics

          </p>

          <h1 className="mt-3 text-4xl font-black">

            Reports Dashboard

          </h1>

          <p className="mt-3 text-zinc-500">

            Platform analytics, financial reports and creator insights.

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
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="365">This Year</option>
          </select>

          <button className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-black hover:bg-amber-400">

            <Download size={18} />

            Export

          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((stat) => {
          const Icon = stat.icon;

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

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-8">

        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-black">

              Revenue Overview

            </h2>

            <BarChart3 className="text-amber-500" />

          </div>

          <div className="mt-10 h-80 rounded-2xl border border-dashed border-white/10 flex items-center justify-center">

            <div className="text-center">

              <BarChart3
                size={60}
                className="mx-auto text-zinc-700"
              />

              <p className="mt-5 text-zinc-500">

                Revenue Chart

              </p>

            </div>

          </div>

        </div>

        <div className="rounded-[30px] border border-white/5 bg-[#090909] p-8">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-black">

              Membership Growth

            </h2>

            <TrendingUp className="text-green-400" />

          </div>

          <div className="mt-10 h-80 rounded-2xl border border-dashed border-white/10 flex items-center justify-center">

            <div className="text-center">

              <TrendingUp
                size={60}
                className="mx-auto text-zinc-700"
              />

              <p className="mt-5 text-zinc-500">

                Growth Chart

              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Top Creators */}

      <div className="rounded-[30px] border border-white/5 bg-[#090909] overflow-hidden">

        <div className="border-b border-white/5 p-6">

          <h2 className="text-2xl font-black">

            Top Performing Creators

          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-black/20">

            <tr className="text-left text-sm text-zinc-500">

              <th className="px-8 py-5">Creator</th>
              <th>Subscribers</th>
              <th>Videos</th>
              <th>Revenue</th>

            </tr>

          </thead>

          <tbody>

            {topCreators.map((creator) => (

              <tr
                key={creator.name}
                className="border-t border-white/5 hover:bg-white/5"
              >

                <td className="px-8 py-6 font-bold">
                  {creator.name}
                </td>

                <td>{creator.subscribers.toLocaleString()}</td>

                <td>{creator.videos}</td>

                <td className="text-green-400 font-bold">
                  {creator.revenue}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Quick Reports */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {reports.map((report) => (

          <div
            key={report}
            className="rounded-[26px] border border-white/5 bg-[#090909] p-6 hover:border-amber-500/30 transition"
          >

            <Calendar className="text-amber-500" />

            <h3 className="mt-5 text-xl font-black">

              {report}

            </h3>

            <p className="mt-3 text-sm text-zinc-500">

              Download the latest generated report.

            </p>

            <button className="mt-6 flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-bold text-black hover:bg-amber-400">

              <Download size={18} />

              Download

            </button>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="rounded-[30px] border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-transparent p-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-black">

            Generate Complete Platform Report

          </h2>

          <p className="mt-2 text-zinc-500">

            Export users, creators, payouts, memberships and revenue into one report.

          </p>

        </div>

        <button className="rounded-2xl bg-amber-500 px-8 py-4 font-black text-black hover:bg-amber-400 flex items-center gap-3">

          <Wallet size={20} />

          Generate Report

        </button>

      </div>

    </div>
  );
}