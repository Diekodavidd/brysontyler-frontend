import {
  Video,
  Image,
  Eye,
  Crown,
  Star,
  Lock,
  PlayCircle,
} from "lucide-react";

export default function GalleryStats({
  content = [],
}) {

  // ==============================
  // MEDIA COUNTS
  // ==============================

const totalVideos = content.filter(
  (item) =>
    item.mediaType?.toLowerCase() === "video" ||
    item.type?.toLowerCase() === "brand"
).length;

  const totalImages = content.filter(
    (item) =>
      item.mediaType?.toLowerCase() === "image"
  ).length;

  const totalContent = content.length;


  // ==============================
  // OTHER STATS
  // ==============================

  const featuredContent = content.filter(
    (item) => item.featured
  ).length;

  const freeContent = content.filter(
    (item) =>
      item.membership?.toLowerCase() === "free"
  ).length;

  const vipContent = content.filter(
    (item) =>
      item.membership?.toLowerCase() === "vip"
  ).length;

  const eliteContent = content.filter(
    (item) =>
      item.membership?.toLowerCase() === "elite"
  ).length;


  // ==============================
  // TOTAL VIEWS
  // ==============================

  const totalViews = content.reduce(
    (sum, item) =>
      sum + (Number(item.views) || 0),
    0
  );


  // ==============================
  // STATS
  // ==============================

  const stats = [
    {
      title: "Total Content",
      value: totalContent,
      icon: PlayCircle,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },

    {
      title: "Videos",
      value: totalVideos,
      icon: Video,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },

    {
      title: "Images",
      value: totalImages,
      icon: Image,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },

    {
      title: "Featured",
      value: featuredContent,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },

    {
      title: "FREE",
      value: freeContent,
      icon: PlayCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },

    {
      title: "VIP",
      value: vipContent,
      icon: Crown,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },

    {
      title: "ELITE",
      value: eliteContent,
      icon: Lock,
      color: "text-red-400",
      bg: "bg-red-500/10",
    },

    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      icon: Eye,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
    },
  ];


  // ==============================
  // RENDER
  // ==============================

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-8
        gap-5
      "
    >

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="
              rounded-3xl
              border
              border-white/5
              bg-[#090909]
              p-6
              hover:border-amber-500/20
              transition-all
              duration-300
            "
          >

            <div className="flex items-center justify-between gap-4">

              <div
                className={`
                  h-12
                  w-12
                  shrink-0
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${stat.bg}
                `}
              >
                <Icon
                  size={22}
                  className={stat.color}
                />
              </div>

              <span className="text-2xl xl:text-3xl font-black">
                {stat.value}
              </span>

            </div>

            <p
              className="
                mt-6
                text-xs
                uppercase
                tracking-[0.2em]
                text-zinc-500
                font-black
              "
            >
              {stat.title}
            </p>

          </div>
        );
      })}

    </div>
  );
}