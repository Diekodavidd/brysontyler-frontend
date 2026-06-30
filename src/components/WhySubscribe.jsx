import { motion } from "framer-motion";
import {
  Lock,
  MessageCircle,
  PlayCircle,
  Diamond,
  ShieldCheck,
  Tv2,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: PlayCircle,
    title: "Exclusive Videos",
    description:
      "Unlock premium videos, behind-the-scenes content and members-only releases uploaded every week.",
    color: "text-red-400",
  },
  {
    icon: MessageCircle,
    title: "Private Messaging",
    description:
      "Chat directly with your favorite creators and build a more personal connection.",
    color: "text-sky-400",
  },
  {
    icon: Tv2,
    title: "Live Experiences",
    description:
      "Join exclusive livestreams, interactive shows and private broadcasts available only to members.",
    color: "text-emerald-400",
  },
  {
    icon: Diamond,
    title: "VIP Membership",
    description:
      "Gain access to premium content drops, priority replies and exclusive member rewards.",
    color: "text-yellow-400",
  },
  {
    icon: ShieldCheck,
    title: "100% Secure",
    description:
      "Your subscription and payments are protected with secure encrypted transactions.",
    color: "text-purple-400",
  },
  {
    icon: Lock,
    title: "Private Viewing",
    description:
      "Enjoy a discreet experience with complete privacy and secure account protection.",
    color: "text-orange-400",
  },
];

export default function WhySubscribe() {
  return (
    <section className="relative py-28 overflow-hidden bg-[#060606]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_60%)]" />

      <div className="absolute -left-20 top-20 w-[450px] h-[450px] rounded-full bg-yellow-500/10 blur-[170px]" />

      <div className="absolute right-0 bottom-0 w-[450px] h-[450px] rounded-full bg-red-500/10 blur-[170px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex px-5 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-xs font-black uppercase tracking-[0.3em]">
            MEMBERSHIP BENEFITS
          </span>

          <h2 className="mt-8 text-5xl lg:text-7xl font-black leading-tight">
            Why Thousands

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Choose Premium
            </span>
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-zinc-400 text-lg leading-8">
            Everything you need for an unforgettable premium entertainment
            experience, all in one place.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 transition-all duration-500 hover:border-yellow-400/40"
              >
                <div className="absolute -top-16 right-0 w-44 h-44 rounded-full bg-yellow-500/0 group-hover:bg-yellow-500/10 blur-[90px] transition-all duration-500" />

                <div
                  className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${feature.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-black">
                  {feature.title}
                </h3>

                <p className="mt-5 text-zinc-400 leading-7">
                  {feature.description}
                </p>

                <button className="mt-8 flex items-center gap-2 text-yellow-400 font-bold group-hover:gap-4 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-[36px] border border-yellow-500/20 bg-gradient-to-r from-[#111] via-[#090909] to-[#111] p-14 text-center">
            <div className="absolute -top-20 right-0 w-72 h-72 bg-yellow-500/10 blur-[120px]" />

            <div className="absolute left-0 bottom-0 w-72 h-72 bg-red-500/10 blur-[120px]" />

            <div className="relative">
              <h2 className="text-5xl font-black">
                Ready To Unlock

                <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                  Everything?
                </span>
              </h2>

              <p className="mt-6 text-zinc-400 max-w-2xl mx-auto leading-8">
                Join thousands of fans already enjoying premium creators,
                exclusive videos, private chats and unforgettable live
                experiences.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">
                <button className="px-10 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black hover:scale-105 transition-all">
                  Start Your Free Trial
                </button>

                <button className="px-10 py-5 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-400 transition-all">
                  Explore Membership
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}