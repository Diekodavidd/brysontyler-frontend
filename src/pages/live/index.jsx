/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "@/compat/navigation";
import {
  Users,
  DollarSign,
  Heart,
  Send,
  X,
  AlertTriangle,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Camera,
  Crown,
  User,
  Settings,
} from "lucide-react";

export default function LiveRoomPage({ role = "creator" }) {
  const router = useRouter();
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "System",
      text: "Welcome to the live session!",
      role: "system",
    },
  ]);

  const [input, setInput] = useState("");
  const [showExitModal, setShowExitModal] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipAmount, setTipAmount] = useState("");
  const [hearts, setHearts] = useState([]);
  const [likes, setLikes] = useState(0);
  const [viewers] = useState(1248);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const initStream = async () => {
    if (role !== "creator") return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Hardware access denied:", err);
    }
  };

  useEffect(() => {
    initStream();

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [role]);

  const toggleTrack = async (type) => {
    if (!streamRef.current) return;

    const tracks =
      type === "video"
        ? streamRef.current.getVideoTracks()
        : streamRef.current.getAudioTracks();

    tracks.forEach((track) => {
      if (track.enabled) {
        track.stop();
      }
    });

    if (type === "video") {
      if (isVideoEnabled) {
        setIsVideoEnabled(false);
      } else {
        await initStream();
        setIsVideoEnabled(true);
      }
    } else {
      if (isAudioEnabled) {
        setIsAudioEnabled(false);
      } else {
        await initStream();
        setIsAudioEnabled(true);
      }
    }
  };

  const triggerHeart = () => {
    const id = Date.now();
    const x = Math.random() * 80 + 10;

    setHearts((prev) => [...prev, { id, x }]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 3000);
  };

  const handleAction = (type, content) => {
    if (type === "Like") {
      setLikes((prev) => prev + 1);
      triggerHeart();
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "User",
        text: content || `${type}d!`,
        role: type === "Premium" ? "vip" : "user",
      },
    ]);

    if (type === "Tip") {
      setShowTipModal(false);
    }
  };

  const handleExit = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setIsVideoEnabled(false);
    setIsAudioEnabled(false);

    router.push("/");
  };
  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row font-sans">
      <main className="flex-1 flex flex-col relative bg-zinc-950">
        <div className="absolute top-0 z-20 flex w-full items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-500 bg-zinc-800 text-xl font-black">
              JS
            </div>

            <div>
              <h1 className="text-lg font-black">JESSICA_STREAM</h1>

              <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                <span className="flex items-center gap-1">
                  <Users size={12} /> {viewers.toLocaleString()}
                </span>

                <span className="flex items-center gap-1 text-red-500">
                  <Heart size={12} /> {likes}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowExitModal(true)}
            className="rounded-full bg-white/10 p-3 transition-all hover:bg-red-600/50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden bg-black">
          {role === "creator" ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted={!isAudioEnabled}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-2xl font-black uppercase tracking-[0.5em] text-zinc-800">
              Live Stream
            </div>
          )}

          {role === "creator" && !isVideoEnabled && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90 backdrop-blur-sm">
              <Camera size={64} className="text-zinc-700" />

              <p className="font-bold uppercase text-zinc-500">
                Broadcast Paused
              </p>
            </div>
          )}

          {hearts.map((h) => (
            <div
              key={h.id}
              className="pointer-events-none absolute animate-[float_3s_ease-out_forwards]"
              style={{
                left: `${h.x}%`,
                bottom: "10%",
              }}
            >
              <Heart
                size={40}
                className="fill-red-500 text-red-500"
              />
            </div>
          ))}
        </div>
      </main>

      <aside className="flex w-full flex-col border-l border-white/5 bg-zinc-900 lg:w-96">
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className="flex items-center gap-3 rounded-2xl border border-white/5 bg-black/20 p-4"
            >
              {m.role === "vip" ? (
                <Crown size={16} className="text-blue-400" />
              ) : (
                <User size={16} className="text-zinc-500" />
              )}

              <div>
                <span className="block text-[10px] font-bold uppercase text-yellow-400">
                  {m.user}
                </span>

                <span className="text-sm">{m.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-white/5 bg-black p-6">
          {role === "fan" ? (
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => handleAction("Like")}
                className="flex flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 transition-all active:scale-95 hover:bg-zinc-700"
              >
                <Heart
                  size={20}
                  className="fill-red-500 text-red-500"
                />
              </button>

              <button
                onClick={() => setShowTipModal(true)}
                className="flex flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 transition-all active:scale-95 hover:bg-zinc-700"
              >
                <DollarSign
                  size={20}
                  className="text-yellow-400"
                />
              </button>

              <button
                onClick={() => handleAction("Premium")}
                className="flex flex-col items-center gap-2 rounded-2xl bg-zinc-800 p-4 transition-all active:scale-95 hover:bg-zinc-700"
              >
                <Crown
                  size={20}
                  className="text-blue-400"
                />
              </button>
            </div>
          ) : (
            <div className="mb-2 flex gap-2">
              <button
                onClick={() => toggleTrack("video")}
                className={`flex-1 rounded-xl py-3 flex items-center justify-center ${
                  isVideoEnabled ? "bg-zinc-800" : "bg-red-600"
                }`}
              >
                {isVideoEnabled ? (
                  <Video size={16} />
                ) : (
                  <VideoOff size={16} />
                )}
              </button>

              <button
                onClick={() => toggleTrack("audio")}
                className={`flex-1 rounded-xl py-3 flex items-center justify-center ${
                  isAudioEnabled ? "bg-zinc-800" : "bg-red-600"
                }`}
              >
                {isAudioEnabled ? (
                  <Mic size={16} />
                ) : (
                  <MicOff size={16} />
                )}
              </button>

              <button className="rounded-xl bg-zinc-800 p-3">
                <Settings size={16} />
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setInput("");
            }}
            className="relative flex items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send message..."
              className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-5 py-4 text-sm outline-none focus:border-yellow-500"
            />

            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-yellow-400 p-2 text-black"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </aside>

      {showTipModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-zinc-900 p-8">
            <h3 className="mb-4 text-lg font-black">
              Send a Tip
            </h3>

            <input
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              placeholder="Amount ($)"
              className="mb-6 w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowTipModal(false)}
                className="flex-1 rounded-xl bg-zinc-800 py-3"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  handleAction(
                    "Tip",
                    `tipped $${tipAmount}! 💰`
                  )
                }
                className="flex-1 rounded-xl bg-yellow-400 py-3 font-bold text-black"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showExitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center">
            <AlertTriangle
              size={48}
              className="mx-auto mb-4 text-red-500"
            />

            <h3 className="mb-6 text-xl font-black">
              End Stream?
            </h3>

            <div className="flex gap-4">
              <button
                onClick={() => setShowExitModal(false)}
                className="flex-1 rounded-xl bg-zinc-800 py-3"
              >
                Stay
              </button>

              <button
                onClick={handleExit}
                className="flex-1 rounded-xl bg-red-600 py-3 font-bold"
              >
                End Now
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }

          100% {
            transform: translateY(-200px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}