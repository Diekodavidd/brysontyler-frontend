import {
  DollarSign,
  Users,
  Video,
  Eye,
  TrendingUp,
  Coins,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { useCreatorAnalytics } from "@/hooks/useCreator";

export default function CreatorAnalyticsPage() {
  const { data, isLoading } = useCreatorAnalytics();

  const analytics = data?.analytics || {};

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        Loading analytics...
      </div>
    );
  }

 const cards = [
  {
    title: "Total Earnings",
    value: `$${analytics.totalEarnings || 0}`,
    icon: DollarSign,
    color: "text-green-400",
  },
  {
    title: "Subscribers",
    value: analytics.totalSubscribers || 0,
    icon: Users,
    color: "text-yellow-400",
  },
  {
    title: "Content",
    value: analytics.totalContent || 0,
    icon: Video,
    color: "text-sky-400",
  },
  {
    title: "Wallet Balance",
    value: analytics.coinBalance || 0,
    icon: Coins,
    color: "text-orange-400",
  },
  {
    title: "Live Sessions",
    value: analytics.liveSessions || 0,
    icon: Calendar,
    color: "text-red-400",
  },
  {
    title: "Profile Views",
    value: analytics.profileViews || 0,
    icon: Eye,
    color: "text-purple-400",
  },
];

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex justify-between items-end">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
            Analytics
          </p>

          <h1 className="text-5xl font-black mt-3">
            Creator Analytics
          </h1>

          <p className="text-zinc-500 mt-3">
            Track your audience, earnings and performance.
          </p>

        </div>

      </div>

      {/* Cards */}

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl bg-zinc-900 border border-white/5 p-7"
            >
              <div className="flex justify-between">

                <div>

                  <p className="uppercase tracking-widest text-xs text-zinc-500 font-bold">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-black mt-4">
                    {card.value}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center">

                  <Icon
                    className={card.color}
                    size={24}
                  />

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* Performance */}

      <div className="grid lg:grid-cols-2 gap-8">

       <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8">

  <div className="flex items-center gap-3 mb-8">

    <DollarSign className="text-green-400"/>

    <h2 className="text-2xl font-black">
      Revenue Overview
    </h2>

  </div>

  <div className="space-y-6">

    <Row
      title="Today"
      value={`$${analytics.todayEarnings || 0}`}
    />

    <Row
      title="This Week"
      value={`$${analytics.weeklyEarnings || 0}`}
    />

    <Row
      title="This Month"
      value={`$${analytics.monthlyEarnings || 0}`}
    />

    <Row
      title="Lifetime"
      value={`$${analytics.totalEarnings || 0}`}
    />

  </div>

</div>
        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8">

  <div className="flex items-center gap-3 mb-8">

    <TrendingUp className="text-yellow-400"/>

    <h2 className="text-2xl font-black">
      Audience
    </h2>

  </div>

  <div className="space-y-6">

    <Row
      title="Subscribers"
      value={analytics.totalSubscribers || 0}
      icon={<Users size={18}/>}
    />

    <Row
      title="Profile Views"
      value={analytics.profileViews || 0}
      icon={<Eye size={18}/>}
    />

    <Row
      title="Content Uploaded"
      value={analytics.totalContent || 0}
      icon={<Video size={18}/>}
    />

    <Row
      title="Coin Balance"
      value={analytics.coinBalance || 0}
      icon={<Coins size={18}/>}
    />

  </div>

</div>

      </div>

      {/* Highlights */}

     <div className="grid lg:grid-cols-3 gap-6">

  <Highlight
    title="Best Performing Content"
    value={analytics.bestVideo || "No uploads yet"}
  />

  <Highlight
    title="Top Supporter"
    value={analytics.topFan || "No data"}
  />

  <Highlight
    title="Average Watch Time"
    value={analytics.watchTime || "0 mins"}
  />

  <Highlight
    title="Most Popular Live"
    value={analytics.bestLive || "No live sessions"}
  />

  <Highlight
    title="Subscription Revenue"
    value={`$${analytics.subscriptionRevenue || 0}`}
  />

  <Highlight
    title="Coin Revenue"
    value={`$${analytics.coinRevenue || 0}`}
  />

</div>

    </div>
  );
}

function Row({
  title,
  value,
  icon,
}) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4">

      <div className="flex items-center gap-3">

        {icon}

        <span className="text-zinc-500">
          {title}
        </span>

      </div>

      <span className="font-black">
        {value}
      </span>

    </div>
  );
}

function Highlight({ title, value }) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7 hover:border-yellow-500/20 transition">

      <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
        {title}
      </p>

      <h3 className="mt-6 text-3xl font-black">
        {value}
      </h3>

    </div>
  );
}