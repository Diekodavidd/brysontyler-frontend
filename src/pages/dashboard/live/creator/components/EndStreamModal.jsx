import {
  X,
  PhoneOff,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function EndStreamModal({
  open,
  loading = false,
  viewers = 0,
  duration = "00:00:00",
  earnings = 0,
  onCancel,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur flex items-center justify-center p-6">

      <div className="w-full max-w-xl rounded-[36px] bg-zinc-900 border border-white/5 overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between p-8 border-b border-white/5">

          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-red-500">
              Live Broadcast
            </p>

            <h2 className="text-4xl font-black mt-3">
              End Stream
            </h2>

          </div>

          <button
            onClick={onCancel}
            className="w-11 h-11 rounded-full bg-black hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <X />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="rounded-3xl bg-red-500/10 border border-red-500/20 p-6 flex gap-5">

            <AlertTriangle
              size={42}
              className="text-red-400 shrink-0"
            />

            <div>

              <h3 className="text-2xl font-black text-red-400">
                Are you sure?
              </h3>

              <p className="text-zinc-400 mt-3 leading-7">
                Ending your stream will immediately disconnect
                every viewer and stop tips, subscriptions and
                purchases. This action cannot be undone.
              </p>

            </div>

          </div>

          {/* Summary */}

          <div className="grid grid-cols-3 gap-5 mt-8">

            <div className="rounded-3xl bg-black border border-white/5 p-5">

              <p className="uppercase text-xs tracking-widest text-zinc-500">
                Viewers
              </p>

              <h3 className="text-3xl font-black mt-4">
                {viewers.toLocaleString()}
              </h3>

            </div>

            <div className="rounded-3xl bg-black border border-white/5 p-5">

              <p className="uppercase text-xs tracking-widest text-zinc-500">
                Duration
              </p>

              <h3 className="text-3xl font-black mt-4">
                {duration}
              </h3>

            </div>

            <div className="rounded-3xl bg-black border border-white/5 p-5">

              <p className="uppercase text-xs tracking-widest text-zinc-500">
                Earnings
              </p>

              <h3 className="text-3xl font-black mt-4 text-green-400">
                ${earnings}
              </h3>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-10">

            <button
              onClick={onCancel}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-bold transition"
            >
              Continue Streaming
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 font-black flex items-center gap-3 transition"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Ending...
                </>
              ) : (
                <>
                  <PhoneOff size={18} />
                  End Stream
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}