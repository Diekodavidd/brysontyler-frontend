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
import {
  useCreateMembership,
} from "@/hooks/useMembership";

export default function FanDashboardPage() {
const { data: dashboard } = useFanDashboard();
const { data: subscriptionsData } = useSubscriptions();
const { data: history } = useFanHistory();
const { data: payments } = usePayments();
  const user = useAuthStore((state) => state.user);


const {
  mutate: buyMembership,
  isPending,
} = useCreateMembership();
const membership =
  user?.membership || {};

const currentPlan =
  membership.plan || "FREE";

const status =
  membership.status || "active";

const expiry =
  membership.endDate;
console.log("Dashboard response:", dashboard);

const cards = [
  {
    title: "Membership",
    value:currentPlan || "FREE",
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

const watching =
  subscriptionsData?.subscriptions?.slice(0, 2).map((sub) => ({
    id: sub.creatorId._id,
    creator: sub.creatorId.name,
    title: `Watch new content from ${sub.creatorId.name}`,
    progress: 100,
    live: sub.creatorId?.isLive || false,
  })) || [];

const notifications = [];
if (user?.membership?.plan && user.membership.plan !== "FREE") {
  notifications.push({
    icon: "👑",
    text: `Your ${user.membership.plan} membership is active.`,
  });
}
subscriptionsData?.subscriptions?.forEach((sub) => {
  notifications.push({
    icon: "⭐",
    text: `You're subscribed to ${sub.creatorId.name}.`,
  });
});
payments?.payments?.slice(0, 2).forEach((payment) => {
  notifications.push({
    icon: "💳",
    text: `Payment of $${payment.amount} was successful.`,
  });
});

if (notifications.length === 0) {
  notifications.push({
    icon: "🎉",
    text: "You're all caught up.",
  });
}

  if (!user) return null;

  return (
<div className="space-y-6 lg:space-y-10">
      {/* Header */}

<div
className="
flex
flex-col
lg:flex-row
justify-between
lg:items-end
gap-6
">        <div>
          <p className="text-yellow-400 font-black uppercase tracking-[0.3em] text-xs">
            Fan Dashboard
          </p>

<h1 className="text-3xl sm:text-4xl xl:text-5xl font-black">  Welcome back,
  <br />
  {user.name}
</h1>

          <p className="text-zinc-500 mt-3">
            Manage subscriptions, wallet and discover creators.
          </p>
        </div>

        <button className="w-full
sm:w-auto
px-6
py-3 rounded-2xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition">
          Discover Creators
        </button>
      </div>

      {/* Stats */}

      <div className="grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-zinc-900 rounded-3xl border border-white/5 p-5 lg:p-7 hover:border-yellow-500/30 transition"
            >
              <div className="flex justify-between">

                <div>

                  <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                    {card.title}
                  </p>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-4">
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

      <div className="grid
grid-cols-1
xl:grid-cols-2
gap-6">

        {/* Continue Watching */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-5 lg:p-8">

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

                    <h3>
  {item.live
    ? `🔴 Watch ${item.creator} Live`
    : `Watch new videos from ${item.creator}`}
</h3>

                  <p className="text-zinc-500">
  {item.live
    ? "Streaming now"
    : "Latest uploads available"}
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

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-5 lg:p-8">

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
    className="flex
flex-col
sm:flex-row
sm:items-center
justify-between
gap-3 pb-4 border-b border-white/5"
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

      <div className="grid
grid-cols-1
xl:grid-cols-2
gap-6">

        {/* Notifications */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-5 lg:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bell className="text-yellow-400" />

            <h2 className="font-black">
              Notifications
            </h2>

          </div>

          <div className="space-y-5">

{notifications.length ? (

notifications.map((note,index)=>(
<div
    key={index}
    className="flex items-start gap-3 pb-4 border-b border-white/5"
>

<span className="text-xl">
    {note.icon}
</span>

<p className="text-zinc-300">
    {note.text}
</p>

</div>
))

) : (

<p className="text-zinc-500">
You're all caught up.
</p>

)}

</div>

        </div>

        {/* Recent Activity */}

        <div className="bg-zinc-900 rounded-3xl border border-white/5 p-p-5 lg:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-yellow-400" />

            <h2 className="font-black">
              Recent Activity
            </h2>

          </div>

          <div className="space-y-5">

            {payments?.payments?.slice(0,5).map((payment)=>(
<div key={payment._id} className="
flex
flex-col
sm:flex-row
justify-between
gap-2
">
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