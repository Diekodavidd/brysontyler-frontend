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
import { useAuthStore } from "../../store/useAuthStore";
import { useMyContent } from "../../hooks/useContent";
import { useSubscribers } from "../../hooks/useSubscribers";
import { useRouter } from "@/compat/navigation";

export default function CreatorDashboardPage() {
const { push } = useRouter();
    const { data: subscribers = [] } = useSubscribers();
const { data: content = [] } = useMyContent();
console.log(content)
const user = useAuthStore((state) => state.user);

  
const activeSubscribers = subscribers.filter(
  (sub) => sub.status === "active"
);

const totalRevenue = activeSubscribers.reduce(
  (sum, sub) => sum + (sub.amount || 0),
  0
);

const creatorStatus =
  user?.creatorApproval?.status || "not_submitted";

const verified = creatorStatus === "approved";

const recentActivity = [
  ...content.slice(0, 3).map((item) => ({
    id: item._id,
    title: "New Content Uploaded",
    subtitle: item.title,
    color: "bg-yellow-500",
    time: new Date(item.createdAt).toLocaleDateString(),
  })),

  ...activeSubscribers.slice(0, 3).map((sub) => ({
    id: sub._id,
    title: "New Subscriber",
    subtitle: sub.fanId?.name,
    color: "bg-green-500",
    time: new Date(sub.createdAt).toLocaleDateString(),
  })),
].sort(
  (a, b) => new Date(b.time) - new Date(a.time)
);
  const stats = [
  {
    title: "Subscribers",
    value: activeSubscribers.length.toLocaleString(),
    change: `${activeSubscribers.length} Active`,
    subtitle: "Current Members",
    icon: Users,
    color: "text-sky-400",
  },
  {
    title: "Revenue",
    value: `$${totalRevenue.toLocaleString()}`,
    change: "Subscription Income",
    subtitle: "Lifetime Earnings",
    icon: DollarSign,
    color: "text-emerald-400",
  },
  {
    title: "Premium Content",
    value: content.length.toString(),
    change: `${content.filter(c => c.protection?.premium).length}`,
    subtitle: "Premium Posts",
    icon: Video,
    color: "text-yellow-400",
  },
];
      return (
        <>
  <div className="space-y-10">

    {/* HERO */}

<section className="relative overflow-hidden rounded-[34px] border border-yellow-500/15 bg-gradient-to-br from-[#141414] via-[#0d0d0d] to-black p-10">

  <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-yellow-500/10 blur-[150px]" />

  <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-amber-500/10 blur-[180px]" />

  <div className="relative flex flex-col xl:flex-row xl:justify-between gap-10">

    <div className="max-w-3xl">

      <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-400">

        <CheckCircle2 size={15} />

{
  creatorStatus === "approved"
    ? "Verified Creator"
    : creatorStatus === "pending"
    ? "Pending Approval"
    : creatorStatus === "rejected"
    ? "Application Rejected"
    : "Creator Account"
}
      </div>

      <h1 className="mt-7 text-6xl font-black leading-none tracking-tight">
        Welcome Back,
        <br />

        <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
          {user?.creatorVerification?.stageName ||
            user?.name}
        </span>
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        Welcome to your creator dashboard. Manage your premium
        content, subscribers, livestreams and earnings from one place.
      </p>

    </div>

    <div className="grid w-full max-w-md grid-cols-2 gap-5">

      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

        <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
          Subscribers
        </p>

        <h2 className="mt-3 text-4xl font-black text-yellow-400">
          {activeSubscribers.length}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Active Members
        </p>

      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

        <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
          Revenue
        </p>

        <h2 className="mt-3 text-4xl font-black text-emerald-400">
          ${totalRevenue.toLocaleString()}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Subscription Revenue
        </p>

      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

        <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
          Content
        </p>

        <h2 className="mt-3 text-4xl font-black text-sky-400">
          {content.length}
        </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Uploaded Posts
        </p>

      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl">

        <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
          Status
        </p>

        <h2 className="mt-3 text-xl font-black text-pink-400">
{
  creatorStatus === "approved"
    ? "Verified"
    : creatorStatus === "pending"
    ? "Pending Review"
    : creatorStatus === "rejected"
    ? "Rejected"
    : "Not Submitted"
}     </h2>

        <p className="mt-2 text-sm text-zinc-500">
          Creator Verification
        </p>

      </div>

    </div>

  </div>

</section>



    {/* QUICK ACTIONS */}

    <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">

  {[
    {
      icon: Video,
      title: "Upload",
      sub: `${content.length} Posts`,
      onClick: () => push("/dashboard/content"),
    },
    {
      icon: Activity,
      title: "Go Live",
      sub: "Start Live Session",
      onClick: () => push("/dashboard/live"),
    },
    {
      icon: Users,
      title: "Subscribers",
      sub: `${activeSubscribers.length} Active`,
      onClick: () => push("/dashboard/subscribers"),
    },
    {
      icon: DollarSign,
      title: "Withdraw",
      sub: `$${totalRevenue.toLocaleString()} Available`,
      onClick: () => push("/dashboard/payouts"),
    },
  ].map((item) => {

    const Icon = item.icon;

    return (

      <button
        key={item.title}
        onClick={item.onClick}
        className="group rounded-3xl border border-white/5 bg-zinc-900/80 p-7 text-left transition-all duration-300 hover:-translate-y-2 hover:border-yellow-500/40 hover:bg-zinc-800"
      >

        <div className="flex justify-between">

          <div>

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 group-hover:bg-yellow-500/20 transition">

              <Icon
                className="text-yellow-400"
                size={28}
              />

            </div>

            <h3 className="text-xl font-black">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              {item.sub}
            </p>

          </div>

        </div>

      </button>

    );

  })}

</section>



    {/* LUXURY STATS */}

   <section className="grid lg:grid-cols-3 gap-6">

  {stats.map((stat) => {

    const Icon = stat.icon;

    return (

      <div
        key={stat.title}
        className="relative overflow-hidden rounded-[32px] border border-white/5 bg-gradient-to-br from-zinc-900 via-[#111111] to-black p-8 hover:border-yellow-500/30 transition-all duration-300"
      >

        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-yellow-500/10 blur-[110px]" />

        <div className="relative">

          <div className="flex justify-between items-start">

            <div>

              <p className="text-[11px] uppercase tracking-[.35em] text-zinc-500 font-bold">
                {stat.title}
              </p>

              <h2 className="mt-5 text-5xl font-black">
                {stat.value}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/10">

              <Icon
                className={stat.color}
                size={28}
              />

            </div>

          </div>

          <div className="mt-8 flex items-center gap-3">

            <TrendingUp
              size={16}
              className="text-emerald-400"
            />

            <span className="font-bold text-emerald-400">
              {stat.change}
            </span>

          </div>

          <p className="mt-2 text-sm text-zinc-500">
            {stat.subtitle}
          </p>

        </div>

      </div>

    );

  })}

</section>



    {/* REVENUE */}

   <section className="rounded-[34px] border border-white/5 bg-zinc-900 p-8">

  <div className="flex items-center justify-between mb-10">

    <div>

      <h2 className="text-2xl font-black">
        Revenue Performance
      </h2>

      <p className="text-zinc-500 mt-2">
        Subscription earnings overview
      </p>

    </div>

    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">
      <DollarSign
        className="text-yellow-400"
        size={28}
      />
    </div>

  </div>

  <div className="grid lg:grid-cols-3 gap-6 mb-10">

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      <p className="text-xs uppercase tracking-[.3em] text-zinc-500">
        Total Revenue
      </p>

      <h2 className="mt-4 text-5xl font-black text-yellow-400">
        ${totalRevenue.toLocaleString()}
      </h2>

    </div>

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      <p className="text-xs uppercase tracking-[.3em] text-zinc-500">
        Active Subscribers
      </p>

      <h2 className="mt-4 text-5xl font-black">
        {activeSubscribers.length}
      </h2>

    </div>

    <div className="rounded-3xl bg-black/30 border border-white/5 p-6">

      <p className="text-xs uppercase tracking-[.3em] text-zinc-500">
        Average Revenue / Fan
      </p>

      <h2 className="mt-4 text-5xl font-black text-emerald-400">
        $
        {activeSubscribers.length
          ? (
              totalRevenue /
              activeSubscribers.length
            ).toFixed(2)
          : "0.00"}
      </h2>

    </div>

  </div>

  <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-12 text-center">

    <DollarSign
      className="mx-auto mb-5 text-yellow-500"
      size={42}
    />

    <h3 className="text-2xl font-black">
      Revenue Analytics Coming Soon
    </h3>

    <p className="mt-3 max-w-xl mx-auto text-zinc-500 leading-7">
      As your platform grows, detailed revenue charts,
      daily earnings, monthly trends, payouts and financial
      analytics will appear here automatically.
    </p>

  </div>

</section>

     {/* MAIN GRID */}

<div className="grid xl:grid-cols-3 gap-8">

  {/* LEFT */}

  <div className="xl:col-span-2 space-y-8">

    {/* RECENT ACTIVITY */}

    <section className="rounded-[32px] border border-white/5 bg-zinc-900 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-black">
            Recent Activity
          </h2>

          <p className="text-zinc-500 mt-2">
            Latest events happening on your account.
          </p>

        </div>

        <Activity
          className="text-yellow-400"
          size={26}
        />

      </div>

      <div className="space-y-5">

        {recentActivity.length ? (
  recentActivity.map((item) => (
    <div
      key={item.id}
      className="flex items-center justify-between border-b border-white/5 pb-5 last:border-0"
    >
      <div className="flex items-center gap-5">

        <div
          className={`h-4 w-4 rounded-full ${item.color}`}
        />

        <div>
          <h3 className="font-bold">
            {item.title}
          </h3>

          <p className="text-zinc-500 text-sm">
            {item.subtitle}
          </p>
        </div>

      </div>

      <span className="text-xs text-zinc-500">
        {item.time}
      </span>
    </div>
  ))
) : (
  <p className="text-zinc-500 text-center py-10">
    No recent activity.
  </p>
)}

      </div>

    </section>



    {/* TOP CONTENT */}

    <section className="rounded-[32px] border border-white/5 bg-zinc-900 p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-black">
            Top Performing Content
          </h2>

          <p className="text-zinc-500 mt-2">
            Your best premium releases.
          </p>

        </div>

        <Video
          className="text-yellow-400"
          size={26}
        />

      </div>

      <div className="space-y-5">

        {content.length ? (
  content.slice(0, 5).map((video) => (
    <div
      key={video._id}
      className="flex justify-between items-center rounded-2xl bg-black/40 p-5"
    >

      <div>

        <h3 className="font-bold">
          {video.title}
        </h3>

        <p className="text-zinc-500 text-sm mt-1">
          {video.protection?.premium
            ? "Premium"
            : "Free"}
        </p>

      </div>

      <span className="text-yellow-400 font-bold capitalize">
        {video.status || "Published"}
      </span>

    </div>
  ))
) : (
  <div className="py-12 text-center text-zinc-500">
    No content uploaded yet.
  </div>
)}

      </div>

    </section>

  </div>



  {/* RIGHT */}

  <div className="space-y-8">

    {/* ACCOUNT */}

    <section className="rounded-[32px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-8">

      <div className="flex items-center gap-3">

        <CheckCircle2
          className="text-yellow-400"
          size={26}
        />

        <div>

          <h3 className="font-black">

            Creator Status

          </h3>

          <p className="text-yellow-400 text-sm">

{
  creatorStatus === "approved"
    ? "VERIFIED"
    : creatorStatus === "pending"
    ? "PENDING REVIEW"
    : creatorStatus === "rejected"
    ? "APPLICATION REJECTED"
    : "NOT SUBMITTED"
}
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Profile
          </span>

          <span>{user?.profileCompleted ? "100%" : "70%"}</span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Uploads
          </span>

          <span>{content.length}</span>

        </div>

        <div className="flex justify-between">

          <span className="text-zinc-500">
            Subscribers
          </span>

          <span>{activeSubscribers.length}</span>

        </div>

      </div>

    </section>



    {/* GROWTH */}

   <section className="rounded-[32px] border border-white/5 bg-zinc-900 p-8">

  <h2 className="font-black text-xl mb-8">
    Audience Summary
  </h2>

  <div className="space-y-6">

    <div className="flex justify-between">

      <span className="text-zinc-500">
        Total Subscribers
      </span>

      <span className="font-bold">
        {activeSubscribers.length}
      </span>

    </div>

    <div className="flex justify-between">

      <span className="text-zinc-500">
        Uploaded Content
      </span>

      <span className="font-bold">
        {content.length}
      </span>

    </div>

    <div className="flex justify-between">

      <span className="text-zinc-500">
        Premium Posts
      </span>

      <span className="font-bold">
        {
          content.filter(
            c => c.protection?.premium
          ).length
        }
      </span>

    </div>

  </div>

</section>



    {/* QUICK INSIGHT */}

    <section className="rounded-[32px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 p-8">

      <h2 className="font-black text-xl mb-4">

        Insight

      </h2>

      <p className="leading-8 text-zinc-400">

You currently have

<span className="font-bold text-yellow-400">
{" "}
{activeSubscribers.length}
{" "}
</span>

active subscribers and

<span className="font-bold text-yellow-400">
{" "}
{content.length}
{" "}
</span>

published content.

{content.length === 0 &&
" Upload your first premium post to begin attracting subscribers."}

{content.length > 0 &&
activeSubscribers.length === 0 &&
" Share your creator page to begin building your audience."}

{content.length > 0 &&
activeSubscribers.length > 0 &&
" Keep publishing consistently to maintain subscriber growth."}

</p>
    </section>

  </div>

</div>
      </div>
    </>
  );
}