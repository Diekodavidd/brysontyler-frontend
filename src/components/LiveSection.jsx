
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

<div className="grid lg:grid-cols-3 gap-8">

<div

onClick={()=>push(`/live/${liveCreators[0].id}`)}

className="lg:col-span-2 relative h-[600px] rounded-[34px] overflow-hidden cursor-pointer group"

>

<Image

fill

src={liveCreators[0].image}

alt={liveCreators[0].name}

className="object-cover group-hover:scale-110 transition-all duration-[2500ms]"

/>

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>

<div className="absolute top-8 left-8 flex gap-3">

<div className="px-5 py-2 rounded-full bg-red-600 text-xs font-black tracking-[0.3em]">

LIVE

</div>

<div className="px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl">

<Eye className="inline mr-2" size={15}/>

{liveCreators[0].viewers}

Watching

</div>

</div>

<div className="absolute bottom-10 left-10">

<div className="flex items-center gap-3">

<h2 className="text-5xl font-black">

{liveCreators[0].name}

</h2>

{liveCreators[0].verified &&

<CheckCircle2 className="text-sky-400 fill-sky-400"/>

}

</div>

<p className="mt-4 text-zinc-300">

{liveCreators[0].duration}

</p>

<button className="mt-8 px-8 py-4 rounded-2xl bg-yellow-400 text-black font-black flex items-center gap-3 hover:scale-105 transition-all">

<Play fill="currentColor"/>

Join Stream

</button>

</div>

</div>

        {/* Right Side Live Cards */}

        <div className="flex flex-col gap-8">

          {liveCreators.slice(1).map((creator, index) => (

            <motion.div
              key={creator.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => push(`/live/${creator.id}`)}
              className="relative h-[285px] rounded-[28px] overflow-hidden cursor-pointer group border border-white/10 hover:border-red-500/40 transition-all duration-500"
            >

              <Image
                src={creator.image}
                alt={creator.name}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-[2000ms]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Hover Glow */}

              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-all duration-500" />

              {/* Top */}

              <div className="absolute top-5 left-5 right-5 flex justify-between items-center">

                <div className="px-4 py-2 rounded-full bg-red-600 text-[10px] font-black uppercase tracking-[0.3em]">

                  LIVE

                </div>

                <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl flex items-center gap-2 text-xs">

                  <Eye size={14} />

                  {creator.viewers}

                </div>

              </div>

              {/* Bottom */}

              <div className="absolute bottom-6 left-6 right-6">

                <div className="rounded-3xl bg-black/30 backdrop-blur-xl border border-white/10 p-5">

                  <div className="flex items-center gap-2">

                    <h3 className="text-2xl font-black">

                      {creator.name}

                    </h3>

                    {creator.verified && (

                      <CheckCircle2
                        size={18}
                        className="text-sky-400 fill-sky-400"
                      />

                    )}

                  </div>

                  <p className="text-zinc-400 mt-2 text-sm">

                    {creator.duration}

                  </p>

                  <button className="mt-5 w-full rounded-2xl py-3 bg-white/10 hover:bg-yellow-400 hover:text-black transition-all font-bold flex justify-center items-center gap-3">

                    <Play fill="currentColor" size={16} />

                    Watch Live

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

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
                onClick={() => push("/signup")}
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