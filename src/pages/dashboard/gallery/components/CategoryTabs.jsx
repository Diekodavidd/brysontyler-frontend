import { motion } from "framer-motion";
import {
  Grid2x2,
  TrendingUp,
  Sparkles,
  Film,
  Camera,
  Crown,
  Clapperboard,
  Mic2,
} from "lucide-react";

export default function CategoryTabs({
  active,
  onChange,
}) {
  const tabs = [
  { id: "all", label: "All", icon: Grid2x2 },
  { id: "new", label: "New Releases", icon: Sparkles },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "exclusive", label: "Exclusive", icon: Crown },
  { id: "couples", label: "Couples", icon: Film },
  { id: "solo", label: "Solo", icon: Camera },
  { id: "behind-scenes", label: "Behind the Scenes", icon: Clapperboard },
  { id: "interviews", label: "Interviews", icon: Mic2 },
];

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="space-y-5"
    >
      {/* Heading */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

            Browse

          </p>

          <h2 className="text-4xl font-black mt-3">

            Explore the Gallery

          </h2>

        </div>

        <p className="text-zinc-500 max-w-xl leading-7">

          Discover Bryson Tyler Originals,
          exclusive documentaries,
          lifestyle films, interviews,
          behind-the-scenes moments and
          premium collections.

        </p>

      </div>

      {/* Tabs */}

      <div className="overflow-x-auto scrollbar-hide">

        <div className="flex gap-4 min-w-max py-2">

          {tabs.map((tab) => {
            const Icon = tab.icon;

            const selected =
              active === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  onChange(tab.id)
                }
                className={`group rounded-2xl border transition-all duration-300 px-6 py-4 flex items-center gap-3 whitespace-nowrap ${
                  selected
                    ? "bg-yellow-500 text-black border-yellow-500 shadow-lg shadow-yellow-500/20"
                    : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-yellow-500/30 hover:text-white"
                }`}
              >
                <Icon size={18} />

                <span className="font-black">

                  {tab.label}

                </span>
              </button>
            );
          })}

        </div>

      </div>
    </motion.section>
  );
}