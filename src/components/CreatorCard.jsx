import Image from "@/compat/Image";
import { motion } from "framer-motion";
import {
  Crown,
  Heart,
  Eye,
  Play,
  CheckCircle2,
  Star,
} from "lucide-react";

export default function CreatorCard({
  name,
  tier,
  subscribers,
  rating,
  cover,
  online,
  onClick,
}) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-[30px] bg-[#090909] border border-white/10 hover:border-yellow-400/40 cursor-pointer shadow-[0_20px_60px_rgba(0,0,0,.45)] transition-all duration-500"
    >
      {/* Glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 bg-yellow-500/0 group-hover:bg-yellow-500/20 blur-[120px] transition-all duration-700 z-0" />

      {/* Image */}
      <div className="relative h-[420px] overflow-hidden">
        <Image
          src={cover}
          alt={name}
          fill
          className="object-cover transition-all duration-[2500ms] group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/40 to-black/10" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-500" />

        {/* Live Badge */}
        {online && (
          <div className="absolute top-5 left-5">
            <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>

              <span className="text-[10px] uppercase tracking-[0.25em] font-black">
                LIVE
              </span>
            </div>
          </div>
        )}

        {/* Membership Tier */}
        <div className="absolute top-5 right-5">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border font-black text-[10px] tracking-[0.25em] ${
              tier === "VIP"
                ? "bg-yellow-500/20 border-yellow-500/40 text-yellow-300"
                : "bg-white/10 border-white/20 text-white"
            }`}
          >
            <Crown size={13} />
            {tier}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="backdrop-blur-2xl rounded-3xl border border-white/10 bg-black/30 p-5">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-black">
                    {name}
                  </h3>

                  <CheckCircle2
                    size={18}
                    className="text-sky-400 fill-sky-400"
                  />
                </div>

                <p className="text-zinc-400 text-sm mt-1">
                  Premium Creator
                </p>
              </div>

              <button className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center group-hover:scale-110 transition-all">
                <Play
                  fill="currentColor"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="relative z-10 p-6 space-y-5 bg-gradient-to-b from-[#090909] to-[#050505]">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 text-center">
            <Heart
              size={18}
              className="mx-auto mb-2 text-red-400 fill-red-400"
            />

            <h4 className="font-black text-lg">
              {subscribers}
            </h4>

            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Fans
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 text-center">
            <Star
              size={18}
              className="mx-auto mb-2 text-yellow-400 fill-yellow-400"
            />

            <h4 className="font-black text-lg">
              {rating}
            </h4>

            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Rating
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 text-center">
            <Eye
              size={18}
              className="mx-auto mb-2 text-sky-400"
            />

            <h4 className="font-black text-lg">
              1.2M
            </h4>

            <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              Views
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 leading-7 text-sm">
          Unlock premium videos, private messages, exclusive livestreams and
          members-only experiences available only to subscribers.
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs">
            Exclusive
          </span>

          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
            Daily Uploads
          </span>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
            Verified
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            className="
              rounded-2xl
              py-4
              bg-gradient-to-r
              from-yellow-400
              via-yellow-500
              to-amber-500
              text-black
              font-black
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_0_35px_rgba(250,204,21,.45)]
            "
          >
            Subscribe
          </button>

          <button
            className="
              rounded-2xl
              py-4
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              hover:border-yellow-400
              transition-all
              duration-300
              font-semibold
            "
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Gold Glow */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Hover Border */}
      <div className="absolute inset-0 rounded-[30px] border border-yellow-400/0 group-hover:border-yellow-400/30 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}