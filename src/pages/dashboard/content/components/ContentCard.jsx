import {
  Eye,
  Pencil,
  Trash2,
  Calendar,
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";

import VisibilityBadge from "./VisisbilitBadge";
import StatusBadge from "./StatusBadge";

export default function ContentCard({
  item,
  onPreview,
  onEdit,
  onDelete,
}) {
  const isImage =
    item.mediaType?.toLowerCase() === "image";

  const isVideo =
    item.mediaType?.toLowerCase() === "video";

  // =====================================================
  // CREATOR IMAGE CONTENT
  // Get the first image from the images array
  // =====================================================

  const firstImage =
    Array.isArray(item.images) &&
    item.images.length > 0
      ? item.images[0]
      : null;

  const imageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url ||
        firstImage?.fileUrl ||
        firstImage?.mediaUrl ||
        null;

  // =====================================================
  // VIDEO URL / MEDIA
  // =====================================================

  const mediaUrl =
    item.fileUrl ||
    item.mediaUrl ||
    item.url;

  // =====================================================
  // VIDEO THUMBNAIL
  // =====================================================

  const thumbnailUrl =
    item.thumbnail ||
    item.thumbnailUrl;

  return (
    <div
      className="
        rounded-[32px]
        overflow-hidden
        bg-zinc-900
        border
        border-white/5
        hover:border-yellow-500/30
        transition-all
        duration-300
      "
    >
      {/* =====================================================
          MEDIA PREVIEW
      ===================================================== */}

      <div className="relative h-60 bg-black">

        {/* =====================================================
            IMAGE
        ===================================================== */}

        {isImage ? (

          imageUrl ? (
            <img
              src={imageUrl}
              alt={item.title || "Content image"}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-500
                hover:scale-105
              "
            />
          ) : (
            <div
              className="
                h-full
                flex
                flex-col
                items-center
                justify-center
                gap-3
                bg-zinc-800
              "
            >
              <ImageIcon
                size={60}
                className="text-zinc-600"
              />

              <span className="text-sm text-zinc-500">
                No image available
              </span>
            </div>
          )

        ) : isVideo ? (

          /* =====================================================
              VIDEO
          ===================================================== */

          thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt={item.title || "Video thumbnail"}
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                h-full
                flex
                items-center
                justify-center
                bg-zinc-800
              "
            >
              <PlayCircle
                size={60}
                className="text-zinc-600"
              />
            </div>
          )

        ) : (

          /* =====================================================
              UNKNOWN MEDIA TYPE
          ===================================================== */

          <div
            className="
              h-full
              flex
              items-center
              justify-center
              bg-zinc-800
            "
          >
            <ImageIcon
              size={60}
              className="text-zinc-600"
            />
          </div>

        )}

        {/* =====================================================
            MEDIA TYPE
        ===================================================== */}

        <div
          className="
            absolute
            top-4
            left-4
            px-3
            py-1
            rounded-full
            bg-black/70
            backdrop-blur
            text-xs
            font-bold
            uppercase
          "
        >
          {item.mediaType || "Content"}
        </div>

        {/* =====================================================
            VISIBILITY
        ===================================================== */}

        <div className="absolute top-4 right-4">
          <VisibilityBadge
            visibility={item.visibility}
          />
        </div>

        {/* =====================================================
            IMAGE COUNT
        ===================================================== */}

        {isImage &&
          Array.isArray(item.images) &&
          item.images.length > 1 && (
            <div
              className="
                absolute
                bottom-4
                right-4
                px-3
                py-1
                rounded-full
                bg-black/70
                backdrop-blur
                text-xs
                font-bold
                text-white
              "
            >
              <span className="flex items-center gap-1.5">
                <ImageIcon size={14} />
                {item.images.length} Images
              </span>
            </div>
          )}

        {/* =====================================================
            PLAY ICON FOR VIDEOS
        ===================================================== */}

        {isVideo && (
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              pointer-events-none
            "
          >
            <div
              className="
                h-14
                w-14
                rounded-full
                bg-black/60
                backdrop-blur
                flex
                items-center
                justify-center
              "
            >
              <PlayCircle
                size={30}
                className="text-white"
              />
            </div>
          </div>
        )}

      </div>

      {/* =====================================================
          BODY
      ===================================================== */}

      <div className="p-5 lg:p-6 space-y-5">

        {/* TITLE */}

        <div>

          <h2
            className="
              text-xl
              lg:text-2xl
              font-black
              line-clamp-1
            "
          >
            {item.title}
          </h2>

          <p
            className="
              text-zinc-500
              mt-2
              line-clamp-2
            "
          >
            {item.description ||
              "No description"}
          </p>

        </div>

        {/* STATUS */}

        <div className="flex items-center justify-between">

          <StatusBadge
            status={item.status}
          />

          <span className="text-xs text-zinc-500">
            {item.createdAt &&
              new Date(
                item.createdAt
              ).toLocaleDateString()}
          </span>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 gap-4">

          {/* VIEWS */}

          <div
            className="
              rounded-2xl
              bg-black
              p-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-sky-400
              "
            >

              <Eye size={18} />

              <span
                className="
                  text-xs
                  uppercase
                  font-bold
                "
              >
                Views
              </span>

            </div>

            <h3
              className="
                text-2xl
                font-black
                mt-3
              "
            >
              {item.views || 0}
            </h3>

          </div>

          {/* TYPE */}

          <div
            className="
              rounded-2xl
              bg-black
              p-4
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
                text-yellow-400
              "
            >

              {isImage ? (
                <ImageIcon size={18} />
              ) : (
                <PlayCircle size={18} />
              )}

              <span
                className="
                  text-xs
                  uppercase
                  font-bold
                "
              >
                Type
              </span>

            </div>

            <h3
              className="
                text-lg
                font-black
                mt-3
                capitalize
              "
            >
              {isImage
                ? `Images${
                    item.images?.length
                      ? ` (${item.images.length})`
                      : ""
                  }`
                : item.mediaType ||
                  "Content"}
            </h3>

          </div>

        </div>

        {/* CATEGORY */}

        {item.category && (
          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-zinc-500
            "
          >

            <Calendar size={16} />

            <span>
              {item.category}
            </span>

          </div>
        )}

        {/* ACTIONS */}

        <div
          className="
            grid
            grid-cols-3
            gap-3
            pt-2
          "
        >

          {/* VIEW */}

          <button
            onClick={onPreview}
            className="
              h-12
              rounded-xl
              bg-yellow-500
              hover:bg-yellow-400
              text-black
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <Eye size={16} />
            View
          </button>

          {/* EDIT */}

          <button
            onClick={onEdit}
            className="
              h-12
              rounded-xl
              bg-zinc-800
              hover:bg-zinc-700
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          {/* DELETE */}

          <button
            onClick={onDelete}
            className="
              h-12
              rounded-xl
              bg-red-500/10
              hover:bg-red-500
              text-red-400
              hover:text-white
              font-bold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}