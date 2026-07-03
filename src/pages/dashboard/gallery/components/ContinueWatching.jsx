import { motion } from "framer-motion";
import {
  Play,
  Clock3,
  ChevronRight,
} from "lucide-react";

export default function ContinueWatching({
  videos = [],
}) {
  // Don't render if nothing to continue
  if (!videos.length) return null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="space-y-7"
    >
      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

            Resume

          </p>

          <h2 className="text-4xl font-black mt-3">

            Continue Watching

          </h2>

        </div>

        <button className="flex items-center gap-2 text-zinc-500 hover:text-yellow-400 transition font-bold">

          View History

          <ChevronRight size={17} />

        </button>

      </div>

      {/* Videos */}

      <div className="grid xl:grid-cols-3 gap-8">

        {videos.map((video) => (

          <motion.div
            key={video.id}
            whileHover={{
              y: -6,
            }}
            className="group relative overflow-hidden rounded-[30px] border border-white/5 bg-zinc-900 cursor-pointer"
          >
            {/* Thumbnail */}

            <div className="relative aspect-video overflow-hidden">

              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition duration-[1800ms] group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Play */}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">

                <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center shadow-2xl">

                  <Play
                    size={34}
                    fill="currentColor"
                    className="text-black ml-1"
                  />

                </div>

              </div>

              {/* Progress */}

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">

                <div
                  className="h-full bg-yellow-500"
                  style={{
                    width: `${video.progress || 0}%`,
                  }}
                />

              </div>

            </div>

            {/* Info */}

            <div className="p-6">

              <div className="flex items-center justify-between">

                <span className="uppercase tracking-[.25em] text-[10px] text-yellow-400 font-black">

                  Continue

                </span>

                <div className="flex items-center gap-2 text-zinc-500 text-sm">

                  <Clock3 size={14} />

                  {video.remaining || "12 mins left"}

                </div>

              </div>

              <h3 className="mt-4 text-2xl font-black line-clamp-2">

                {video.title}

              </h3>

              <p className="mt-3 text-zinc-500 text-sm leading-6 line-clamp-2">

                {video.description ||
                  "Continue where you left off and enjoy uninterrupted premium streaming."}

              </p>

              <button className="mt-6 w-full rounded-2xl bg-yellow-500 hover:bg-yellow-400 transition py-3 text-black font-black flex items-center justify-center gap-3">

                <Play
                  size={16}
                  fill="currentColor"
                />

                Resume Watching

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}