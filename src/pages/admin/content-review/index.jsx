import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  XCircle,
  Trash2,
  Clock3,
  Video,
  User,
  PlayCircle,
} from "lucide-react";

import {
  usePendingContent,
  useApproveContent,
  useRejectContent,
} from "@/hooks/useAdmin";
import { useReviewedContent } from "../../../hooks/useAdmin";

export default function ContentReviewPage() {
  const [search, setSearch] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);

  const { data, isLoading } = usePendingContent();
console.log("Pending Response:", data);
  const approveMutation = useApproveContent();
  const rejectMutation = useRejectContent();
const [showRejectModal, setShowRejectModal] = useState(false);

const [rejectionReason, setRejectionReason] =
  useState("");
  const pendingContent = data?.content || [];

  const filtered = useMemo(() => {
    const term = search.toLowerCase();

    return pendingContent.filter((item) => {
      return (
        item.title?.toLowerCase().includes(term) ||
        item.description?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term) ||
        item.creatorId?.name?.toLowerCase().includes(term) ||
        item.creatorId?.creatorVerification?.stageName
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [pendingContent, search]);
const {
  data: reviewedData,
} = useReviewedContent();

const reviewedContent =
  reviewedData?.content || [];
  if (isLoading) {
    return (
      <div className="py-40 text-center text-zinc-500">
        Loading pending content...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-amber-500 font-black">
              Moderation
            </p>

            <h1 className="text-4xl font-black mt-3">
              Content Review
            </h1>

            <p className="text-zinc-500 mt-3">
              Review creator uploads before they become public.
            </p>

          </div>

          <button className="self-start lg:self-auto rounded-2xl bg-amber-500 px-6 py-3 text-black font-black hover:bg-amber-400 transition">

            {pendingContent.length} Pending

          </button>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <Stat
            title="Pending"
            value={pendingContent.length}
            icon={Clock3}
          />

          <Stat
            title="Approved Today"
            value={
              pendingContent.filter(
                (item) => item.status === "scheduled"
              ).length
            }
            icon={CheckCircle2}
          />

          <Stat
            title="Rejected"
            value={
              pendingContent.filter(
                (item) => item.status === "rejected"
              ).length
            }
            icon={XCircle}
          />

          <Stat
            title="Videos"
            value={pendingContent.length}
            icon={Video}
          />

        </div>

        {/* Search */}

        <div className="flex flex-col lg:flex-row gap-5">

          <div className="relative w-full lg:w-[420px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search uploads..."
              className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-4 outline-none focus:border-amber-500"
            />

          </div>

          <button className="rounded-2xl border border-white/10 bg-[#090909] px-6 py-3 hover:border-amber-500 flex items-center justify-center gap-2">

            <Filter size={18} />

            Filters

          </button>

        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-3xl border border-white/5">

          <table className="w-full min-w-[950px]">

            <thead className="bg-[#090909]">

              <tr className="text-left text-xs uppercase tracking-widest text-zinc-500">

                <th className="p-5">Video</th>
                <th>Creator</th>
                <th>Category</th>
                <th>Access</th>
                <th>Uploaded</th>
                <th></th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((video) => (

                <tr
                  key={video._id}
                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      {video.thumbnail || video.poster ? (

                        <img
                          src={video.thumbnail || video.poster}
                          alt={video.title}
                          className="h-20 w-28 rounded-xl object-cover flex-shrink-0"
                        />

                      ) : (

                        <video
                          src={video.videoUrl}
                          className="h-20 w-28 rounded-xl object-cover"
                          muted
                        />

                      )}

                      <div>

                        <h3 className="font-black">
                          {video.title}
                        </h3>

                        <p className="text-zinc-500 text-sm mt-1">
                          {video.duration || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>

                    {video.creatorId?.creatorVerification?.stageName ||
                      video.creatorId?.name ||
                      "-"}

                  </td>

                  <td>{video.category || "-"}</td>

                  <td>
                    {video.protection?.premium
                      ? "PREMIUM"
                      : "FREE"}
                  </td>

                  <td>
                    {new Date(video.createdAt).toLocaleDateString()}
                  </td>

                  <td>

                    <button
                      onClick={() => setSelectedContent(video)}
                      className="rounded-xl border border-white/10 p-3 hover:border-amber-500 transition"
                    >

                      <Eye size={18} />

                    </button>

                  </td>

                </tr>

              ))}

              {filtered.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-20 text-center text-zinc-500"
                  >

                    No pending uploads found.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
<div className="mt-16">

  <div className="mb-8">

    <p className="uppercase tracking-[.3em] text-xs text-amber-500 font-black">
      Review History
    </p>

    <h2 className="text-3xl font-black mt-3">
      Approved & Rejected Content
    </h2>

    <p className="text-zinc-500 mt-2">
      Previously reviewed uploads.
    </p>

  </div>

  <div className="overflow-x-auto rounded-3xl border border-white/5">

    <table className="w-full min-w-[1100px]">

      <thead className="bg-[#090909]">

        <tr className="text-left text-xs uppercase tracking-widest text-zinc-500">

          <th className="p-5">Video</th>
          <th>Creator</th>
          <th>Status</th>
          <th>Reviewed</th>
          <th>Moderator</th>
          <th></th>

        </tr>

      </thead>

      <tbody>

        {reviewedContent.map((video) => (

          <tr
            key={video._id}
            className="border-t border-white/5 hover:bg-white/[0.02]"
          >

            <td className="p-5">

              <div className="flex items-center gap-4">

                <img
                  src={
                    video.thumbnail ||
                    "https://placehold.co/400x250"
                  }
                  className="h-20 w-28 rounded-xl object-cover"
                />

                <div>

                  <h3 className="font-black">
                    {video.title}
                  </h3>

                  <p className="text-zinc-500 text-sm">
                    {video.category}
                  </p>

                </div>

              </div>

            </td>

            <td>

              {video.creatorId?.creatorVerification
                ?.stageName ||
                video.creatorId?.name}

            </td>

            <td>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold

                ${
                  video.status === "rejected"
                    ? "bg-red-500/20 text-red-400"

                    : video.status ===
                      "changes_requested"

                    ? "bg-yellow-500/20 text-yellow-400"

                    : "bg-green-500/20 text-green-400"
                }

              `}
              >

                {video.status.replace("_", " ")}

              </span>

            </td>

            <td>

              {video.reviewedAt
                ? new Date(
                    video.reviewedAt
                  ).toLocaleString()
                : "-"}

            </td>

            <td>

              {video.reviewedBy?.name || "-"}

            </td>

            <td>

              <button
                onClick={() =>
                  setSelectedContent(video)
                }
                className="rounded-xl border border-white/10 p-3 hover:border-amber-500"
              >

                <Eye size={18} />

              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>
      </div>


{selectedContent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 lg:p-8">
    <div className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-white/10 bg-[#0b0b0b]">

      {/* Preview */}

     {/* ================= Preview ================= */}

<div className="relative">

  {selectedContent.fileUrl ? (

    <video
      controls
      preload="metadata"
      className="w-full h-[420px] object-contain bg-black"
      poster={selectedContent.thumbnail}
    >
      <source
        src={selectedContent.fileUrl}
        type="video/mp4"
      />
      <source
        src={selectedContent.fileUrl}
        type="video/quicktime"
      />
      Your browser does not support video playback.
    </video>

  ) : selectedContent.previewUrl ? (

    <video
      controls
      preload="metadata"
      className="w-full h-[420px] object-contain bg-black"
      poster={selectedContent.thumbnail}
    >
      <source
        src={selectedContent.previewUrl}
      />
    </video>

  ) : (

    <img
      src={
        selectedContent.thumbnail ||
        "https://placehold.co/1200x700"
      }
      className="w-full h-[420px] object-cover"
      alt={selectedContent.title}
    />

  )}

</div>

      <div className="p-6 lg:p-8">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

          <div>

            <h2 className="text-4xl font-black">
              {selectedContent.title}
            </h2>

            <div className="flex flex-wrap gap-6 mt-5 text-zinc-400">

              <span className="flex items-center gap-2">
                <User size={16} />

                {selectedContent.creatorId
                  ?.creatorVerification?.stageName ||
                  selectedContent.creatorId?.name}
              </span>

              <span>
                {selectedContent.category}
              </span>

              <span>
                {selectedContent.protection?.premium
                  ? "Premium"
                  : "Free"}
              </span>

            </div>

          </div>

          <button
            onClick={() =>
              setSelectedContent(null)
            }
            className="self-start rounded-xl border border-white/10 p-3 hover:border-red-500"
          >
            <XCircle size={28} />
          </button>

        </div>

        {/* Description */}

       <div className="mt-8">

  <h3 className="text-lg font-bold mb-4">
    Description
  </h3>

  <div className="rounded-2xl bg-black/30 p-6 text-zinc-300 leading-8">

    {selectedContent.description ||
      "No description provided."}

  </div>

</div>
        {/* Details */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-10">

  <Info
    title="Creator"
    value={
      selectedContent.creatorId
        ?.creatorVerification?.stageName ||
      selectedContent.creatorId?.name
    }
  />

  <Info
    title="Category"
    value={selectedContent.category}
  />

  <Info
    title="Membership"
    value={selectedContent.membership}
  />

  <Info
    title="Visibility"
    value={selectedContent.visibility}
  />

  <Info
    title="Status"
    value={selectedContent.status}
  />

  <Info
    title="Media Type"
    value={selectedContent.mediaType}
  />

  <Info
    title="Owner Type"
    value={selectedContent.ownerType}
  />

  <Info
    title="Duration"
    value={`${selectedContent.duration || 0} sec`}
  />

  <Info
    title="Views"
    value={selectedContent.views}
  />

  <Info
    title="Price"
    value={`$${selectedContent.price || 0}`}
  />

  <Info
    title="Storage"
    value={selectedContent.storageProvider}
  />

  <Info
    title="Uploaded"
    value={new Date(
      selectedContent.createdAt
    ).toLocaleString()}
  />

  <Info
    title="Release Date"
    value={new Date(
      selectedContent.releaseDate
    ).toLocaleDateString()}
  />

  <Info
    title="Storage Key"
    value={selectedContent.storageKey}
  />

  <Info
    title="Preview Key"
    value={selectedContent.previewStorageKey}
  />

</div>
<div className="mt-10">

<h3 className="font-bold mb-4">
Tags
</h3>

<div className="flex flex-wrap gap-3">

{selectedContent.tags?.length ? (

selectedContent.tags.map((tag)=>(

<span
key={tag}
className="rounded-full bg-amber-500/10 border border-amber-500/30 px-4 py-2 text-sm text-amber-400"
>

#{tag}

</span>

))

) : (

<p className="text-zinc-500">

No tags added.

</p>

)}

</div>

</div>
<div className="mt-10">

<h3 className="font-bold mb-4">
Geo Blocking
</h3>

<div className="rounded-2xl bg-black/30 p-5">

<pre className="text-sm text-zinc-400 whitespace-pre-wrap">

{JSON.stringify(
selectedContent.geoBlocking,
null,
2
)}

</pre>

</div>

</div>
<div className="mt-10">

<h3 className="font-bold mb-5">
Media Files
</h3>

<div className="space-y-4">

<a
href={selectedContent.fileUrl}
target="_blank"
rel="noreferrer"
className="block rounded-xl bg-black/30 p-4 hover:border-amber-500 border border-white/10"
>

Original Video

</a>

{selectedContent.previewUrl && (

<a
href={selectedContent.previewUrl}
target="_blank"
rel="noreferrer"
className="block rounded-xl bg-black/30 p-4 hover:border-amber-500 border border-white/10"
>

Preview Video

</a>

)}

{selectedContent.thumbnail && (

<a
href={selectedContent.thumbnail}
target="_blank"
rel="noreferrer"
className="block rounded-xl bg-black/30 p-4 hover:border-amber-500 border border-white/10"
>

Thumbnail

</a>

)}

</div>

</div>
        {/* Actions */}

        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-10">

          <a
            href={selectedContent.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-amber-500 px-6 py-4 text-black font-black flex items-center justify-center gap-2 hover:bg-amber-400"
          >
            <PlayCircle size={18} />

            Preview Video
          </a>

          <button
            disabled={approveMutation.isPending}
            onClick={() =>
              approveMutation.mutate(
                selectedContent._id,
                {
                  onSuccess: () =>
                    setSelectedContent(null),
                }
              )
            }
            className="rounded-2xl bg-green-500 px-6 py-4 text-black font-black flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CheckCircle2 size={18} />

            {approveMutation.isPending
              ? "Approving..."
              : "Approve"}
          </button>

         <button
  onClick={() => setShowRejectModal(true)}
  className="rounded-2xl bg-red-500 px-6 py-4 font-black flex items-center justify-center gap-2"
>
  <XCircle size={18} />

  Reject
</button>

          <button className="rounded-2xl bg-zinc-800 px-6 py-4 font-black flex items-center justify-center gap-2 hover:bg-zinc-700">
            <Trash2 size={18} />

            Delete
          </button>

        </div>

      </div>

    </div>

  </div>
)} {showRejectModal && (
  <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">

    <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0b0b] p-8">

      <h2 className="text-2xl font-black">
        Reject Content
      </h2>

      <p className="mt-3 text-zinc-500">
        Please provide a reason for rejecting this
        content. The creator will receive this
        feedback.
      </p>

      <textarea
        value={rejectionReason}
        onChange={(e) =>
          setRejectionReason(e.target.value)
        }
        rows={6}
        placeholder="Enter rejection reason..."
        className="
          mt-6
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/30
          p-4
          outline-none
          resize-none
          focus:border-red-500
        "
      />

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => {
            setShowRejectModal(false);
            setRejectionReason("");
          }}
          className="rounded-2xl border border-white/10 px-6 py-3 hover:border-white/30"
        >
          Cancel
        </button>

        <button
          disabled={
            rejectMutation.isPending ||
            !rejectionReason.trim()
          }
          onClick={() => {
            rejectMutation.mutate(
              {
                id: selectedContent._id,
                comment: rejectionReason,
              },
              {
                onSuccess: () => {
                  setShowRejectModal(false);
                  setSelectedContent(null);
                  setRejectionReason("");
                },
              }
            );
          }}
          className="
            rounded-2xl
            bg-red-500
            px-6
            py-3
            font-black
            disabled:opacity-50
          "
        >
          {rejectMutation.isPending
            ? "Rejecting..."
            : "Reject Content"}
        </button>

      </div>

    </div>

  </div>
)} </>)}


function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-[#080808] border border-white/5 p-6">

      <div className="flex justify-between items-center">

        <Icon className="text-amber-500" />

        <span className="text-3xl font-black">
          {value}
        </span>

      </div>

      <p className="mt-6 uppercase tracking-[.25em] text-xs text-zinc-500 font-bold">
        {title}
      </p>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl bg-black/30 p-5">

      <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
        {title}
      </p>

      <h3 className="mt-3 font-bold break-words">
        {value || "-"}
      </h3>

    </div>
  )
}