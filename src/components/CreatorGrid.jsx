import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Crown,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { useRouter } from "@/compat/navigation";
import { creators } from "../lib/data";

export default function CreatorGrid() {
  const { push } = useRouter();

  return (
    <section
      id="creators"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_55%)]" />

      <div className="absolute -left-44 top-32 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-[170px]" />

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black uppercase tracking-[0.28em]">

            <Sparkles size={14} />

            Founding Creators

          </span>

          <h2 className="mt-8 text-4xl md:text-6xl xl:text-7xl font-black leading-[0.95]">

            Become One of Our

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">

              Founding Creators

            </span>

          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg leading-8">

            Bryson Tyler is opening its doors to a select number of premium creators.

            Build your audience early, unlock exclusive monetization tools,
            receive priority promotion and become part of our first generation
            of verified creators.

          </p>

        </motion.div>

        {/* Founder Benefits */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-14"
        >

          <div className="px-5 py-3 rounded-full bg-yellow-400 text-black font-black flex items-center gap-2">

            <BadgeCheck size={18} />

            Verified Badge

          </div>

          <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">

            <TrendingUp size={18} />

            Priority Discovery

          </div>

          <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">

            <Crown size={18} />

            Better Revenue

          </div>

          <div className="px-5 py-3 rounded-full border border-white/10 bg-white/5 flex items-center gap-2">

            <ShieldCheck size={18} />

            Founder Benefits

          </div>

        </motion.div>

        {/* Founder Banner */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-[36px] overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-black to-black backdrop-blur-xl p-8 lg:p-12"
        >

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

            <div>

              <span className="uppercase tracking-[0.35em] text-yellow-400 text-xs font-black">

                Founding Creator Program

              </span>

              <h3 className="text-3xl lg:text-5xl font-black mt-4">

                Launch Your Creator Business

              </h3>

              <p className="mt-5 text-zinc-400 max-w-2xl leading-8">

                Receive early verification, homepage exposure,
                creator support, premium monetization tools,
                livestream access and exclusive founder rewards.

              </p>

            </div>

            <button
              onClick={() => push("/signup?role=creator")}
              className="px-10 py-5 rounded-2xl bg-yellow-400 text-black font-black hover:scale-105 transition flex items-center gap-3"
            >

              Become a Creator

              <ArrowRight size={18} />

            </button>

          </div>

        </motion.div>

        {/* Founder Cards */}

          {[
            {
              icon: <BadgeCheck size={34} />,
              title: "Verified Creator",
              description:
                "Receive an exclusive verified badge, premium profile and priority trust across the platform.",
            },
            {
              icon: <TrendingUp size={34} />,
              title: "Grow Faster",
              description:
                "Be featured across Bryson Tyler, gain early visibility and grow your audience before everyone else.",
            },
            {
              icon: <Crown size={34} />,
              title: "Earn More",
              description:
                "Subscriptions, PPV, livestream tickets, tips, exclusive memberships and premium content sales.",
            },
            {
              icon: <ShieldCheck size={34} />,
              title: "Founder Rewards",
              description:
                "Limited founder perks, direct support, early feature access and exclusive creator opportunities.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="group rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-yellow-500/40 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="relative p-8">

                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 blur-[90px]" />

                <div className="relative z-10">

                  <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">

                    {item.icon}

                  </div>

                  <h3 className="mt-8 text-2xl font-black">

                    {item.title}

                  </h3>

                  <p className="mt-5 text-zinc-400 leading-8">

                    {item.description}

                  </p>

                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >

          <div className="relative overflow-hidden rounded-[38px] border border-yellow-500/20 bg-gradient-to-r from-[#0b0b0b] via-[#111111] to-[#090909] p-12 lg:p-16">

            <div className="absolute -top-24 right-0 w-72 h-72 bg-yellow-500/10 blur-[120px]" />

            <div className="relative z-10 text-center">

              <span className="inline-flex px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs uppercase tracking-[0.35em] font-black">

                APPLICATIONS OPEN

              </span>

              <h2 className="mt-8 text-4xl lg:text-6xl font-black leading-tight">

                Ready To Build Your

                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 bg-clip-text text-transparent">

                  Premium Creator Brand?

                </span>

              </h2>

              <p className="max-w-3xl mx-auto mt-8 text-zinc-400 leading-8 text-lg">

                Start earning through subscriptions,
                livestreams, pay-per-view experiences,
                exclusive content, private messaging,
                memberships and more.

              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">

                <button
                  onClick={() => push("/signup?role=creator")}
                  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black hover:scale-105 transition-all"
                >
                  Become a Creator
                </button>

                <button
                  onClick={() => push("/onboarding")}
                  className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400 transition-all"
                >
                  Learn More
                </button>

              </div>

            </div>

          </div>

        </motion.div>


    </section>
  );
}
   