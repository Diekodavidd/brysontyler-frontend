
import { motion } from "framer-motion";
import {
  Play,
  Eye,
  ArrowRight,
  CheckCircle2,
  Radio,
} from "lucide-react";
import { useRouter } from "@/compat/navigation";
import Image from "@/compat/Image";

export default function LiveSection() {

  const { push } = useRouter();

  const liveCreators = [
    {
      id: 1,
      name: "Bryson Tyler",
      image: "https://picsum.photos/id/1015/1200/800",
      viewers: "2.4k",
      duration: "LIVE • 12 mins",
      verified: true,
    },
    {
      id: 2,
      name: "Alex River",
      image: "https://picsum.photos/id/1025/1200/800",
      viewers: "1.8k",
      duration: "LIVE • 4 mins",
      verified: true,
    },
    {
      id: 3,
      name: "Jordan Kai",
      image: "https://picsum.photos/id/1027/1200/800",
      viewers: "3.1k",
      duration: "LIVE • 31 mins",
      verified: false,
    },
  ];

  return (

<section className="relative py-28 overflow-hidden bg-[#090909]">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.08),transparent_60%)]"/>

<div className="absolute left-0 top-0 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[180px]"/>

<div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[180px]"/>

<div className="relative max-w-7xl mx-auto px-6">

<motion.div

initial={{opacity:0,y:40}}

whileInView={{opacity:1,y:0}}

viewport={{once:true}}

className="text-center mb-14"

>

<div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-black uppercase tracking-[0.3em] text-xs">

<Radio size={14}/>

LIVE NOW

</div>

<h2 className="mt-7 text-5xl lg:text-7xl font-black">

Exclusive

<span className="block bg-gradient-to-r from-red-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">

Private Streams

</span>

</h2>

<p className="max-w-3xl mx-auto mt-6 text-zinc-400 leading-8 text-lg">

Watch creators broadcasting live,
chat in real time and unlock premium
private experiences.

</p>

<button

onClick={()=>push("/all-streams")}

className="mt-10 px-10 py-5 rounded-2xl bg-gradient-to-r from-red-500 to-yellow-500 font-black hover:scale-105 transition-all flex items-center gap-3 mx-auto"

>

Watch All Streams

<ArrowRight size={18}/>

</button>

</motion.div>
<div className="grid lg:grid-cols-5 gap-8 items-center">

  {/* Studio Preview */}

  <motion.div
    initial={{ opacity: 0, x: -40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="lg:col-span-3"
  >

    <div className="rounded-[34px] overflow-hidden border border-white/10 bg-zinc-900">

      {/* Fake Video */}

      <div className="relative aspect-video bg-gradient-to-br from-zinc-800 via-black to-zinc-900">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.12),transparent_60%)]" />

        <div className="absolute top-6 left-6 flex gap-3">

          <span className="bg-red-600 px-5 py-2 rounded-full text-xs font-black tracking-widest flex items-center gap-2">

            <Radio size={14} />

            LIVE

          </span>

          <span className="bg-black/40 backdrop-blur-xl px-5 py-2 rounded-full text-sm">

            2.3k Watching

          </span>

        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

          <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center">

            <Play
              size={42}
              fill="black"
              className="text-black ml-1"
            />

          </div>

          <h3 className="mt-8 text-4xl font-black">

            Premium Live Studio

          </h3>

          <p className="mt-4 text-zinc-400">

            HD Streaming • Live Chat • Tips • PPV

          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="grid md:grid-cols-4 border-t border-white/10">

        {[
          ["HD", "Streaming"],
          ["Chat", "Real-Time"],
          ["Tips", "Instant"],
          ["PPV", "Events"],
        ].map(([value, label]) => (

          <div
            key={value}
            className="p-6 border-r last:border-r-0 border-white/10"
          >

            <h3 className="text-3xl font-black text-yellow-400">

              {value}

            </h3>

            <p className="text-zinc-500 mt-2">

              {label}

            </p>

          </div>

        ))}

      </div>

    </div>

  </motion.div>

  {/* Features */}

  <motion.div
    initial={{ opacity: 0, x: 40 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="lg:col-span-2 space-y-5"
  >

    {[
      {
        title: "Real-Time Chat",
        text: "Interact with creators while they broadcast.",
      },
      {
        title: "Exclusive Streams",
        text: "Subscriber-only and PPV experiences.",
      },
      {
        title: "Live Tips",
        text: "Support creators instantly during streams.",
      },
      {
        title: "HD Broadcasts",
        text: "Crystal clear video with low latency.",
      },
    ].map((feature) => (

      <div
        key={feature.title}
        className="rounded-[28px] border border-white/10 bg-zinc-900 p-7 hover:border-red-500/40 transition"
      >

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-yellow-400 fill-yellow-400" />

          <h3 className="text-xl font-black">

            {feature.title}

          </h3>

        </div>

        <p className="mt-4 text-zinc-500 leading-7">

          {feature.text}

        </p>

      </div>

    ))}

  </motion.div>

</div>

      {/* Bottom CTA */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24"
      >

        <div className="relative overflow-hidden rounded-[36px] border border-red-500/20 bg-gradient-to-r from-[#111] via-[#0b0b0b] to-[#151515] p-12">

          <div className="absolute -right-20 -top-20 w-72 h-72 bg-red-500/10 blur-[120px]" />

          <div className="absolute -left-20 bottom-0 w-72 h-72 bg-yellow-500/10 blur-[120px]" />

          <div className="relative z-10 text-center">

            <span className="inline-flex px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs uppercase tracking-[0.3em] font-black">

              DON'T MISS OUT

            </span>

            <h2 className="mt-6 text-5xl font-black">

              Never Miss Another

              <span className="block bg-gradient-to-r from-red-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">

                Live Experience

              </span>

            </h2>

            <p className="mt-6 max-w-2xl mx-auto text-zinc-400 leading-8">

              Join thousands of fans watching exclusive live
              broadcasts, private shows, real-time chats,
              and members-only events every single week.

            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

              <button
                onClick={() => push("/signup?role=fan")}
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-red-500 to-yellow-500 font-black hover:scale-105 transition-all"
              >

                Start Watching

              </button>

              <button
                onClick={() => push("/all-streams")}
                className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500 transition-all"
              >

                Browse Streams

              </button>

            </div>

          </div>

        </div>

      </motion.div>

    </div>

</section>

  );
}