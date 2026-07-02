import {
  Gift,
  DollarSign,
  Crown,
  Sparkles,
  Clock3,
} from "lucide-react";

export default function TipsFeed({ tips = [] }) {
  return (
    <div className="rounded-[34px] bg-zinc-900 border border-white/5 overflow-hidden h-[700px] flex flex-col">

      {/* Header */}

      <div className="p-8 border-b border-white/5 flex items-center justify-between">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-pink-400">
            Live Revenue
          </p>

          <h2 className="text-3xl font-black mt-2">
            Tips Feed
          </h2>

        </div>

        <div className="rounded-full bg-pink-500/10 text-pink-400 px-5 py-2 text-sm font-black">

          {tips.length} Tips

        </div>

      </div>

      {/* Feed */}

      <div className="flex-1 overflow-y-auto p-6 space-y-5">

        {!tips.length && (

          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">

            <Gift
              size={60}
              className="text-zinc-700 mb-6"
            />

            <h3 className="text-2xl font-black text-white">

              No Tips Yet

            </h3>

            <p className="mt-3 max-w-sm">

              Tips sent by your viewers will
              appear here instantly during
              your live stream.

            </p>

          </div>

        )}

        {tips.map((tip) => (

          <div
            key={tip._id}
            className="rounded-3xl bg-black border border-white/5 p-6 hover:border-pink-500/30 transition"
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <img
                  src={
                    tip.user?.profilePicture ||
                    "/avatar.png"
                  }
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <div className="flex items-center gap-2">

                    <h3 className="font-black text-lg">

                      {tip.user?.name ||
                        "Anonymous"}

                    </h3>

                    {tip.user?.verified && (

                      <Crown
                        size={16}
                        className="text-yellow-400"
                      />

                    )}

                  </div>

                  <p className="text-zinc-500 mt-2">

                    {tip.message ||
                      "Sent you a tip ❤️"}

                  </p>

                  <div className="flex items-center gap-2 mt-4 text-xs text-zinc-600">

                    <Clock3 size={13} />

                    {new Date(
                      tip.createdAt
                    ).toLocaleTimeString()}

                  </div>

                </div>

              </div>

              <div className="text-right">

                <div className="rounded-2xl bg-green-500/10 text-green-400 px-5 py-3 flex items-center gap-2">

                  <DollarSign size={18} />

                  <span className="font-black text-xl">

                    {tip.amount}

                  </span>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-white/5 p-6">

        <div className="rounded-3xl bg-black border border-white/5 p-6 flex justify-between items-center">

          <div>

            <p className="uppercase text-xs tracking-[.3em] text-zinc-500">

              Total Tips

            </p>

            <h2 className="text-4xl font-black mt-3 text-green-400">

              $
              {tips
                .reduce(
                  (sum, tip) =>
                    sum + (tip.amount || 0),
                  0
                )
                .toLocaleString()}

            </h2>

          </div>

          <div className="w-20 h-20 rounded-full bg-pink-500/10 flex items-center justify-center">

            <Sparkles
              size={36}
              className="text-pink-400"
            />

          </div>

        </div>

      </div>

    </div>
  );
}