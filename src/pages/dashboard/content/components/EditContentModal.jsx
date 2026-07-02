import {
  X,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import {
  useUpdateContent,
} from "@/hooks/useContent";

import {
  useDiscoverCreators,
} from "@/hooks/useCreator";

export default function EditContentModal({
  open,
  onClose,
  content,
}) {
  const updateMutation =
    useUpdateContent();

  const {
    data: creatorsData,
  } = useDiscoverCreators();

  const creators =
    creatorsData?.creators || [];

  const mediaInputRef =
    useRef(null);

  const thumbInputRef =
    useRef(null);

  const [mediaFile, setMediaFile] =
    useState(null);

  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    visibility: "Free",
    type: "video",
    price: 0,
    scheduledDate: "",
    collaborator: "",
    allowComments: true,
    featured: false,
  });

  useEffect(() => {
    if (!content) return;

    setForm({
      title:
        content.title || "",

      description:
        content.description || "",

      category:
        content.category || "",

      tags:
        Array.isArray(content.tags)
          ? content.tags.join(", ")
          : content.tags || "",

      visibility:
        content.visibility ||
        "Free",

      type:
        content.type ||
        "video",

      price:
        content.price || 0,

      scheduledDate:
        content.scheduledDate
          ? content.scheduledDate.slice(
              0,
              16
            )
          : "",

      collaborator:
        content.collaborator?._id ||
        "",

      allowComments:
        content.allowComments ??
        true,

      featured:
        content.featured ??
        false,
    });

    setPreview(
      content.mediaUrl || ""
    );

    setThumbnailPreview(
      content.thumbnail ||
        content.thumbnailUrl ||
        ""
    );
  }, [content]);

  if (!open || !content)
    return null;

  const chooseMedia = (file) => {
    if (!file) return;

    setMediaFile(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  const chooseThumbnail = (
    file
  ) => {
    if (!file) return;

    setThumbnailFile(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  const handleChange = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const submit = () => {
    const payload =
      new FormData();

    if (mediaFile) {
      payload.append(
        "media",
        mediaFile
      );
    }

    if (thumbnailFile) {
      payload.append(
        "thumbnail",
        thumbnailFile
      );
    }

    payload.append(
      "title",
      form.title
    );

    payload.append(
      "description",
      form.description
    );

    payload.append(
      "category",
      form.category
    );

    payload.append(
      "tags",
      form.tags
    );

    payload.append(
      "visibility",
      form.visibility
    );

    payload.append(
      "price",
      form.price
    );

    payload.append(
      "type",
      form.type
    );

    payload.append(
      "featured",
      form.featured
    );

    payload.append(
      "allowComments",
      form.allowComments
    );

    payload.append(
      "scheduledDate",
      form.scheduledDate
    );

    payload.append(
      "collaborator",
      form.collaborator
    );

    updateMutation.mutate(
      {
        id: content._id,
        data: payload,
      },
      {
        onSuccess: () =>
          onClose(),
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur overflow-y-auto">

      <div className="max-w-6xl mx-auto py-16 px-6">

        <div className="bg-zinc-900 rounded-[36px] border border-white/5 p-10">

          <div className="flex justify-between items-center mb-10">

            <div>

              <h2 className="text-4xl font-black">
                Edit Content
              </h2>

              <p className="text-zinc-500 mt-2">
                Update your content
                details.
              </p>

            </div>

            <button
              onClick={onClose}
            >
              <X size={28} />
            </button>

          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* LEFT */}

            <div className="space-y-8">

              <div>

                <label className="font-bold mb-3 block">
                  Media File
                </label>

                <div
                  onClick={() =>
                    mediaInputRef.current?.click()
                  }
                  className="cursor-pointer rounded-3xl border-2 border-dashed border-yellow-500/30 h-80 bg-black flex items-center justify-center overflow-hidden"
                >

                  {preview ? (

                    form.type ===
                    "image" ? (

                      <img
                        src={preview}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <video
                        src={preview}
                        controls
                        className="w-full h-full object-cover"
                      />

                    )

                  ) : (

                    <UploadCloud
                      size={60}
                      className="text-yellow-400"
                    />

                  )}

                </div>

                <input
                  hidden
                  ref={
                    mediaInputRef
                  }
                  type="file"
                  accept="video/*,image/*"
                  onChange={(e) =>
                    chooseMedia(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>

              <div>

                <label className="font-bold mb-3 block">
                  Thumbnail
                </label>

                <div
                  onClick={() =>
                    thumbInputRef.current?.click()
                  }
                  className="cursor-pointer rounded-3xl border border-white/10 h-44 bg-black flex items-center justify-center overflow-hidden"
                >

                  {thumbnailPreview ? (

                    <img
                      src={
                        thumbnailPreview
                      }
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <ImageIcon
                      size={60}
                      className="text-zinc-600"
                    />

                  )}

                </div>

                <input
                  hidden
                  ref={
                    thumbInputRef
                  }
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    chooseThumbnail(
                      e.target.files?.[0]
                    )
                  }
                />

              </div>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

              <div>

                <label className="font-bold mb-2 block">
                  Title
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              <div>

                <label className="font-bold mb-2 block">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>
                            {/* CATEGORY */}

              <div>

                <label className="font-bold mb-2 block">
                  Category
                </label>

                <input
                  value={form.category}
                  onChange={(e) =>
                    handleChange(
                      "category",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              {/* TAGS */}

              <div>

                <label className="font-bold mb-2 block">
                  Tags
                </label>

                <input
                  value={form.tags}
                  onChange={(e) =>
                    handleChange(
                      "tags",
                      e.target.value
                    )
                  }
                  placeholder="music, vlog, fitness"
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              {/* VISIBILITY */}

              <div>

                <label className="font-bold mb-2 block">
                  Visibility
                </label>

                <select
                  value={form.visibility}
                  onChange={(e) =>
                    handleChange(
                      "visibility",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                >

                  <option>Free</option>
                  <option>Subscribers Only</option>
                  <option>Pay Per View</option>
                  <option>
                    Members + Pay Per View
                  </option>

                </select>

              </div>

              {/* PRICE */}

              {(form.visibility === "Pay Per View" ||
                form.visibility ===
                  "Members + Pay Per View") && (

                <div>

                  <label className="font-bold mb-2 block">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      handleChange(
                        "price",
                        e.target.value
                      )
                    }
                    className="w-full rounded-2xl bg-black border border-white/10 p-4"
                  />

                </div>

              )}

              {/* COLLABORATOR */}

              <div>

                <label className="font-bold mb-2 block">
                  Collaborator
                </label>

                <select
                  value={form.collaborator}
                  onChange={(e) =>
                    handleChange(
                      "collaborator",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                >

                  <option value="">
                    None
                  </option>

                  {creators.map((creator) => (

                    <option
                      key={creator._id}
                      value={creator._id}
                    >
                      {creator.name}
                    </option>

                  ))}

                </select>

              </div>

              {/* SCHEDULE */}

              <div>

                <label className="font-bold mb-2 block">
                  Schedule Release
                </label>

                <input
                  type="datetime-local"
                  value={form.scheduledDate}
                  onChange={(e) =>
                    handleChange(
                      "scheduledDate",
                      e.target.value
                    )
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 p-4"
                />

              </div>

              {/* OPTIONS */}

              <div className="space-y-4">

                <label className="flex items-center justify-between">

                  <span>
                    Allow Comments
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      form.allowComments
                    }
                    onChange={(e) =>
                      handleChange(
                        "allowComments",
                        e.target.checked
                      )
                    }
                  />

                </label>

                <label className="flex items-center justify-between">

                  <span>
                    Featured Content
                  </span>

                  <input
                    type="checkbox"
                    checked={
                      form.featured
                    }
                    onChange={(e) =>
                      handleChange(
                        "featured",
                        e.target.checked
                      )
                    }
                  />

                </label>

              </div>

              {/* BUTTONS */}

              <div className="grid grid-cols-2 gap-4 pt-6">

                <button
                  type="button"
                  onClick={onClose}
                  className="h-14 rounded-2xl border border-white/10 hover:border-white/30"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={submit}
                  disabled={
                    updateMutation.isPending
                  }
                  className="h-14 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black disabled:opacity-60"
                >
                  {updateMutation.isPending
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}