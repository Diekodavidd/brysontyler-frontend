import {
  Wallet,
  CreditCard,
  Heart,
  Clock3,
  Bell,
  PlayCircle,
  Users,
  Coins,
  ChevronRight,
} from "lucide-react";
import { useFanDashboard, useFanHistory, usePayments, useSubscriptions } from "../../hooks/useFan";
import { useAuthStore } from "../../store/useAuthStore";

export default function FanDashboardPage() {
//   const cards = [
//     {
//       title: "Active Subscriptions",
//       value: "4",
//       icon: Users,
//       color: "text-yellow-400",
//     },
//     {
//       title: "Wallet Balance",
//       value: "$145",
//       icon: Wallet,
//       color: "text-green-400",
//     },
//     {
//       title: "Coins",
//       value: "2,850",
//       icon: Coins,
//       color: "text-orange-400",
//     },
//     {
//       title: "Liked Videos",
//       value: "81",
//       icon: Heart,
//       color: "text-pink-400",
//     },
//   ];

  const watching = [
    {
      creator: "Bryson Tyler",
      title: "Late Night Studio Session",
      progress: 72,
    },
    {
      creator: "Sarah Mills",
      title: "Behind The Scenes",
      progress: 36,
    },
  ];

//   const subscriptions = [
//     "Bryson Tyler",
//     "Lena Rose",
//     "Michael Ace",
//     "David Luxe",
//   ];
const { data: dashboard } = useFanDashboard();
const { data: subscriptionsData } = useSubscriptions();
const { data: history } = useFanHistory();
const { data: payments } = usePayments();
  const user = useAuthStore((state) => state.user);



console.log("Dashboard response:", dashboard);

const cards = [
  {
    title: "Subscriptions",
    value: dashboard?.stats?.totalSubscriptions || 0,
    icon: Users,
    color: "text-yellow-400",
  },
  {
    title: "Wallet",
    value: `$${dashboard?.fan?.coinBalance || 0}`,
    icon: Wallet,
    color: "text-green-400",
  },
  {
    title: "Payments",
    value: payments?.count || 0,
    icon: CreditCard,
    color: "text-blue-400",
  },
  {
    title: "Coins",
    value: dashboard?.fan?.coinBalance || 0,
    icon: Coins,
    color: "text-orange-400",
  },
];


  if (!user) return null;

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex justify-between items-end">
        <div>
          <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs">
            Fan Dashboard
          </p>

         <h1 className="text-5xl font-black">
  Welcome back,
  <br />
  {user.name}
</h1>

          <p className="text-zinc-500 mt-3">
            Manage subscriptions, wallet and discover creators.
          </p>
        </div>

        <button className="px-6 py-3 rounded-2xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition">
          Discover Creators
        </button>
      </div>

      {/* Stats */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-zinc-900 rounded-3xl border border-white/5 p-7 hover:border-yellow-500/30 transition"
            >
              <div className="flex justify-between">

                <div>

                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    {card.title}
                  </p>

                  <h2 className="text-4xl font-black mt-4">
                    {card.value}
                  </h2>

                </div>

                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">

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

      {/* Grid */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Continue Watching */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8">

          <div className="flex justify-between mb-8">

            <h2 className="font-black text-xl">
              Continue Watching
            </h2>

            <PlayCircle className="text-yellow-400" />

          </div>

          <div className="space-y-6">

            {watching.map((item) => (

              <div
                key={item.title}
                className="space-y-3"
              >
                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {item.creator}
                    </p>

                  </div>

                  <ChevronRight />

                </div>

                <div className="h-2 rounded-full bg-black">

                  <div
                    className="h-full rounded-full bg-yellow-500"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Active Subscriptions */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8">

          <div className="flex justify-between mb-8">

            <h2 className="font-black text-xl">
              Active Subscriptions
            </h2>

            <CreditCard className="text-yellow-400" />

          </div>

          <div className="space-y-5">

            {subscriptionsData?.subscriptions?.map((sub) => (
  <div
    key={sub._id}
    className="flex justify-between items-center pb-4 border-b border-white/5"
  >
    <div>
      <h3 className="font-bold">
        {sub.creatorId.name}
      </h3>

      <p className="text-zinc-500 text-sm">
        Ends {new Date(sub.endDate).toLocaleDateString()}
      </p>
    </div>

    <button className="px-4 py-2 rounded-xl bg-yellow-500 text-black font-bold">
      Visit
    </button>
  </div>
))}


{subscriptionsData?.subscriptions?.slice(0,4).map((sub)=>(
<p key={sub._id}>
⭐ You're subscribed to {sub.creatorId.name}
</p>
))}
          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Notifications */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bell className="text-yellow-400" />

            <h2 className="font-black">
              Notifications
            </h2>

          </div>

          <div className="space-y-5">

            <p className="text-zinc-400">
              🔥 Bryson Tyler uploaded a new video.
            </p>

            <p className="text-zinc-400">
              💰 Your wallet has been credited.
            </p>

            <p className="text-zinc-400">
              ❤️ Lena Rose is live now.
            </p>

          </div>

        </div>

        {/* Recent Activity */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-yellow-400" />

            <h2 className="font-black">
              Recent Activity
            </h2>

          </div>

          <div className="space-y-5">

            {payments?.payments?.slice(0,5).map((payment)=>(
<div key={payment._id} className="flex justify-between">
    <span>
        Subscription to {payment.creatorId.name}
    </span>

    <span className="text-zinc-500">
        ${payment.amount}
    </span>
</div>
))}

          </div>

        </div>

      </div>

    </div>
  );
}