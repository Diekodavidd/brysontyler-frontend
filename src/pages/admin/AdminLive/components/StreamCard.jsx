
import {
  Radio,
  CalendarDays,
  Clock3,
  Eye,
  Users,
  DollarSign,
  Play,
  CheckCircle2,
  Pencil,
  Trash2,
} from "lucide-react";

export default function StreamCard({
  stream,
  onGoLive,
  onDelete,
  onView,
}) {
  const statusStyles = {
    live: "bg-red-500/10 text-red-400 border-red-500/20",
    scheduled:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    completed:
      "bg-green-500/10 text-green-400 border-green-500/20",
    ended:
      "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  };

  const status =
    statusStyles[stream.status] ||
    statusStyles.ended;

  const coverImage =
    stream.thumbnail ||
    stream.creatorId?.profileImage ||
    "/default-live-cover.jpg";

  const displayDate =
    stream.status === "scheduled"
      ? stream.scheduledDate
      : stream.startedAt;

  const displayTime =
    stream.status === "scheduled"
      ? stream.scheduledTime
      : stream.startedAt
        ? new Date(stream.startedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : null;

  return (
    <div className="rounded-[32px] overflow-hidden border border-white/5 bg-zinc-900 hover:border-yellow-500/30 transition">

      {/* Banner */}

      <div className="relative h-60 bg-black">

        {stream.thumbnail ? (
          <img
            src={stream.thumbnail}
            alt={stream.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900/30 via-black to-black">

            <Radio
              size={70}
              className={`${
                stream.status === "live"
                  ? "text-red-500 animate-pulse"
                  : "text-zinc-600"
              }`}
            />

          </div>
        )}

        {/* Status */}

        <div className="absolute top-5 left-5">

          <span
            className={`px-4 py-2 rounded-full border text-xs font-black uppercase tracking-wider ${status}`}
          >
            {stream.status}
          </span>

        </div>

        {/* LIVE */}

        {stream.status === "live" && (

          <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-black">

            <div className="h-2 w-2 rounded-full bg-white animate-ping" />

            LIVE

          </div>

        )}

      </div>

      {/* Body */}

      <div className="p-7 space-y-6">

        <div>

          <h2 className="text-3xl font-black">

            {stream.title}

          </h2>

          <p className="text-zinc-500 mt-3 line-clamp-2">

            {stream.description ||
              "No description provided."}

          </p>

        </div>

        {/* Date */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-black border border-white/5 p-4">

            <div className="flex items-center gap-2 text-yellow-400">

              <CalendarDays size={16} />

              <span className="text-xs uppercase font-bold">

                Date

              </span>

            </div>

            <h3 className="mt-3 font-black">
  {displayDate
    ? new Date(displayDate).toLocaleDateString()
    : "--"}
</h3>

          </div>

          <div className="rounded-2xl bg-black border border-white/5 p-4">

            <div className="flex items-center gap-2 text-sky-400">

              <Clock3 size={16} />

              <span className="text-xs uppercase font-bold">

                Time

              </span>

            </div>

            <h3 className="mt-3 font-black">
  {displayTime || "--"}
</h3>

          </div>

        </div>

        {/* Analytics */}

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-black border border-white/5 p-4">

            <Eye
              size={18}
              className="text-yellow-400"
            />

            <h3 className="text-xl font-black mt-4">

              {stream.totalViewers || 0}

            </h3>

            <p className="text-xs uppercase text-zinc-500 mt-2">

              Views

            </p>

          </div>

          <div className="rounded-2xl bg-black border border-white/5 p-4">

            <Users
              size={18}
              className="text-sky-400"
            />

            <h3 className="text-xl font-black mt-4">

              {stream.subscribers || 0}

            </h3>

            <p className="text-xs uppercase text-zinc-500 mt-2">

              Subs

            </p>

          </div>

          <div className="rounded-2xl bg-black border border-white/5 p-4">

            <DollarSign
              size={18}
              className="text-green-400"
            />

            <h3 className="text-xl font-black mt-4">

              ${stream.earnings || 0}

            </h3>

            <p className="text-xs uppercase text-zinc-500 mt-2">

              Earned

            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="grid grid-cols-4 gap-3">

          <button
            onClick={() =>
              onView?.(stream)
            }
            className="h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
          >
            <Eye size={18} />
          </button>

          

          <button
            onClick={() =>
              onDelete?.(stream)
            }
            className="h-12 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white flex items-center justify-center transition"
          >
            <Trash2 size={18} />
          </button>

          {stream.status === "scheduled" ? (
            <button
              onClick={() =>
                onGoLive?.(stream)
              }
              className="h-12 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center transition"
            >
              <Play size={18} />
            </button>
          ) : (
            <button
              disabled
              className="h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center"
            >
              <CheckCircle2 size={18} />
            </button>
          )}

        </div>

      </div>

    </div>
  );
}