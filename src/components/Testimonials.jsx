import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Michael R.",
    username: "@michael",
    image: "https://i.pravatar.cc/300?img=12",
    review:
      "The livestreams are incredible. The quality and interaction are unlike anything I've used before.",
  },
  {
    name: "James K.",
    username: "@james",
    image: "https://i.pravatar.cc/300?img=15",
    review:
      "VIP is worth every dollar. New content drops constantly and private messaging makes it feel personal.",
  },
  {
    name: "Daniel S.",
    username: "@daniel",
    image: "https://i.pravatar.cc/300?img=18",
    review:
      "The entire platform feels premium. Smooth streaming, amazing creators and excellent support.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black tracking-[0.3em] uppercase">
            MEMBER REVIEWS
          </span>

          <h2 className="mt-8 text-5xl lg:text-7xl font-black">
            Loved By

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>

          <p className="mt-6 text-zinc-400 max-w-2xl mx-auto">
            See why members keep coming back every day.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 overflow-hidden"
            >
              <Quote
                size={70}
                className="absolute -right-4 -top-4 text-yellow-500/10"
              />

              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-black text-xl">
                    {item.name}
                  </h3>

                  <p className="text-zinc-500">
                    {item.username}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mt-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 text-zinc-300 leading-8">
                "{item.review}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}