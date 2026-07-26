import { useEffect, useState } from "react";
import {
  X,
  Image as ImageIcon,
  Upload,
  Loader2,
  Trash2,
} from "lucide-react";

import { useUploadCreatorImages } from "@/hooks/useContent";

export default function UploadImagesModal({
  open,
  onClose,
}) {
  const uploadMutation = useUploadCreatorImages();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("free");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);

  /*
  --------------------------------
  RESET FORM
  --------------------------------
  */

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setCategory("");
      setVisibility("free");
      setPrice("");
      setTags("");
      setImages([]);
      setProgress(0);
    }
  }, [open]);

  /*
  --------------------------------
  IMAGE SELECTION
  --------------------------------
  */

  const handleImagesChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (!files.length) return;

    setImages((prev) => [
      ...prev,
      ...files,
    ]);

    // Allow selecting the same file again
    e.target.value = "";
  };

  /*
  --------------------------------
  REMOVE IMAGE
  --------------------------------
  */

  const removeImage = (indexToRemove) => {
    setImages((prev) =>
      prev.filter(
        (_, index) =>
          index !== indexToRemove
      )
    );
  };

  /*
  --------------------------------
  SUBMIT
  --------------------------------
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!images.length) {
      alert(
        "Please select at least one image."
      );
      return;
    }

    const formData = new FormData();

    /*
    --------------------------------
    BASIC CONTENT DATA
    --------------------------------
    */

    formData.append(
      "title",
      title.trim()
    );

    formData.append(
      "description",
      description
    );

    formData.append(
      "category",
      category || "General"
    );

    formData.append(
      "visibility",
      visibility
    );

    formData.append(
      "price",
      price || "0"
    );

    /*
    --------------------------------
    TAGS
    --------------------------------

    Backend expects JSON.parse(req.body.tags)
    so we must send a JSON string.
    */

    const formattedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    formData.append(
      "tags",
      JSON.stringify(formattedTags)
    );

    /*
    --------------------------------
    IMAGE FILES
    --------------------------------

    IMPORTANT:
    Backend uses:

    upload.array("images", 20)

    Therefore the field MUST be "images".
    */

    images.forEach((image) => {
      formData.append(
        "images",
        image
      );
    });

    /*
    --------------------------------
    UPLOAD
    --------------------------------
    */

    try {
      setProgress(0);

      await uploadMutation.mutateAsync({
        data: formData,

        onUploadProgress:
          setProgress,
      });

      setProgress(100);

      // Close modal after successful upload
      onClose();

    } catch (error) {
      console.error(
        "IMAGE UPLOAD ERROR:",
        error
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">

      <div className="relative w-full max-w-3xl my-8 rounded-[32px] border border-white/10 bg-[#090909] shadow-2xl">

        {/* ==============================
            HEADER
        ============================== */}

        <div className="flex items-center justify-between border-b border-white/5 p-6 sm:p-8">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">

              <ImageIcon
                size={24}
                className="text-pink-400"
              />

            </div>

            <div>

              <p className="text-xs uppercase tracking-[.3em] text-pink-400 font-black">
                Creator Studio
              </p>

              <h2 className="text-2xl sm:text-3xl font-black mt-2">
                Upload Images
              </h2>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={
              uploadMutation.isPending
            }
            className="w-11 h-11 rounded-xl bg-white/5 hover:bg-red-500 flex items-center justify-center transition disabled:opacity-50"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==============================
            FORM
        ============================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 space-y-6"
        >

          {/* ==============================
              IMAGE UPLOAD
          ============================== */}

          <div>

            <label className="block text-sm font-bold mb-3">
              Images
            </label>

            <label className="group flex flex-col items-center justify-center min-h-[220px] rounded-3xl border-2 border-dashed border-white/10 hover:border-pink-500/50 bg-black/40 cursor-pointer transition">

              <Upload
                size={40}
                className="text-zinc-600 group-hover:text-pink-400 transition"
              />

              <p className="mt-4 font-bold">
                Click to select images
              </p>

              <p className="mt-2 text-sm text-zinc-500">
                Select multiple images
                at once
              </p>

              <p className="mt-1 text-xs text-zinc-600">
                Maximum 20 images
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={
                  handleImagesChange
                }
                disabled={
                  uploadMutation.isPending
                }
                className="hidden"
              />

            </label>

            {/* ==============================
                SELECTED IMAGES
            ============================== */}

            {images.length > 0 && (

              <div className="mt-5">

                <div className="flex items-center justify-between mb-3">

                  <p className="text-sm font-bold text-zinc-400">
                    Selected Images
                  </p>

                  <p className="text-xs text-zinc-600">
                    {images.length} / 20
                  </p>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

                  {images.map(
                    (image, index) => {

                      const previewUrl =
                        URL.createObjectURL(
                          image
                        );

                      return (
                        <div
                          key={`${image.name}-${index}`}
                          className="group relative aspect-square overflow-hidden rounded-2xl bg-black border border-white/10"
                        >

                          <img
                            src={previewUrl}
                            alt={image.name}
                            className="w-full h-full object-cover transition group-hover:scale-105"
                          />

                          {/* REMOVE BUTTON */}

                          <button
                            type="button"
                            onClick={() =>
                              removeImage(
                                index
                              )
                            }
                            disabled={
                              uploadMutation.isPending
                            }
                            className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/70 text-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition"
                          >
                            <Trash2
                              size={15}
                            />
                          </button>

                          {/* IMAGE NUMBER */}

                          <div className="absolute bottom-2 left-2 rounded-lg bg-black/70 px-2 py-1 text-xs font-bold">
                            {index + 1}
                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

                <p className="mt-3 text-sm text-zinc-500">
                  {images.length} image
                  {images.length > 1
                    ? "s"
                    : ""}{" "}
                  selected
                </p>

              </div>

            )}

          </div>

          {/* ==============================
              TITLE
          ============================== */}

          <div>

            <label className="block text-sm font-bold mb-2">
              Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              required
              placeholder="Enter image collection title"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
            />

          </div>

          {/* ==============================
              DESCRIPTION
          ============================== */}

          <div>

            <label className="block text-sm font-bold mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={4}
              placeholder="Tell your fans about this content..."
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none resize-none focus:border-pink-500"
            />

          </div>

          {/* ==============================
              CATEGORY + VISIBILITY
          ============================== */}

          <div className="grid sm:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm font-bold mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Lifestyle">
                  Lifestyle
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Fitness">
                  Fitness
                </option>

                <option value="Fashion">
                  Fashion
                </option>

                <option value="Behind the Scenes">
                  Behind the Scenes
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-bold mb-2">
                Visibility
              </label>

              <select
                value={visibility}
                onChange={(e) =>
                  setVisibility(
                    e.target.value
                  )
                }
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              >

                <option value="free">
                  Free
                </option>

                <option value="subscribers">
                  Subscribers Only
                </option>

                <option value="members_ppv">
                  Members + PPV
                </option>

                <option value="ppv">
                  Pay Per View
                </option>

              </select>

            </div>

          </div>

          {/* ==============================
              PRICE
          ============================== */}

          {(visibility === "ppv" ||
            visibility ===
              "members_ppv") && (

            <div>

              <label className="block text-sm font-bold mb-2">
                Price
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
                placeholder="0.00"
                className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
              />

            </div>

          )}

          {/* ==============================
              TAGS
          ============================== */}

          <div>

            <label className="block text-sm font-bold mb-2">
              Tags
            </label>

            <input
              value={tags}
              onChange={(e) =>
                setTags(
                  e.target.value
                )
              }
              placeholder="fashion, lifestyle, exclusive"
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none focus:border-pink-500"
            />

            <p className="text-xs text-zinc-600 mt-2">
              Separate tags with commas.
            </p>

          </div>

          {/* ==============================
              PROGRESS
          ============================== */}

          {uploadMutation.isPending && (

            <div>

              <div className="flex justify-between text-xs text-zinc-500 mb-2">

                <span>
                  Uploading images...
                </span>

                <span>
                  {progress}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

                <div
                  className="h-full bg-pink-500 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          )}

          {/* ==============================
              ACTIONS
          ============================== */}

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              disabled={
                uploadMutation.isPending
              }
              className="flex-1 h-14 rounded-2xl border border-white/10 hover:bg-white/5 font-bold transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                uploadMutation.isPending ||
                !images.length ||
                !title.trim()
              }
              className="flex-1 h-14 rounded-2xl bg-pink-500 hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black flex items-center justify-center gap-2 transition"
            >

              {uploadMutation.isPending ? (
                <>
                  <Loader2
                    size={20}
                    className="animate-spin"
                  />

                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />

                  Upload Images
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}