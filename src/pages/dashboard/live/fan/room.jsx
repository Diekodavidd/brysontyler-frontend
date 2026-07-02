import {
  Room,
  RoomEvent,
} from "livekit-client";

import {
  LiveKitRoom,
  VideoConference,
} from "@livekit/components-react";

import "@livekit/components-styles";

import {
  Radio,
  Users,
  ArrowLeft,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  useLeaveLive,
  useLiveSession,
} from "@/hooks/useLive";

export default function LiveRoomPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const { id } = useParams();

  const { mutate: leaveLive } =
    useLeaveLive();

  const {
    data,
    isLoading,
  } = useLiveSession(id);

  const session =
    data?.session;

  const token =
    location.state?.token;

  const roomName =
    location.state?.roomName;

  const serverUrl =
    import.meta.env.VITE_LIVEKIT_URL;

  useEffect(() => {
    return () => {
      leaveLive(id);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading Stream...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-5">

        <h2 className="text-3xl font-black">
          Unable to Join Stream
        </h2>

        <button
          onClick={() =>
            navigate("/dashboard/live")
          }
          className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-black"
        >
          Back
        </button>

      </div>
    );
  }

  return (
    <div className="h-screen bg-[#050505] text-white flex flex-col">

      {/* HEADER */}

      <div className="h-20 border-b border-white/10 px-8 flex items-center justify-between">

        <div className="flex items-center gap-6">

          <button
            onClick={() =>
              navigate("/dashboard/live")
            }
            className="flex items-center gap-2 text-zinc-400 hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div>

            <h2 className="text-2xl font-black">
              {session?.title}
            </h2>

            <p className="text-zinc-500">

              {session?.creatorId?.name}

            </p>

          </div>

        </div>

        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2 text-red-500 font-bold">

            <Radio size={18} />

            LIVE

          </div>

          <div className="flex items-center gap-2">

            <Users size={18} />

            {session?.viewers || 0}

          </div>

        </div>

      </div>

      {/* STREAM */}

      <div className="flex-1">

        <LiveKitRoom
          token={token}
          serverUrl={serverUrl}
          connect={true}
          video={true}
          audio={true}
          className="h-full"
        >

          <VideoConference />

        </LiveKitRoom>

      </div>

    </div>
  );
}