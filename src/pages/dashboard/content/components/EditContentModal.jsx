import {
  X,
  UploadCloud,
  Image as ImageIcon,
  Video,
  Trash2,
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

  // ==============================
  // MEDIA STATE
  // ==============================

  const [mediaFile, setMediaFile] =
    useState(null);

  const [thumbnailFile, setThumbnailFile] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");

  // ==============================
  // IMAGE COLLECTION STATE
  // ==============================

  const [existingImages, setExistingImages] =
    useState([]);

  const [newImages, setNewImages] =
    useState([]);

  const [newImagePreviews, setNewImagePreviews] =
    useState([]);

  // ==============================
  // FORM
  // ==============================

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    visibility: "free",
    mediaType: "video",
    price: 0,
    scheduledDate: "",
    collaborator: "",
    allowComments: true,
    featured: false,
  });

  // ==============================
  // LOAD CONTENT
  // ==============================

  useEffect(() => {
    if (!content) return;

    const mediaType =
      content.mediaType?.toLowerCase() ||
      "video";

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
        "free",

      mediaType,

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

    // ==============================
    // VIDEO PREVIEW
    // ==============================

    if (mediaType === "video") {
      setPreview(
        content.mediaUrl ||
        content.fileUrl ||
        content.url ||
        ""
      );

      setThumbnailPreview(
        content.thumbnail ||
        content.thumbnailUrl ||
        ""
      );
    }

    // ==============================
    // IMAGE COLLECTION
    // ==============================

    if (
      mediaType === "image" &&
      Array.isArray(content.images)
    ) {
      setExistingImages(
        content.images
      );
    }

    // Reset selected files
    setMediaFile(null);
    setThumbnailFile(null);

    setNewImages([]);
    setNewImagePreviews([]);

  }, [content]);

  if (!open || !content)
    return null;

  const isImage =
    form.mediaType === "image";

  const isVideo =
    form.mediaType === "video";

  // ==============================
  // VIDEO SELECTION
  // ==============================

  const chooseMedia = (file) => {
    if (!file) return;

    setMediaFile(file);

    setPreview(
      URL.createObjectURL(file)
    );
  };

  // ==============================
  // THUMBNAIL SELECTION
  // ==============================

  const chooseThumbnail = (
    file
  ) => {
    if (!file) return;

    setThumbnailFile(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  // ==============================
  // IMAGE COLLECTION SELECTION
  // ==============================

  const chooseImages = (files) => {
    const selectedFiles =
      Array.from(files || []);

    if (!selectedFiles.length)
      return;

    setNewImages(
      selectedFiles
    );

    const previews =
      selectedFiles.map(
        (file) =>
          URL.createObjectURL(file)
      );

    setNewImagePreviews(
      previews
    );
  };

  // ==============================
  // REMOVE EXISTING IMAGE
  // ==============================

  const removeExistingImage = (
    index
  ) => {
    setExistingImages(
      (prev) =>
        prev.filter(
          (_, imageIndex) =>
            imageIndex !== index
        )
    );
  };

  // ==============================
  // REMOVE NEW IMAGE
  // ==============================

  const removeNewImage = (
    index
  ) => {
    setNewImages(
      (prev) =>
        prev.filter(
          (_, imageIndex) =>
            imageIndex !== index
        )
    );

    setNewImagePreviews(
      (prev) =>
        prev.filter(
          (_, imageIndex) =>
            imageIndex !== index
        )
    );
  };

  // ==============================
  // FORM CHANGE
  // ==============================

  const handleChange = (
    key,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ==============================
  // SUBMIT
  // ==============================

  const submit = () => {
    const payload =
      new FormData();

    // ==============================
    // VIDEO
    // ==============================

    if (isVideo) {
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
    }

    // ==============================
    // IMAGES
    // ==============================

    if (isImage) {

      // Send newly selected images
      newImages.forEach(
        (image) => {
          payload.append(
            "images",
            image
          );
        }
      );

      // Tell backend which existing
      // images should remain
      payload.append(
        "existingImages",
        JSON.stringify(
          existingImages.map(
            (image) => ({
              url: image.url,
              storageKey:
                image.storageKey,
              storageProvider:
                image.storageProvider,
            })
          )
        )
      );
    }

    // ==============================
    // COMMON FIELDS
    // ==============================

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
      "mediaType",
      form.mediaType
    );

    payload.append(
      "featured",
      String(form.featured)
    );

    payload.append(
      "allowComments",
      String(form.allowComments)
    );

    payload.append(
      "scheduledDate",
      form.scheduledDate
    );

    payload.append(
      "collaborator",
      form.collaborator
    );

    // ==============================
    // UPDATE
    // ==============================

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
    <div className="
      fixed
      inset-0
      z-50
      bg-black/90
      backdrop-blur
      overflow-y-auto
    ">

      <div className="
        max-w-6xl
        mx-auto
        py-10
        sm:py-16
        px-4
        sm:px-6
      ">

        <div className="
          bg-zinc-900
          rounded-[36px]
          border
          border-white/5
          p-5
          sm:p-8
          lg:p-10
        ">

          {/* HEADER */}

          <div className="
            flex
            justify-between
            items-center
            gap-5
            mb-10
          ">

            <div>

              <p className="
                text-xs
                uppercase
                tracking-[.3em]
                text-yellow-400
                font-black
              ">
                Creator Studio
              </p>

              <h2 className="
                text-3xl
                sm:text-4xl
                font-black
                mt-3
              ">
                Edit Content
              </h2>

              <p className="
                text-zinc-500
                mt-2
              ">
                Update your content
                details and media.
              </p>

            </div>

            <button
              onClick={onClose}
              className="
                shrink-0
                w-12
                h-12
                rounded-xl
                bg-black
                hover:bg-zinc-800
                flex
                items-center
                justify-center
              "
            >
              <X size={24} />
            </button>

          </div>

          <div className="
            grid
            lg:grid-cols-2
            gap-10
          ">

            {/* ================================= */}
            {/* LEFT - MEDIA */}
            {/* ================================= */}

            <div className="space-y-8">

              {/* ================================= */}
              {/* VIDEO EDITOR */}
              {/* ================================= */}

              {isVideo && (
                <>

                  <div>

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-3
                    ">

                      <label className="font-bold">
                        Video File
                      </label>

                      <span className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        uppercase
                        tracking-wider
                        text-zinc-500
                      ">
                        <Video size={15} />
                        Video
                      </span>

                    </div>

                    <div
                      onClick={() =>
                        mediaInputRef.current?.click()
                      }
                      className="
                        cursor-pointer
                        rounded-3xl
                        border-2
                        border-dashed
                        border-yellow-500/30
                        h-80
                        bg-black
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                      "
                    >

                      {preview ? (

                        <video
                          src={preview}
                          controls
                          className="
                            w-full
                            h-full
                            object-contain
                          "
                        />

                      ) : (

                        <UploadCloud
                          size={60}
                          className="
                            text-yellow-400
                          "
                        />

                      )}

                    </div>

                    <input
                      hidden
                      ref={mediaInputRef}
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        chooseMedia(
                          e.target.files?.[0]
                        )
                      }
                    />

                    <p className="
                      text-xs
                      text-zinc-600
                      mt-3
                    ">
                      Click the video to
                      replace it.
                    </p>

                  </div>

                  {/* THUMBNAIL */}

                  <div>

                    <label className="
                      font-bold
                      mb-3
                      block
                    ">
                      Thumbnail
                    </label>

                    <div
                      onClick={() =>
                        thumbInputRef.current?.click()
                      }
                      className="
                        cursor-pointer
                        rounded-3xl
                        border
                        border-white/10
                        h-44
                        bg-black
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                      "
                    >

                      {thumbnailPreview ? (

                        <img
                          src={
                            thumbnailPreview
                          }
                          alt="Thumbnail"
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      ) : (

                        <ImageIcon
                          size={60}
                          className="
                            text-zinc-600
                          "
                        />

                      )}

                    </div>

                    <input
                      hidden
                      ref={thumbInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        chooseThumbnail(
                          e.target.files?.[0]
                        )
                      }
                    />

                    <p className="
                      text-xs
                      text-zinc-600
                      mt-3
                    ">
                      Click to replace the
                      thumbnail.
                    </p>

                  </div>

                </>
              )}

              {/* ================================= */}
              {/* IMAGE COLLECTION EDITOR */}
              {/* ================================= */}

              {isImage && (
                <div>

                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-4
                  ">

                    <div>

                      <label className="
                        font-bold
                        block
                      ">
                        Image Collection
                      </label>

                      <p className="
                        text-xs
                        text-zinc-500
                        mt-1
                      ">
                        Remove existing images
                        or upload replacements.
                      </p>

                    </div>

                    <span className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      uppercase
                      tracking-wider
                      text-pink-400
                    ">
                      <ImageIcon
                        size={16}
                      />
                      Images
                    </span>

                  </div>

                  {/* EXISTING IMAGES */}

                  {existingImages.length > 0 && (

                    <div className="
                      grid
                      grid-cols-2
                      sm:grid-cols-3
                      gap-3
                    ">

                      {existingImages.map(
                        (image, index) => (

                          <div
                            key={
                              image.storageKey ||
                              image.url ||
                              index
                            }
                            className="
                              relative
                              aspect-square
                              rounded-2xl
                              overflow-hidden
                              bg-black
                              border
                              border-white/10
                              group
                            "
                          >

                            <img
                              src={
                                image.url
                              }
                              alt={`Image ${
                                index + 1
                              }`}
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeExistingImage(
                                  index
                                )
                              }
                              className="
                                absolute
                                top-2
                                right-2
                                w-9
                                h-9
                                rounded-xl
                                bg-black/80
                                text-red-400
                                hover:bg-red-500
                                hover:text-white
                                flex
                                items-center
                                justify-center
                                transition
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

                  )}

                  {/* NEW IMAGES */}

                  {newImagePreviews.length > 0 && (

                    <div className="mt-5">

                      <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        font-bold
                        text-yellow-400
                        mb-3
                      ">
                        New Images
                      </p>

                      <div className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        gap-3
                      ">

                        {newImagePreviews.map(
                          (image, index) => (

                            <div
                              key={image}
                              className="
                                relative
                                aspect-square
                                rounded-2xl
                                overflow-hidden
                                bg-black
                                border
                                border-yellow-500/20
                              "
                            >

                              <img
                                src={image}
                                alt={`New image ${
                                  index + 1
                                }`}
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                "
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeNewImage(
                                    index
                                  )
                                }
                                className="
                                  absolute
                                  top-2
                                  right-2
                                  w-9
                                  h-9
                                  rounded-xl
                                  bg-black/80
                                  text-red-400
                                  hover:bg-red-500
                                  hover:text-white
                                  flex
                                  items-center
                                  justify-center
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

                  {/* UPLOAD MORE */}

                  <div
                    onClick={() =>
                      mediaInputRef.current?.click()
                    }
                    className="
                      mt-5
                      cursor-pointer
                      rounded-3xl
                      border-2
                      border-dashed
                      border-pink-500/30
                      min-h-[150px]
                      bg-black
                      flex
                      flex-col
                      items-center
                      justify-center
                      hover:border-pink-500/60
                      transition
                    "
                  >

                    <UploadCloud
                      size={40}
                      className="
                        text-pink-400
                      "
                    />

                    <p className="
                      mt-3
                      font-bold
                    ">
                      Select New Images
                    </p>

                    <p className="
                      text-xs
                      text-zinc-500
                      mt-2
                    ">
                      Selecting new images
                      will add them to the
                      collection.
                    </p>

                  </div>

                  <input
                    hidden
                    ref={mediaInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      chooseImages(
                        e.target.files
                      )
                    }
                  />

                </div>
              )}

            </div>

            {/* ================================= */}
            {/* RIGHT - DETAILS */}
            {/* ================================= */}

            <div className="space-y-6">

              {/* TITLE */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
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
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                    outline-none
                    focus:border-yellow-500
                  "
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
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
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                    outline-none
                    resize-none
                    focus:border-yellow-500
                  "
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
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
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                    outline-none
                    focus:border-yellow-500
                  "
                />

              </div>

              {/* TAGS */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
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
                  placeholder="
                    music, vlog, fitness
                  "
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                    outline-none
                    focus:border-yellow-500
                  "
                />

              </div>

              {/* VISIBILITY */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
                  Visibility
                </label>

                <select
                  value={
                    form.visibility
                  }
                  onChange={(e) =>
                    handleChange(
                      "visibility",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                    outline-none
                    focus:border-yellow-500
                  "
                >

                  <option value="free">
                    Free
                  </option>

                  <option value="subscribers">
                    Subscribers Only
                  </option>

                  <option value="ppv">
                    Pay Per View
                  </option>

                  <option value="members_ppv">
                    Members + Pay Per View
                  </option>

                </select>

              </div>

              {/* PRICE */}

              {(form.visibility ===
                "ppv" ||
                form.visibility ===
                  "members_ppv") && (

                <div>

                  <label className="
                    font-bold
                    mb-2
                    block
                  ">
                    Price ($)
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.price
                    }
                    onChange={(e) =>
                      handleChange(
                        "price",
                        e.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-2xl
                      bg-black
                      border
                      border-white/10
                      p-4
                      outline-none
                      focus:border-yellow-500
                    "
                  />

                </div>

              )}

              {/* COLLABORATOR */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
                  Collaborator
                </label>

                <select
                  value={
                    form.collaborator
                  }
                  onChange={(e) =>
                    handleChange(
                      "collaborator",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                  "
                >

                  <option value="">
                    None
                  </option>

                  {creators.map(
                    (creator) => (

                      <option
                        key={
                          creator._id
                        }
                        value={
                          creator._id
                        }
                      >
                        {creator.name}
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* SCHEDULE */}

              <div>

                <label className="
                  font-bold
                  mb-2
                  block
                ">
                  Schedule Release
                </label>

                <input
                  type="datetime-local"
                  value={
                    form.scheduledDate
                  }
                  onChange={(e) =>
                    handleChange(
                      "scheduledDate",
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    bg-black
                    border
                    border-white/10
                    p-4
                  "
                />

              </div>

              {/* OPTIONS */}

              <div className="
                space-y-4
                rounded-2xl
                bg-black
                p-5
              ">

                <label className="
                  flex
                  items-center
                  justify-between
                  gap-5
                ">

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

                <label className="
                  flex
                  items-center
                  justify-between
                  gap-5
                ">

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

              <div className="
                grid
                grid-cols-2
                gap-4
                pt-6
              ">

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    h-14
                    rounded-2xl
                    border
                    border-white/10
                    hover:border-white/30
                  "
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={submit}
                  disabled={
                    updateMutation.isPending
                  }
                  className="
                    h-14
                    rounded-2xl
                    bg-yellow-500
                    hover:bg-yellow-400
                    text-black
                    font-black
                    disabled:opacity-60
                  "
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