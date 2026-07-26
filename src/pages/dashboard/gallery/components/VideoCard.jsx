import {
  Play,
  Lock,
  Crown,
  Sparkles,
  Clock3,
  Image as ImageIcon,
} from "lucide-react";

export default function VideoCard({
  video,
  membership,
  onLocked,
  onPlay,
}) {
  const userPlan =
    membership?.toLowerCase() || "free";

  const requiredPlan =
    video.membership?.toLowerCase() || "free";

  const mediaType =
    video.mediaType?.toLowerCase() || "video";

  const isImage =
    mediaType === "image";

  const isVideo =
    mediaType === "video";

  /*
  ==========================================
  MEMBERSHIP ACCESS
  ==========================================
  */

  const canWatch = () => {
    if (userPlan === "elite") {
      return true;
    }

    if (userPlan === "vip") {
      return requiredPlan !== "elite";
    }

    return requiredPlan === "free";
  };

  const locked = !canWatch();

  /*
  ==========================================
  MEMBERSHIP BADGES
  ==========================================
  */

  const badge = {
    free: {
      label: "FREE",
      className:
        "bg-emerald-500 text-black",
    },

    vip: {
      label: "VIP",
      className:
        "bg-yellow-500 text-black",
    },

    elite: {
      label: "ELITE",
      className:
        "bg-red-600 text-white",
    },
  };

  const current =
    badge[requiredPlan] || badge.free;

  /*
  ==========================================
  IMAGE SOURCES
  ==========================================
  */

  const firstImage =
    Array.isArray(video.images) &&
    video.images.length > 0
      ? video.images[0]?.url
      : null;

  const imageUrl =
    firstImage ||
    video.fileUrl ||
    video.mediaUrl ||
    video.url ||
    video.thumbnail ||
    "";

  /*
  ==========================================
  VIDEO PREVIEW
  ==========================================
  */

  const videoUrl =
    video.previewUrl ||
    video.fileUrl ||
    video.mediaUrl ||
    video.url ||
    "";

  /*
  ==========================================
  CLICK HANDLER
  ==========================================
  */

  const handleOpen = () => {
    if (locked) {
      onLocked?.(video);
      return;
    }

    onPlay?.(video);
  };

  return (
    <div
      className="
        group
        relative
        rounded-[30px]
        overflow-hidden
        bg-zinc-900
        border
        border-white/5
        hover:border-yellow-500/30
        transition-all
        duration-500
        cursor-pointer
      "
    >

      {/* =====================================
          MEDIA
      ===================================== */}

      <div
        className="
          relative
          aspect-[9/13]
          overflow-hidden
          bg-black
        "
        onClick={handleOpen}
      >

        {/* IMAGE CONTENT */}

        {isImage && imageUrl && (

          <img
            src={imageUrl}
            alt={video.title}
            loading="lazy"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition
              duration-700
              group-hover:scale-110
            "
          />

        )}

        {/* VIDEO CONTENT */}

        {isVideo && videoUrl && (

          <video
            src={videoUrl}
            muted
            autoPlay
            loop
            playsInline
            preload="metadata"
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition
              duration-700
              group-hover:scale-110
            "
          />

        )}

        {/* FALLBACK */}

        {!imageUrl && !videoUrl && (

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-zinc-900
            "
          >

            {isImage ? (
              <ImageIcon
                size={60}
                className="text-zinc-700"
              />
            ) : (
              <Play
                size={60}
                className="text-zinc-700"
              />
            )}

          </div>

        )}

        {/* GRADIENT */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/10
            to-transparent
          "
        />

        {/* LOCKED OVERLAY */}

        {locked && (

          <div
            className="
              absolute
              inset-0
              bg-black/40
              backdrop-blur-[2px]
            "
          />

        )}

        {/* MEDIA TYPE */}

        <div
          className="
            absolute
            top-5
            left-5
            px-3
            py-1.5
            rounded-full
            bg-black/70
            backdrop-blur
            text-[10px]
            font-black
            uppercase
            tracking-wider
          "
        >
          {isImage ? "IMAGE" : "VIDEO"}
        </div>

        {/* MEMBERSHIP */}

        <div
          className={`
            absolute
            top-5
            right-5
            px-3
            py-1.5
            rounded-full
            text-[10px]
            font-black
            tracking-[.25em]
            ${current.className}
          `}
        >
          {current.label}
        </div>

        {/* DURATION - VIDEO ONLY */}

        {isVideo &&
          video.duration > 0 && (

          <div
            className="
              absolute
              top-16
              right-5
              rounded-full
              bg-black/60
              backdrop-blur
              px-3
              py-1.5
              text-xs
              flex
              items-center
              gap-2
            "
          >
            <Clock3 size={13} />

            {video.duration}
          </div>

        )}

        {/* HOVER ACTION */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            opacity-0
            group-hover:opacity-100
            transition
            duration-500
          "
        >

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleOpen();
            }}
            className="
              w-16
              h-16
              lg:w-20
              lg:h-20
              rounded-full
              bg-yellow-500
              hover:bg-yellow-400
              flex
              items-center
              justify-center
              shadow-2xl
            "
          >

            {locked ? (

              <Lock
                size={34}
                className="text-black"
              />

            ) : isImage ? (

              <ImageIcon
                size={34}
                className="text-black"
              />

            ) : (

              <Play
                size={34}
                fill="currentColor"
                className="text-black ml-1"
              />

            )}

          </button>

        </div>

        {/* BOTTOM INFO */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            p-4
            lg:p-6
          "
        >

          <div
            className="
              rounded-3xl
              bg-black/50
              backdrop-blur-xl
              border
              border-white/10
              p-4
              lg:p-5
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Sparkles
                  size={15}
                  className="text-yellow-400"
                />

                <span
                  className="
                    uppercase
                    text-[10px]
                    tracking-[.3em]
                    font-black
                    text-yellow-400
                  "
                >
                  {video.brandCollection ||
                    "Bryson Tyler"}
                </span>

              </div>

              {locked ? (

                <Lock
                  size={18}
                  className="text-red-400"
                />

              ) : (

                <Crown
                  size={18}
                  className="text-yellow-400"
                />

              )}

            </div>

            <h3
              className="
                mt-4
                text-xl
                lg:text-2xl
                font-black
                line-clamp-2
              "
            >
              {video.title}
            </h3>

            <p
              className="
                text-zinc-400
                mt-3
                text-sm
                leading-6
                line-clamp-2
              "
            >
              {video.description ||
                "Premium Bryson Tyler content available for members."}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpen();
              }}
              className={`
                mt-6
                w-full
                rounded-2xl
                py-3
                font-black
                transition
                flex
                justify-center
                items-center
                gap-3
                ${
                  locked
                    ? "bg-white/10 hover:bg-red-600"
                    : "bg-yellow-500 hover:bg-yellow-400 text-black"
                }
              `}
            >

              {locked ? (

                <>
                  <Lock size={16} />
                  Unlock Access
                </>

              ) : (

                <>
                  {isImage ? (
                    <ImageIcon size={16} />
                  ) : (
                    <Play
                      size={16}
                      fill="currentColor"
                    />
                  )}

                  {isImage
                    ? "View Images"
                    : "Watch Now"}
                </>

              )}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}