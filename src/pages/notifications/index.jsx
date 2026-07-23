import {
  Bell,
  UserPlus,
  ShieldCheck,
  Crown,
  Wallet,
  Upload,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Users,
  XCircle,
  CheckCheck,
} from "lucide-react";

import {
  useNotifications,
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
} from "@/hooks/useNotifications";

import { useAuthStore } from "@/store/useAuthStore";

import { useNavigate } from "react-router-dom";


const iconMap = {
  signup: UserPlus,

  creator_application_submitted: ShieldCheck,
  creator_application_approved: CheckCircle2,
  creator_application_rejected: XCircle,
  creator_content_uploaded: Upload,

  membership_upgraded: Crown,
  membership_expired: AlertTriangle,

  new_subscriber: Users,
  subscription_started: CreditCard,
  subscription_cancelled: XCircle,

  payment_successful: CheckCircle2,
  payment_failed: AlertTriangle,

  system: Bell,
};


const colorMap = {
  signup:
    "text-blue-400 bg-blue-500/10",

  creator_application_submitted:
    "text-yellow-400 bg-yellow-500/10",

  creator_application_approved:
    "text-green-400 bg-green-500/10",

  creator_application_rejected:
    "text-red-400 bg-red-500/10",

  creator_content_uploaded:
    "text-purple-400 bg-purple-500/10",

  membership_upgraded:
    "text-yellow-400 bg-yellow-500/10",

  membership_expired:
    "text-orange-400 bg-orange-500/10",

  new_subscriber:
    "text-green-400 bg-green-500/10",

  subscription_started:
    "text-green-400 bg-green-500/10",

  subscription_cancelled:
    "text-red-400 bg-red-500/10",

  payment_successful:
    "text-green-400 bg-green-500/10",

  payment_failed:
    "text-red-400 bg-red-500/10",

  system:
    "text-zinc-400 bg-zinc-500/10",
};


export default function NotificationsPage() {

  const navigate = useNavigate();

  const user = useAuthStore(
    (state) => state.user
  );

  const {
    data,
    isLoading,
  } = useNotifications();

  const {
    mutate: markAsRead,
  } = useMarkNotificationAsRead();

  const {
    mutate: markAllAsRead,
    isPending: isMarkingAll,
  } = useMarkAllNotificationsAsRead();


  const notifications =
    data?.notifications || [];

  const unreadCount =
    data?.unreadCount || 0;


  const handleNotificationClick = (
    notification
  ) => {

    if (!notification.isRead) {
      markAsRead(notification._id);
    }

    if (notification.link) {
      navigate(notification.link);
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-zinc-500">
        Loading notifications...
      </div>
    );
  }


  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-yellow-500 font-black">
            {user?.role === "creator"
              ? "Creator Studio"
              : "Fan Dashboard"}
          </p>

          <h1 className="text-4xl font-black mt-3">
            Notifications
          </h1>

          <p className="text-zinc-500 mt-3">
            Stay updated with everything happening on your account.
          </p>

        </div>


        {unreadCount > 0 && (

          <button
            onClick={() => markAllAsRead()}
            disabled={isMarkingAll}
            className="rounded-2xl bg-yellow-500 px-6 py-3 text-black font-black hover:bg-yellow-400 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >

            <CheckCheck size={18} />

            {isMarkingAll
              ? "Marking..."
              : "Mark All Read"}

          </button>

        )}

      </div>


      {/* SUMMARY */}

      <div className="grid sm:grid-cols-2 gap-4">

        <div className="rounded-3xl border border-white/5 bg-[#080808] p-6">

          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Total Notifications
          </p>

          <h2 className="text-3xl font-black mt-3">
            {notifications.length}
          </h2>

        </div>


        <div className="rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

          <p className="text-xs uppercase tracking-widest text-yellow-500 font-bold">
            Unread
          </p>

          <h2 className="text-3xl font-black mt-3">
            {unreadCount}
          </h2>

        </div>

      </div>


      {/* NOTIFICATIONS */}

      <div className="space-y-4">

        {notifications.length === 0 ? (

          <div className="rounded-3xl border border-white/5 bg-[#080808] py-20 text-center">

            <Bell
              size={45}
              className="mx-auto text-zinc-700"
            />

            <h2 className="text-xl font-black mt-6">
              No Notifications Yet
            </h2>

            <p className="text-zinc-500 mt-2">
              We'll notify you when something important happens.
            </p>

          </div>

        ) : (

          notifications.map((notification) => {

            const Icon =
              iconMap[notification.type] ||
              Bell;

            const color =
              colorMap[notification.type] ||
              colorMap.system;


            return (

              <button
                key={notification._id}
                onClick={() =>
                  handleNotificationClick(
                    notification
                  )
                }
                className={`w-full text-left rounded-3xl border p-6 transition hover:border-yellow-500/30 ${
                  notification.isRead
                    ? "border-white/5 bg-[#080808]"
                    : "border-yellow-500/20 bg-yellow-500/5"
                }`}
              >

                <div className="flex items-start gap-5">

                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center ${color}`}
                  >

                    <Icon size={24} />

                  </div>


                  <div className="flex-1 min-w-0">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-lg font-black">
                        {notification.title}
                      </h3>

                      {!notification.isRead && (

                        <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase">
                          New
                        </span>

                      )}

                    </div>


                    <p className="text-zinc-400 mt-2">
                      {notification.message}
                    </p>


                    <p className="text-xs text-zinc-600 mt-4">

                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}

                    </p>

                  </div>

                </div>

              </button>

            );

          })

        )}

      </div>

    </div>
  );
}