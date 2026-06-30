import { useState } from "react";

export default function PreferencesPage() {
  const [preferences, setPreferences] = useState({
    autoRenew: true,
    autoplay: true,
    hdStreaming: true,
    matureContent: true,
    emailUpdates: false,
    wifiDownloads: true,
  });

  const toggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "autoRenew",
      title: "Auto Renew Subscription",
      desc: "Automatically renew active subscriptions.",
    },
    {
      key: "autoplay",
      title: "Autoplay Videos",
      desc: "Automatically play the next available video.",
    },
    {
      key: "hdStreaming",
      title: "HD Streaming",
      desc: "Always stream videos in high quality.",
    },
    {
      key: "matureContent",
      title: "Show Mature Content",
      desc: "Display age-restricted creators and media.",
    },
    {
      key: "emailUpdates",
      title: "Email Updates",
      desc: "Receive promotional emails and creator news.",
    },
    {
      key: "wifiDownloads",
      title: "Download over Wi-Fi only",
      desc: "Prevent downloads while using mobile data.",
    },
  ];

  return (
    <div className="space-y-10">

      <div>
        <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
          Preferences
        </p>

        <h1 className="text-4xl font-black mt-2">
          Viewing Preferences
        </h1>

        <p className="text-zinc-500 mt-3">
          Customize how you enjoy Bryson Tyler Productions.
        </p>
      </div>

      <div className="space-y-5">

        {items.map((item) => (

          <div
            key={item.key}
            className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex justify-between items-center hover:border-yellow-500/30 transition"
          >

            <div>

              <h2 className="font-bold">
                {item.title}
              </h2>

              <p className="text-zinc-500 text-sm mt-1">
                {item.desc}
              </p>

            </div>

            <button
              onClick={() => toggle(item.key)}
              className={`w-14 h-7 rounded-full transition relative ${
                preferences[item.key]
                  ? "bg-yellow-500"
                  : "bg-zinc-700"
              }`}
            >

              <div
                className={`absolute top-1 w-5 h-5 rounded-full transition ${
                  preferences[item.key]
                    ? "left-8 bg-black"
                    : "left-1 bg-white"
                }`}
              />

            </button>

          </div>

        ))}

      </div>

      <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl transition">
        Save Preferences
      </button>

    </div>
  );
}