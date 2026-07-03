import { useState } from "react";

import GalleryHero from "./components/GalleryHero";
import MembershipBanner from "./components/MembershipBanner";
import CategoryTabs from "./components/CategoryTabs";
import ContinueWatching from "./components/ContinueWatching";
import VideoRow from "./components/VideoRow";
import UpgradeBanner from "./components/UpgradeBanner";
import LockedVideoModal from "./components/LockedVideoModal";

export default function GalleryPage() {
  const membership = "free";
  // free | vip | elite

const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] =
    useState(null);

  /*
    Temporary placeholder data.
    Later this comes from backend.
  */

  const featured = {
    id: 1,
    title: "The Black Room",
    subtitle:
      "Bryson Tyler Original",
    duration: "48 mins",
    membership: "elite",
    thumbnail:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&q=80",
  };

  const trending = Array.from(
    { length: 10 },
    (_, i) => ({
      id: i + 1,
      title: `Trending #${i + 1}`,
      duration: "32 mins",
      membership:
        i % 3 === 0
          ? "elite"
          : i % 2 === 0
          ? "vip"
          : "free",
      thumbnail: `https://picsum.photos/500/700?random=${i}`,
    })
  );

  const originals = Array.from(
    { length: 10 },
    (_, i) => ({
      id: 100 + i,
      title: `Original ${i + 1}`,
      duration: "45 mins",
      membership:
        i % 2 === 0 ? "elite" : "vip",
      thumbnail: `https://picsum.photos/500/701?random=${i}`,
    })
  );

  const lifestyle = Array.from(
    { length: 10 },
    (_, i) => ({
      id: 200 + i,
      title: `Lifestyle ${i + 1}`,
      duration: "21 mins",
      membership: "free",
      thumbnail: `https://picsum.photos/500/702?random=${i}`,
    })
  );

  const series = Array.from(
    { length: 10 },
    (_, i) => ({
      id: 300 + i,
      title: `Series ${i + 1}`,
      duration: "58 mins",
      membership: "elite",
      thumbnail: `https://picsum.photos/500/703?random=${i}`,
    })
  );

  const documentaries = Array.from(
    { length: 10 },
    (_, i) => ({
      id: 400 + i,
      title: `Documentary ${i + 1}`,
      duration: "1 hr",
      membership: "vip",
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
    videos: lifestyle,
  },
  {
    id: "new",
    title: "New Releases",
    videos: series,
  },
  {
    id: "behind-scenes",
    title: "Behind the Scenes",
    videos: series,
  },
  {
    id: "solo",
    title: "Solo",
    videos: documentaries,
  },
  {
    id: "interviews",
    title: "Interviews",
    videos: documentaries,
  },
];

const orderedRows =
  activeCategory === "all"
    ? rows
    : [
        ...rows.filter((row) => row.id === activeCategory),
        ...rows.filter((row) => row.id !== activeCategory),
      ];
  return (
    <div className="space-y-14">

      <GalleryHero
        featured={featured}
        membership={membership}
        onLocked={() =>
          setSelectedVideo(featured)
        }
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

      

    </div>
  );
}