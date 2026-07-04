import GalleryCard from "./GalleryCard";

export default function GalleryGrid({
  videos = [],
  onPreview,
  onDelete,
  onEdit,
}) {
  if (!videos.length) return null;

  return (
    <div className="grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
2xl:grid-cols-4
gap-6">
      {videos.map((video) => (
        <GalleryCard
          key={video._id}
          video={video}
          onPreview={onPreview}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}