import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";
import {
  Moon,
  Play,
  Mail,
  Bell,
  Settings2,
  Save,
} from "lucide-react";

export default function PreferencesPage() {
  const user = useAuthStore((state) => state.user);

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoplay: false,
    emailNotifications: false,
    pushNotifications: false,
  });

  useEffect(() => {
    if (user?.preferences) {
      setPreferences({
        darkMode: !!user.preferences.darkMode,
        autoplay: !!user.preferences.autoplay,
        emailNotifications:
          !!user.preferences.emailNotifications,
        pushNotifications:
          !!user.preferences.pushNotifications,
      });
    }
  }, [user]);

  const toggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "darkMode",
      title: "Dark Mode",
      description:
        "Use the dark theme across the entire platform.",
      icon: Moon,
    },
    {
      key: "autoplay",
      title: "Autoplay Videos",
      description:
        "Automatically play the next available video.",
      icon: Play,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Get updates about creators, subscriptions ...",
      icon: Mail,
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description:
        "Get notifications for newcontent & livestreams.",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}

<div className="flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between">
          <div>
          <p className="text-yellow-400 uppercase tracking-[0.3em] text-xs font-black">
            Settings
          </p>

          <h1 className="text-5xl font-black mt-3">
            Preferences
          </h1>

          <p className="text-zinc-500 mt-3">
            Personalize your experience,
            <span className="text-white font-semibold">
              {" "}
              {user?.name}
            </span>
            .
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-3 px-5 py-3 rounded-2xl bg-zinc-900 border border-white/5">
          <Settings2
            size={18}
            className="text-yellow-400"
          />

          <span className="text-zinc-300 font-medium">
            {items.filter((i) => preferences[i.key]).length} of{" "}
            {items.length} enabled
          </span>
        </div>
      </div>

      {/* Preference Cards */}

      <div className="grid gap-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="bg-zinc-900 border border-white/5 rounded-3xl p-7 hover:border-yellow-500/30 transition"
            >
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center">
                    <Icon
                      size={24}
                      className="text-yellow-400"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-black">
                      {item.title}
                    </h2>

                    <p className="text-zinc-500 mt-2 max-w-xl leading-7">
                      {item.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => toggle(item.key)}
                  className={`relative w-16 h-9 rounded-full transition ${
                    preferences[item.key]
                      ? "bg-yellow-500"
                      : "bg-zinc-700"
                  }`}
                >
                  <div
                    className={`absolute top-1 h-7 w-7 rounded-full transition-all ${
                      preferences[item.key]
                        ? "left-8 bg-black"
                        : "left-1 bg-white"
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}

      <div className="rounded-3xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-transparent p-8">
        <h2 className="text-2xl font-black">
          Preference Summary
        </h2>

        <p className="text-zinc-400 mt-3 leading-7">
          You currently have{" "}
          <span className="text-yellow-400 font-bold">
            {items.filter((i) => preferences[i.key]).length}
          </span>{" "}
          preference
          {items.filter((i) => preferences[i.key]).length !== 1
            ? "s"
            : ""}{" "}
          enabled. Your settings are used to personalize your
          Bryson Tyler experience.
        </p>
      </div>

      {/* Save Button */}

      <button className="flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl transition">
        <Save size={18} />
        Save Preferences
      </button>
    </div>
  );
}