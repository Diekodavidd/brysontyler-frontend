import { motion } from "framer-motion";
import {
  Play,
  Lock,
  Crown,
  Sparkles,
  Clock3,
} from "lucide-react";

export default function GalleryHero({
  featured,
  membership,
  onLocked,
}) {
  if (!featured) return null;

 const locked =
  membership === "free"
    ? featured.membership !== "free"
    : membership === "vip"
    ? featured.membership === "elite"
    : false;

const badgeStyles = {
  free: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: Lock,
  },
  vip: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    icon: Crown,
  },
  elite: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    icon: Sparkles,
  },
};

const badge =
  badgeStyles[featured.membership] || badgeStyles.free;

const BadgeIcon = badge.icon;
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
      className="relative overflow-hidden rounded-[40px] h-[650px]"
    >
      {/* Background */}

      <img
        src={featured.thumbnail}
        alt={featured.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Glow */}

      <div className="absolute -left-40 top-0 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-[180px]" />

      {/* Content */}

      <div className="relative h-full flex items-end">

        <div className="max-w-3xl px-14 pb-16">

          {/* Tag */}

         <div
  className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 ${badge.border} ${badge.bg}`}
>
  <BadgeIcon
    size={14}
    className={badge.text}
  />

  <span
    className={`uppercase tracking-[.3em] text-xs font-black ${badge.text}`}
  >
    {featured.category || "Original"}
  </span>
</div>

          {/* Title */}

          <h1 className="text-7xl font-black mt-7 leading-none">

            {featured.title}

          </h1>

          {/* Subtitle */}

         <p className="text-zinc-300 text-lg mt-6 max-w-2xl leading-8">
  {featured.description ||
    "Exclusive premium content from Bryson Tyler."}
    </p>

          {/* Meta */}

          <div className="flex flex-wrap gap-8 mt-8">

  <div className="flex items-center gap-2 text-zinc-300">
    <Clock3 size={17} />
    {featured.duration}
  </div>

  <div className="flex items-center gap-2 text-zinc-300">
    👁 {featured.views || "0"} Views
  </div>

  <div className={`flex items-center gap-2 ${badge.text}`}>
    <BadgeIcon size={17} />
{membership.toUpperCase()}
  </div>

   </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-5 mt-10">

            {locked ? (
              <button
                onClick={onLocked}
                className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 px-9 py-5 text-black font-black flex items-center gap-3 transition"
              >
                <Lock size={18} />

                Unlock Access

              </button>
            ) : (
              <button
                className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 px-9 py-5 text-black font-black flex items-center gap-3 transition"
              >
                <Play
                  fill="currentColor"
                  size={18}
                />

                Watch Now

              </button>
            )}

            <button className="rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-500 hover:bg-white/10 px-9 py-5 font-bold transition">

              View Details

            </button>

          </div>

        </div>

      </div>

      {/* Membership Badge */}

     <div
  className={`absolute top-8 right-8 rounded-3xl backdrop-blur-xl px-8 py-6 border ${badge.border} ${badge.bg}`}
>

 <p className="uppercase tracking-[.3em] text-[10px] text-zinc-400 font-black">
  Your Plan
</p>

<h3 className={`mt-3 text-2xl font-black ${badge.text}`}>
  {membership.toUpperCase()}
</h3>

</div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050505] to-transparent" />

    </motion.section>
  );
}