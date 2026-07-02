import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { Room, RoomEvent } from "livekit-client";

import {
  getLiveSession,
  joinLiveSession,
  leaveLiveSession,
  endLiveSession,
} from "@/services/live.service";

import BroadcastControls from "./components/BroadcastControls";
import LiveChat from "./components/LiveChat";
import TipsFeed from "./components/TipsFeed";
import ViewersList from "./components/ViewersList";
import StreamInfo from "./components/StreamInfo";
import EndStreamModal from "./components/EndStreamModal";

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_URL;

const LIVEKIT_URL =
  import.meta.env.VITE_LIVEKIT_URL;

export default function CreatorLiveRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const roomRef = useRef(null);
  const socketRef = useRef(null);
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [ending, setEnding] = useState(false);

  const [stream, setStream] = useState(null);

  const [messages, setMessages] = useState([]);
  const [tips, setTips] = useState([]);
  const [viewers, setViewers] = useState([]);

  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const [isLive, setIsLive] = useState(true);
  const [showEndModal, setShowEndModal] = useState(false);

  const [seconds, setSeconds] = useState(0);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const duration = useMemo(() => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(
      Math.floor((seconds % 3600) / 60)
    ).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");

    return `${hrs}:${mins}:${secs}`;
  }, [seconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    initializeRoom();

    return () => {
      cleanupRoom();
    };
  }, [id]);

  const initializeRoom = async () => {
    try {
      setLoading(true);

      const sessionRes = await getLiveSession(id);
      const joinRes = await joinLiveSession(id);

      const session =
        sessionRes.session || sessionRes.data?.session;

      const token =
        joinRes.token || joinRes.data?.token;

      const roomName =
        joinRes.roomName || joinRes.data?.roomName;

      setStream(session);
      setIsLive(session?.isLive);

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
      });

      roomRef.current = room;

      await room.connect(
        LIVEKIT_URL,
        token
      );

      await room.localParticipant.setMicrophoneEnabled(true);
      await room.localParticipant.setCameraEnabled(true);

      room
        .on(RoomEvent.TrackSubscribed, (track) => {
          if (
            track.kind === "video" &&
            videoRef.current
          ) {
            track.attach(videoRef.current);
          }
        })
        .on(RoomEvent.Disconnected, () => {
          toast.info("Disconnected from live room.");
        });

      const socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });

      socketRef.current = socket;

      socket.emit("creator:join", {
        sessionId: id,
        roomName,
      });

      socket.on("chat:new", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("tips:new", (tip) => {
        setTips((prev) => [tip, ...prev]);
      });

      socket.on("viewers:update", (list) => {
        setViewers(list);
      });

      socket.on("stream:update", (payload) => {
        setStream((prev) => ({
          ...prev,
          ...payload,
        }));
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Unable to join live room.");
      navigate("/creator/live");
    }
  };

  const cleanupRoom = async () => {
    try {
      if (socketRef.current) {
        socketRef.current.emit("creator:leave", {
          sessionId: id,
        });

        socketRef.current.disconnect();
      }

      if (roomRef.current) {
        roomRef.current.disconnect();
      }

      await leaveLiveSession(id);
    } catch (err) {
      console.error(err);
    }
  };
    const toggleMic = async () => {
    try {
      const enabled = !micEnabled;

      await roomRef.current?.localParticipant.setMicrophoneEnabled(
        enabled
      );

      setMicEnabled(enabled);

      socketRef.current?.emit("creator:mic", {
        sessionId: id,
        enabled,
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to change microphone.");
    }
  };

  const toggleCamera = async () => {
    try {
      const enabled = !cameraEnabled;

      await roomRef.current?.localParticipant.setCameraEnabled(
        enabled
      );

      setCameraEnabled(enabled);

      socketRef.current?.emit("creator:camera", {
        sessionId: id,
        enabled,
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to change camera.");
    }
  };

  const toggleScreenShare = async () => {
    try {
      const enabled = !screenSharing;

      await roomRef.current?.localParticipant.setScreenShareEnabled(
        enabled
      );

      setScreenSharing(enabled);

      socketRef.current?.emit("creator:screenshare", {
        sessionId: id,
        enabled,
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to share screen.");
    }
  };

  const switchCamera = () => {
    toast.info(
      "Camera switching depends on the available media devices."
    );
  };

  const openSettings = () => {
    toast.info("Stream settings coming soon.");
  };

  const sendMessage = (message) => {
    const payload = {
      _id: Date.now().toString(),
      message,
      createdAt: new Date(),
      pinned: false,
      user: currentUser,
    };

    setMessages((prev) => [...prev, payload]);

    socketRef.current?.emit("chat:send", {
      sessionId: id,
      message,
    });
  };

  const deleteMessage = (message) => {
    setMessages((prev) =>
      prev.filter((m) => m._id !== message._id)
    );

    socketRef.current?.emit("chat:delete", {
      sessionId: id,
      messageId: message._id,
    });
  };

  const pinMessage = (message) => {
    setMessages((prev) =>
      prev.map((item) =>
        item._id === message._id
          ? {
              ...item,
              pinned: !item.pinned,
            }
          : item
      )
    );

    socketRef.current?.emit("chat:pin", {
      sessionId: id,
      messageId: message._id,
    });
  };

  const removeViewer = (viewer) => {
    socketRef.current?.emit("viewer:remove", {
      sessionId: id,
      viewerId: viewer._id,
    });

    setViewers((prev) =>
      prev.filter((v) => v._id !== viewer._id)
    );

    toast.success(`${viewer.name} removed.`);
  };

  const banViewer = (viewer) => {
    socketRef.current?.emit("viewer:ban", {
      sessionId: id,
      viewerId: viewer._id,
    });

    setViewers((prev) =>
      prev.filter((v) => v._id !== viewer._id)
    );

    toast.success(`${viewer.name} banned.`);
  };

  const handleEndStream = async () => {
    try {
      setEnding(true);

      await endLiveSession(id);

      socketRef.current?.emit("stream:end", {
        sessionId: id,
      });

      roomRef.current?.disconnect();

      toast.success("Live stream ended.");

      navigate("/creator/live");
    } catch (err) {
      console.error(err);
      toast.error("Unable to end stream.");
    } finally {
      setEnding(false);
      setShowEndModal(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Studio...
      </div>
    );
  }

  const earnings = tips.reduce(
    (sum, tip) => sum + (tip.amount || 0),
    0
  );
    return (
    <>
      <div className="min-h-screen bg-black text-white">

        <div className="max-w-[1800px] mx-auto px-6 py-8">

          <div className="mb-8">

            <h1 className="text-5xl font-black">
              Creator Studio
            </h1>

            <p className="text-zinc-500 mt-3">
              Manage your broadcast, interact with viewers,
              and monitor your stream in real time.
            </p>

          </div>

          {/* Video + Stream Info */}

          <div className="grid xl:grid-cols-[2fr_1fr] gap-8">

            <div className="space-y-8">

              <div className="rounded-[34px] overflow-hidden border border-white/5 bg-zinc-900">

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full aspect-video bg-black object-cover"
                />

              </div>

              <BroadcastControls
                isLive={isLive}
                micEnabled={micEnabled}
                cameraEnabled={cameraEnabled}
                screenSharing={screenSharing}
                viewers={viewers.length}
                onToggleMic={toggleMic}
                onToggleCamera={toggleCamera}
                onToggleScreenShare={toggleScreenShare}
                onSwitchCamera={switchCamera}
                onSettings={openSettings}
                onEndStream={() =>
                  setShowEndModal(true)
                }
              />

            </div>

            <div>

              <StreamInfo
                stream={{
                  ...stream,
                  status: isLive
                    ? "live"
                    : "ended",
                  totalViewers: viewers.length,
                  earnings,
                }}
              />

            </div>

          </div>

          {/* Bottom */}

          <div className="grid xl:grid-cols-3 gap-8 mt-8">

            <LiveChat
              messages={messages}
              currentUser={currentUser}
              onSend={sendMessage}
              onDelete={deleteMessage}
              onPin={pinMessage}
            />

            <TipsFeed
              tips={tips}
            />

            <ViewersList
              viewers={viewers}
              onRemove={removeViewer}
              onBan={banViewer}
            />

          </div>

        </div>

      </div>

      <EndStreamModal
        open={showEndModal}
        loading={ending}
        viewers={viewers.length}
        duration={duration}
        earnings={earnings}
        onCancel={() =>
          setShowEndModal(false)
        }
        onConfirm={handleEndStream}
      />
    </>
  );
}