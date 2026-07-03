import { motion } from "framer-motion";
import {
  Crown,
  Sparkles,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function UpgradeBanner({
  membership,
}) {
  if (membership === "elite") return null;

  const isFree = membership === "free";

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      className="relative overflow-hidden rounded-[40px] border border-yellow-500/20 bg-gradient-to-br from-[#121212] via-[#0c0c0c] to-black"
    >
      {/* Glow */}

      <div className="absolute -left-32 -top-32 w-[420px] h-[420px] rounded-full bg-yellow-500/10 blur-[180px]" />

      <div className="absolute right-0 bottom-0 w-[350px] h-[350px] rounded-full bg-red-500/10 blur-[170px]" />

      <div className="relative grid lg:grid-cols-[1.6fr_1fr] gap-10 items-center p-12">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-3 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-5 py-2">

            <Sparkles
              size={14}
              className="text-yellow-400"
            />

            <span className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

              Unlock More

            </span>

          </div>

          <h2 className="mt-7 text-5xl lg:text-6xl font-black leading-tight">

            {isFree
              ? "Thousands of Premium Videos Are Waiting"
              : "You're One Step Away From Everything"}

          </h2>

          <p className="mt-6 text-zinc-400 text-lg leading-8 max-w-3xl">

            {isFree
              ? "Upgrade to VIP or Elite and unlock exclusive Bryson Tyler Originals, luxury lifestyle films, behind-the-scenes content, documentaries and premium collections."
              : "Upgrade to Elite for unlimited access to every Bryson Tyler Original, every documentary, every exclusive release and future premium content."}

          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-10">

            {[
              "Unlimited Streaming",
              "Exclusive Originals",
              "Early Access Releases",
              "Weekly New Content",
            ].map((item) => (

              <div
                key={item}
                className="flex items-center gap-3"
              >
                <CheckCircle2
                  size={18}
                  className="text-yellow-400"
                />

                <span className="font-semibold">

                  {item}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Right */}

        <div className="rounded-[34px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">

          <div className="flex justify-center">

            <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center">

              {isFree ? (
                <Lock
                  size={36}
                  className="text-black"
                />
              ) : (
                <Crown
                  size={36}
                  className="text-black"
                />
              )}

            </div>

          </div>

          <h3 className="text-center text-3xl font-black mt-8">

            {isFree
              ? "Upgrade to VIP"
              : "Upgrade to Elite"}

          </h3>

          <p className="text-center text-zinc-500 mt-5 leading-7">

            Instantly unlock premium
            entertainment curated exclusively
            for Bryson Tyler members.

          </p>

          <div className="rounded-3xl bg-black/50 border border-white/10 p-6 mt-8">

            <div className="flex justify-between items-center">

              <span className="text-zinc-400">

                Current Plan

              </span>

              <span className="font-black uppercase">

                {membership}

              </span>

            </div>

            <div className="flex justify-between items-center mt-5">

              <span className="text-zinc-400">

                Upgrade To

              </span>

              <span className="font-black text-yellow-400">

                {isFree
                  ? "VIP"
                  : "ELITE"}

              </span>

            </div>

          </div>

          <button className="mt-8 w-full rounded-2xl bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 transition py-4 text-black font-black flex items-center justify-center gap-3">

            Upgrade Membership

            <ArrowRight size={18} />

          </button>

          <p className="text-center text-xs text-zinc-600 mt-5">

            Cancel anytime • Secure payment •
            Instant access

          </p>

        </div>

      </div>

    </motion.section>
  );
}