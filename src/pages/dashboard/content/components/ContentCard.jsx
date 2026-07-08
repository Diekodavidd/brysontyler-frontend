import {
  Eye,
  Pencil,
  Trash2,
  DollarSign,
  Calendar,
  PlayCircle,
  Image as ImageIcon,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

import VisibilityBadge from "./VisisbilitBadge";
import StatusBadge from "./StatusBadge";

export default function ContentCard({
  item,
  onPreview,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-[32px] overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/30 transition-all duration-300">

      {/* Thumbnail */}

      <div className="relative h-60 bg-black">

        {item.thumbnail || item.thumbnailUrl ? (
          <img
            src={item.thumbnail || item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center bg-zinc-800">
            {item.type === "video" ? (
              <PlayCircle
                size={60}
                className="text-zinc-600"
              />
            ) : (
              <ImageIcon
                size={60}
                className="text-zinc-600"
              />
            )}
          </div>
        )}

        {/* Type */}

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-xs font-bold uppercase">

          {item.type || "Video"}

        </div>

        {/* Visibility */}

        <div className="absolute top-4 right-4">

          <VisibilityBadge
            visibility={item.visibility}
          />

        </div>

      </div>

      {/* Body */}

      <div className="p-5 lg:p-6 space-y-5">

        <div>

          <h2 className="text-xl lg:text-2xl font-black line-clamp-1">

            {item.title}

          </h2>

          <p className="text-zinc-500 mt-2 line-clamp-2">

            {item.description ||
              "No description"}

          </p>

        </div>

        {/* Status */}

        <div className="flex items-center justify-between">

          <StatusBadge
            status={item.status}
          />

          <span className="text-xs text-zinc-500">

            {item.createdAt &&
              new Date(
                item.createdAt
              ).toLocaleDateString()}

          </span>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-4">

          {/* <div className="rounded-2xl bg-black p-4">

            <div className="flex items-center gap-2 text-green-400">

              <DollarSign size={18} />

              <span className="text-xs uppercase font-bold">

                Price

              </span>

            </div>

            <h3 className="text-2xl font-black mt-3">

              $
              {item.price || 0}

            </h3>

          </div> */}

          {/* <div className="rounded-2xl bg-black p-4">

            <div className="flex items-center gap-2 text-yellow-400">

              <ShoppingCart size={18} />

              <span className="text-xs uppercase font-bold">

                Sales

              </span>

            </div>

            <h3 className="text-2xl font-black mt-3">

              {item.sales || 0}

            </h3>

          </div> */}

          <div className="rounded-2xl bg-black p-4">

            <div className="flex items-center gap-2 text-sky-400">

              <Eye size={18} />

              <span className="text-xs uppercase font-bold">

                Views

              </span>

            </div>

            <h3 className="text-2xl font-black mt-3">

              {item.views || 0}

            </h3>

          </div>

          {/* <div className="rounded-2xl bg-black p-4">

            <div className="flex items-center gap-2 text-purple-400">

              <BarChart3 size={18} />

              <span className="text-xs uppercase font-bold">

                Revenue

              </span>

            </div>

            <h3 className="text-2xl font-black mt-3">

              $
              {item.revenue || 0}

            </h3>

          </div> */}

        </div>

        {/* Category */}

        {item.category && (
          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <Calendar size={16} />

            <span>

              {item.category}

            </span>

          </div>
        )}

        {/* Actions */}

        <div className="grid grid-cols-3 gap-3 pt-2">

          <button
            onClick={onPreview}
            className="h-12 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold flex items-center justify-center gap-2 transition"
          >
            <Eye size={16} />
            View
          </button>

          <button
            onClick={onEdit}
            className="h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 font-bold flex items-center justify-center gap-2 transition"
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={onDelete}
            className="h-12 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white font-bold flex items-center justify-center gap-2 transition"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}