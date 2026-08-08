import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio } from "lucide-react";

import {
  useAdminLive,
  useCurrentAdminLive,
  useAdminLiveStats,
  useCreateAdminLive,
  useEndAdminLive,useDeleteAdminLive
} from "@/hooks/useAdmin";

import LiveStats from "./components/LiveStats";
import StreamCard from "./components/StreamCard";
import CreateLiveModal from "./components/CreateLiveModal";
import EndStreamModal from "./components/EndStreamModal";

export default function AdminLive() {
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEndModal, setShowEndModal] =
    useState(false);

  const { data: streamsRes, isLoading } =
    useAdminLive();

  const { data: liveRes } =
    useCurrentAdminLive();

  const { data: statsRes } =
    useAdminLiveStats();
const deleteLive = useDeleteAdminLive();
  const createLive =
    useCreateAdminLive();

  const endLive =
    useEndAdminLive();

  const streams =
    streamsRes?.sessions || [];

  const liveStream =
    liveRes?.session || null;

  const stats =
    statsRes?.stats || {
      totalStreams: 0,
      totalViews: 0,
      totalTips: 0,
      followersWatching: 0,
    };

  const handleCreate = (payload) => {
    createLive.mutate(payload, {
      onSuccess: (res) => {
        const session =
          res.session || res.data?.session;

        navigate(
          `/admin/live/room/${session._id}`
        );
      },
    });
  };

 const handleEnd = () => {
  if (!liveStream?._id) {
    console.error("No live stream ID found.");
    return;
  }

  console.log("ENDING ADMIN STREAM:", liveStream._id);

  endLive.mutate(liveStream._id, {
    onSuccess: (res) => {
      console.log("ADMIN LIVE ENDED:", res);

      setShowEndModal(false);
    },

    onError: (error) => {
      console.error("END ADMIN LIVE ERROR:", error);
      console.error("Response:", error?.response?.data);
    },
  });
};

  if (isLoading) {
    return (
      <div className="p-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="space-y-10">

        {/* HEADER */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-red-500 flex items-center gap-2">

              <Radio size={14} />

              ADMIN STUDIO

            </p>

            <h1 className="text-6xl font-black mt-3">

              Official Live

            </h1>

            <p className="text-zinc-500 mt-4 max-w-3xl">

              Broadcast official announcements,
              premieres and exclusive live
              events.

            </p>

          </div>

          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 px-8 py-4 text-black font-black"
          >
            Go Live
          </button>

        </div>

        {/* STATS */}

        <LiveStats stats={stats} />

        {/* CURRENT LIVE */}

        {liveStream && (

          <div className="rounded-[34px] bg-gradient-to-r from-red-600/10 to-yellow-500/10 border border-red-500/20 p-8">

            <div className="flex flex-col xl:flex-row justify-between gap-8">

              <div>

                <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-xs font-black tracking-widest">

                  <Radio size={14} />

                  LIVE NOW

                </span>

                <h2 className="text-5xl font-black mt-6">

                  {liveStream.title}

                </h2>

                <p className="text-zinc-400 mt-4">

                  Official Bryson Tyler
                  livestream.

                </p>

              </div>

              <div className="flex flex-col gap-4 xl:w-72">

                <button
                  onClick={() =>
                    navigate(
                      `/admin/live/room/${liveStream._id}`
                    )
                  }
                  className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 py-4 font-black text-black"
                >
                  Enter Studio
                </button>

                <button
                  onClick={() =>
                    setShowEndModal(true)
                  }
                  className="rounded-2xl border border-red-500 text-red-400 hover:bg-red-500 hover:text-white py-4 font-black transition"
                >
                  End Stream
                </button>

              </div>

            </div>

          </div>

        )}

        {/* STREAMS */}

        <div>

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-black">

              Previous Streams

            </h2>

            <span className="text-zinc-500">

              {streams.length} Streams

            </span>

          </div>

          {streams.length === 0 ? (

            <div className="rounded-[34px] bg-zinc-900 border border-white/5 p-20 text-center">

              <Radio
                size={70}
                className="mx-auto text-red-500 mb-8"
              />

              <h3 className="text-4xl font-black">

                No Streams Yet

              </h3>

              <p className="text-zinc-500 mt-5">

                Start your first official live
                broadcast.

              </p>

            </div>

          ) : (

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-7">

              {streams.map((stream) => (

                <StreamCard
                  key={stream._id}
                  stream={stream}
                  onView={() =>
                    navigate(
                      `/admin/live/room/${stream._id}`
                    )
                  }
                  onEdit={() =>
                    navigate(
                      `/admin/live/room/${stream._id}`
                    )
                  }
                  onDelete={() =>
                    deleteLive.mutate(stream._id)
                  }
                />

              ))}

            </div>

          )}

        </div>

      </div>

      <CreateLiveModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onCreate={handleCreate}
      />

     <EndStreamModal
  open={showEndModal}
  stream={liveStream}
  loading={endLive.isPending}
  onCancel={() => setShowEndModal(false)}
  onConfirm={handleEnd}
/>
    </>
  );
}