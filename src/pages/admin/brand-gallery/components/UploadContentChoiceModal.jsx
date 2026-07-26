import {
  X,
  Video,
  Images,
  ArrowRight,
} from "lucide-react";

export default function UploadContentChoiceModal({
  open,
  onClose,
  onSelectVideo,
  onSelectImages,
}) {
  if (!open) return null;

  const handleVideo = () => {
    onClose();
    onSelectVideo();
  };

  const handleImages = () => {
    onClose();
    onSelectImages();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">

      <div className="relative w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#090909] shadow-2xl">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            right-6
            top-6
            z-10
            rounded-full
            bg-white/5
            p-3
            text-zinc-400
            transition
            hover:bg-red-500
            hover:text-white
          "
        >
          <X size={20} />
        </button>


        {/* HEADER */}

        <div className="p-8 md:p-10">

          <p className="text-xs font-black uppercase tracking-[.3em] text-amber-500">
            Brand Gallery
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Upload Content
          </h2>

          <p className="mt-3 max-w-xl text-zinc-500">
            Choose the type of content you want to add to the
            Bryson Tyler gallery.
          </p>


          {/* OPTIONS */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            {/* VIDEO */}

            <button
              type="button"
              onClick={handleVideo}
              className="
                group
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.02]
                p-7
                text-left
                transition
                hover:border-amber-500/50
                hover:bg-amber-500/[0.04]
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-amber-500/10
                    text-amber-500
                  "
                >
                  <Video size={28} />
                </div>

                <ArrowRight
                  size={22}
                  className="
                    text-zinc-600
                    transition
                    group-hover:translate-x-1
                    group-hover:text-amber-500
                  "
                />

              </div>

              <h3 className="mt-7 text-2xl font-black">
                Upload Video
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                Upload a full video, preview clip and thumbnail
                for your gallery.
              </p>

              <div className="mt-6 text-xs font-black uppercase tracking-widest text-amber-500">
                Video Content
              </div>

            </button>


            {/* IMAGES */}

            <button
              type="button"
              onClick={handleImages}
              className="
                group
                rounded-[28px]
                border
                border-white/10
                bg-white/[0.02]
                p-7
                text-left
                transition
                hover:border-amber-500/50
                hover:bg-amber-500/[0.04]
              "
            >

              <div className="flex items-start justify-between">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-amber-500/10
                    text-amber-500
                  "
                >
                  <Images size={28} />
                </div>

                <ArrowRight
                  size={22}
                  className="
                    text-zinc-600
                    transition
                    group-hover:translate-x-1
                    group-hover:text-amber-500
                  "
                />

              </div>

              <h3 className="mt-7 text-2xl font-black">
                Upload Images
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                Upload one or multiple images and create a new
                gallery image collection.
              </p>

              <div className="mt-6 text-xs font-black uppercase tracking-widest text-amber-500">
                Image Gallery
              </div>

            </button>

          </div>


          {/* CANCEL */}

          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-7
                py-3
                font-bold
                text-zinc-300
                transition
                hover:border-white/20
                hover:bg-white/10
              "
            >
              Cancel
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}