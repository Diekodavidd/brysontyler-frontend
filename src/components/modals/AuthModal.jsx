import { useEffect } from "react";
import { X, User, Star, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AuthModal({ onClose, type }) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

 const handleRoleSelect = (role) => {
  onClose();
  navigate(`/${type}?role=${role}`);
};

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-5 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#090909] shadow-[0_0_80px_rgba(0,0,0,.6)]"
      >
        {/* Background Glow */}
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="relative px-8 pt-10 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-[0_0_50px_rgba(234,179,8,.35)]">
            <Sparkles
              className="text-black"
              size={34}
            />
          </div>

          <h2 className="mt-6 text-3xl font-black tracking-tight">
            {type === "login"
              ? "Welcome Back"
              : "Choose Your Experience"}
          </h2>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-zinc-400">
            {type === "login"
              ? "Continue your exclusive experience by choosing how you'd like to sign in."
              : "Whether you're here to enjoy premium content or build your own audience, your journey starts here."}
          </p>
        </div>

        {/* Cards */}
        <div className="relative grid gap-5 px-8 py-8 md:grid-cols-2">
          {/* Fan */}
          <motion.button
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect("fan")}
            className="group rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900 to-black p-6 text-left transition-all hover:border-yellow-500/40 hover:shadow-[0_0_30px_rgba(234,179,8,.15)]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition group-hover:bg-yellow-500 group-hover:text-black">
              <User size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-black">
              Fan
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-400">
              Watch previews, subscribe to creators, join livestreams, chat
              privately and unlock exclusive content.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-yellow-400">
              Continue

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </motion.button>

          {/* Creator */}
          <motion.button
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect("creator")}
            className="group rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-yellow-500/5 to-black p-6 text-left transition-all hover:border-yellow-400 hover:shadow-[0_0_40px_rgba(234,179,8,.2)]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500 text-black shadow-lg">
              <Star
                size={30}
                fill="currentColor"
              />
            </div>

            <h3 className="mt-6 text-2xl font-black text-yellow-100">
              Creator
            </h3>

            <p className="mt-3 text-sm leading-7 text-zinc-300">
              Upload premium videos, stream live, grow subscribers, receive
              tips and manage your creator business.
            </p>

            <div className="mt-6 flex items-center gap-2 font-bold text-yellow-400">
              Get Started

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />
            </div>
          </motion.button>
        </div>

        {/* Footer */}
        <div className="border-t border-white/5 bg-black/30 px-8 py-5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-green-300">
              ✓ Secure Authentication
            </span>

            <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-yellow-300">
              18+ Adults Only
            </span>

            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-300">
              Private &amp; Encrypted
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}