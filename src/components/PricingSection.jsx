import { motion } from "framer-motion";
import { Check, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Fan",
    price: "Free",
    popular: false,
    button: "Explore Platform",
    features: [
      "Browse Creators",
      "View Creator Profiles",
      "Watch Preview Content",
      "Follow Creators",
      "Save Favorites",
      "Receive Notifications",
    ],
  },
  {
    name: "VIP",
    price: "$14.99",
    popular: true,
    button: "Start Free Trial",
    features: [
      "Everything in Fan",
      "Unlimited Premium Videos",
      "HD Streaming",
      "Unlimited Livestreams",
      "Private Messaging",
      "Daily Uploads",
      "Download Videos",
      "Cancel Anytime",
    ],
  },
  {
    name: "Elite",
    price: "$29.99",
    popular: false,
    button: "Become Elite",
    features: [
      "Everything in VIP",
      "Exclusive Video Drops",
      "VIP Badge",
      "Priority Replies",
      "Private Calls",
      "Behind The Scenes",
      "Early Access",
      "Premium Support",
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_60%)]" />

      <div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-yellow-500/10 blur-[180px]" />

      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-red-500/10 blur-[180px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 text-xs font-black uppercase tracking-[0.3em]">
            <Sparkles size={14} />
            MEMBERSHIP
          </span>

          <h2 className="mt-8 text-5xl lg:text-7xl font-black">
            Choose Your

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          <p className="mt-8 max-w-3xl mx-auto text-zinc-400 text-lg leading-8">
            Unlock exclusive creators, premium videos,
            private messaging and unforgettable livestreams.
          </p>
        </motion.div>

        {/* Pricing Cards */}

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-[36px] overflow-hidden border transition-all duration-500 ${
                plan.popular
                  ? "scale-105 border-yellow-400 shadow-[0_0_80px_rgba(250,204,21,.15)] bg-gradient-to-b from-yellow-500/10 to-[#0d0d0d]"
                  : "border-white/10 bg-[#0a0a0a]"
              }`}
            >
              {plan.popular && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />

                  <div className="absolute top-6 right-6">
                    <div className="flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2 text-black text-xs font-black uppercase">
                      <Crown size={15} />
                      Most Popular
                    </div>
                  </div>
                </>
              )}

              <div className="p-10 relative z-10">
                <h3 className="text-3xl font-black">{plan.name}</h3>

                <div className="mt-8">
                  <span className="text-6xl font-black">
                    {plan.price}
                  </span>

                  {plan.price !== "Free" && (
                    <span className="text-zinc-500 ml-2">
                      /month
                    </span>
                  )}
                </div>

                              <button
                  className={`w-full mt-10 py-5 rounded-2xl font-black transition-all duration-300 ${
                    plan.popular
                      ? "bg-yellow-400 text-black hover:scale-105"
                      : "bg-white/5 border border-white/10 hover:border-yellow-400"
                  }`}
                >
                  {plan.button}
                </button>

                <div className="mt-10 space-y-5">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          plan.popular
                            ? "bg-yellow-400/20"
                            : "bg-white/5"
                        }`}
                      >
                        <Check
                          size={16}
                          className={
                            plan.popular
                              ? "text-yellow-300"
                              : "text-green-400"
                          }
                        />
                      </div>

                      <span className="text-zinc-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statistics */}

        <div className="grid md:grid-cols-4 gap-8 mt-28">
          {[
            ["12K+", "Active Members"],
            ["3M+", "Videos Watched"],
            ["98%", "Member Satisfaction"],
            ["24/7", "Fresh Content"],
          ].map(([number, label]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl py-10 text-center"
            >
              <h3 className="text-5xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                {number}
              </h3>

              <p className="mt-4 uppercase tracking-[0.25em] text-xs text-zinc-500 font-bold">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <div className="rounded-[40px] overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-[#101010] via-[#090909] to-[#111111] p-16 text-center">
            <h2 className="text-5xl lg:text-6xl font-black">
              Ready To Unlock

              <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                The Full Experience?
              </span>
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg leading-8">
              Join thousands of members already enjoying
              exclusive videos, premium livestreams,
              private messaging and VIP experiences.
            </p>

            <button 
                            onClick={() => push("/signup?role=fan")}

            className="mt-10 px-12 py-5 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black text-lg hover:scale-105 transition-all">
              START YOUR 7-DAY FREE TRIAL
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}