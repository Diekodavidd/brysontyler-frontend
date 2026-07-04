import {
  Play,
  Lock,
  Crown,
  Sparkles,
  Clock3,
} from "lucide-react";

export default function VideoCard({
  video,
  membership,
  onLocked,
  onPlay,
}){
  
  const userPlan = membership?.toLowerCase();
const requiredPlan = video.membership?.toLowerCase();

const canWatch = () => {
  if (userPlan === "elite") return true;

  if (userPlan === "vip") {
    return requiredPlan !== "elite";
  }

  return requiredPlan === "free";
};
  const locked = !canWatch();

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
    badge[video.membership] ||
    badge.free;

  return (
    <div className="group relative rounded-[30px] overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/30 transition-all duration-500 cursor-pointer">

      {/* Thumbnail */}

      <div
        className="relative aspect-[9/13] overflow-hidden"
    onClick={() =>
        locked
            ? onLocked(video)
            : onPlay(video)
    }

      >
      <video
    src={video.previewUrl}
    muted
    autoPlay
    loop
    playsInline
    preload="metadata"
    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
/>

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

        {/* Locked Overlay */}

        {locked && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        )}

        {/* Membership */}

        <div
          className={`absolute top-5 left-5 px-3
py-1.5
lg:px-4
lg:py-2 rounded-full text-[10px] font-black tracking-[.25em] ${current.className}`}
        >
          {current.label}
        </div>

        {/* Duration */}

        <div className="absolute top-5 right-5 rounded-full bg-black/60 backdrop-blur px-3
py-1.5
lg:px-4
lg:py-2 text-xs flex items-center gap-2">

          <Clock3 size={13} />

          {video.duration}

        </div>

        {/* Hover */}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">

          {locked ? (

       <button
    onClick={(e)=>{
        e.stopPropagation();

        locked
            ? onLocked(video)
            : onPlay(video);
    }}
    className="w-16
h-16
lg:w-20
lg:h-20 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center shadow-2xl"
>
              <Lock
                size={34}
                className="text-black"
              />
            </button>

          ) : (

            <button className="w-16
h-16
lg:w-20
lg:h-20 rounded-full bg-yellow-500 hover:bg-yellow-400 flex items-center justify-center shadow-2xl">

              <Play
                size={34}
                fill="currentColor"
                className="text-black ml-1"
              />

            </button>

          )}

        </div>

        {/* Bottom */}

        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">

          <div className="rounded-3xl bg-black/50 backdrop-blur-xl border border-white/10 p-4 lg:p-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                <Sparkles
                  size={15}
                  className="text-yellow-400"
                />

                <span className="uppercase text-[10px] tracking-[.3em] font-black text-yellow-400">

                  Original

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

            <h3 className="mt-4 text-xl lg:text-2xl font-black line-clamp-2">

              {video.title}

            </h3>

            <p className="text-zinc-400 mt-3 text-sm leading-6 line-clamp-2">

              Premium Bryson Tyler exclusive content available for members.

            </p>

            <button
              onClick={(e) => {
    e.stopPropagation();

    locked
        ? onLocked(video)
        : onPlay(video);
}}
              className={`mt-6 w-full rounded-2xl py-3 font-black transition flex justify-center items-center gap-3 ${
                locked
                  ? "bg-white/10 hover:bg-red-600"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black"
              }`}
            >
              {locked ? (
                <>
                  <Lock size={16} />
                  Unlock Access
                </>
              ) : (
                <>
                  <Play
                    size={16}
                    fill="currentColor"
                  />
                  Watch Now
                </>
              )}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}