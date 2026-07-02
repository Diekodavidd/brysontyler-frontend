import {
  Radio,
  CalendarDays,
  Clock3,
  Globe,
  Users,
  Lock,
  DollarSign,
  Tag,
  Eye,
  Gift,
  Wallet,
  CheckCircle2,
} from "lucide-react";

export default function StreamInfo({ stream }) {
  if (!stream) return null;

  const visibility = {
    public: {
      label: "Public",
      icon: Globe,
      color: "text-green-400",
    },
    subscribers: {
      label: "Subscribers Only",
      icon: Users,
      color: "text-blue-400",
    },
    ppv: {
      label: "Pay Per View",
      icon: DollarSign,
      color: "text-yellow-400",
    },
    members: {
      label: "Members Only",
      icon: Lock,
      color: "text-purple-400",
    },
  };

  const status = {
    live: "bg-red-500/10 text-red-400",
    scheduled:
      "bg-yellow-500/10 text-yellow-400",
    completed:
      "bg-green-500/10 text-green-400",
    ended:
      "bg-zinc-600/20 text-zinc-300",
  };

  const access =
    visibility[stream.visibility] ||
    visibility.public;

  const AccessIcon = access.icon;

  return (
    <div className="rounded-[34px] bg-zinc-900 border border-white/5 overflow-hidden">

      {/* Header */}

      <div className="p-8 border-b border-white/5">

        <div className="flex justify-between items-start">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-red-500 font-black flex items-center gap-2">

              <Radio size={14} />

              Stream Details

            </p>

            <h2 className="text-4xl font-black mt-4">

              {stream.title}

            </h2>

            <p className="text-zinc-500 mt-4 leading-7">

              {stream.description ||
                "No description provided."}

            </p>

          </div>

          <span
            className={`px-5 py-3 rounded-full text-xs font-black uppercase ${
              status[stream.status] ||
              status.ended
            }`}
          >
            {stream.status}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-8 grid lg:grid-cols-2 gap-6">

        <InfoCard
          icon={<CalendarDays />}
          title="Date"
          value={
            stream.date
              ? new Date(
                  stream.date
                ).toLocaleDateString()
              : "--"
          }
        />

        <InfoCard
          icon={<Clock3 />}
          title="Time"
          value={stream.time || "--"}
        />

        <InfoCard
          icon={<AccessIcon />}
          title="Visibility"
          value={access.label}
          color={access.color}
        />

        <InfoCard
          icon={<DollarSign />}
          title="Entry Price"
          value={`$${stream.price || 0}`}
        />

        <InfoCard
          icon={<Eye />}
          title="Total Viewers"
          value={
            (
              stream.totalViewers || 0
            ).toLocaleString()
          }
        />

        <InfoCard
          icon={<Users />}
          title="Subscribers Watching"
          value={
            (
              stream.subscriberViewers ||
              0
            ).toLocaleString()
          }
        />

        <InfoCard
          icon={<Gift />}
          title="Tips"
          value={`$${stream.tips || 0}`}
        />

        <InfoCard
          icon={<Wallet />}
          title="Revenue"
          value={`$${stream.earnings || 0}`}
        />

      </div>

      {/* Tags */}

      {stream.tags?.length > 0 && (

        <div className="px-8 pb-8">

          <h3 className="font-black text-xl mb-5 flex items-center gap-2">

            <Tag
              size={20}
              className="text-yellow-400"
            />

            Tags

          </h3>

          <div className="flex flex-wrap gap-3">

            {stream.tags.map((tag) => (

              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-black border border-white/5 text-sm font-semibold"
              >
                #{tag}
              </span>

            ))}

          </div>

        </div>

      )}

      {/* Footer */}

      <div className="border-t border-white/5 p-8 flex justify-between items-center">

        <div className="flex items-center gap-3 text-green-400">

          <CheckCircle2 size={18} />

          <span className="font-bold">

            Stream configuration saved

          </span>

        </div>

        <span className="text-zinc-500 text-sm">

          Last updated{" "}
          {stream.updatedAt
            ? new Date(
                stream.updatedAt
              ).toLocaleString()
            : "--"}

        </span>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
  color = "text-white",
}) {
  return (
    <div className="rounded-3xl bg-black border border-white/5 p-6">

      <div className="flex items-center gap-3 text-zinc-400">

        {icon}

        <span className="uppercase tracking-widest text-xs font-bold">

          {title}

        </span>

      </div>

      <h3
        className={`text-2xl font-black mt-5 ${color}`}
      >
        {value}
      </h3>

    </div>
  );
}