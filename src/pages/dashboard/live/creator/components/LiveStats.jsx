import {
  DollarSign,
  Users,
  Eye,
  Gift,
} from "lucide-react";

export default function LiveStats({ stats }) {
  const cards = [
    {
      title: "Today's Earnings",
      value: `$${stats?.earnings || 0}`,
      icon: <DollarSign size={28} />,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Viewers",
      value: (stats?.viewers || 0).toLocaleString(),
      icon: <Eye size={28} />,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Subscribers Watching",
      value: (stats?.subscribers || 0).toLocaleString(),
      icon: <Users size={28} />,
      color: "text-sky-400",
      bg: "bg-sky-500/10",
    },
    {
      title: "Tips Received",
      value: `$${stats?.tips || 0}`,
      icon: <Gift size={28} />,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[30px] border border-white/5 bg-zinc-900 p-7 hover:border-yellow-500/30 transition-all"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500 font-bold">
                {card.title}
              </p>

              <h2 className="text-4xl font-black mt-5">
                {card.value}
              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
}