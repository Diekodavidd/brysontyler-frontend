import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  MonitorUp,
  PhoneOff,
  Radio,
  Users,
  Settings2,
  Camera,
} from "lucide-react";

export default function BroadcastControls({
  isLive,
  micEnabled,
  cameraEnabled,
  screenSharing,
  viewers = 0,
  onToggleMic,
  onToggleCamera,
  onToggleScreenShare,
  onEndStream,
  onSettings,
  onSwitchCamera,
}) {
  return (
    <div className="rounded-[32px] border border-white/5 bg-zinc-900 p-8">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <p className="uppercase tracking-[.25em] text-xs text-zinc-500 font-bold">
            Broadcast Controls
          </p>

          <h2 className="text-3xl font-black mt-3">
            Studio Controls
          </h2>

        </div>

        <div
          className={`flex items-center gap-3 rounded-full px-5 py-3 text-sm font-black ${
            isLive
              ? "bg-red-500/10 text-red-400"
              : "bg-zinc-800 text-zinc-400"
          }`}
        >
          <Radio
            size={16}
            className={isLive ? "animate-pulse" : ""}
          />

          {isLive ? "LIVE" : "OFFLINE"}
        </div>

      </div>

      {/* Controls */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">

        <button
          onClick={onToggleMic}
          className={`rounded-3xl p-7 transition ${
            micEnabled
              ? "bg-yellow-500 text-black"
              : "bg-black border border-white/5 text-white hover:border-yellow-500"
          }`}
        >
          <div className="flex flex-col items-center">

            {micEnabled ? (
              <Mic size={32} />
            ) : (
              <MicOff size={32} />
            )}

            <h3 className="mt-5 font-black">
              {micEnabled
                ? "Mute Microphone"
                : "Unmute Microphone"}
            </h3>

          </div>

        </button>

        <button
          onClick={onToggleCamera}
          className={`rounded-3xl p-7 transition ${
            cameraEnabled
              ? "bg-yellow-500 text-black"
              : "bg-black border border-white/5 text-white hover:border-yellow-500"
          }`}
        >
          <div className="flex flex-col items-center">

            {cameraEnabled ? (
              <Video size={32} />
            ) : (
              <VideoOff size={32} />
            )}

            <h3 className="mt-5 font-black">
              {cameraEnabled
                ? "Turn Camera Off"
                : "Turn Camera On"}
            </h3>

          </div>

        </button>

        <button
          onClick={onSwitchCamera}
          className="rounded-3xl bg-black border border-white/5 hover:border-sky-500 p-7 transition"
        >
          <div className="flex flex-col items-center">

            <Camera
              size={32}
              className="text-sky-400"
            />

            <h3 className="mt-5 font-black">
              Switch Camera
            </h3>

          </div>

        </button>

        {/* <button
          onClick={onSettings}
          className="rounded-3xl bg-black border border-white/5 hover:border-purple-500 p-7 transition"
        >
          <div className="flex flex-col items-center">

            <Settings2
              size={32}
              className="text-purple-400"
            />

            <h3 className="mt-5 font-black">
              Stream Settings
            </h3>

          </div>

        </button> */}

        <button
          onClick={onEndStream}
          className="rounded-3xl bg-red-600 hover:bg-red-500 text-white p-7 transition"
        >
          <div className="flex flex-col items-center">

            <PhoneOff size={32} />

            <h3 className="mt-5 font-black">
              End Stream
            </h3>

          </div>

        </button>

      </div>

      {/* Bottom */}

      <div className="mt-8 rounded-3xl bg-black border border-white/5 p-6 flex flex-col lg:flex-row justify-between gap-6">

        <div>

          <p className="uppercase text-xs tracking-[.25em] text-zinc-500">
            Live Viewers
          </p>

          <div className="flex items-center gap-3 mt-3">

            <Users
              size={22}
              className="text-yellow-400"
            />

            <span className="text-4xl font-black">
              {viewers.toLocaleString()}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />

          <span className="font-bold text-red-400">
            {isLive
              ? "Broadcasting Live"
              : "Waiting to Go Live"}
          </span>

        </div>

      </div>

    </div>
  );
}