export default function StatsCards({ cards = [] }) {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-[28px] bg-zinc-900 border border-white/5 p-7 hover:border-yellow-500/20 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-bold">
                {card.title}
              </p>

              <h2 className="text-4xl font-black mt-5">
                {card.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-2xl bg-black flex items-center justify-center ${card.color}`}
            >
              {card.icon}
            </div>
          </div>

          {card.subtitle && (
            <p className="text-sm text-zinc-500 mt-6">
              {card.subtitle}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}