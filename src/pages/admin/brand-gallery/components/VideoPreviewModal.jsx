import {
  X,
  Eye,
  Clock3,
  Crown,
  Image as ImageIcon,
  Images,
  PlayCircle,
} from "lucide-react";

export default function VideoPreviewModal({
  open,
  video,
  onClose,
  onDelete,
}){
  if (!open || !video) return null;

  const isImage =
    video?.mediaType === "image";

  const isVideo =
    video?.mediaType === "video";

  const images =
    Array.isArray(video?.images)
      ? video.images
      : [];

  const badgeColors = {
    free:
      "bg-green-500/10 text-green-400 border-green-500/20",

    vip:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    elite:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const badge =
    badgeColors[
      video?.membership?.toLowerCase()
    ] || badgeColors.free;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm">

      <div className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#090909]">

        {/* ================================================= */}
        {/* CLOSE */}
        {/* ================================================= */}

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-50 rounded-full bg-black/80 p-3 transition hover:bg-red-500"
        >
          <X size={20} />
        </button>

        {/* ================================================= */}
        {/* MEDIA */}
        {/* ================================================= */}

        <div className="bg-black p-5 sm:p-8">

          {/* =============================================== */}
          {/* IMAGE GALLERY */}
          {/* =============================================== */}

          {isImage ? (

            <div>

              <div className="mb-5 flex items-center gap-3">

                <ImageIcon
                  className="text-amber-500"
                  size={20}
                />

                <div>

                  <p className="text-xs uppercase tracking-[.3em] text-zinc-500">
                    Image Gallery
                  </p>

                  <p className="mt-1 text-sm text-zinc-400">

                    {images.length}{" "}
                    {images.length === 1
                      ? "image"
                      : "images"}

                  </p>

                </div>

              </div>

              {images.length > 0 ? (

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                  {images.map(
                    (image, index) => (

                      <div
                        key={
                          image.storageKey ||
                          image.cloudinaryId ||
                          index
                        }
                        className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
                      >

                        <img
                          src={image.url}
                          alt={`${video.title} ${index + 1}`}
                          className="aspect-square w-full object-cover transition duration-500 hover:scale-105"
                        />

                      </div>

                    )
                  )}

                </div>

              ) : (

                <div className="flex min-h-[400px] items-center justify-center">

                  <div className="text-center">

                    <ImageIcon
                      size={70}
                      className="mx-auto text-zinc-700"
                    />

                    <p className="mt-4 text-zinc-500">
                      No gallery images found.
                    </p>

                  </div>

                </div>

              )}

            </div>

          ) : (

            /* =============================================== */
            /* VIDEO */
            /* =============================================== */

            <div className="grid gap-6 lg:grid-cols-3">

              {/* COVER */}

              <div>

                <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
                  Cover Image
                </p>

                {video.thumbnail ? (

                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="aspect-video w-full rounded-2xl border border-white/10 object-cover"
                  />

                ) : (

                  <div className="flex aspect-video items-center justify-center rounded-2xl bg-zinc-900">

                    <ImageIcon
                      size={60}
                      className="text-zinc-700"
                    />

                  </div>

                )}

              </div>

              {/* PREVIEW */}

              <div>

                <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
                  Preview Clip
                </p>

                {video.previewUrl ? (

                  <video
                    src={video.previewUrl}
                    controls
                    className="aspect-video w-full rounded-2xl border border-white/10 bg-black"
                  />

                ) : (

                  <div className="flex aspect-video items-center justify-center rounded-2xl bg-zinc-900">

                    <PlayCircle
                      size={60}
                      className="text-zinc-700"
                    />

                  </div>

                )}

              </div>

              {/* FULL VIDEO */}

              <div>

                <p className="mb-3 text-xs uppercase tracking-[.3em] text-zinc-500">
                  Full Video
                </p>

                {video.fileUrl ? (

                  <video
                    src={video.fileUrl}
                    controls
                    className="aspect-video w-full rounded-2xl border border-white/10 bg-black"
                  />

                ) : (

                  <div className="flex aspect-video items-center justify-center rounded-2xl bg-zinc-900">

                    <PlayCircle
                      size={60}
                      className="text-zinc-700"
                    />

                  </div>

                )}

              </div>

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* DETAILS */}
        {/* ================================================= */}

        <div className="p-6 sm:p-8">

          {/* BADGE */}

          <div className="flex items-start justify-between gap-10">

            <div className="flex-1">

              <div
                className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest ${badge}`}
              >
                {video?.membership?.toUpperCase() ||
                  "FREE"}
              </div>

              <h2 className="mt-5 text-3xl font-black sm:text-4xl">

                {video?.title}

              </h2>

              <p className="mt-5 max-w-3xl leading-8 text-zinc-400">

                {video?.description ||
                  "No description provided."}

              </p>

            </div>

          </div>

          {/* ================================================= */}
          {/* INFO */}
          {/* ================================================= */}

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4">

            {/* CATEGORY */}

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Category
              </p>

              <h3 className="mt-3 font-bold">

                {video?.category ||
                  "General"}

              </h3>

            </div>

            {/* DURATION */}

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Duration
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold">

                <Clock3 size={15} />

                {isImage
                  ? "N/A"
                  : video?.duration
                    ? `${video.duration}s`
                    : "-"}

              </h3>

            </div>

            {/* VIEWS */}

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Views
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold">

                <Eye size={15} />

                {(video?.views ?? 0).toLocaleString()}

              </h3>

            </div>

            {/* ACCESS */}

            <div className="rounded-2xl bg-black/40 p-5">

              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Access
              </p>

              <h3 className="mt-3 flex items-center gap-2 font-bold uppercase">

                <Crown size={15} />

                {video?.membership?.toUpperCase() ||
                  "FREE"}

              </h3>

            </div>

          </div>

          {/* ================================================= */}
          {/* MEDIA TYPE */}
          {/* ================================================= */}

          <div className="mt-6 rounded-2xl border border-white/5 bg-black/40 p-5">

            <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
              Content Type
            </p>

            <div className="mt-3 flex items-center gap-3 font-bold">

              {isImage ? (
                <ImageIcon
                  size={18}
                  className="text-amber-500"
                />
              ) : (
                <PlayCircle
                  size={18}
                  className="text-amber-500"
                />
              )}

              {isImage
                ? `Image Gallery (${images.length} ${
                    images.length === 1
                      ? "image"
                      : "images"
                  })`
                : "Video"}

            </div>

          </div>

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div className="mt-10 flex flex-wrap gap-4">

            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-bold transition hover:border-amber-500"
            >
              Close
            </button>

            <button className="rounded-xl border border-white/10 px-6 py-3">

              Edit{" "}
              {isImage
                ? "Gallery"
                : "Video"}

            </button>

           <button
  onClick={() => onDelete(video)}
  className="rounded-xl bg-red-600 px-6 py-3"
>
  Delete {isImage ? "Gallery" : "Video"}
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