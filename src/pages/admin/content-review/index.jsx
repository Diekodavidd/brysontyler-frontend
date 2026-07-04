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

export default function ContentReviewPage() {
  const [search, setSearch] = useState("");
  const [selectedContent, setSelectedContent] = useState(null);

  const pendingContent = [
    {
      id: 1,
      title: "Weekend in Santorini",
      creator: "Jessica Adams",
      category: "Travel",
      membership: "VIP",
      duration: "12:42",
      uploaded: "15 mins ago",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      description:
        "A cinematic travel vlog around Santorini featuring beaches, food and nightlife.",
      status: "Pending Review",
    },
    {
      id: 2,
      title: "Morning Routine",
      creator: "Michael Rivers",
      category: "Lifestyle",
      membership: "FREE",
      duration: "08:14",
      uploaded: "1 hour ago",
      thumbnail:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
      description:
        "Daily morning routine with productivity tips.",
      status: "Pending Review",
    },
    {
      id: 3,
      title: "Luxury Hotel Experience",
      creator: "Ashley Brooks",
      category: "Luxury",
      membership: "ELITE",
      duration: "19:56",
      uploaded: "Yesterday",
      thumbnail:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      description:
        "Reviewing one of the world's most luxurious hotels.",
      status: "Pending Review",
    },
  ];

  const filtered = useMemo(() => {
    return pendingContent.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.creator
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <>
      <div className="space-y-8">

        {/* Header */}

        <div className="flex justify-between items-end">

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

          <button className="rounded-2xl bg-amber-500 px-6 py-3 text-black font-black hover:bg-amber-400 transition">
            Review Queue
          </button>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-5">

          <Stat
            title="Pending"
            value="26"
            icon={Clock3}
          />

          <Stat
            title="Approved Today"
            value="41"
            icon={CheckCircle2}
          />

          <Stat
            title="Rejected"
            value="7"
            icon={XCircle}
          />

          <Stat
            title="Videos"
            value="4.2K"
            icon={Video}
          />

        </div>

        {/* Search */}

        <div className="flex justify-between gap-5">

          <div className="relative w-[420px]">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search uploads..."
              className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-4 outline-none focus:border-amber-500"
            />

          </div>

          <button className="rounded-2xl border border-white/10 bg-[#090909] px-6 hover:border-amber-500 flex items-center gap-2">

            <Filter size={18} />

            Filters

          </button>

        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-3xl border border-white/5">

          <table className="w-full">

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
                  key={video.id}
                  className="border-t border-white/5 hover:bg-white/[0.02]"
                >

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <img
                        src={video.thumbnail}
                        className="h-20 w-28 rounded-xl object-cover"
                      />

                      <div>

                        <h3 className="font-black">
                          {video.title}
                        </h3>

                        <p className="text-zinc-500 text-sm mt-1">
                          {video.duration}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>{video.creator}</td>

                  <td>{video.category}</td>

                  <td>{video.membership}</td>

                  <td>{video.uploaded}</td>

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

      {/* Modal */}

      {selectedContent && (

        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-8">

          <div className="w-full max-w-5xl rounded-[32px] border border-white/10 bg-[#0b0b0b] overflow-hidden">

            <img
              src={selectedContent.thumbnail}
              className="h-[340px] w-full object-cover"
            />

            <div className="p-8">

              <div className="flex justify-between">

                <div>

                  <h2 className="text-4xl font-black">
                    {selectedContent.title}
                  </h2>

                  <div className="flex gap-6 mt-5 text-zinc-400">

                    <span className="flex items-center gap-2">

                      <User size={16} />

                      {selectedContent.creator}

                    </span>

                    <span>

                      {selectedContent.category}

                    </span>

                    <span>

                      {selectedContent.membership}

                    </span>

                  </div>

                </div>

                <button
                  onClick={() =>
                    setSelectedContent(null)
                  }
                >

                  <XCircle size={30} />

                </button>

              </div>

              <p className="mt-8 text-zinc-400 leading-8">

                {selectedContent.description}

              </p>

              <div className="grid grid-cols-4 gap-5 mt-10">

                <Info
                  title="Duration"
                  value={selectedContent.duration}
                />

                <Info
                  title="Uploaded"
                  value={selectedContent.uploaded}
                />

                <Info
                  title="Category"
                  value={selectedContent.category}
                />

                <Info
                  title="Access"
                  value={selectedContent.membership}
                />

              </div>

              <div className="flex gap-4 mt-10">

                <button className="rounded-2xl bg-amber-500 px-6 py-4 text-black font-black flex items-center gap-2">

                  <PlayCircle size={18} />

                  Preview Video

                </button>

                <button className="rounded-2xl bg-green-500 px-6 py-4 text-black font-black flex items-center gap-2">

                  <CheckCircle2 size={18} />

                  Approve

                </button>

                <button className="rounded-2xl bg-red-500 px-6 py-4 font-black flex items-center gap-2">

                  <XCircle size={18} />

                  Reject

                </button>

                <button className="rounded-2xl bg-zinc-800 px-6 py-4 font-black flex items-center gap-2 hover:bg-zinc-700">

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            </div>

          </div>

        </div>

      )}
    </>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-[#080808] border border-white/5 p-6">

      <div className="flex justify-between">

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

      <h3 className="mt-3 font-bold">
        {value}
      </h3>

    </div>
  );
}