import {
  FaXTwitter,
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function Footer() {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        "Discover Creators",
        "Live Streams",
        "Membership",
        "Become a Creator",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact",
        "Billing",
        "Report Abuse",
      ],
    },
    {
      title: "Legal",
      links: [
        "Terms of Service",
        "Privacy Policy",
        "2257 Compliance",
        "Cookie Policy",
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#050505] border-t border-yellow-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Brand */}

          <div className="lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-black text-2xl font-black">
                BT
              </div>

              <div>
                <h2 className="text-3xl font-black">
                  Bryson Tyler
                </h2>

                <p className="text-yellow-400 text-xs tracking-[0.35em] uppercase">
                  Productions
                </p>
              </div>
            </div>

            <p className="mt-8 text-zinc-400 leading-8 max-w-md">
              Premium creator experiences featuring exclusive videos,
              livestreams, private messaging and members-only content
              delivered in a modern, secure platform.
            </p>

            <div className="mt-10">
              <h4 className="font-bold mb-4">
                Stay Updated
              </h4>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 rounded-l-2xl bg-white/5 border border-white/10 px-5 py-4 outline-none"
                />

                <button className="px-8 rounded-r-2xl bg-yellow-400 text-black font-black">
                  Join
                </button>
              </div>
            </div>

            <div className="flex gap-5 mt-10">
              {[FaInstagram, FaXTwitter, FaYoutube, FaDiscord].map(
                (Icon, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-yellow-400 hover:text-black transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Icon />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Links */}

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-black uppercase tracking-[0.25em] text-yellow-400 text-xs mb-8">
                {section.title}
              </h3>

              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-zinc-500 hover:text-yellow-300 transition-all"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Bar */}

        <div className="mt-20 rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-yellow-400">
                12K+
              </div>

              <p className="text-zinc-500 uppercase text-xs mt-2">
                Active Members
              </p>
            </div>

            <div>
              <div className="text-4xl font-black text-yellow-400">
                4.9★
              </div>

              <p className="text-zinc-500 uppercase text-xs mt-2">
                User Rating
              </p>
            </div>

            <div>
              <div className="text-4xl font-black text-yellow-400">
                24/7
              </div>

              <p className="text-zinc-500 uppercase text-xs mt-2">
                New Content
              </p>
            </div>

            <div>
              <div className="flex justify-center">
                <FaLock
                  size={40}
                  className="text-yellow-400"
                />
              </div>

              <p className="text-zinc-500 uppercase text-xs mt-2">
                Secure Payments
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col lg:flex-row justify-between items-center gap-8">
          <p className="text-zinc-500 text-sm text-center lg:text-left">
            © 2026{" "}
            <span className="text-yellow-400">
              Bryson Tyler Productions
            </span>
            . All Rights Reserved. Adults 18+ Only.
          </p>

          <div className="flex gap-5 text-4xl text-zinc-500">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>
    </footer>
  );
}