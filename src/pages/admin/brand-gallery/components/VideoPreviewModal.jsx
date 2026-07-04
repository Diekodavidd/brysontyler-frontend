import {
  X,
  Eye,
  Clock3,
  Crown,
  Play,
} from "lucide-react";

export default function VideoPreviewModal({
  open,
  video,
  onClose,
}) {
  if (!open || !video) return null;

  const badgeColors = {
    free: "bg-green-500/10 text-green-400 border-green-500/20",
    vip: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    elite: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const badge =
    badgeColors[
      video?.membership?.toLowerCase()
    ] || badgeColors.free;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-8">

<div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 bg-[#090909]">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 rounded-full bg-black/60 p-3 hover:bg-red-500 transition"
        >
          <X size={20} />
        </button>

    <div className="grid lg:grid-cols-3 gap-6 p-8">

    {/* COVER */}

    <div>

        <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
            Cover Image
        </p>

        <img
            src={video.thumbnail}
            alt={video.title}
            className="aspect-video w-full rounded-2xl object-cover border border-white/10"
        />

    </div>

    {/* PREVIEW */}

    <div>

        <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
            Preview Clip
        </p>

        <video
            src={video.previewUrl}
            controls
            className="aspect-video w-full rounded-2xl border border-white/10 bg-black"
        />

    </div>

    {/* FULL VIDEO */}

    <div>

        <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
            Full Video
        </p>

        <video
            src={video.fileUrl}
            controls
            className="aspect-video w-full rounded-2xl border border-white/10 bg-black"
        />

    </div>

</div>

        <div className="p-8">

          <div className="flex items-start justify-between gap-10">

            <div className="flex-1">

              <div
                className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest ${badge}`}
              >
                {video?.membership?.toUpperCase()}
              </div>

              <h2 className="mt-5 text-4xl font-black">
                {video?.title}
              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-zinc-400">
                {video?.description ||
                  "No description provided."}
              </p>

            </div>

          </div>

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Category
              </p>

              <h3 className="mt-3 font-bold">
                {video?.category}
              </h3>

            </div>

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Duration
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold">
                <Clock3 size={15} />
                {video?.duration
                  ? `${video.duration}s`
                  : "-"}
              </h3>

            </div>

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Views
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold">
                <Eye size={15} />
                {(video?.views ?? 0).toLocaleString()}
              </h3>

            </div>

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Access
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold uppercase">
                <Crown size={15} />
                {video?.membership?.toUpperCase()}
              </h3>

            </div>

          </div>

          <div className="mt-10 flex justify-end">

            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold hover:border-amber-500 transition"
            >
              Close
            </button>

          </div>
<div className="mt-10 flex gap-4">

    <button className="rounded-xl border border-white/10 px-6 py-3">
        Edit Video
    </button>

    <button className="rounded-xl bg-red-600 px-6 py-3">
        Delete Video
    </button>

    <button className="rounded-xl bg-amber-500 px-6 py-3 text-black">
        Toggle Featured
    </button>

</div>
        </div>

      </div>

    </div>
  );
}