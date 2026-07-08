import {
  X,
  Eye,
  DollarSign,
  Calendar,
  Tag,
  User,
  PlayCircle,
  Image as ImageIcon,
  MessageCircle,
  Crown,
} from "lucide-react";

import VisibilityBadge from "./VisisbilitBadge";
import StatusBadge from "./StatusBadge";

export default function PreviewContentModal({
  open,
  onClose,
  content,
}) {
  if (!open || !content) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur overflow-y-auto">

      <div className="max-w-6xl mx-3 mx-auto py-16 px-6">

        <div className="bg-zinc-900 rounded-[36px] border border-white/5 overflow-hidden">

          {/* HEADER */}

          <div className="flex items-center justify-between p-8 border-b border-white/5">

            <div>

              <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
                Content Preview
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                {content.title}
              </h2>

            </div>

            <button
              onClick={onClose}
              className="w-12 h-12 rounded-xl bg-black hover:bg-zinc-800 flex items-center justify-center"
            >
              <X />
            </button>

          </div>

          <div className="grid lg:grid-cols-2">

            {/* MEDIA */}

            <div className="bg-black min-h-[600px] flex items-center justify-center">

              {content.type === "image" ? (

                content.fileUrl ? (
                  <img
                    src={content.fileUrl}
                    alt={content.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon
                    size={80}
                    className="text-zinc-700"
                  />
                )

              ) : (

                content.fileUrl ? (
                  <video
                    controls
                    src={content.fileUrl}
                    className="w-full h-full"
                  />
                ) : (
                  <PlayCircle
                    size={90}
                    className="text-zinc-700"
                  />
                )

              )}

            </div>

            {/* DETAILS */}

            <div className="p-5 sm:p-8 lg:p-10 space-y-8">

              <div className="flex gap-3 flex-wrap">

                <VisibilityBadge
                  visibility={content.visibility}
                />

                <StatusBadge
                  status={content.status}
                />

              </div>

              <div>

                <h3 className="text-3xl font-black">

                  {content.title}

                </h3>

                <p className="mt-5 text-zinc-400 leading-8">

                  {content.description ||
                    "No description available."}

                </p>

              </div>

              {/* INFO */}

              <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">

                <InfoCard
                  icon={<DollarSign />}
                  title="Price"
                  value={`$${content.price || 0}`}
                />

                <InfoCard
                  icon={<Eye />}
                  title="Views"
                  value={content.views || 0}
                />

                <InfoCard
                  icon={<Crown />}
                  title="Sales"
                  value={content.sales || 0}
                />

                <InfoCard
                  icon={<Calendar />}
                  title="Published"
                  value={
                    content.createdAt
                      ? new Date(
                          content.createdAt
                        ).toLocaleDateString()
                      : "-"
                  }
                />

              </div>

              {/* CATEGORY */}

              <div>

                <h4 className="font-black mb-4">

                  Category

                </h4>

                <span className="px-4 py-2 rounded-full bg-black border border-white/10">

                  {content.category ||
                    "Uncategorized"}

                </span>

              </div>

              {/* TAGS */}

              <div>

                <h4 className="font-black mb-4">

                  Tags

                </h4>

                <div className="flex flex-wrap gap-3">

                  {(content.tags || [])
                    .length ? (
                    (Array.isArray(content.tags)
                      ? content.tags
                      : String(
                          content.tags
                        ).split(",")
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-sm"
                      >
                        #{tag.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500">
                      No tags
                    </span>
                  )}

                </div>

              </div>

              {/* COLLAB */}

              {content.collaborator && (

                <div>

                  <h4 className="font-black mb-4">

                    Collaborator

                  </h4>

                  <div className="flex items-center gap-3 rounded-2xl bg-black p-4">

                    <User />

                    <span>

                      {content.collaborator.name}

                    </span>

                  </div>

                </div>

              )}

              {/* OPTIONS */}

              <div className="space-y-3">

                <Option
                  label="Featured"
                  value={
                    content.featured
                      ? "Yes"
                      : "No"
                  }
                />

                <Option
                  label="Comments"
                  value={
                    content.allowComments
                      ? "Enabled"
                      : "Disabled"
                  }
                />

                <Option
                  label="Type"
                  value={content.type}
                />

              </div>
{content.status === "rejected" && content.reviewComment && (
  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
    <div className="flex items-center gap-2 text-red-400 mb-3">
      <MessageCircle size={18} />
      <h4 className="font-black">
        Reason for Rejection
      </h4>
    </div>

    <p className="text-zinc-300 leading-7">
      {content.reviewComment}
    </p>
  </div>
)}
              <button
                onClick={onClose}
                className="w-full h-14 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black"
              >
                Close Preview
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-black p-5">

      <div className="flex items-center gap-2 text-yellow-400">

        {icon}

        <span className="text-xs uppercase tracking-wider">

          {title}

        </span>

      </div>

      <h3 className="text-2xl font-black mt-4">

        {value}

      </h3>

    </div>
  );
}

function Option({
  label,
  value,
}) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-4">

      <span className="text-zinc-500">
        {label}
      </span>

      <span className="font-bold">
        {value}
      </span>

    </div>
  );
}