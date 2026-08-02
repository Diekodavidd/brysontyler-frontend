import {
  X,
  Video,
  Image as ImageIcon,
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">

      <div className="w-full max-w-3xl rounded-[32px] border border-white/10 bg-zinc-950 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">

        {/* HEADER */}

        <div className="flex items-start justify-between mb-8">

          <div>

            <p className="text-xs uppercase tracking-[.3em] text-yellow-400 font-black">
              Creator Studio
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              What do you want to upload?
            </h2>

            <p className="text-zinc-500 mt-3 leading-7">
              Choose the type of content you want to add to your content library.
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 shrink-0 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* CREATOR RECOMMENDATION */}

        <div className="mb-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-6">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-2xl bg-yellow-500/15 flex items-center justify-center shrink-0">
              <Lightbulb
                size={22}
                className="text-yellow-400"
              />
            </div>

            <div>

              <p className="uppercase tracking-[.3em] text-[11px] font-black text-yellow-400">
                Recommended
              </p>

              <h3 className="text-xl font-black mt-2">
                Split long videos into multiple parts
              </h3>

              <p className="text-zinc-400 mt-3 leading-7">
                Instead of uploading one long 40–60 minute video, upload it as
                <span className="font-bold text-white"> Part 1</span>,
                <span className="font-bold text-white"> Part 2</span>,
                <span className="font-bold text-white"> Part 3</span>, etc.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-5">

                {[
                  "Uploads finish much faster",
                  "Lower chance of failed uploads",
                  "Fans stay engaged for longer",
                  "Easier to organize future content",
                ].map((tip) => (
                  <div
                    key={tip}
                    className="flex items-center gap-2 text-sm text-zinc-300"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-yellow-400 shrink-0"
                    />

                    <span>{tip}</span>
                  </div>
                ))}

              </div>

              <div className="mt-5 rounded-2xl bg-black/40 border border-white/10 p-4">

                <p className="text-sm text-zinc-300 leading-7">

                  <span className="font-bold text-yellow-400">
                    Example
                  </span>

                  <br />

                  Dubai Vacation — <strong>Part 1</strong> (14 mins)

                  <br />

                  Dubai Vacation — <strong>Part 2</strong> (10 mins)

                  <br />

                  Dubai Vacation — <strong>Part 3</strong> (8 mins)

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* OPTIONS */}

        <div className="grid sm:grid-cols-2 gap-5">

          {/* VIDEO */}

          <button
            onClick={onSelectVideo}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-zinc-900
              p-6
              text-left
              transition
              hover:border-yellow-500/50
              hover:bg-yellow-500/5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-500/10
                text-blue-400
                flex
                items-center
                justify-center
                group-hover:bg-blue-500/20
              "
            >
              <Video size={26} />
            </div>

            <h3 className="text-xl font-black mt-6">
              Upload Video
            </h3>

            <p className="text-sm text-zinc-500 mt-3 leading-6">
              Upload premium videos with thumbnails, preview clips, pricing,
              visibility and memberships.
            </p>

          </button>

          {/* IMAGES */}

          <button
            onClick={onSelectImages}
            className="
              group
              rounded-3xl
              border
              border-white/10
              bg-zinc-900
              p-6
              text-left
              transition
              hover:border-pink-500/50
              hover:bg-pink-500/5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-pink-500/10
                text-pink-400
                flex
                items-center
                justify-center
                group-hover:bg-pink-500/20
              "
            >
              <ImageIcon size={26} />
            </div>

            <h3 className="text-xl font-black mt-6">
              Upload Photos
            </h3>

            <p className="text-sm text-zinc-500 mt-3 leading-6">
              Upload one or multiple premium images for your fans and subscribers.
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}