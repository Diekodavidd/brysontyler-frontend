import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel my membership anytime?",
    answer:
      "Yes. You can cancel your subscription whenever you like. There are no long-term contracts or hidden fees.",
  },
  {
    question: "Are my payments secure?",
    answer:
      "Absolutely. All payments are processed securely using encrypted payment providers to protect your information.",
  },
  {
    question: "Can I watch on my phone or tablet?",
    answer:
      "Yes. The platform works perfectly on desktop, tablet, and mobile devices.",
  },
  {
    question: "How often is new content uploaded?",
    answer:
      "Creators upload fresh content regularly, including exclusive videos, livestreams, and premium posts.",
  },
  {
    question: "Can I message creators privately?",
    answer:
      "VIP and Elite members can privately message creators depending on their subscription benefits.",
  },
  {
    question: "What happens after my free trial?",
    answer:
      "After your trial ends, your selected membership begins automatically unless cancelled beforehand.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_60%)]" />

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex px-5 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 text-xs font-black tracking-[0.3em] uppercase">
            FAQ
          </span>

          <h2 className="mt-8 text-5xl lg:text-7xl font-black">
            Frequently Asked

            <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full px-8 py-7 flex justify-between items-center text-left"
              >
                <span className="text-lg font-bold">{faq.question}</span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="px-8 pb-8 text-zinc-400 leading-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}