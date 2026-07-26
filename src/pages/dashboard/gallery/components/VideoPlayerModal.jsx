import {
  X,
  Play,
  Clock3,
  Eye,
  Crown,
  Calendar,
  Tag,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function VideoPlayerModal({
  open,
  video,
  onClose,
}) {
  const [activeImage, setActiveImage] =
    useState(0);

  if (!open || !video) return null;

  /*
  ==========================================
  MEDIA TYPE
  ==========================================
  */

  const mediaType =
    video.mediaType?.toLowerCase() ||
    "video";

  const isImage =
    mediaType === "image";

  const isVideo =
    mediaType === "video";

  /*
  ==========================================
  MEMBERSHIP
  ==========================================
  */

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

  /*
  ==========================================
  IMAGE GALLERY
  ==========================================
  
  Priority:
  
  1. video.images[]
  2. video.fileUrl
  3. video.mediaUrl
  4. video.url
  5. video.thumbnail
  */

  const imageList =
    Array.isArray(video.images) &&
    video.images.length > 0
      ? video.images
      : (
          video.fileUrl ||
          video.mediaUrl ||
          video.url ||
          video.thumbnail
        )
        ? [
            {
              url:
                video.fileUrl ||
                video.mediaUrl ||
                video.url ||
                video.thumbnail,
            },
          ]
        : [];

  /*
  ==========================================
  VIDEO URL
  ==========================================
  */

  const videoUrl =
    video.fileUrl ||
    video.mediaUrl ||
    video.url ||
    "";

  /*
  ==========================================
  RESET IMAGE WHEN CONTENT CHANGES
  ==========================================
  */

  useEffect(() => {
    setActiveImage(0);
  }, [video?._id]);

  /*
  ==========================================
  IMAGE NAVIGATION
  ==========================================
  */

  const nextImage = () => {
    if (imageList.length <= 1) return;

    setActiveImage(
      (prev) =>
        (prev + 1) %
        imageList.length
    );
  };

  const previousImage = () => {
    if (imageList.length <= 1) return;

    setActiveImage(
      (prev) =>
        (prev - 1 +
          imageList.length) %
        imageList.length
    );
  };

  const currentImage =
    imageList[activeImage]?.url;

  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        bg-black/90
        backdrop-blur-xl
        flex
        items-center
        justify-center
        p-3
        sm:p-5
        lg:p-8
      "
    >

      <div
        className="
          relative
          w-full
          max-w-7xl
          max-h-[95vh]
          overflow-y-auto
          rounded-[28px]
          lg:rounded-[36px]
          bg-[#090909]
          border
          border-white/10
        "
      >

        {/* =====================================
            CLOSE
        ===================================== */}

        <button
          onClick={onClose}
          className="
            absolute
            top-4
            right-4
            lg:top-6
            lg:right-6
            z-50
            w-10
            h-10
            lg:w-12
            lg:h-12
            rounded-full
            bg-black/70
            hover:bg-red-600
            transition
            flex
            items-center
            justify-center
          "
        >
          <X size={20} />
        </button>


        {/* =====================================
            MEDIA
        ===================================== */}

        {isVideo ? (

          /* ===================================
             VIDEO PLAYER
          =================================== */

          <div
            className="
              aspect-video
              bg-black
              flex
              items-center
              justify-center
            "
          >

            {videoUrl ? (

              <video
                src={videoUrl}
                controls
                autoPlay
                playsInline
                className="
                  w-full
                  h-full
                  object-contain
                "
              />

            ) : (

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  text-zinc-600
                "
              >

                <Play size={70} />

                <p className="text-sm">
                  Video unavailable
                </p>

              </div>

            )}

          </div>

        ) : (

          /* ===================================
             IMAGE GALLERY
          =================================== */

          <div
            className="
              bg-black
              min-h-[400px]
              lg:min-h-[650px]
              flex
              flex-col
              items-center
              justify-center
              p-4
              lg:p-8
            "
          >

            <div
              className="
                relative
                w-full
                flex-1
                min-h-[350px]
                lg:min-h-[550px]
                flex
                items-center
                justify-center
              "
            >

              {currentImage ? (

                <img
                  src={currentImage}
                  alt={
                    video.title ||
                    "Gallery image"
                  }
                  className="
                    max-w-full
                    max-h-[65vh]
                    lg:max-h-[600px]
                    object-contain
                    rounded-2xl
                  "
                />

              ) : (

                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    text-zinc-600
                  "
                >

                  <ImageIcon size={80} />

                  <p className="text-sm">
                    Image unavailable
                  </p>

                </div>

              )}


              {/* PREVIOUS */}

              {imageList.length > 1 && (

                <button
                  onClick={previousImage}
                  className="
                    absolute
                    left-2
                    lg:left-6
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    lg:w-14
                    lg:h-14
                    rounded-full
                    bg-black/70
                    hover:bg-yellow-500
                    hover:text-black
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ChevronLeft />
                </button>

              )}


              {/* NEXT */}

              {imageList.length > 1 && (

                <button
                  onClick={nextImage}
                  className="
                    absolute
                    right-2
                    lg:right-6
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    lg:w-14
                    lg:h-14
                    rounded-full
                    bg-black/70
                    hover:bg-yellow-500
                    hover:text-black
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ChevronRight />
                </button>

              )}

            </div>


            {/* IMAGE COUNTER */}

            {imageList.length > 1 && (

              <div
                className="
                  mt-4
                  text-sm
                  text-zinc-400
                "
              >
                {activeImage + 1} /{" "}
                {imageList.length}
              </div>

            )}


            {/* THUMBNAILS */}

            {imageList.length > 1 && (

              <div
                className="
                  flex
                  gap-3
                  mt-5
                  max-w-full
                  overflow-x-auto
                  pb-2
                "
              >

                {imageList.map(
                  (image, index) => (

                    <button
                      key={
                        image.storageKey ||
                        image.url ||
                        index
                      }
                      onClick={() =>
                        setActiveImage(
                          index
                        )
                      }
                      className={`
                        shrink-0
                        w-16
                        h-20
                        lg:w-20
                        lg:h-24
                        rounded-xl
                        overflow-hidden
                        border-2
                        transition
                        ${
                          activeImage ===
                          index
                            ? "border-yellow-500"
                            : "border-white/10"
                        }
                      `}
                    >

                      <img
                        src={image.url}
                        alt={`${video.title} ${
                          index + 1
                        }`}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />

                    </button>

                  )
                )}

              </div>

            )}

          </div>

        )}


        {/* =====================================
            BODY
        ===================================== */}

        <div
          className="
            p-5
            lg:p-10
          "
        >

          <div
            className="
              grid
              lg:grid-cols-[2fr_1fr]
              gap-10
              lg:gap-12
            "
          >

            {/* =================================
                LEFT
            ================================= */}

            <div>

              {/* MEMBERSHIP BADGE */}

              <div
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-[.3em]
                  ${current}
                `}
              >

                <Crown size={15} />

                {video.membership ||
                  "Free"}

              </div>


              {/* MEDIA TYPE */}

              <div
                className="
                  inline-flex
                  ml-3
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2
                  text-xs
                  font-black
                  uppercase
                  tracking-wider
                  text-zinc-400
                "
              >

                {isImage ? (
                  <ImageIcon size={14} />
                ) : (
                  <Play size={14} />
                )}

                {isImage
                  ? "Image Gallery"
                  : "Video"}

              </div>


              {/* TITLE */}

              <h1
                className="
                  mt-6
                  text-3xl
                  lg:text-5xl
                  font-black
                "
              >
                {video.title}
              </h1>


              {/* DESCRIPTION */}

              <p
                className="
                  mt-6
                  text-zinc-400
                  leading-8
                  text-base
                  lg:text-lg
                "
              >
                {video.description ||
                  "No description provided."}
              </p>

            </div>


            {/* =================================
                RIGHT
            ================================= */}

            <div className="space-y-6">

              {/* THUMBNAIL / IMAGE */}

              {isVideo &&
                video.thumbnail && (

                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="
                    rounded-3xl
                    w-full
                    aspect-video
                    object-cover
                    border
                    border-white/10
                  "
                />

              )}


              {/* IMAGE GALLERY PREVIEW */}

              {isImage &&
                imageList.length > 0 && (

                <div
                  className="
                    rounded-3xl
                    overflow-hidden
                    border
                    border-white/10
                  "
                >

                  <img
                    src={currentImage}
                    alt={video.title}
                    className="
                      w-full
                      aspect-[4/3]
                      object-cover
                    "
                  />

                </div>

              )}


              {/* DETAILS */}

              <div
                className="
                  rounded-3xl
                  bg-black
                  border
                  border-white/10
                  p-5
                  lg:p-6
                "
              >

                <h3
                  className="
                    text-xl
                    font-black
                    mb-6
                  "
                >
                  Details
                </h3>

                <div className="space-y-5">

                  {/* CATEGORY */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >

                    <span
                      className="
                        text-zinc-500
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Tag size={15} />
                      Category
                    </span>

                    <span className="font-bold text-right">
                      {video.category ||
                        "General"}
                    </span>

                  </div>


                  {/* DURATION */}

                  {isVideo && (

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-5
                      "
                    >

                      <span
                        className="
                          text-zinc-500
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <Clock3 size={15} />
                        Duration
                      </span>

                      <span className="font-bold">
                        {video.duration
                          ? `${video.duration}s`
                          : "N/A"}
                      </span>

                    </div>

                  )}


                  {/* IMAGE COUNT */}

                  {isImage && (

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-5
                      "
                    >

                      <span
                        className="
                          text-zinc-500
                          flex
                          items-center
                          gap-2
                        "
                      >
                        <ImageIcon size={15} />
                        Images
                      </span>

                      <span className="font-bold">
                        {imageList.length}
                      </span>

                    </div>

                  )}


                  {/* VIEWS */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >

                    <span
                      className="
                        text-zinc-500
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Eye size={15} />
                      Views
                    </span>

                    <span className="font-bold">
                      {(video.views || 0)
                        .toLocaleString()}
                    </span>

                  </div>


                  {/* UPLOADED */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >

                    <span
                      className="
                        text-zinc-500
                        flex
                        items-center
                        gap-2
                      "
                    >
                      <Calendar size={15} />
                      Uploaded
                    </span>

                    <span className="font-bold">
                      {video.createdAt
                        ? new Date(
                            video.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>

                  </div>


                  {/* MEMBERSHIP */}

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-5
                    "
                  >

                    <span className="text-zinc-500">
                      Membership
                    </span>

                    <span
                      className={`
                        rounded-full
                        border
                        px-3
                        py-1
                        text-xs
                        font-black
                        uppercase
                        ${current}
                      `}
                    >
                      {video.membership ||
                        "Free"}
                    </span>

                  </div>

                </div>

              </div>


              {/* CLOSE */}

              <button
                onClick={onClose}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-white/10
                  py-4
                  hover:border-yellow-500
                  transition
                "
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