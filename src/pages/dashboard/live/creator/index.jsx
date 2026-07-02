

import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radio,
  Eye,
  Search,
  Play,
  CheckCircle2,
  Flame,
  Users,
  Clock3,
} from "lucide-react";
import {
  httpGet,
  httpPost,
  httpDelete,
} from "@/lib/http";

import LiveStats from "./components/LiveStats";
import StreamCard from "./components/StreamCard";
import ScheduleModal from "./components/ScheduleModal";
import CreateLiveModal from "./components/CreateLiveModal";
import EndStreamModal from "./components/EndStreamModal";

const CreatorLive = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [streams, setStreams] = useState([]);
  const [liveStream, setLiveStream] = useState(null);

  const [stats, setStats] = useState({
    totalStreams: 0,
    totalViews: 0,
    totalTips: 0,
    followersWatching: 0,
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  const [selectedStream, setSelectedStream] = useState(null);

  const token = localStorage.getItem("token");

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    [token]
  );

  const loadDashboard = async () => {
    try {
      setLoading(true);

   const [
  streamsRes,
  liveRes,
  statsRes,
] = await Promise.all([
  httpGet("/creator/live"),
  httpGet("/creator/live/current"),
  httpGet("/creator/live/stats"),
]);

setStreams(streamsRes || []);
setLiveStream(liveRes || null);

setStats(
  statsRes || {
    totalStreams: 0,
    totalViews: 0,
    totalTips: 0,
    followersWatching: 0,
  }
);
      setStreams(streamsRes.data || []);
      setLiveStream(liveRes.data || null);

      setStats(
        statsRes.data || {
          totalStreams: 0,
          totalViews: 0,
          totalTips: 0,
          followersWatching: 0,
        }
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
  };

  const openScheduleModal = () => {
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
  };

  const handleCreateLive = async (payload) => {
    try {
     const res = await httpPost(
  "/creator/live/create",
  payload
);

      setShowCreateModal(false);

      if (res.data?.roomId) {
        navigate(`/creator/live/room/${res.data.roomId}`);
      }

      loadDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSchedule = async (payload) => {
    try {
    await httpPost(
  "/creator/live/schedule",
  payload
);
      setShowScheduleModal(false);

      loadDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  const handleResume = (stream) => {
    navigate(`/creator/live/room/${stream.roomId}`);
  };

  const handleViewAnalytics = (stream) => {
    navigate(`/creator/live/${stream._id}`);
  };

  const handleDelete = async (stream) => {
    try {
      await httpDelete(
  `/creator/live/${stream._id}`
);

      loadDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEndClick = () => {
    setSelectedStream(liveStream);
    setShowEndModal(true);
  };

  const confirmEndStream = async () => {
    try {
      if (!selectedStream) return;

      await httpPost(
  `/creator/live/end/${selectedStream._id}`,
  {}
);

      setShowEndModal(false);
      setSelectedStream(null);

      loadDashboard();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="creator-live-page">
        <div className="container py-5">
          <div className="text-center">
            <div
              className="spinner-border text-danger"
              role="status"
            />
          </div>
        </div>
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

                CREATOR STUDIO

            </p>

            <h1 className="text-6xl font-black mt-3">

                Live Studio

            </h1>

            <p className="text-zinc-500 mt-4 max-w-3xl">

                Broadcast to your audience, schedule premium live experiences,
                manage viewers and grow your community in real time.

            </p>

        </div>

        <div className="flex gap-4">

            <button
                onClick={openScheduleModal}
                className="rounded-2xl border border-white/10 px-7 py-4 hover:border-yellow-500 transition font-bold"
            >
                Schedule Stream
            </button>

            <button
                onClick={openCreateModal}
                className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 px-8 py-4 text-black font-black"
            >
                Go Live
            </button>

        </div>

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

                        {liveStream.description || "You're currently broadcasting live."}

                    </p>

                    <div className="flex gap-8 mt-8 text-sm">

                        <div>

                            <p className="text-zinc-500 uppercase tracking-widest">

                                Viewers

                            </p>

                            <h3 className="text-3xl font-black mt-2">

                                {liveStream.viewers || 0}

                            </h3>

                        </div>

                        <div>

                            <p className="text-zinc-500 uppercase tracking-widest">

                                Category

                            </p>

                            <h3 className="text-2xl font-black mt-2">

                                {liveStream.category || "General"}

                            </h3>

                        </div>

                    </div>

                </div>

                <div className="flex flex-col gap-4 xl:w-72">

                    <button
                        onClick={() =>
                            navigate(`/dashboard/live/${liveStream._id}`)
                        }
                        className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 py-4 font-black text-black"
                    >
                        Enter Studio
                    </button>

                    <button
                        onClick={handleEndClick}
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

                My Streams

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

                <p className="text-zinc-500 mt-5 max-w-xl mx-auto">

                    Create your first live stream or schedule an upcoming
                    event for your subscribers.

                </p>

                <div className="flex justify-center gap-5 mt-10">

                    <button
                        onClick={openCreateModal}
                        className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 px-8 py-4 text-black font-black"
                    >
                        Go Live
                    </button>

                    <button
                        onClick={openScheduleModal}
                        className="rounded-2xl border border-white/10 px-8 py-4 hover:border-yellow-500"
                    >
                        Schedule
                    </button>

                </div>

            </div>

        ) : (

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-7">

                {streams.map((stream) => (

                    <StreamCard
                        key={stream._id}
                        stream={stream}
                        onResume={() => handleResume(stream)}
                        onAnalytics={() => handleViewAnalytics(stream)}
                        onDelete={() => handleDelete(stream)}
                    />

                ))}

            </div>

        )}

    </div>

</div>

<CreateLiveModal
    open={showCreateModal}
    onClose={closeCreateModal}
    onCreate={handleCreateLive}
/>

<ScheduleModal
    open={showScheduleModal}
    onClose={closeScheduleModal}
    onSchedule={handleSchedule}
/>

<EndStreamModal
    open={showEndModal}
    stream={selectedStream}
    onClose={() => {
        setSelectedStream(null);
        setShowEndModal(false);
    }}
    onConfirm={confirmEndStream}
/>

</>
);

      
};

export default CreatorLive;