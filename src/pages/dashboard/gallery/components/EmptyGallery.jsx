import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function EmptyGallery({
  title = "Gallery Coming Soon",
  description = "We're preparing a collection of premium Bryson Tyler Originals, exclusive documentaries, lifestyle films and members-only entertainment. Check back soon for fresh releases.",
  onExplore,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="relative overflow-hidden rounded-[40px] border border-white/5 bg-zinc-900"
    >
      {/* Background Glow */}

      <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-yellow-500/10 blur-[140px]" />

      <div className="absolute -right-24 bottom-0 w-80 h-80 rounded-full bg-red-500/10 blur-[160px]" />

      {/* Content */}

      <div className="relative py-28 px-8 lg:px-16 flex flex-col items-center text-center">

        <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-400 flex items-center justify-center shadow-2xl shadow-yellow-500/20">

          <Film
            size={46}
            className="text-black"
          />

        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-5 py-2">

          <Sparkles
            size={14}
            className="text-yellow-400"
          />

          <span className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

            Bryson Tyler Gallery

          </span>

        </div>

        <h2 className="mt-8 text-5xl lg:text-6xl font-black max-w-3xl">

          {title}

        </h2>

        <p className="mt-6 text-zinc-400 text-lg leading-8 max-w-2xl">

          {description}

        </p>

        <button
          onClick={onExplore}
          className="mt-12 rounded-2xl bg-yellow-500 hover:bg-yellow-400 transition px-10 py-5 text-black font-black flex items-center gap-3"
        >
          Browse Other Categories

          <ArrowRight size={18} />

        </button>

      </div>

    </motion.section>
  );
}