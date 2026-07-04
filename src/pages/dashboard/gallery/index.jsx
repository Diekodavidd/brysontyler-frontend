import { useState } from "react";

import GalleryHero from "./components/GalleryHero";
import MembershipBanner from "./components/MembershipBanner";
import CategoryTabs from "./components/CategoryTabs";
import ContinueWatching from "./components/ContinueWatching";
import VideoRow from "./components/VideoRow";
import UpgradeBanner from "./components/UpgradeBanner";
import LockedVideoModal from "./components/LockedVideoModal";
import VideoPlayerModal from "./components/VideoPlayerModal";

import {
  useCreateMembership,
} from "@/hooks/useMembership";
import { useAuthStore } from "../../../store/useAuthStore";
  import { useGallery } from "@/hooks/useContent";



export default function GalleryPage() {

   const user = useAuthStore((state) => state.user);
  console.log(user);
  
const membership =
  user?.membership?.plan?.toLowerCase() || "free";
  
  const [playingVideo, setPlayingVideo] =
    useState();
const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] =
    useState(null);


const {
    data: videos = [],
    isLoading,
} = useGallery();

if (isLoading) {
  return (
    
    <div className="py-40 text-center">
      Loading Gallery...
    </div>
  );
}
console.log("VIDEOS", videos);
 const FIVE_HOURS = 1000 * 60 * 60 * 5;

const getFeaturedVideo = () => {
    if (!videos.length) return null;

    const saved = JSON.parse(
        localStorage.getItem("hero-video") || "null"
    );

    if (
        saved &&
        Date.now() - saved.time < FIVE_HOURS
    ) {
        const existing = videos.find(
            v => v._id === saved.id
        );

        if (existing) return existing;
    }

    const random =
        videos[
            Math.floor(
                Math.random() * videos.length
            )
        ];

    localStorage.setItem(
        "hero-video",
        JSON.stringify({
            id: random._id,
            time: Date.now(),
        })
    );

    return random;
};

const featured = getFeaturedVideo();

const trending = videos.slice(0, 10);

const originals = videos.filter(
    v =>
        v.brandCollection ===
        "Bryson Tyler Originals"
);

const couples = videos.filter(
    v => v.category === "Couples"
);

const solo = videos.filter(
    v => v.category === "Solo"
);

const interviews = videos.filter(
    v => v.category === "Interviews"
);

const behindScenes = videos.filter(
    v => v.category === "Behind the Scenes"
);

const newReleases = [...videos]
    .sort(
        (a, b) =>
            new Date(b.createdAt) -
            new Date(a.createdAt)
    )
    .slice(0, 10);
  const documentaries = Array.from(
    { length: 10 },
    (_, i) => ({
      id: 400 + i,
      title: `Documentary ${i + 1}`,
      duration: "1 hr",
      membership: "VIP",
      thumbnail: `https://picsum.photos/500/704?random=${i}`,
    })
  );
const rows = [
    {
        id: "trending",
        title: "Trending Now",
        videos: trending,
    },
    {
        id: "exclusive",
        title: "Bryson Tyler Originals",
        videos: originals,
    },
    {
        id: "couples",
        title: "Couples",
        videos: couples,
    },
    {
        id: "new",
        title: "New Releases",
        videos: newReleases,
    },
    {
        id: "behind-scenes",
        title: "Behind the Scenes",
        videos: behindScenes,
    },
    {
        id: "solo",
        title: "Solo",
        videos: solo,
    },
    {
        id: "interviews",
        title: "Interviews",
        videos: interviews,
    },
];

const orderedRows =
  activeCategory === "all"
    ? rows
    : [
        ...rows.filter((row) => row.id === activeCategory),
        ...rows.filter((row) => row.id !== activeCategory),
      ];
      console.log("PLAYING VIDEO", playingVideo);
  return (
    
<div className="space-y-8 lg:space-y-14">
  <GalleryHero
    featured={featured}
    membership={membership}
    onLocked={setSelectedVideo}
    onPlay={setPlayingVideo}
/>

    

<CategoryTabs
  active={activeCategory}
  onChange={(id) => {
    setActiveCategory(id);

    setTimeout(() => {
      window.scrollTo({
        top: 900,
        behavior: "smooth",
      });
    }, 100);
  }}
/>
     <ContinueWatching membership={membership} />

{orderedRows.map((row, index) => (
  <div
    key={row.id}
    className={index === 0 ? "scroll-mt-32" : ""}
  >
    <VideoRow
    title={row.title}
    videos={row.videos}
    membership={membership}
    onLocked={setSelectedVideo}
    onPlay={setPlayingVideo}
/>

    {index === 2 && (
      <UpgradeBanner membership={membership} />
    )}
  </div>
))}

<LockedVideoModal
  open={!!selectedVideo}
  video={selectedVideo}
  membership={membership}
  onClose={() => setSelectedVideo(null)}
/>

    <VideoPlayerModal
    open={!!playingVideo}
    video={playingVideo}
    onClose={() => setPlayingVideo(undefined)}
/>  

    </div>
  );
}