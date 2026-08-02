import {
  X,
  Video,
  Images,
  ArrowRight,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export default function UploadContentChoiceModal({
  open,
  onClose,
  onSelectVideo,
  onSelectImages,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">

      <div
        className="
          relative
          w-full
          max-w-4xl
          max-h-[92vh]
          overflow-y-auto
          rounded-[34px]
          border
          border-white/10
          bg-[#090909]
          shadow-2xl
        "
      >

        {/* Close */}

        <button
          onClick={onClose}
          className="
            sticky
            top-5
            ml-auto
            mr-5
            mt-5
            z-50
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-white/10
            backdrop-blur
            hover:bg-red-500
            transition
          "
        >
          <X size={20} />
        </button>

        <div className="px-6 pb-8 lg:px-10 lg:pb-10">

          <p className="uppercase tracking-[.35em] text-[11px] font-black text-amber-400">
            Brand Gallery
          </p>

          <h2 className="mt-3 text-3xl lg:text-4xl font-black">
            Upload New Content
          </h2>

          <p className="mt-4 max-w-3xl text-zinc-500 leading-7">
            Choose what you'd like to upload. To make uploads much faster and
            more reliable, we recommend splitting long videos into multiple
            parts instead of uploading one very large file.
          </p>

          {/* Recommendation */}

          <div className="mt-8 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent p-6">

            <div className="flex gap-4 items-start">

              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center shrink-0">
                <Lightbulb
                  size={22}
                  className="text-amber-400"
                />
              </div>

              <div className="flex-1">

                <p className="uppercase tracking-[.3em] text-[11px] font-black text-amber-400">
                  Recommended Workflow
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Split Long Videos Into Parts
                </h3>

                <p className="mt-4 text-zinc-400 leading-7">
                  Instead of uploading one 40–60 minute video, upload it in
                  multiple shorter episodes.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">

                  {[
                    "Uploads finish much faster",
                    "Much lower chance of failed uploads",
                    "Fans stay engaged longer",
                    "Easy to organize future releases",
                  ].map((tip) => (
                    <div
                      key={tip}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-amber-400 shrink-0"
                      />

                      <span className="text-sm text-zinc-300">
                        {tip}
                      </span>
                    </div>
                  ))}

                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">

                  <p className="font-bold text-amber-400">
                    Example
                  </p>

                  <div className="mt-3 space-y-2 text-sm text-zinc-300">

                    <p>
                      Dubai Vacation — <strong>Part 1</strong> (15 mins)
                    </p>

                    <p>
                      Dubai Vacation — <strong>Part 2</strong> (10 mins)
                    </p>

                    <p>
                      Dubai Vacation — <strong>Part 3</strong> (8 mins)
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Upload Choices */}

          <div className="mt-10 grid gap-6 md:grid-cols-2">

            <button
              onClick={() => {
                onClose();
                onSelectVideo();
              }}
              className="group rounded-[30px] border border-white/10 bg-white/[0.02] p-7 text-left transition hover:border-amber-500/50 hover:bg-amber-500/5"
            >

              <div className="flex justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">

                  <Video size={28} />

                </div>

                <ArrowRight className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-amber-400" />

              </div>

              <h3 className="mt-7 text-2xl font-black">
                Upload Video
              </h3>

              <p className="mt-3 text-zinc-500 leading-7">
                Upload videos with thumbnails, preview clips, membership
                restrictions and pricing.
              </p>

            </button>

            <button
              onClick={() => {
                onClose();
                onSelectImages();
              }}
              className="group rounded-[30px] border border-white/10 bg-white/[0.02] p-7 text-left transition hover:border-amber-500/50 hover:bg-amber-500/5"
            >

              <div className="flex justify-between">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">

                  <Images size={28} />

                </div>

                <ArrowRight className="text-zinc-600 transition group-hover:translate-x-1 group-hover:text-amber-400" />

              </div>

              <h3 className="mt-7 text-2xl font-black">
                Upload Images
              </h3>

              <p className="mt-3 text-zinc-500 leading-7">
                Upload one or multiple photos to create premium image galleries.
              </p>

            </button>

          </div>

          <div className="mt-10 flex justify-end">

            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 px-7 py-3 font-bold hover:bg-white/10 transition"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}