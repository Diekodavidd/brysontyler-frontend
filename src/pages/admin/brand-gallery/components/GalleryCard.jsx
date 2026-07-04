import {
  Eye,
  Pencil,
  Trash2,
  Crown,
  Star,
  PlayCircle,
  Clock3,
} from "lucide-react";

export default function GalleryCard({
  video,
  onPreview,
  onDelete,
  onEdit,
}) {
  const membershipStyles = {
    free: "bg-green-500/10 text-green-400 border-green-500/20",
    vip: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    elite: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const badge =
    membershipStyles[
      video.membership?.toLowerCase()
    ] || membershipStyles.free;

  return (
    <div className="group overflow-hidden rounded-[30px] border border-white/5 bg-[#090909] transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/30">

      {/* Thumbnail */}

<div
    onClick={() => onPreview(video)}
    className="relative aspect-[16/10] overflow-hidden cursor-pointer"
>
  {video.previewUrl ? (

    <video
      src={video.previewUrl}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
    />

  ) : (

    <img
      src={video.thumbnail}
      alt={video.title}
      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
    />

  )}

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

  {/* rest of your badges */}

</div>

      {/* Content */}

      <div className="p-6">

        <h3 className="line-clamp-1 text-xl font-black">

          {video.title}

        </h3>

        <div className="mt-3 flex items-center justify-between">

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">

            {video.category}

          </span>

          <div className="flex items-center gap-2 text-zinc-500 text-sm">

            <Eye size={15} />

            {video.views?.toLocaleString()}

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-6 grid grid-cols-3 gap-3">

          <button
    onClick={() => onPreview(video)}
    className="rounded-xl bg-amber-500 py-3 font-bold text-black"
>
    View Details
</button>
            

          <button
            onClick={() => onEdit?.(video)}
            className="rounded-xl border border-white/10 py-3 transition hover:border-amber-500 hover:text-amber-400"
          >
            <Pencil
              size={18}
              className="mx-auto"
            />
          </button>

          <button
            onClick={() => onDelete(video)}
            className="rounded-xl border border-red-500/20 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <Trash2
              size={18}
              className="mx-auto"
            />
          </button>

        </div>

      </div>

    </div>
  );
}