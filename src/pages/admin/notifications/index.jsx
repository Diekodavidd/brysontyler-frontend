import { useMemo, useState } from "react";
import {
  Bell,
  UserPlus,
  ShieldCheck,
  Crown,
  Wallet,
  Upload,
  Search,
  CheckCheck,
  CreditCard,
} from "lucide-react";

import { useAdminStats } from "@/hooks/useAdmin";

export default function AdminNotificationsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
  } = useAdminStats();

  const notifications = data?.notifications || [];

  // =========================================
  // FILTER + SEARCH
  // =========================================

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesFilter =
        filter === "all" ||
        notification.type === filter;

      const searchText = search.toLowerCase();

      const matchesSearch =
        notification.title
          ?.toLowerCase()
          .includes(searchText) ||
        notification.message
          ?.toLowerCase()
          .includes(searchText) ||
        notification.userName
          ?.toLowerCase()
          .includes(searchText);

      return matchesFilter && matchesSearch;
    });
  }, [
    notifications,
    filter,
    search,
  ]);


  // =========================================
  // ICONS
  // =========================================

  const iconMap = {
    signup: UserPlus,
    creator: ShieldCheck,
    membership: Crown,
    subscription: CreditCard,
    gallery: Upload,
  };


  // =========================================
  // COLORS
  // =========================================

  const colorMap = {
    signup:
      "text-blue-400 bg-blue-500/10",

    creator:
      "text-green-400 bg-green-500/10",

    membership:
      "text-yellow-400 bg-yellow-500/10",

    subscription:
      "text-purple-400 bg-purple-500/10",

    gallery:
      "text-pink-400 bg-pink-500/10",
  };


  // =========================================
  // LOADING
  // =========================================

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        <div className="animate-pulse text-zinc-500">
          Loading notifications...
        </div>
      </div>
    );
  }


  // =========================================
  // ERROR
  // =========================================

  if (isError) {
    return (
      <div className="py-40 text-center">
        <p className="text-red-400">
          Failed to load notifications.
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-8">


      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="
        flex
        flex-col
        lg:flex-row
        lg:items-end
        lg:justify-between
        gap-6
      ">

        <div>

          <p className="
            uppercase
            tracking-[.3em]
            text-xs
            text-amber-500
            font-black
          ">
            Admin
          </p>

          <h1 className="
            text-3xl
            sm:text-4xl
            font-black
            mt-3
          ">
            Notifications
          </h1>

          <p className="
            text-zinc-500
            mt-3
          ">
            Monitor everything happening across Bryson Tyler.
          </p>

        </div>


        <button
          className="
            rounded-2xl
            bg-amber-500
            px-6
            py-3
            text-black
            font-black
            hover:bg-amber-400
            transition
            flex
            items-center
            justify-center
            gap-2
          "
        >

          <CheckCheck size={18} />

          Mark All Read

        </button>

      </div>


      {/* ================================= */}
      {/* SEARCH + FILTERS */}
      {/* ================================= */}

      <div className="
        flex
        flex-col
        xl:flex-row
        xl:items-center
        xl:justify-between
        gap-5
      ">


        {/* SEARCH */}

        <div className="
          relative
          w-full
          xl:max-w-md
        ">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-zinc-500
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search notifications..."
            className="
              w-full
              rounded-2xl
              border
              border-white/5
              bg-[#090909]
              py-3
              pl-12
              pr-5
              outline-none
              text-white
              placeholder:text-zinc-600
              focus:border-amber-500
            "
          />

        </div>


        {/* FILTERS */}

        <div className="
          flex
          flex-wrap
          gap-2
        ">

          {[
            "all",
            "signup",
            "creator",
            "membership",
            "subscription",
            "gallery",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`
                rounded-xl
                px-4
                py-2
                text-sm
                font-bold
                capitalize
                transition
                ${
                  filter === item
                    ? "bg-amber-500 text-black"
                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                }
              `}
            >

              {item === "gallery"
                ? "Content"
                : item}

            </button>

          ))}

        </div>

      </div>


      {/* ================================= */}
      {/* COUNT */}
      {/* ================================= */}

      <div className="
        flex
        items-center
        justify-between
        text-sm
        text-zinc-500
      ">

        <span>
          Showing{" "}
          <strong className="text-white">
            {filteredNotifications.length}
          </strong>{" "}
          notifications
        </span>

      </div>


      {/* ================================= */}
      {/* NOTIFICATIONS */}
      {/* ================================= */}

      <div className="space-y-4">

        {filteredNotifications.length === 0 ? (

          <div className="
            rounded-3xl
            border
            border-white/5
            bg-[#080808]
            p-16
            text-center
          ">

            <Bell
              size={40}
              className="
                mx-auto
                text-zinc-700
                mb-5
              "
            />

            <h3 className="
              text-lg
              font-black
            ">
              No notifications found
            </h3>

            <p className="
              text-zinc-600
              mt-2
            ">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          filteredNotifications.map(
            (notification) => {

              const Icon =
                iconMap[
                  notification.type
                ] || Bell;

              const colors =
                colorMap[
                  notification.type
                ] ||
                "text-zinc-400 bg-zinc-500/10";

              return (

                <div
                  key={notification.id}
                  className={`
                    rounded-3xl
                    border
                    p-5
                    sm:p-6
                    transition
                    hover:border-amber-500/30
                    ${
                      notification.unread
                        ? "border-amber-500/20 bg-amber-500/5"
                        : "border-white/5 bg-[#080808]"
                    }
                  `}
                >

                  <div className="
                    flex
                    items-start
                    gap-4
                  ">


                    {/* ICON */}

                    <div
                      className={`
                        w-12
                        h-12
                        sm:w-14
                        sm:h-14
                        shrink-0
                        rounded-2xl
                        flex
                        items-center
                        justify-center
                        ${colors}
                      `}
                    >

                      <Icon size={22} />

                    </div>


                    {/* CONTENT */}

                    <div className="
                      min-w-0
                      flex-1
                    ">

                      <div className="
                        flex
                        flex-wrap
                        items-center
                        gap-3
                      ">

                        <h3 className="
                          text-base
                          sm:text-lg
                          font-black
                        ">
                          {notification.title}
                        </h3>

                        {notification.unread && (

                          <span className="
                            px-3
                            py-1
                            rounded-full
                            bg-amber-500
                            text-black
                            text-[9px]
                            font-black
                            uppercase
                          ">
                            New
                          </span>

                        )}

                      </div>


                      <p className="
                        text-zinc-400
                        mt-2
                        leading-6
                      ">
                        {notification.message}
                      </p>


                      {/* EXTRA INFO */}

                      {notification.amount > 0 && (

                        <p className="
                          text-emerald-400
                          font-bold
                          mt-2
                        ">
                          Amount: $
                          {notification.amount}
                        </p>

                      )}


                      <p className="
                        text-xs
                        text-zinc-600
                        mt-4
                      ">

                        {notification.createdAt
                          ? new Date(
                              notification.createdAt
                            ).toLocaleString()
                          : "Recently"}

                      </p>

                    </div>


                    {/* ACTION */}

                    <button
                      className="
                        shrink-0
                        text-zinc-600
                        hover:text-white
                        transition
                      "
                    >

                      <Bell size={18} />

                    </button>

                  </div>

                </div>

              );

            }
          )

        )}

      </div>

    </div>
  );
}