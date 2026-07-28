import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Image,
  Film,
  PlayCircle,
  Loader2,
} from "lucide-react";

import { useUploadBrandVideo } from "@/hooks/useContent";

export default function UploadVideoModal({
  open,
  onClose,
}) {
const uploadMutation =
  useUploadBrandVideo();

const loading =
  uploadMutation.isPending;
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    membership: "free",
    brandCollection: "",
    featured: false,
  });

  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [thumbnail, setThumbnail] =
    useState(null);

  const [videoPreview, setVideoPreview] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");

  useEffect(() => {
    if (!open) {
      setForm({
        title: "",
        description: "",
        category: "",
        membership: "free",
        brandCollection: "",
        featured: false,
      });

      setVideo(null);
      setPreview(null);
      setThumbnail(null);

      setVideoPreview("");
      setThumbnailPreview("");
    }
  }, [open]);

  if (!open) return null;

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!video)
    return alert("Please upload a video.");

  if (!preview)
    return alert(
      "Please upload a preview video."
    );

  if (!thumbnail)
    return alert(
      "Please upload a thumbnail."
    );

  const data = new FormData();

  data.append("title", form.title);
  data.append(
    "description",
    form.description
  );
  data.append("category", form.category);
  data.append(
    "membership",
    form.membership
  );
  data.append(
    "brandCollection",
    form.brandCollection
  );
  data.append(
    "featured",
    String(form.featured)
  );

  data.append("ownerType", "brand");
  data.append("mediaType", "video");
  data.append("visibility", "free");

  data.append("video", video);
  data.append("preview", preview);
  data.append("thumbnail", thumbnail);

  uploadMutation.mutate(
    {
      data,
      onUploadProgress: (percent) => {
        console.log(
          `Upload Progress: ${percent}%`
        );

        // If you later add a progress bar:
        // setUploadProgress(percent);
      },
    },
    {
      onSuccess: () => {
        onClose();
      },

      onError: (err) => {
        console.error(err);
        alert(
          err?.response?.data?.error ||
            err.message ||
            "Upload failed."
        );
      },
    }
  );
};
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8">

      <div className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] bg-[#090909] border border-white/10">

        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-50 rounded-full bg-black/60 p-2 hover:bg-red-500 transition"
        >
          <X size={20} />
        </button>

        <div className="p-10">

          <p className="uppercase tracking-[.3em] text-xs font-black text-amber-500">

            Brand Gallery

          </p>

          <h2 className="text-4xl font-black mt-3">

            Upload New Video

          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-10 mt-10"
          >

            {/* Uploads */}

            <div className="grid lg:grid-cols-3 gap-6">

              {/* Video */}

              <label className="rounded-3xl border-2 border-dashed border-white/10 hover:border-amber-500 cursor-pointer p-6">

                <Film className="text-amber-500 mb-5" />

                <p className="font-bold">
                  Full Video
                </p>

                <p className="text-zinc-500 text-sm mt-2">

                  Upload full vlog

                </p>

                <input
                  hidden
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file =
                      e.target.files[0];

                    if (!file) return;

                    setVideo(file);

                    setVideoPreview(
                      URL.createObjectURL(file)
                    );
                  }}
                />

                {video && (
                  <video
                    controls
                    src={videoPreview}
                    className="mt-5 rounded-xl h-44 w-full object-cover"
                  />
                )}

              </label>

              {/* Preview */}

              <label className="rounded-3xl border-2 border-dashed border-white/10 hover:border-amber-500 cursor-pointer p-6">

                <PlayCircle className="text-amber-500 mb-5" />

                <p className="font-bold">
                  4 Second Preview
                </p>

                <p className="text-zinc-500 text-sm mt-2">

                  Upload teaser

                </p>

                <input
                  hidden
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file =
                      e.target.files[0];

                    if (!file) return;

                    setPreview(file);
                  }}
                />

                {preview && (
                  <div className="mt-8 text-sm text-green-400">

                    ✓ Preview Ready

                  </div>
                )}

              </label>

              {/* Thumbnail */}

              <label className="rounded-3xl border-2 border-dashed border-white/10 hover:border-amber-500 cursor-pointer p-6">

                <Image className="text-amber-500 mb-5" />

                <p className="font-bold">

                  Thumbnail

                </p>

                <p className="text-zinc-500 text-sm mt-2">

                  Upload cover image

                </p>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.target.files[0];

                    if (!file) return;

                    setThumbnail(file);

                    setThumbnailPreview(
                      URL.createObjectURL(file)
                    );
                  }}
                />

                {thumbnail && (
                  <img
                    src={thumbnailPreview}
                    alt=""
                    className="mt-5 rounded-xl h-44 w-full object-cover"
                  />
                )}

              </label>

            </div>

            {/* Inputs */}

            <div className="grid md:grid-cols-2 gap-6">

              <input
                placeholder="Video Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
                className="rounded-2xl bg-[#111] border border-white/10 px-5 py-4 outline-none focus:border-amber-500"
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="rounded-2xl bg-[#111] border border-white/10 px-5 py-4 outline-none focus:border-amber-500"
              />

              <select
                value={form.membership}
                onChange={(e) =>
                  setForm({
                    ...form,
                    membership:
                      e.target.value,
                  })
                }
                className="rounded-2xl bg-[#111] border border-white/10 px-5 py-4 outline-none"
              >
                <option value="free">
                  FREE
                </option>

                <option value="vip">
                  VIP
                </option>

                <option value="elite">
                  ELITE
                </option>

              </select>

              <input
                placeholder="Collection"
                value={
                  form.brandCollection
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    brandCollection:
                      e.target.value,
                  })
                }
                className="rounded-2xl bg-[#111] border border-white/10 px-5 py-4 outline-none focus:border-amber-500"
              />

            </div>

            <textarea
              rows={5}
              placeholder="Description..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="w-full rounded-2xl bg-[#111] border border-white/10 p-5 outline-none resize-none focus:border-amber-500"
            />

            {/* <label className="flex items-center gap-4">

              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({
                    ...form,
                    featured:
                      e.target.checked,
                  })
                }
              />

              <span className="font-bold">

                Featured Video

              </span>

            </label> */}

            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl px-8 py-4 bg-zinc-800 hover:bg-zinc-700 font-bold"
              >

                Cancel

              </button>

             <button
  type="submit"
  disabled={loading}
  className="rounded-2xl px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black flex items-center gap-3 disabled:opacity-50"
>
  {loading && (
    <Loader2
      size={18}
      className="animate-spin"
    />
  )}

  <Upload size={18} />

  {loading
    ? "Uploading..."
    : "Upload Video"}
</button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}