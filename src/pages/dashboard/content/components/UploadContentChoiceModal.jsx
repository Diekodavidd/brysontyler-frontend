import {
  X,
  Video,
  Image as ImageIcon,
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

      <div className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-zinc-950 p-6 sm:p-8">

        {/* HEADER */}

        <div className="flex items-start justify-between mb-8">

          <div>

            <p className="text-xs uppercase tracking-[.3em] text-yellow-400 font-black">
              Creator Studio
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              What do you want to upload?
            </h2>

            <p className="text-zinc-500 mt-3">
              Choose the type of content you want to add
              to your content library.
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 shrink-0 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center transition"
          >
            <X size={20} />
          </button>

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

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-blue-500/10
              text-blue-400
              flex
              items-center
              justify-center
              group-hover:bg-blue-500/20
            ">
              <Video size={26} />
            </div>

            <h3 className="text-xl font-black mt-6">
              Upload Video
            </h3>

            <p className="text-sm text-zinc-500 mt-3 leading-6">
              Upload a video with a thumbnail,
              preview clip, visibility and pricing.
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

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-pink-500/10
              text-pink-400
              flex
              items-center
              justify-center
              group-hover:bg-pink-500/20
            ">
              <ImageIcon size={26} />
            </div>

            <h3 className="text-xl font-black mt-6">
              Upload Photos
            </h3>

            <p className="text-sm text-zinc-500 mt-3 leading-6">
              Upload one or multiple images for
              your fans and subscribers.
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}