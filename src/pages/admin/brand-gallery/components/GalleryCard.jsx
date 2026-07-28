import {
  Eye,
  Pencil,
  Trash2,
  PlayCircle,
  Image as ImageIcon,
  Images,
} from "lucide-react";

export default function GalleryCard({
  video,
  onPreview,
  onDelete,
  onEdit,
}) {

  
  const isImage =
    video?.mediaType === "image";

  const isVideo =
    video?.mediaType === "video";

  const images =
    Array.isArray(video?.images)
      ? video.images
      : [];

  const firstImage =
    images[0]?.url || null;

  const thumbnail =
    video?.thumbnail ||
    firstImage ||
    null;

  return (
    <div className="group overflow-hidden rounded-[30px] border border-white/5 bg-[#090909] transition-all duration-300 hover:-translate-y-2 hover:border-amber-500/30">

      {/* ================================================= */}
      {/* MEDIA */}
      {/* ================================================= */}

      <div
        onClick={() =>
          onPreview(video)
        }
        className="relative aspect-[16/10] overflow-hidden cursor-pointer bg-black"
      >

        {/* =============================== */}
        {/* IMAGE GALLERY */}
        {/* =============================== */}

        {isImage ? (

          thumbnail ? (

            <img
              src={thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

          ) : (

            <div className="flex h-full w-full items-center justify-center">

              <ImageIcon
                size={60}
                className="text-zinc-700"
              />

            </div>

          )

        ) : (

          /* =============================== */
          /* VIDEO */
          /* =============================== */

          video?.previewUrl ? (

            <video
              src={video.previewUrl}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

          ) : video?.thumbnail ? (

            <img
              src={video.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />

          ) : (

            <div className="flex h-full w-full items-center justify-center">

              <PlayCircle
                size={60}
                className="text-zinc-700"
              />

            </div>

          )

        )}

        {/* ================================================= */}
        {/* OVERLAY */}
        {/* ================================================= */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent pointer-events-none" />

        {/* ================================================= */}
        {/* MEDIA TYPE */}
        {/* ================================================= */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold uppercase backdrop-blur">

          {isImage ? (
            <ImageIcon size={14} />
          ) : (
            <PlayCircle size={14} />
          )}

          {isImage
            ? "Image Gallery"
            : "Video"}

        </div>

        {/* ================================================= */}
        {/* IMAGE COUNT */}
        {/* ================================================= */}

        {isImage &&
          images.length > 0 && (

            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/80 px-3 py-2 text-xs font-bold">

              <Images size={14} />

              {images.length}{" "}
              {images.length === 1
                ? "Image"
                : "Images"}

            </div>

          )}

      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div className="p-6">

        <h3 className="line-clamp-1 text-xl font-black">

          {video.title}

        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-zinc-500">

          {video.description ||
            "No description provided."}

        </p>

        <div className="mt-4 flex items-center justify-between">

          <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">

            {video.category ||
              "General"}

          </span>

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <Eye size={15} />

            {(video.views || 0).toLocaleString()}

          </div>

        </div>

        {/* ================================================= */}
        {/* BUTTONS */}
        {/* ================================================= */}

        <div className="mt-6 grid grid-cols-3 gap-3">

          <button
            onClick={() =>
              onPreview(video)
            }
            className="rounded-xl bg-amber-500 py-3 font-bold text-black transition hover:bg-amber-400"
          >
            View
          </button>

          <button
            onClick={() =>
              onEdit?.(video)
            }
            className="rounded-xl border border-white/10 py-3 transition hover:border-amber-500 hover:text-amber-400"
          >
            <Pencil
              size={18}
              className="mx-auto"
            />
          </button>

          <button
            onClick={() =>
              onDelete(video)
            }
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