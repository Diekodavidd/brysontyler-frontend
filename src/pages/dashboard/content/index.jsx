import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  DollarSign,
  Crown,
  Video,
  Image as ImageIcon,
} from "lucide-react";

import { useMyContent } from "@/hooks/useContent";

import StatsCards from "./components/Statscard";
import FilterBar from "./components/FilterBar";
import ContentCard from "./components/ContentCard";
import UploadContentModal from "./components/UploadContentModal";
import EditContentModal from "./components/EditContentModal";
import PreviewContentModal from "./components/PreviewContentModal";
import DeleteContentModal from "./components/DeleteContentModal";
import EmptyState from "./components/EmptyBadge";

export default function ContentPage() {
const {
  data: content = [],
  isLoading,
} = useMyContent();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [showUpload, setShowUpload] = useState(false);

  const [selectedContent, setSelectedContent] =
    useState(null);

  const [editingContent, setEditingContent] =
    useState(null);

  const [deletingContent, setDeletingContent] =
    useState(null);

  const stats = useMemo(() => {
    return {
      revenue: content.reduce(
        (sum, item) => sum + (item.revenue || 0),
        0
      ),

      sales: content.reduce(
        (sum, item) => sum + (item.sales || 0),
        0
      ),
premium: content.filter(
  item =>
    item.visibility === "ppv" ||
    item.visibility === "members_ppv"
).length,

free: content.filter(
  item =>
    item.visibility === "free"
).length,
    };
  }, [content]);

  const filteredContent = useMemo(() => {
    return content.filter((item) => {
      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      switch (filter) {
        case "videos":
          return item.type === "video";

        case "photos":
          return item.type === "image";

      case "premium":
    return (
        item.visibility === "ppv" ||
        item.visibility === "members_ppv"
    );

case "subscriber":
    return item.visibility === "subscribers";

case "free":
    return item.visibility === "free";

       case "draft":
  return item.status === "draft";

case "scheduled":
  return (
    item.status === "scheduled" ||
    item.status === "pending_review"
  );

        default:
          return true;
      }
    });
  }, [content, search, filter]);

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        Loading Creator Studio...
      </div>
    );
  }

  return (
    <>
<div className="space-y-6 lg:space-y-10">
        {/* HEADER */}

<div className="flex flex-col xl:flex-row xl:justify-between xl:items-end gap-6">
          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">
              Creator Studio
            </p>

<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mt-3">              Content Library

            </h1>

<p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-3xl leading-7">              Upload premium videos,
              photos and exclusive
              content for your fans.
            </p>

          </div>

          <button
            onClick={() =>
              setShowUpload(true)
            }
            className="bg-yellow-500 hover:bg-yellow-400 text-black rounded-2xl px-8 py-4 font-black flex items-center gap-3"
          >
            <Plus size={18} />
            Upload Content
          </button>

        </div>

        {/* STATS */}

        <StatsCards
          cards={[
            {
              title: "Revenue",
              value: `$${stats.revenue}`,
              color: "text-green-400",
              icon: (
                <DollarSign size={24} />
              ),
            },
            {
              title: "Sales",
              value: stats.sales,
              color: "text-yellow-400",
              icon: (
                <Crown size={24} />
              ),
            },
            {
              title: "Premium",
              value: stats.premium,
              color: "text-red-400",
              icon: (
                <Video size={24} />
              ),
            },
            {
              title: "Free",
              value: stats.free,
              color: "text-sky-400",
              icon: (
                <ImageIcon size={24} />
              ),
            },
          ]}
        />

        {/* FILTER */}

        <FilterBar
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        {/* CONTENT */}

        {filteredContent.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-7">

            {filteredContent.map((item) => (
              <ContentCard
                key={item._id}
                item={item}
                onPreview={() =>
                  setSelectedContent(item)
                }
                onEdit={() =>
                  setEditingContent(item)
                }
                onDelete={() =>
                  setDeletingContent(item)
                }
              />
            ))}

          </div>
        )}

      </div>

      {/* MODALS */}

      <UploadContentModal
        open={showUpload}
        onClose={() =>
          setShowUpload(false)
        }
      />

      <PreviewContentModal
        open={!!selectedContent}
        content={selectedContent}
        onClose={() =>
          setSelectedContent(null)
        }
      />

      <EditContentModal
        open={!!editingContent}
        content={editingContent}
        onClose={() =>
          setEditingContent(null)
        }
      />

      <DeleteContentModal
        open={!!deletingContent}
        content={deletingContent}
        onClose={() =>
          setDeletingContent(null)
        }
      />
    </>
  );
}