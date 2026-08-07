import "@livekit/components-styles";
import {
  LiveKitRoom,
  VideoTrack,
  useTracks,
} from "@livekit/components-react";
import { Track } from "livekit-client";

import {
  ArrowLeft,
  Radio,
  Users,
  Share2,
  Heart,
  Gift,
  Star,
} from "lucide-react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useLeaveLive,
  useLiveSession,
} from "@/hooks/useLive";


import { useLikeLive, useTipLive } from "@/hooks/useLive";
function Viewer() {
  const cameraTracks = useTracks([
    {
      source: Track.Source.Camera,
      withPlaceholder: false,
    },
  ]);

  const screenTracks = useTracks([
    {
      source: Track.Source.ScreenShare,
      withPlaceholder: false,
    },
  ]);

  // Prefer screenshare
  const activeTracks = (
    screenTracks.length > 0
      ? screenTracks
      : cameraTracks
).filter(
    (t) => !t.participant.isLocal
);
  // Find the first subscribed real track
  const activeTrack = activeTracks.find(
    (t) =>
      t.publication &&
      t.publication.isSubscribed &&
      t.publication.track
  );

  if (!activeTrack) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-zinc-500">
        Waiting for creator's video...
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">

      <VideoTrack
        trackRef={activeTrack}
        className="w-full h-full object-cover"
      />

      {/* TOP LEFT */}

      <div className="absolute top-6 left-6 flex items-center gap-3">

        <div className="bg-red-600 rounded-full px-5 py-2 flex items-center gap-2 font-bold">

          <Radio size={14} />

          LIVE

        </div>

      </div>

      {/* TOP RIGHT */}

      <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 flex items-center gap-2">

        <Users size={15} />

        {activeTrack.participant.identity}

      </div>

    </div>
  );
}

export default function LiveRoomPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
const { mutate: likeLive, isPending: liking } = useLikeLive();

const { mutate: tipLive, isPending: tipping } = useTipLive();

const [showTipModal, setShowTipModal] = useState(false);
  const { mutate: leaveLive } =
    useLeaveLive();

  const { data, isLoading } =
    useLiveSession(id);

  const session =
    data?.session;

  const token =
    location.state?.token;

  const serverUrl =
    import.meta.env.VITE_LIVEKIT_URL;

  useEffect(() => {
    return () => {
      leaveLive(id);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#080808] text-white">
        Loading Stream...
      </div>
    );
  }

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#080808] gap-6">

        <h1 className="text-4xl font-black">
          Unable to Join Stream
        </h1>

        <button
          onClick={() =>
            navigate("/dashboard/live")
          }
          className="bg-yellow-500 text-black px-8 py-4 rounded-2xl font-black"
        >
          Back
        </button>

      </div>
    );
  }

  return (<>
   
<div className="min-h-screen bg-[#090909] text-white flex flex-col">
      {/* HEADER */}

      <div className="h-20 border-b border-white/5 px-8 flex items-center justify-between">

        <div className="flex items-center gap-6">

          <button
            onClick={() =>
              navigate("/dashboard/live")
            }
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition"
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

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-2 text-red-500 font-bold">

            <Radio size={16} />

            LIVE

          </div>

          <div className="flex items-center gap-2">

            <Users size={16} />

            {(session?.viewers || 0).toLocaleString()}

          </div>

          <button className="w-11 h-11 rounded-xl bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center">

            <Share2 size={18} />

          </button>

        </div>

      </div>

      {/* BODY */}

    <div className="flex-1 overflow-y-auto">
       {/* Creator Card */}

          <div className="w-100 p-7 border-b border-white/5">

            <div className="flex items-center gap-5">

              <img
                src={
                  session?.creatorId?.avatar ||
                  "https://i.pravatar.cc/150"
                }
                className="w-16 h-16 rounded-full object-cover border-2 border-yellow-500"
              />

              <div className="flex-1">

                <h3 className="text-2xl font-black">

                  {session?.creatorId?.name}

                </h3>

                <p className="text-zinc-500 mt-1">

                  @{session?.creatorId?.username || "creator"}

                </p>

              </div>

            </div>

            <p className="text-zinc-400 mt-6 leading-7">

              {session?.description ||
                "Welcome to today's livestream! "}

            </p>

          </div>

          {/* Live Stats */}

          <div className="grid grid-cols-2 gap-5 p-7 border-b border-white/5">

            <div className="rounded-2xl bg-zinc-900 p-5">

              <p className="text-zinc-500 text-sm">

                Watching

              </p>

              <h2 className="text-3xl font-black mt-2">

                {(session?.viewers || 0).toLocaleString()}

              </h2>

            </div>

            <div className="rounded-2xl bg-zinc-900 p-5">

              <p className="text-zinc-500 text-sm">

                Likes

              </p>

              <h2 className="text-3xl font-black mt-2">

                {(session?.likes || 0).toLocaleString()}

              </h2>

            </div>

           

          </div>
  <div className="flex gap-6 p-6">

        {/* VIDEO */}

<div className="flex-[2] min-w-0 flex flex-col gap-6">

<div className="flex-1 min-h-0 rounded-[30px] overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,.45)]">
           <LiveKitRoom
    token={token}
    serverUrl={serverUrl}
    connect
    audio="viewer"
    video="viewer"
    className="w-full h-full"
>
    <Viewer />
</LiveKitRoom>

          </div>

          {/* ACTION BAR */}

          <div className="grid grid-cols-2 gap-4">

            <button
    disabled={liking}
    onClick={() => likeLive(session._id)}
    className="rounded-2xl bg-zinc-900 hover:bg-zinc-800 h-16 flex items-center justify-center gap-3 transition disabled:opacity-50"
>
    <Heart size={18} />

    {liking ? "Liking..." : "Like"}
</button>

            <button
    onClick={() => setShowTipModal(true)}
    className="rounded-2xl bg-zinc-900 hover:bg-zinc-800 h-16 flex items-center justify-center gap-3 transition"
>
    <Gift size={18} />

    Tip
</button>
          </div>
       </div>
        </div>
        </div>

        {/* ============================
              RIGHT SIDEBAR
        ============================ */}

<div className="w-full mt-6 rounded-[30px] bg-[#101010] border border-white/5 overflow-hidden">

         

          {/* Chat Header */}

          <div className="px-7 py-5 border-b border-white/5 flex items-center justify-between">

            <h2 className="font-black text-xl">

              Live Chat

            </h2>

            <span className="text-zinc-500 text-sm">

              {session?.viewers || 0} viewers

            </span>

          </div>

          {/* Chat Messages */}

          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">

            {[
              {
                user: "Bryson Tyler",
                text: "🔥🔥 This stream is amazing!,Come Watch",
              },
            ].map((message, index) => (

              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="flex gap-4"
              >

                <img
                  src={`https://i.pravatar.cc/100?img=${index + 8}`}
                  className="w-10 h-10 rounded-full"
                />

                <div>

                  <h4 className="font-bold">

                    {message.user}

                  </h4>

                  <p className="text-zinc-400 mt-1">

                    {message.text}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>
                    {/* Chat Input */}

          <div className="border-t border-white/5 p-5">

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Say something nice..."
                className="flex-1 rounded-2xl bg-zinc-900 border border-white/5 px-5 py-4 outline-none focus:border-yellow-500 transition"
              />

              <button className="px-7 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black transition">

                Send

              </button>

            </div>

          </div>

        </div>

      </div>

     

      <div className="xl:hidden border-t border-white/5 bg-[#101010] p-6">

        <div className="flex items-center gap-4">

          <img
            src={
              session?.creatorId?.avatar ||
              "https://i.pravatar.cc/150"
            }
            className="w-14 h-14 rounded-full border-2 border-yellow-500"
          />

          <div>

            <h2 className="font-black text-xl">

              {session?.creatorId?.name}

            </h2>

            <p className="text-zinc-500">

              {session?.title}

            </p>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">

          <div className="rounded-2xl bg-zinc-900 p-4 text-center">

            <h3 className="text-2xl font-black">

              {(session?.viewers || 0).toLocaleString()}

            </h3>

            <p className="text-zinc-500 text-sm">

              Watching

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-900 p-4 text-center">

            <h3 className="text-2xl font-black">

              {(session?.likes || 0).toLocaleString()}

            </h3>

            <p className="text-zinc-500 text-sm">

              Likes

            </p>

          </div>

          <div className="rounded-2xl bg-zinc-900 p-4 text-center">

            <h3 className="text-2xl font-black">

              ${(session?.tips || 0).toLocaleString()}

            </h3>

            <p className="text-zinc-500 text-sm">

              Tips

            </p>

          </div>

        </div>

      </div>
{showTipModal && (
<div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">

    <div className="w-full max-w-lg rounded-3xl bg-zinc-900 p-8">

        <h2 className="text-2xl font-black mb-6">
            Send Tip
        </h2>

        <div className="space-y-5">

            {[
                { coinType: "gold", quantity: 1 },
                { coinType: "silver", quantity: 5 },
                { coinType: "ruby", quantity: 10 },
            ].map((coin) => (

                <button
                    key={coin.coinType}
                    disabled={tipping}
                    onClick={() =>
                        tipLive(
                            {
                                sessionId: session._id,
                                coinType: coin.coinType,
                                quantity: coin.quantity,
                            },
                            {
                                onSuccess() {
                                    setShowTipModal(false);
                                },
                            }
                        )
                    }
                    className="w-full h-16 rounded-2xl bg-zinc-800 hover:bg-yellow-500 hover:text-black transition flex justify-between items-center px-6"
                >
                    <span className="capitalize font-bold">
                        {coin.coinType}
                    </span>

                    <span>
                        {coin.quantity} Coin{coin.quantity > 1 ? "s" : ""}
                    </span>
                </button>

            ))}

        </div>

        <button
            onClick={() => setShowTipModal(false)}
            className="mt-6 w-full h-12 rounded-xl border border-white/10"
        >
            Cancel
        </button>

    </div>

</div>
)}
   </>
  );
}