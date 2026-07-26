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
  data: content = [],
  isLoading,
} = useGallery();

if (isLoading) {
  return (
    
    <div className="py-40 text-center">
      Loading Gallery...
    </div>
  );
}
console.log("content", content);
 const FIVE_HOURS = 1000 * 60 * 60 * 5;

const getFeaturedContent = () => {
  if (!content.length) return null;

  const saved = JSON.parse(
    localStorage.getItem("hero-content") || "null"
  );

  if (
    saved &&
    Date.now() - saved.time < FIVE_HOURS
  ) {
    const existing = content.find(
      (item) => item._id === saved.id
    );

    if (existing) {
      return existing;
    }
  }

  const random =
    content[
      Math.floor(
        Math.random() * content.length
      )
    ];

  localStorage.setItem(
    "hero-content",
    JSON.stringify({
      id: random._id,
      time: Date.now(),
    })
  );

  return random;
};

const featured =
  getFeaturedContent();


const trending = content.slice(0, 10);

const originals = content.filter(
  (item) =>
    item.brandCollection
      ?.toLowerCase()
      .includes("bryson tyler originals")
);

const couples = content.filter(
  (item) =>
    item.category?.toLowerCase() ===
    "couples"
);
const solo = content.filter(
  (item) =>
    item.category?.toLowerCase() === "solo"
);

const interviews = content.filter(
  (item) =>
    item.category?.toLowerCase() ===
    "interviews"
);

const behindScenes = content.filter(
  (item) =>
    item.category?.toLowerCase() ===
    "behind the scenes"
);

const newReleases = [...content]
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
    id: "all",
    title: "All Content",
    videos: content,
  },

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