import {
  X,
  Eye,
  DollarSign,
  Calendar,
  User,
  PlayCircle,
  Image as ImageIcon,
  MessageCircle,
} from "lucide-react";

import VisibilityBadge from "./VisisbilitBadge";
import StatusBadge from "./StatusBadge";

export default function PreviewContentModal({
  open,
  onClose,
  content,
}) {
  if (!open || !content) return null;

  const isImage =
    content.mediaType?.toLowerCase() === "image";

  const isVideo =
    content.mediaType?.toLowerCase() === "video";

  // =====================================================
  // IMAGE URLS
  // Supports:
  // content.images = [
  //   {
  //     url: "...",
  //     storageKey: "..."
  //   }
  // ]
  //
  // Also supports a single image URL as fallback.
  // =====================================================

  const imageUrls = isImage
    ? (content.images || [])
        .map((image) => {
          if (typeof image === "string") {
            return image;
          }

          return (
            image?.url ||
            image?.fileUrl ||
            image?.mediaUrl ||
            null
          );
        })
        .filter(Boolean)
    : [];

  // =====================================================
  // VIDEO URL
  // =====================================================

  const mediaUrl =
    content.fileUrl ||
    content.mediaUrl ||
    content.url;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/90
        backdrop-blur
        overflow-y-auto
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          py-10
          sm:py-16
          px-4
          sm:px-6
        "
      >
        <div
          className="
            bg-zinc-900
            rounded-[36px]
            border
            border-white/5
            overflow-hidden
          "
        >
          {/* HEADER */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-5
              p-6
              sm:p-8
              border-b
              border-white/5
            "
          >
            <div className="min-w-0">
              <p
                className="
                  uppercase
                  tracking-[.3em]
                  text-xs
                  text-yellow-400
                  font-black
                "
              >
                {isImage
                  ? "Image Preview"
                  : "Video Preview"}
              </p>

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-black
                  mt-3
                  truncate
                "
              >
                {content.title}
              </h2>
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
              <X />
            </button>
          </div>

          <div className="grid lg:grid-cols-2">
            {/* =====================================================
                MEDIA
            ===================================================== */}

            <div
              className="
                bg-black
                min-h-[400px]
                lg:min-h-[600px]
                flex
                items-center
                justify-center
                overflow-y-auto
                p-4
              "
            >
              {/* =====================================================
                  MULTIPLE IMAGES
              ===================================================== */}

              {isImage ? (
                imageUrls.length > 0 ? (
                  <div
                    className="
                      w-full
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-4
                      self-start
                    "
                  >
                    {imageUrls.map(
                      (imageUrl, index) => (
                        <div
                          key={`${imageUrl}-${index}`}
                          className="
                            relative
                            overflow-hidden
                            rounded-2xl
                            bg-zinc-950
                            border
                            border-white/10
                          "
                        >
                          <img
                            src={imageUrl}
                            alt={`${content.title} ${
                              index + 1
                            }`}
                            className="
                              w-full
                              aspect-square
                              object-contain
                              bg-black
                            "
                          />

                          <div
                            className="
                              absolute
                              bottom-3
                              left-3
                              px-3
                              py-1
                              rounded-full
                              bg-black/70
                              backdrop-blur
                              text-xs
                              font-bold
                              text-zinc-300
                            "
                          >
                            {index + 1} /{" "}
                            {imageUrls.length}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <ImageIcon
                      size={80}
                      className="text-zinc-700"
                    />

                    <p className="text-zinc-500">
                      No images available
                    </p>
                  </div>
                )
              ) : isVideo ? (
                /* =====================================================
                   VIDEO
                ===================================================== */

                mediaUrl ? (
                  <video
                    controls
                    src={mediaUrl}
                    className="
                      w-full
                      h-full
                      max-h-[600px]
                      object-contain
                    "
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <PlayCircle
                      size={90}
                      className="text-zinc-700"
                    />

                    <p className="text-zinc-500">
                      No video available
                    </p>
                  </div>
                )
              ) : (
                <ImageIcon
                  size={80}
                  className="text-zinc-700"
                />
              )}
            </div>

            {/* =====================================================
                DETAILS
            ===================================================== */}

            <div
              className="
                p-5
                sm:p-8
                lg:p-10
                space-y-8
              "
            >
              {/* BADGES */}

              <div
                className="
                  flex
                  gap-3
                  flex-wrap
                "
              >
                <VisibilityBadge
                  visibility={
                    content.visibility
                  }
                />

                <StatusBadge
                  status={content.status}
                />
              </div>

              {/* TITLE */}

              <div>
                <h3 className="text-3xl font-black">
                  {content.title}
                </h3>

                <p
                  className="
                    mt-5
                    text-zinc-400
                    leading-8
                  "
                >
                  {content.description ||
                    "No description available."}
                </p>
              </div>

              {/* INFO */}

              <div
                className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-5
                "
              >
                <InfoCard
                  icon={<DollarSign />}
                  title="Price"
                  value={`${
                    content.price || 0
                  }`}
                />

                <InfoCard
                  icon={<Eye />}
                  title="Views"
                  value={
                    content.views || 0
                  }
                />

                <InfoCard
                  icon={
                    isImage ? (
                      <ImageIcon />
                    ) : (
                      <PlayCircle />
                    )
                  }
                  title="Type"
                  value={
                    isImage
                      ? `Images (${imageUrls.length})`
                      : content.mediaType ||
                        "Content"
                  }
                />

                <InfoCard
                  icon={<Calendar />}
                  title="Published"
                  value={
                    content.createdAt
                      ? new Date(
                          content.createdAt
                        ).toLocaleDateString()
                      : "-"
                  }
                />
              </div>

              {/* CATEGORY */}

              <div>
                <h4 className="font-black mb-4">
                  Category
                </h4>

                <span
                  className="
                    inline-block
                    px-4
                    py-2
                    rounded-full
                    bg-black
                    border
                    border-white/10
                  "
                >
                  {content.category ||
                    "Uncategorized"}
                </span>
              </div>

              {/* TAGS */}

              <div>
                <h4 className="font-black mb-4">
                  Tags
                </h4>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                  "
                >
                  {(content.tags || []).length ? (
                    (
                      Array.isArray(
                        content.tags
                      )
                        ? content.tags
                        : String(
                            content.tags
                          ).split(",")
                    ).map(
                      (tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="
                            px-3
                            py-2
                            rounded-full
                            bg-yellow-500/10
                            text-yellow-400
                            text-sm
                          "
                        >
                          #{String(
                            tag
                          ).trim()}
                        </span>
                      )
                    )
                  ) : (
                    <span className="text-zinc-500">
                      No tags
                    </span>
                  )}
                </div>
              </div>

              {/* COLLABORATOR */}

              {content.collaborator && (
                <div>
                  <h4 className="font-black mb-4">
                    Collaborator
                  </h4>

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      bg-black
                      p-4
                    "
                  >
                    <User />

                    <span>
                      {
                        content.collaborator
                          .name
                      }
                    </span>
                  </div>
                </div>
              )}

              {/* OPTIONS */}

              <div className="space-y-3">
                <Option
                  label="Featured"
                  value={
                    content.featured
                      ? "Yes"
                      : "No"
                  }
                />

                <Option
                  label="Comments"
                  value={
                    content.allowComments
                      ? "Enabled"
                      : "Disabled"
                  }
                />

                <Option
                  label="Media Type"
                  value={
                    content.mediaType ||
                    "Content"
                  }
                />

                {isImage && (
                  <Option
                    label="Total Images"
                    value={
                      imageUrls.length
                    }
                  />
                )}
              </div>

              {/* REJECTION */}

              {content.status ===
                "rejected" &&
                content.reviewComment && (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-red-500/20
                      bg-red-500/10
                      p-6
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-red-400
                        mb-3
                      "
                    >
                      <MessageCircle
                        size={18}
                      />

                      <h4 className="font-black">
                        Reason for Rejection
                      </h4>
                    </div>

                    <p
                      className="
                        text-zinc-300
                        leading-7
                      "
                    >
                      {
                        content.reviewComment
                      }
                    </p>
                  </div>
                )}

              {/* CLOSE */}

              <button
                onClick={onClose}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-yellow-500
                  hover:bg-yellow-400
                  text-black
                  font-black
                "
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        bg-black
        p-5
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
        {icon}

        <span
          className="
            text-xs
            uppercase
            tracking-wider
          "
        >
          {title}
        </span>
      </div>

      <h3
        className="
          text-2xl
          font-black
          mt-4
          capitalize
        "
      >
        {value}
      </h3>
    </div>
  );
}

function Option({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        justify-between
        gap-5
        border-b
        border-white/5
        pb-4
      "
    >
      <span className="text-zinc-500">
        {label}
      </span>

      <span className="font-bold text-right">
        {value}
      </span>
    </div>
  );
}