import {
  Video,
  Eye,
  Crown,
  Star,
  Lock,
  PlayCircle,
} from "lucide-react";

export default function GalleryStats({ videos = [] }) {
  const totalVideos = videos.length;

  const featuredVideos = videos.filter(
    (v) => v.featured
  ).length;

  const freeVideos = videos.filter(
    (v) => v.membership?.toLowerCase() === "free"
  ).length;

  const vipVideos = videos.filter(
    (v) => v.membership?.toLowerCase() === "vip"
  ).length;

  const eliteVideos = videos.filter(
    (v) => v.membership?.toLowerCase() === "elite"
  ).length;

  const totalViews = videos.reduce(
    (sum, video) => sum + (video.views || 0),
    0
  );

  const stats = [
    {
      title: "Total Videos",
      value: totalVideos,
      icon: Video,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Featured",
      value: featuredVideos,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
    },
    {
      title: "FREE",
      value: freeVideos,
      icon: PlayCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "VIP",
      value: vipVideos,
      icon: Crown,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "ELITE",
      value: eliteVideos,
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

  return (
    <div className="grid grid-cols-2 xl:grid-cols-6 gap-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-3xl border border-white/5 bg-[#090909] p-6 hover:border-amber-500/20 transition-all"
          >
            <div className="flex items-center justify-between">
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center ${stat.bg}`}
              >
                <Icon
                  size={22}
                  className={stat.color}
                />
              </div>

              <span className="text-3xl font-black">
                {stat.value}
              </span>
            </div>

            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-500 font-black">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}