
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SubscribeModal from "./modals/SubscribeModal";
import gad from "./Video (1).mov";
import gad1 from "./Video (2).mov";
import gad2 from "./Video (3).mov";
import { useRouter } from "@/compat/navigation";
import { useAuthStore } from "@/store/useAuthStore";



const MEDIA_ASSETS = [
  // {
  //   type: "image",
  //   src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1920&q=80",
  // },
  {
    type: "video",
    src: gad2,
  },
  {
    type: "video",
    src: gad1,
  },
  {
    type: "video",
    src: gad,
  },
  
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { push } = useRouter();
const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % MEDIA_ASSETS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  
  return (
<section className="relative min-h-screen lg:min-h-screen py-28 md:py-24 sm:py-20 flex items-center justify-center text-center overflow-hidden">      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {MEDIA_ASSETS[currentIndex].type === "video" ? (
             <video
    src={MEDIA_ASSETS[currentIndex].src}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
/>
            ) : (
              <div
                className="w-full h-full bg-center bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url('${MEDIA_ASSETS[currentIndex].src}')`,
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/50 to-black" />
      </div>

      <div className="absolute -top-40 -left-32 w-[500px] h-[500px] bg-yellow-500/15 rounded-full blur-[180px]" />

<div className="absolute bottom-0 -right-40 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[180px]" />

<div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-yellow-400/10 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-6 z-10 flex flex-col items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-10 shadow-2xl"
        >
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">
            18+ Exclusive Membership
          </span>
        </motion.div>

        {/* <h2 className="text-5xl sm:text-7xl md:text-[5rem] font-black tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-lg">
          YOUR ULTIMATE
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            BOYFRIEND EXPERIENCE
          </span>
        </h2> */}

<div className="space-y-7 md:space-y-8">
  <motion.h2
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
className="
text-4xl
sm:text-5xl
md:text-6xl
lg:text-7xl
xl:text-[5rem]
font-black
leading-[0.95]
tracking-tight
text-white
"  >
    YOUR ULTIMATE
    <br />

    <span className="bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
      BOYFRIEND
    </span>

    <br />

    EXPERIENCE
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: .2 }}
className="
max-w-2xl
mx-auto
text-base
sm:text-lg
md:text-xl
leading-7
text-zinc-300
px-2
"  >
    Discover exclusive creators, premium videos, private livestreams,
    direct messaging, and members-only experiences designed to bring
    you closer than ever.
  </motion.p>

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: .4 }}
className="
flex
flex-col
sm:flex-row
justify-center
items-center
gap-4
w-full
"  >
<button
  onClick={() => {
    if (!user) {
push("/signup?role=fan");
    } else {
      setIsModalOpen(true);
    }
  }}
  className="px-12 py-5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg transition-all duration-300 hover:scale-105"
>
  Start Free Trial
</button>

   <button
  onClick={() =>
    document
      .getElementById("creators")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
  }
  className="px-12 py-5 rounded-2xl border border-white/20 backdrop-blur-xl bg-white/5 hover:bg-white/10 hover:border-yellow-400 transition-all duration-300 font-bold"
>
  Explore Creators
</button>

  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: .6 }}
className="
grid
grid-cols-3
gap-3
sm:gap-4
max-w-lg
mx-auto
pt-2
w-full
"  >

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-3xl font-black text-yellow-400">
        50+
      </h3>

      <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mt-1">
        Creators
      </p>
    </div>

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-3xl font-black text-yellow-400">
        2M+
      </h3>

      <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mt-1">
        Views
      </p>
    </div>

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
      <h3 className="text-3xl font-black text-yellow-400">
        Daily
      </h3>

      <p className="text-zinc-400 text-xs uppercase tracking-[0.2em] mt-1">
        Uploads
      </p>
    </div>

  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: .8 }}
    className="flex flex-wrap justify-center items-center gap-4 text-sm"
  >

    <span className="px-5 py-2 rounded-full bg-green-500/15 border border-green-500/30 text-green-300 font-semibold">
      ✓ 7-Day Free Trial
    </span>

    <span className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-zinc-300">
      🔒 Secure & Private
    </span>

    <span className="px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300">
      Cancel Anytime
    </span>

  </motion.div>

</div>
      </div>

      {isModalOpen && (
        <SubscribeModal
          creatorName="Bryson Tyler"
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
}
