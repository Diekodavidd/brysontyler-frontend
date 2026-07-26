import { useMemo, useState } from "react";
import {
  Search,
  Plus,
} from "lucide-react";

import GalleryStats from "./components/GalleryStats";
import UploadVideoModal from "./components/UploadVideoModal";
import UploadImagesModal from "./components/UploadImagesModal";
import UploadContentChoiceModal from "./components/UploadContentChoiceModal";
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

  // Upload choice modal
  const [uploadChoiceOpen, setUploadChoiceOpen] =
    useState(false);

  // Video upload modal
  const [uploadVideoOpen, setUploadVideoOpen] =
    useState(false);

  // Image upload modal
  const [uploadImagesOpen, setUploadImagesOpen] =
    useState(false);

  // Preview
  const [previewVideo, setPreviewVideo] =
    useState(null);

  // Delete
  const [deleteVideo, setDeleteVideo] =
    useState(null);

  /*
  ==========================================
  GET BRAND GALLERY
  ==========================================
  */

  const {
    data: galleryItems = [],
    isLoading,
  } = useBrandGallery();

  /*
  ==========================================
  DELETE
  ==========================================
  */

  const deleteMutation =
    useDeleteBrandVideo();

  /*
  ==========================================
  FILTER GALLERY
  ==========================================
  */

  const filteredItems = useMemo(() => {
    return galleryItems.filter((item) => {

      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesMembership =
        membershipFilter === "all" ||
        item.membership?.toLowerCase() ===
          membershipFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        item.category?.toLowerCase() ===
          categoryFilter.toLowerCase();

      return (
        matchesSearch &&
        matchesMembership &&
        matchesCategory
      );
    });
  }, [
    galleryItems,
    search,
    membershipFilter,
    categoryFilter,
  ]);

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (isLoading) {
    return (
      <div className="py-40 text-center">
        Loading gallery...
      </div>
    );
  }

  /*
  ==========================================
  OPEN VIDEO UPLOAD
  ==========================================
  */

  const handleSelectVideo = () => {
    setUploadChoiceOpen(false);

    setTimeout(() => {
      setUploadVideoOpen(true);
    }, 150);
  };

  /*
  ==========================================
  OPEN IMAGE UPLOAD
  ==========================================
  */

  const handleSelectImages = () => {
    setUploadChoiceOpen(false);

    setTimeout(() => {
      setUploadImagesOpen(true);
    }, 150);
  };

  /*
  ==========================================
  OPEN UPLOAD CHOICE
  ==========================================
  */

  const openUploadChoice = () => {
    setUploadChoiceOpen(true);
  };

  /*
  ==========================================
  RENDER
  ==========================================
  */

  return (
    <>
      <div className="space-y-8">

        {/* =================================
            HEADER
        ================================= */}

        <div className="flex flex-col lg:flex-row gap-6 lg:justify-between">

          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-amber-500">
              Brand Gallery
            </p>

            <h1 className="text-4xl font-black mt-3">
              Gallery Manager
            </h1>

            <p className="text-zinc-500 mt-3">
              Upload and manage Bryson Tyler gallery
              videos and images.
            </p>

          </div>

          <button
            onClick={openUploadChoice}
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
            "
          >
            <Plus size={18} />

            Upload Content
          </button>

        </div>


        {/* =================================
            STATS
        ================================= */}

        <GalleryStats
          content={galleryItems}
        />


        {/* =================================
            FILTERS
        ================================= */}

        <div className="flex flex-col xl:flex-row gap-5">

          {/* SEARCH */}

          <div className="relative w-full xl:w-[380px]">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search gallery..."
              className="
                w-full
                rounded-2xl
                border
                border-white/5
                bg-[#090909]
                py-3
                pl-12
                pr-5
                outline-none
                focus:border-amber-500
              "
            />

          </div>


          {/* FILTERS */}

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
            w-full
            xl:w-auto
          ">

            {/* MEMBERSHIP */}

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
              "
            >

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


            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(
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
              "
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


        {/* =================================
            GALLERY
        ================================= */}

        {filteredItems.length === 0 ? (

          <EmptyGallery
            onUpload={openUploadChoice}
          />

        ) : (

          <GalleryGrid
            videos={filteredItems}
            onPreview={setPreviewVideo}
            onDelete={setDeleteVideo}
          />

        )}

      </div>


      {/* =================================
          UPLOAD CONTENT CHOICE
      ================================= */}

      <UploadContentChoiceModal
        open={uploadChoiceOpen}
        onClose={() =>
          setUploadChoiceOpen(false)
        }
        onSelectVideo={
          handleSelectVideo
        }
        onSelectImages={
          handleSelectImages
        }
      />


      {/* =================================
          VIDEO UPLOAD
      ================================= */}

      <UploadVideoModal
        open={uploadVideoOpen}
        onClose={() =>
          setUploadVideoOpen(false)
        }
      />


      {/* =================================
          IMAGE UPLOAD
      ================================= */}

      <UploadImagesModal
        open={uploadImagesOpen}
        onClose={() =>
          setUploadImagesOpen(false)
        }
      />


      {/* =================================
          PREVIEW
      ================================= */}

      <VideoPreviewModal
        video={previewVideo}
        open={!!previewVideo}
        onClose={() =>
          setPreviewVideo(null)
        }
      />


      {/* =================================
          DELETE
      ================================= */}

      <DeleteVideoModal
        open={!!deleteVideo}
        video={deleteVideo}
        loading={
          deleteMutation.isPending
        }
        onClose={() =>
          setDeleteVideo(null)
        }
        onConfirm={(video) =>
          deleteMutation.mutate(
            video._id,
            {
              onSuccess: () => {
                setDeleteVideo(null);
              },
            }
          )
        }
      />

    </>
  );
}