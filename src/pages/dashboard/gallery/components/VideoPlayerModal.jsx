import {
  X,
  Play,
  Clock3,
  Eye,
  Crown,
  Calendar,
  Tag,
} from "lucide-react";

export default function VideoPlayerModal({
  open,
  video,
  onClose,
}) {
  if (!open || !video) return null;

  const badge = {
    free:
      "bg-green-500/10 text-green-400 border-green-500/20",

    vip:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    elite:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const current =
    badge[
      video.membership?.toLowerCase()
    ] || badge.free;

  return (
    <div className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-xl flex items-center justify-center text-3xl lg:text-5xl">

      <div className="relative w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-[36px] bg-[#090909] border border-white/10">

        {/* Close */}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10
h-10
lg:w-12
lg:h-12 rounded-full bg-black/60 hover:bg-red-600 transition flex items-center justify-center"
        >
          <X size={18}/>
        </button>

        {/* VIDEO */}

        <div className="aspect-video bg-black">

          <video
            src={video.fileUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />

        </div>

        {/* BODY */}

        <div className="p-5
lg:p-10">

          <div className="grid lg:grid-cols-[2fr_1fr] gap-12">

            {/* LEFT */}

            <div>

              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[.3em] ${current}`}
              >

                <Crown size={15}/>

                {video.membership}

              </div>

              <h1 className="mt-6 text-3xl lg:text-5xl font-black">

                {video.title}

              </h1>

              <p className="mt-6 text-zinc-400 leading-8 text-base lg:text-lg">

                {video.description ||
                  "No description provided."}

              </p>


              {/* {video.previewUrl && (

                <div className="mt-12">

                  <h3 className="text-xl font-black mb-5">

                    Preview Trailer

                  </h3>

                  <video
                    src={video.previewUrl}
                    controls
                    className="rounded-3xl w-full border border-white/10"
                  />

                </div>

              )} */}

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

              <img
                src={video.thumbnail}
                alt={video.title}
                className="rounded-3xl w-full object-cover border border-white/10"
              />

              <div className="rounded-3xl bg-black border border-white/10 p-5 lg:p-6">

                <h3 className="text-xl font-black mb-6">

                  Details

                </h3>

                <div className="space-y-5">

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-500 flex items-center gap-2">

                      <Tag size={15}/>

                      Category

                    </span>

                    <span className="font-bold">

                      {video.category}

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-500 flex items-center gap-2">

                      <Clock3 size={15}/>

                      Duration

                    </span>

                    <span className="font-bold">

                      {video.duration || 0}s

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-500 flex items-center gap-2">

                      <Eye size={15}/>

                      Views

                    </span>

                    <span className="font-bold">

                      {(video.views || 0).toLocaleString()}

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-500 flex items-center gap-2">

                      <Calendar size={15}/>

                      Uploaded

                    </span>

                    <span className="font-bold">

                      {new Date(
                        video.createdAt
                      ).toLocaleDateString()}

                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-zinc-500">

                      Membership

                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-black uppercase ${current}`}
                    >
                      {video.membership}
                    </span>

                  </div>

                </div>

              </div>

              <button
                onClick={onClose}
                className="w-full rounded-2xl border border-white/10 py-4 hover:border-yellow-500 transition"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}