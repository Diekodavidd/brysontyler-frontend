import {
  Activity,
  Link as LinkIcon,
  BarChart3,
  Clock,
  Users,
  DollarSign,
  Video,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function CreatorDashboardPage() {
  const stats = [
    {
      title: "Total Subscribers",
      value: "124,892",
      change: "+2.4%",
      subtitle: "vs last month",
      icon: Users,
      color: "text-sky-400",
    },
    {
      title: "30-Day Earnings",
      value: "$48,920",
      change: "+12.6%",
      subtitle: "Paid via direct deposit",
      icon: DollarSign,
      color: "text-emerald-400",
    },
    {
      title: "Active Videos",
      value: "1,204",
      change: "+18",
      subtitle: "Published this month",
      icon: Video,
      color: "text-yellow-400",
    },
  ];

  return (
    <>
      {/* Header */}

      <header className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black">
            Creator Dashboard
          </h1>

          <p className="text-zinc-400 mt-2">
            Welcome back,{" "}
            <span className="font-bold text-white">
              Bryson Tyler
            </span>

            {" • "}

            <span className="inline-flex items-center gap-1 text-yellow-400 font-bold">
              <CheckCircle2 size={15} />
              VERIFIED
            </span>
          </p>
        </div>

        <button className="px-6 py-3 rounded-2xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition-all">
          VIEW ANALYTICS
        </button>
      </header>
<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
  {[
    "Upload Content",
    "Go Live",
    "View Subscribers",
    "Request Payout",
  ].map((item) => (
    <button
      key={item}
      className="bg-zinc-900 border border-white/5 rounded-2xl py-5 font-bold hover:border-yellow-500 hover:bg-zinc-800 transition-all"
    >
      {item}
    </button>
  ))}
</div>
      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group bg-zinc-900 border border-white/5 rounded-3xl p-8 hover:border-yellow-500/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">
                    {stat.title}
                  </p>

                  <h2 className="text-4xl font-black mt-3">
                    {stat.value}
                  </h2>

                  <div className="flex items-center gap-2 mt-3">
                    <TrendingUp
                      size={14}
                      className="text-emerald-400"
                    />

                    <span className="text-sm text-emerald-400 font-bold">
                      {stat.change}
                    </span>

                    <span className="text-xs text-zinc-500">
                      {stat.subtitle}
                    </span>
                  </div>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-yellow-500/10 transition-all">
                  <Icon
                    size={24}
                    className={stat.color}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Recent Activity */}

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Activity
              className="text-yellow-500"
              size={22}
            />

            <h2 className="font-black uppercase tracking-widest text-sm">
              Recent Activity
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                action: "New subscriber from YouTube",
                time: "2 mins ago",
              },
              {
                action: "Video 'Summer Tour' processed",
                time: "1 hour ago",
              },
              {
                action: "Payout confirmed",
                time: "5 hours ago",
              },
              {
                action: "VIP member renewed subscription",
                time: "Yesterday",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center pb-5 border-b border-white/5 last:border-0"
              >
                <div>
                  <h3 className="font-semibold">
                    {activity.action}
                  </h3>
                </div>

                <span className="flex items-center gap-2 text-xs text-zinc-500">
                  <Clock size={13} />
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook */}

        <div className="bg-zinc-900 border border-white/5 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <LinkIcon
              className="text-yellow-500"
              size={22}
            />

            <h2 className="font-black uppercase tracking-widest text-sm">
              Webhook Status
            </h2>
          </div>

          <div className="space-y-6">

            <div className="flex justify-between">
              <span className="text-xs uppercase text-zinc-500 font-bold">
                Endpoint
              </span>

              <span className="font-mono text-xs bg-black px-3 py-2 rounded-lg">
                /webhooks/bryson
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs uppercase text-zinc-500 font-bold">
                Status
              </span>

              <span className="flex items-center gap-2 text-emerald-400 font-bold">
                <BarChart3 size={15} />
                ACTIVE
              </span>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-xs">
                <span className="text-zinc-500">
                  Uptime
                </span>

                <span className="text-emerald-400 font-bold">
                  99.98%
                </span>
              </div>

              <div className="h-2 rounded-full bg-black overflow-hidden">
                <div className="w-[99%] h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
              </div>
            </div>

            <div className="rounded-2xl bg-black border border-white/5 p-5 text-sm text-zinc-400 leading-7">
              Your webhook is successfully receiving events.
              The last 1,245 requests returned{" "}
              <span className="text-green-400 font-bold">
                HTTP 200
              </span>{" "}
              with an average response time of{" "}
              <span className="text-white font-bold">
                132ms
              </span>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}