import { useEffect, useState } from "react";
import {
  X,
  Upload,
  Images,
  Loader2,
  Trash2,
} from "lucide-react";

import { useUploadBrandGallery } from "@/hooks/useContent";

export default function UploadImagesModal({
  open,
  onClose,
}) {
  const uploadMutation =
    useUploadBrandGallery();

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

  const [images, setImages] =
    useState([]);

  const [previews, setPreviews] =
    useState([]);


  /*
  ============================================
  RESET WHEN MODAL CLOSES
  ============================================
  */

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

      setImages([]);
      setPreviews([]);
    }
  }, [open]);


  /*
  ============================================
  CLEAN OBJECT URLS
  ============================================
  */

  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previews]);


  if (!open) return null;


  /*
  ============================================
  SELECT IMAGES
  ============================================
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

    setPreviews((prev) => [
      ...prev,
      ...files.map((file) =>
        URL.createObjectURL(file)
      ),
    ]);

    // Allow selecting same file again
    e.target.value = "";
  };


  /*
  ============================================
  REMOVE IMAGE
  ============================================
  */

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter(
        (_, i) => i !== index
      )
    );

    setPreviews((prev) => {
      const url = prev[index];

      if (url) {
        URL.revokeObjectURL(url);
      }

      return prev.filter(
        (_, i) => i !== index
      );
    });
  };


  /*
  ============================================
  SUBMIT
  ============================================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      return alert(
        "Please select at least one image."
      );
    }

    if (!form.title.trim()) {
      return alert(
        "Please enter a title."
      );
    }

    const data = new FormData();

    data.append(
      "title",
      form.title.trim()
    );

    data.append(
      "description",
      form.description
    );

    data.append(
      "category",
      form.category
    );

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

    data.append(
      "ownerType",
      "brand"
    );

    data.append(
      "mediaType",
      "image"
    );

    data.append(
      "visibility",
      "free"
    );


    /*
    IMPORTANT:
    This field name must match
    your backend multer configuration.
    */

    images.forEach((image) => {
      data.append(
        "images",
        image
      );
    });


    uploadMutation.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };


  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm">

      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] border border-white/10 bg-[#090909]">

        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            right-6
            top-6
            z-50
            rounded-full
            bg-black/60
            p-3
            transition
            hover:bg-red-500
          "
        >
          <X size={20} />
        </button>


        <div className="p-8 md:p-10">

          {/* HEADER */}

          <p className="text-xs font-black uppercase tracking-[.3em] text-amber-500">
            Brand Gallery
          </p>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Upload Images
          </h2>

          <p className="mt-3 text-zinc-500">
            Add one or multiple images to your gallery.
          </p>


          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-8"
          >

            {/* IMAGE UPLOADER */}

            <label
              className="
                block
                cursor-pointer
                rounded-[28px]
                border-2
                border-dashed
                border-white/10
                p-8
                text-center
                transition
                hover:border-amber-500
                hover:bg-amber-500/[0.02]
              "
            >

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">

                <Images size={30} />

              </div>

              <h3 className="mt-5 text-xl font-black">
                Select Gallery Images
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                You can select multiple images at once.
              </p>

              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-amber-500">
                Click to browse
              </p>

              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={
                  handleImagesChange
                }
              />

            </label>


            {/* IMAGE PREVIEWS */}

            {previews.length > 0 && (

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <h3 className="font-black">
                    Selected Images
                  </h3>

                  <span className="text-sm text-zinc-500">
                    {images.length}{" "}
                    {images.length === 1
                      ? "image"
                      : "images"}
                  </span>

                </div>


                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">

                  {previews.map(
                    (preview, index) => (

                      <div
                        key={`${preview}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black"
                      >

                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="
                            aspect-square
                            w-full
                            object-cover
                          "
                        />


                        <button
                          type="button"
                          onClick={() =>
                            removeImage(index)
                          }
                          className="
                            absolute
                            right-3
                            top-3
                            rounded-full
                            bg-black/70
                            p-2
                            text-white
                            opacity-0
                            transition
                            group-hover:opacity-100
                            hover:bg-red-500
                          "
                        >
                          <Trash2
                            size={16}
                          />
                        </button>

                      </div>

                    )
                  )}

                </div>

              </div>

            )}


            {/* INPUTS */}

            <div className="grid gap-6 md:grid-cols-2">

              <input
                placeholder="Gallery Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title:
                      e.target.value,
                  })
                }
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111]
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-500
                "
              />


              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category:
                      e.target.value,
                  })
                }
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111]
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-500
                "
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
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111]
                  px-5
                  py-4
                  outline-none
                "
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
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111]
                  px-5
                  py-4
                  outline-none
                  focus:border-amber-500
                "
              />

            </div>


            {/* DESCRIPTION */}

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
              className="
                w-full
                resize-none
                rounded-2xl
                border
                border-white/10
                bg-[#111]
                p-5
                outline-none
                focus:border-amber-500
              "
            />


            {/* ACTIONS */}

            <div className="flex justify-end gap-4">

              <button
                type="button"
                onClick={onClose}
                className="
                  rounded-2xl
                  bg-zinc-800
                  px-8
                  py-4
                  font-bold
                  transition
                  hover:bg-zinc-700
                "
              >
                Cancel
              </button>


              <button
                type="submit"
                disabled={
                  loading ||
                  !images.length
                }
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-amber-500
                  px-8
                  py-4
                  font-black
                  text-black
                  transition
                  hover:bg-amber-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {loading ? (
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Upload size={18} />
                )}

                {loading
                  ? "Uploading..."
                  : "Upload Images"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}