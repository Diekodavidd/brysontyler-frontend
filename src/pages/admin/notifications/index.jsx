import { useState } from "react";
import {
  Bell,
  UserPlus,
  ShieldCheck,
  Crown,
  Wallet,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  CheckCheck,
} from "lucide-react";

export default function AdminNotificationsPage() {
  const [filter, setFilter] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "signup",
      title: "New Fan Registered",
      message: "Samuel David created a Fan account.",
      time: "2 mins ago",
      unread: true,
    },
    {
      id: 2,
      type: "creator",
      title: "Creator Verification Submitted",
      message: "Jessica Adams submitted creator verification.",
      time: "12 mins ago",
      unread: true,
    },
    {
      id: 3,
      type: "membership",
      title: "Elite Membership Purchased",
      message: "Michael upgraded to Elite Membership.",
      time: "35 mins ago",
      unread: false,
    },
    {
      id: 4,
      type: "gallery",
      title: "Brand Gallery Upload",
      message: "A new vlog has been uploaded successfully.",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 5,
      type: "payout",
      title: "Payout Request",
      message: "Jordan Cole requested a payout of $1,250.",
      time: "3 hours ago",
      unread: true,
    },
    {
      id: 6,
      type: "security",
      title: "Security Alert",
      message: "5 failed admin login attempts detected.",
      time: "Yesterday",
      unread: false,
    },
  ];

  const filtered =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const iconMap = {
    signup: UserPlus,
    creator: ShieldCheck,
    membership: Crown,
    payout: Wallet,
    gallery: Upload,
    security: AlertTriangle,
  };

  const colorMap = {
    signup: "text-blue-400 bg-blue-500/10",
    creator: "text-green-400 bg-green-500/10",
    membership: "text-yellow-400 bg-yellow-500/10",
    payout: "text-red-400 bg-red-500/10",
    gallery: "text-purple-400 bg-purple-500/10",
    security: "text-orange-400 bg-orange-500/10",
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-end">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-amber-500 font-black">
            Admin
          </p>

          <h1 className="text-4xl font-black mt-3">
            Notifications
          </h1>

          <p className="text-zinc-500 mt-3">
            Monitor everything happening across Bryson Tyler.
          </p>

        </div>

        <button className="rounded-2xl bg-amber-500 px-6 py-3 text-black font-black hover:bg-amber-400 transition flex items-center gap-2">

          <CheckCheck size={18} />

          Mark All Read

        </button>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap justify-between gap-4">

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            placeholder="Search notifications..."
            className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-5 outline-none focus:border-amber-500"
          />

        </div>

        <div className="flex flex-wrap gap-3">

          {[
            "all",
            "signup",
            "creator",
            "membership",
            "gallery",
            "payout",
            "security",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-xl px-5 py-2 text-sm font-bold capitalize transition ${
                filter === item
                  ? "bg-amber-500 text-black"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {item}

            </button>

          ))}

        </div>

      </div>

      {/* Notification Cards */}

      <div className="space-y-4">

        {filtered.map((notification) => {

          const Icon = iconMap[notification.type];

          return (

            <div
              key={notification.id}
              className={`rounded-3xl border p-6 transition hover:border-amber-500/30 ${
                notification.unread
                  ? "border-amber-500/20 bg-amber-500/5"
                  : "border-white/5 bg-[#080808]"
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-5">

                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      colorMap[notification.type]
                    }`}
                  >

                    <Icon size={24} />

                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="text-lg font-black">
                        {notification.title}
                      </h3>

                      {notification.unread && (
                        <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase">
                          New
                        </span>
                      )}

                    </div>

                    <p className="text-zinc-400 mt-2">
                      {notification.message}
                    </p>

                    <p className="text-xs text-zinc-600 mt-4">
                      {notification.time}
                    </p>

                  </div>

                </div>

                <button className="text-zinc-500 hover:text-white">

                  <Bell size={18} />

                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}