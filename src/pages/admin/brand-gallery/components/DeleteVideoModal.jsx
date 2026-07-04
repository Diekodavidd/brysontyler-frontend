import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

export default function DeleteVideoModal({
  open,
  video,
  onClose,
  onConfirm,
  loading = false,
}) {
  if (!open || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">

      <div className="relative w-full max-w-lg rounded-[32px] border border-red-500/20 bg-[#090909] p-8">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute right-6 top-6 rounded-full bg-white/5 p-2 hover:bg-red-500 transition"
        >
          <X size={18} />
        </button>

        {/* Icon */}

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">

          <AlertTriangle
            size={40}
            className="text-red-500"
          />

        </div>

        {/* Title */}

        <h2 className="mt-8 text-center text-3xl font-black">

          Delete Video?

        </h2>

        <p className="mt-4 text-center text-zinc-400 leading-7">

          You're about to permanently remove

          <span className="block mt-2 font-bold text-white">

            "{video.title}"

          </span>

          from the Bryson Tyler gallery.

          <br />

          This action cannot be undone.

        </p>

        {/* Thumbnail */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">

        <img
  src={video.thumbnail || "/placeholder.jpg"}
  alt={video.title}
  className="h-52 w-full object-cover"
/>

        </div>

        {/* Info */}

        <div className="mt-6 flex justify-between text-sm">

          <div>

            <p className="text-zinc-500">
              Membership
            </p>

          <p className="mt-1 font-bold uppercase">
  {video.membership?.toUpperCase()}
</p>

          </div>

          <div>

            <p className="text-zinc-500">
              Category
            </p>

            <p className="mt-1 font-bold">
              {video.category}
            </p>

          </div>

          <div>

            <p className="text-zinc-500">
              Views
            </p>
<p className="mt-1 font-bold">
  {(video.views || 0).toLocaleString()}
</p>

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 font-bold hover:border-white/20 transition"
          >

            Cancel

          </button>

          <button
            disabled={loading}
            onClick={() => onConfirm(video)}
            className="flex-1 rounded-2xl bg-red-600 py-4 font-black text-white hover:bg-red-500 transition flex items-center justify-center gap-3 disabled:opacity-50"
          >

            <Trash2 size={18} />

            {loading ? "Deleting..." : "Delete Video"}

          </button>

        </div>

      </div>

    </div>
  );
}