import { useMemo, useState } from "react";
import {
  Upload,
  Search,
  Filter,
  Plus,
  Video,
  Eye,
  Crown,
  Trash2,
  Pencil,
  Star,
} from "lucide-react";

import GalleryStats from "./components/GalleryStats";
import UploadVideoModal from "./components/UploadVideoModal";
import GalleryGrid from "./components/GalleryGrid";
import DeleteVideoModal from "./components/DeleteVideoModal";
import VideoPreviewModal from "./components/VideoPreviewModal";
import EmptyGallery from "./components/EmptyGallery";
import {
    useBrandGallery,
    useDeleteBrandVideo,
} from "@/hooks/useContent";

export default function BrandGalleryPage() {
  const [search, setSearch] = useState("");
  const [membershipFilter, setMembershipFilter] =
    useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [uploadOpen, setUploadOpen] =
    useState(false);

  const [previewVideo, setPreviewVideo] =
    useState(null);

  const [deleteVideo, setDeleteVideo] =
    useState(null);


const {
    data: videos = [],
    isLoading,
} = useBrandGallery();

const deleteMutation =
    useDeleteBrandVideo();

const filteredVideos = useMemo(() => {
        return videos.filter((video) => {
      const matchesSearch =
        video.title
          .toLowerCase()
          .includes(search.toLowerCase());

     const matchesMembership =
    membershipFilter === "all" ||
    video.membership?.toLowerCase() ===
        membershipFilter;

  const matchesCategory =
    categoryFilter === "all" ||
    video.category?.toLowerCase() ===
        categoryFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesMembership &&
        matchesCategory
      );
    });
  }, [
    search,
    membershipFilter,
    categoryFilter,
  ]);
if (isLoading) {
  return (
    <div className="py-40 text-center">
      Loading gallery...
    </div>
  );
}
  return (
    <>
      <div className="space-y-8">

        {/* Header */}

<div className="flex flex-col lg:flex-row gap-6 lg:justify-between">
          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-amber-500">

              Brand Gallery

            </p>

            <h1 className="text-4xl font-black mt-3">

              Gallery Manager

            </h1>

            <p className="text-zinc-500 mt-3">

              Upload and manage Bryson Tyler gallery videos.

            </p>

          </div>

          <button
            onClick={() =>
              setUploadOpen(true)
            }
className="
self-start
lg:self-auto
rounded-2xl
bg-amber-500
hover:bg-amber-400
px-6
py-4
text-black
font-black
flex
items-center
gap-2
transition
"          >

            <Plus size={18} />

            Upload Video

          </button>

        </div>

        {/* Stats */}

        <GalleryStats videos={videos} />

        {/* Filters */}

<div className="flex flex-col xl:flex-row gap-5">
          <div className="relative w-full
xl:w-[380px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search videos..."
              className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-5 outline-none focus:border-amber-500"
            />

          </div>

<div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
            <select
              value={membershipFilter}
              onChange={(e) =>
                setMembershipFilter(
                  e.target.value
                )
              }
className="
w-full
sm:w-auto
rounded-xl
border
border-white/10
bg-[#090909]
px-4
py-3
"            >

              <option value="all">
                All Memberships
              </option>

              <option value="free">
                FREE
              </option>

              <option value="vip">
                VIP
              </option>

              <option value="elite">
                ELITE
              </option>

            </select>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
                  e.target.value
                )
              }
              className="rounded-xl border border-white/10 bg-[#090909] px-4"
            >

              <option value="all">
                All Categories
              </option>

              <option value="Lifestyle">
                Lifestyle
              </option>

              <option value="Travel">
                Travel
              </option>

              <option value="Fitness">
                Fitness
              </option>

            </select>

          </div>

        </div>

        {/* Gallery */}

        {filteredVideos.length === 0 ? (

<EmptyGallery
    onUpload={() => setUploadOpen(true)}
/>
        ) : (

          <GalleryGrid
            videos={filteredVideos}
            onPreview={
              setPreviewVideo
            }
            onDelete={
              setDeleteVideo
            }
          />

        )}

      </div>

      {/* Upload */}

      <UploadVideoModal
        open={uploadOpen}
        onClose={() =>
          setUploadOpen(false)
        }
      />

      {/* Preview */}

      <VideoPreviewModal
        video={previewVideo}
        open={!!previewVideo}
        onClose={() =>
          setPreviewVideo(null)
        }
      />

      {/* Delete */}

      <DeleteVideoModal
    open={!!deleteVideo}
    video={deleteVideo}
    loading={deleteMutation.isPending}
    onClose={() =>
        setDeleteVideo(null)
    }
    onConfirm={(video) =>
        deleteMutation.mutate(video._id, {
            onSuccess: () => {
                setDeleteVideo(null);
            },
        })
    }
/>
    </>
  );
}