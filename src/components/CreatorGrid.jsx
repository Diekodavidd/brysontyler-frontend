import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Flame,
  Crown,
  Sparkles,
  Radio,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "@/compat/navigation";

import CreatorCard from "./CreatorCard";
import CreatorProfileModal from "./modals/CreatorModal";
import { creators } from "../lib/data";

export default function CreatorGrid() {
  const [search, setSearch] = useState("");
  const [creator, setCreator] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { push } = useRouter();

  const filteredCreators = creators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
<section
  id="creators"
className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_55%)]" />

      <div className="absolute -left-44 top-32 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-[170px]" />

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black uppercase tracking-[0.28em]">
            <Flame size={14} />
            FEATURED
          </span>

          <h2 className="
mt-6
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
xl:text-[4.5rem]
font-black
leading-[0.95]
">
            Meet Our

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Top Creators
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-zinc-400 text-base
sm:text-lg
leading-7
px-2">
            Discover premium creators, exclusive videos, livestreams and
            private experiences loved by thousands of fans worldwide.
          </p>
        </motion.div>

        {/* Category Pills */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <button className="px-4 py-2.5 rounded-full bg-yellow-400 text-black font-black flex items-center gap-2">
            <Flame size={16} />
            Trending
          </button>

          <button className="px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-yellow-500/10
hover:shadow-[0_0_30px_rgba(250,204,21,.15)]
transition-all
duration-300 flex items-center gap-2">
            <Crown size={16} />
            VIP
          </button>

          <button className="px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-yellow-500/10
hover:shadow-[0_0_30px_rgba(250,204,21,.15)]
transition-all
duration-300 flex items-center gap-2">
            <Radio size={16} />
            Live
          </button>

          <button className="px-4 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-yellow-500/10
hover:shadow-[0_0_30px_rgba(250,204,21,.15)]
transition-all
duration-300 flex items-center gap-2">
            <Sparkles size={16} />
            New
          </button>
        </motion.div>

        {/* Featured Banner */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[35px] overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 via-black to-black backdrop-blur-xl p-6  md:p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div>
              <span className="text-yellow-400 uppercase tracking-[0.35em] text-xs font-black">
                Creator Spotlight
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                New Exclusive Content Every Week
              </h3>

              <p className="mt-4 text-zinc-400 max-w-xl">
                Unlock premium videos, live sessions, direct messaging and
                behind-the-scenes content from our hottest creators.
              </p>
            </div>

            <button className="px-7 md:px-8 py-3.5 rounded-2xl bg-yellow-400 text-black font-black hover:scale-105 transition-all flex items-center gap-3">
              Explore
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

               {/* Search */}

        <div className="mt-12 flex flex-col lg:flex-row gap-5 justify-between">
          <div className="relative w-full lg:w-[420px]">
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creators..."
              className="w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl pl-14 pr-5 py-3.5 focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <button
            onClick={() => push("/creators")}
            className="px-10 py-5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black hover:scale-105 transition-all"
          >
            Explore All Creators
          </button>
        </div>

        {/* Grid */}

        <motion.div
          layout
          className="grid grid-cols-1
sm:grid-cols-2
xl:grid-cols-4
gap-5
lg:gap-6 gap-8 mt-16"
        >
          {filteredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              layout
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.5,
              }}
            >
              <CreatorCard
                {...creator}
                onClick={() => {
                  setCreator(creator);
                  setIsOpen(true);
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}

        {filteredCreators.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-20"
          >
            <div className="max-w-xl mx-auto rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 sm:p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto">
                <Search
                  className="text-yellow-400"
                  size={34}
                />
              </div>

              <h3 className="text-2xl sm:text-3xl font-black mt-8">
                No Creator Found
              </h3>

              <p className="mt-4 text-zinc-400 leading-7">
                We couldn't find any creators matching your search.
                Try another keyword.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-8 px-8 py-4 rounded-2xl bg-yellow-400 text-black font-black"
              >
                Show All Creators
              </button>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}

        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-yellow-500/20 bg-gradient-to-r from-[#0b0b0b] via-[#111111] to-[#090909] p-12">
            <div className="absolute -top-24 right-0 w-72 h-72 bg-yellow-500/10 blur-[120px]" />

            <div className="relative z-10 text-center">
              <span className="inline-flex px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs uppercase tracking-[0.35em] font-black">
                JOIN THE COMMUNITY
              </span>

              <h2 className="mt-6 text-5xl font-black leading-tight">
                Ready For An

                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
                  Exclusive Experience?
                </span>
              </h2>

              <p className="max-w-2xl mx-auto mt-6 text-zinc-400 leading-8">
                Subscribe today to unlock premium creators,
                exclusive livestreams, private chats and
                members-only content updated every week.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
                <button  className="px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black hover:scale-105 transition-all">
                  Start Free Trial
                </button>

                <button
                  onClick={() => push("/creators")}
                  className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400 transition-all"
                >
                  Browse Creators
                </button>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>

      <CreatorProfileModal
        isOpen={isOpen}
        creator={creator}
        onClose={() => {
          setIsOpen(false);
          setCreator(null);
        }}
        onSubscribe={() => {}}
      />
    </section>
  );
}