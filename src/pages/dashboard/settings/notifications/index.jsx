import { useEffect, useState } from "react";
import {
  Bell,
  Mail,
  MonitorSmartphone,
  Megaphone,
} from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

export default function Notifications() {
  const user = useAuthStore((state) => state.user);

  const [settings, setSettings] = useState({});

  useEffect(() => {
    if (user?.preferences) {
      setSettings({
        emailNotifications:
          user.preferences.emailNotifications ?? true,

        pushNotifications:
          user.preferences.pushNotifications ?? true,

        marketingNotifications:
          user.preferences.marketingNotifications ??
          false,

        systemAlerts:
          user.preferences.systemAlerts ?? true,
      });
    }
  }, [user]);

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const items = [
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive subscription receipts, creator updates and important emails.",
      icon: Mail,
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description:
        "Receive instant notifications while using the platform.",
      icon: Bell,
    },
    {
      key: "marketingNotifications",
      title: "Marketing Messages",
      description:
        "Receive offers, promotions and featured creator recommendations.",
      icon: Megaphone,
    },
    {
      key: "systemAlerts",
      title: "System Alerts",
      description:
        "Important security and account notifications.",
      icon: MonitorSmartphone,
    },
  ];

  return (
    <div className="space-y-10">

      <div>
        <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
          Notifications
        </p>

<h1 className="text-3xl sm:text-4xl font-black">
            Notification Settings
        </h1>

        <p className="text-zinc-500 mt-3">
          Choose how you'd like Bryson Tyler Productions to contact you.
        </p>
      </div>

      <div className="space-y-5">

        {items.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.key}
 className="bg-zinc-900 border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">            

<div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center">

                  <Icon
                    className="text-yellow-400"
                    size={22}
                  />

                </div>

                <div>

                  <h2 className="font-bold text-lg">
                    {item.title}
                  </h2>

<p className="text-sm text-zinc-500 mt-1 leading-6">
                      {item.description}
                  </p>

                </div>

              </div>

              <button
                onClick={() => toggle(item.key)}
                className={`self-end sm:self-auto w-14 h-7 ${
                  settings[item.key]
                    ? "bg-yellow-500"
                    : "bg-zinc-700"
                }`}
              >

                <div
                  className={`absolute top-1 w-5 h-5 rounded-full transition ${
                    settings[item.key]
                      ? "left-8 bg-black"
                      : "left-1 bg-white"
                  }`}
                />

              </button>

            </div>
          );
        })}

      </div>

      <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-4 rounded-2xl transition">
        Save Notification Preferences
      </button>

    </div>
  );
}