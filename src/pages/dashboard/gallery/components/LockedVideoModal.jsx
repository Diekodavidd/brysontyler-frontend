import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Crown,
  Sparkles,
  X,
  ArrowRight,
  PlayCircle,
} from "lucide-react";
import { useRouter } from "@/compat/navigation";
export default function LockedVideoModal({
  open,
  video,
  membership,
  onClose,
}) {
  const router = useRouter();
  if (!open || !video) return null;

  const upgradeTo =
    membership === "free"
      ? video.membership === "vip"
        ? "VIP"
        : "Elite"
      : "Elite";

  return (
    <AnimatePresence>

      <motion.div
     className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3
sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{
            duration: 0.35,
          }}
      className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-[36px] bg-[#090909] border border-white/10">
        

          {/* Close */}

          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-red-600 transition flex items-center justify-center"
          >
            <X size={18} />
          </button>

          {/* Background */}

          <div className="relative h-[220px]
sm:h-[280px]
lg:h-[320px] overflow-hidden">

            <img
              src={video.thumbnail}
              alt={video.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

            <div className="absolute left-5
bottom-5
lg:left-12
lg:bottom-12">

              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 px-5 py-2">

                <Sparkles
                  size={14}
                  className="text-yellow-400"
                />

                <span className="text-xs uppercase tracking-[.3em] font-black text-yellow-400">

                  Bryson Tyler Original

                </span>

              </div>

              <h2 className="text-3xl
lg:text-5xl font-black mt-6">

                {video.title}

              </h2>

              <div className="flex items-center gap-4 mt-5">

                <span className="px-4 py-2 rounded-full bg-red-600 text-xs font-black uppercase tracking-wider">

                  {video.membership.toUpperCase()}

                </span>

                <span className="text-zinc-400">

                  {video.duration}

                </span>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="p-5
lg:p-10">

            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">

              {/* Left */}

              <div>

                <div className="flex items-center gap-4">

                  <div className="w-14
h-14
lg:w-16
lg:h-16 rounded-full bg-yellow-500 flex items-center justify-center">

                    <Lock
                      size={28}
                      className="text-black"
                    />

                  </div>

                  <div>

                    <h3 className="text-3xl font-black">

                      This title is locked

                    </h3>

                    <p className="text-zinc-400 mt-2">

                      Upgrade your membership to
                      unlock this premium Bryson
                      Tyler Original.

                    </p>

                  </div>

                </div>

                <div className="mt-10 grid sm:grid-cols-2 gap-5">

                  <div className="rounded-3xl bg-black border border-white/10 p-6">

                    <PlayCircle
                      className="text-yellow-400 mb-5"
                    />

                    <h4 className="font-black text-xl">

                      HD Streaming

                    </h4>

                    <p className="text-zinc-500 mt-3 leading-7">

                      Watch in premium quality
                      without interruptions.

                    </p>

                  </div>

                  <div className="rounded-3xl bg-black border border-white/10 p-6">

                    <Crown
                      className="text-yellow-400 mb-5"
                    />

                    <h4 className="font-black text-xl">

                      Exclusive Access

                    </h4>

                    <p className="text-zinc-500 mt-3 leading-7">

                      Unlock originals,
                      interviews, behind-the-scenes
                      and exclusive collections.

                    </p>

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="rounded-[30px] bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-5
lg:p-8">

                <div className="flex justify-center">

                  <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center">

                    <Crown
                      size={38}
                      className="text-black"
                    />

                  </div>

                </div>

                <h3 className="text-center text-2xl lg:text-3xl font-black mt-8">

                  Upgrade to {upgradeTo}

                </h3>

                <p className="text-center text-zinc-400 mt-5 leading-7">

                  Get instant access to premium
                  originals, exclusive series and
                  every new release.

                </p>

                <div className="space-y-4 mt-10">

                  {[
                    "Unlimited streaming",
                    "Premium Bryson Tyler Originals",
                    "Exclusive documentaries",
                    "Weekly new releases",
                    "Priority access",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <Sparkles
                        size={16}
                        className="text-yellow-400"
                      />

                      <span>{item}</span>

                    </div>
                  ))}

                </div>

               <button
  type="button"
  onClick={() => {
    onClose();
    router.push("/dashboard/membership");
  }}
  className="mt-10 w-full rounded-2xl bg-yellow-500 hover:bg-yellow-400 transition py-4 text-black font-black flex items-center justify-center gap-3"
>
  Upgrade Membership
  <ArrowRight size={18} />
</button>

                <button
                  onClick={onClose}
                  className="mt-4 w-full rounded-2xl border border-white/10 hover:border-white/30 py-4 font-bold transition"
                >
                  Maybe Later
                </button>

              </div>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>
  );
}