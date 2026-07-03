import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({
  search,
  setSearch,
  onFilter,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
    >
      {/* Heading */}

      <div>

        <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

          Discover

        </p>

        <h2 className="text-4xl font-black mt-3">

          Browse the Gallery

        </h2>

        <p className="text-zinc-500 mt-3 max-w-xl leading-7">

          Search exclusive Bryson Tyler
          Originals, lifestyle films,
          documentaries, interviews and
          premium collections.

        </p>

      </div>

      {/* Search */}

      <div className="flex items-center gap-4 w-full lg:w-auto">

        <div className="relative flex-1 lg:w-[420px]">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search videos..."
            className="w-full rounded-2xl bg-zinc-900 border border-white/5 pl-14 pr-14 py-4 outline-none focus:border-yellow-500 transition"
          />

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
              className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X size={18} />
            </button>
          )}

        </div>

        <button
          onClick={onFilter}
          className="h-[58px] px-6 rounded-2xl bg-zinc-900 border border-white/5 hover:border-yellow-500 hover:bg-zinc-800 transition flex items-center gap-3 font-bold"
        >
          <SlidersHorizontal size={18} />

          Filters

        </button>

      </div>

    </motion.div>
  );
}