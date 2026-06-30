import { motion } from "framer-motion";
import { Flame, TrendingUp, Crown, Sparkles } from "lucide-react";

const trendingItems = [
  {
    title: "Trending Creators",
    subtitle: "Most subscribed this week",
    icon: <Flame size={22} />,
    color: "from-red-500 to-orange-500",
  },
  {
    title: "New Releases",
    subtitle: "Fresh premium content daily",
    icon: <Sparkles size={22} />,
    color: "from-yellow-400 to-amber-500",
  },
  {
    title: "Top Rated",
    subtitle: "Highest fan ratings",
    icon: <Crown size={22} />,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Live Right Now",
    subtitle: "Exclusive live experiences",
    icon: <TrendingUp size={22} />,
    color: "from-green-500 to-emerald-500",
  },
];

export default function TrendingSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.08),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 uppercase tracking-[0.4em] text-xs font-black">
            Discover
          </span>

          <h2 className="mt-4 text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl font-black">
            Trending <span className="text-yellow-400">Today</span>
          </h2>

          <p className="text-zinc-400 mt-5 max-w-2xl mx-auto text-lg">
            Explore the hottest creators and exclusive experiences fans
            are loving right now.
          </p>
        </motion.div>

        <div className="grid
grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
lg:gap-6">
          {trendingItems.map((item, index) => (
<motion.div
    role="button"
    tabIndex={0}              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8"
            >
              <div
                className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.color}`}
              />

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}
              >
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-zinc-400">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}