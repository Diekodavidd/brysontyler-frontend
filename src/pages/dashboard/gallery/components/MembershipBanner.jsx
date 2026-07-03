import { motion } from "framer-motion";
import {
  Crown,
  Lock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function MembershipBanner({
  membership,
}) {
  const plans = {
    free: {
      title: "Free Member",
      color: "text-zinc-300",
      bg: "bg-zinc-900",
      border: "border-white/10",
      badge: "bg-zinc-800 text-zinc-300",
      icon: Lock,

      available: "Preview only",

      locked: "86 Premium Videos",

      button: "Upgrade Membership",
    },

    vip: {
      title: "VIP Member",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
      badge: "bg-yellow-500 text-black",
      icon: Crown,

      available: "48 Videos Available",

      locked: "38 Elite Exclusives",

      button: "Upgrade to Elite",
    },

    elite: {
      title: "Elite Member",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      badge: "bg-emerald-500 text-black",
      icon: Sparkles,

      available: "Unlimited Access",

      locked: "Everything Unlocked",

      button: "Membership Active",
    },
  };

  const current =
    plans[membership] || plans.free;

  const Icon = current.icon;

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
      className={`relative overflow-hidden rounded-[34px] border ${current.border} ${current.bg}`}
    >
      {/* Background Glow */}

      <div className="absolute -left-20 -top-20 w-72 h-72 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="absolute -right-20 bottom-0 w-72 h-72 rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="relative p-10">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

          {/* Left */}

          <div>

            <div
              className={`inline-flex items-center gap-3 rounded-full px-5 py-2 font-black uppercase tracking-[.25em] text-xs ${current.badge}`}
            >
              <Icon size={15} />

              {current.title}

            </div>

            <h2 className="mt-6 text-5xl font-black">

              Your Gallery Access

            </h2>

            <p className="mt-5 text-zinc-400 max-w-2xl leading-8">

              Browse the complete Bryson Tyler
              Gallery. Your membership determines
              which exclusive originals, premium
              collections and cinematic series you
              can watch.

            </p>

          </div>

          {/* Right */}

          <div className="grid sm:grid-cols-2 gap-5 min-w-[360px]">

            <div className="rounded-3xl bg-black/40 border border-white/10 p-7">

              <p className="uppercase tracking-[.25em] text-xs text-zinc-500 font-black">

                Available

              </p>

              <h3
                className={`mt-4 text-3xl font-black ${current.color}`}
              >
                {current.available}
              </h3>

            </div>

            <div className="rounded-3xl bg-black/40 border border-white/10 p-7">

              <p className="uppercase tracking-[.25em] text-xs text-zinc-500 font-black">

                Locked

              </p>

              <h3 className="mt-4 text-3xl font-black text-zinc-300">

                {current.locked}

              </h3>

            </div>

          </div>

        </div>

        {/* Benefits */}

        <div className="grid lg:grid-cols-4 gap-5 mt-10">

          {[
            "Bryson Tyler Originals",
            "Premium Gallery",
            "Exclusive Interviews",
            "Weekly New Releases",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-black/40 border border-white/10 p-5 flex items-center gap-3"
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

        {/* CTA */}

        {membership !== "elite" && (
          <div className="mt-10 flex justify-end">

            <button className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 transition px-8 py-4 text-black font-black flex items-center gap-3">

              {current.button}

              <ArrowRight size={18} />

            </button>

          </div>
        )}

      </div>
    </motion.section>
  );
}