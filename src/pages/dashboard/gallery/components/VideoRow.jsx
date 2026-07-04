import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import VideoCard from "./VideoCard";

export default function VideoRow({
    title,
    videos,
    membership,
    onLocked,
    onPlay,
}){
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -900 : 900,
      behavior: "smooth",
    });
  };

  if (!videos.length) return null;

  return (
    <section className="space-y-7">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl lg:text-3xl font-black">

            {title}

          </h2>

          <p className="text-zinc-500 mt-2">

            {videos.length} videos

          </p>

        </div>

        <div className="hidden md:flex items-center gap-3">

          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 hover:border-yellow-500 hover:bg-zinc-800 transition flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-zinc-900 border border-white/5 hover:border-yellow-500 hover:bg-zinc-800 transition flex items-center justify-center"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

      {/* Videos */}

      <div
        ref={sliderRef}
        className="flex gap-4 lg:gap-7 overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
      >

        {videos.map((video) => (

          <div
            key={video.id}
            className="min-w-[250px]
sm:min-w-[300px]
lg:min-w-[340px]

max-w-[250px]
sm:max-w-[300px]
lg:max-w-[340px] flex-shrink-0"
          >

            <VideoCard
    video={video}
    membership={membership}
    onLocked={onLocked}
    onPlay={onPlay}
/>

          </div>

        ))}

      </div>

    </section>
  );
}