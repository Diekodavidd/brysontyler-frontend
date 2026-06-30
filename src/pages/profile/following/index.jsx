import { Star, ChevronRight } from "lucide-react";
import Image from "@/compat/Image";

export default function FollowingPage() {
  const subscriptions = [
    {
      id: 1,
      name: "Elena Rivers",
      handle: "@elena",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      tier: "Elite Member",
    },
    {
      id: 2,
      name: "Marcus Thorne",
      handle: "@marcus",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      tier: "VIP Access",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tighter">
          My Subscriptions
        </h2>

        <p className="mt-1 text-xs font-bold uppercase tracking-widest text-zinc-500">
          Active premium access & content tiers
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition-all hover:border-yellow-500/50"
          >
            <div className="relative h-40 w-full">
              <Image
                src={sub.image}
                alt={sub.name}
                fill
                className="object-cover opacity-60 transition-opacity group-hover:opacity-100"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
            </div>

            <div className="relative z-10 -mt-10 p-6">
              <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-2xl border-4 border-zinc-900 shadow-xl">
                <Image
                  src={sub.image}
                  alt={sub.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-black">{sub.name}</h3>

                  <p className="text-xs font-bold uppercase text-zinc-400">
                    {sub.handle}
                  </p>
                </div>

                <div className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1">
                  <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-500">
                    <Star size={10} fill="currentColor" />
                    {sub.tier}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-800 py-3 text-xs font-bold uppercase tracking-widest transition-all hover:bg-zinc-700">
                View Content
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}