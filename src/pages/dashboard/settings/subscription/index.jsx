import { useState } from "react";
import {
  DollarSign,
  Gift,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function SubscriptionSettingsPage() {
  const [settings, setSettings] = useState({
    monthlyPrice: 24.99,
    freeTrial: true,
    trialDays: 7,
    acceptTips: true,
    privateMessages: true,
    livestreamAccess: true,
    downloadableContent: false,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const features = [
    {
      key: "acceptTips",
      title: "Accept Fan Tips",
      desc: "Allow fans to send direct tips."
    },
    {
      key: "privateMessages",
      title: "Private Messaging",
      desc: "Subscribers can send private messages."
    },
    {
      key: "livestreamAccess",
      title: "Subscribers-only Livestreams",
      desc: "Only paying members can join live sessions."
    },
    {
      key: "downloadableContent",
      title: "Downloadable Content",
      desc: "Allow premium members to download videos."
    },
  ];

  return (
    <div className="space-y-10">

      <div>
        <p className="text-yellow-400 uppercase tracking-[0.25em] text-xs font-black">
          Monetization
        </p>

        <h1 className="text-4xl font-black mt-2">
          Subscription Settings
        </h1>

        <p className="text-zinc-500 mt-3">
          Control how your fans subscribe to your content.
        </p>
      </div>

      {/* Pricing */}

      <div className="rounded-3xl bg-zinc-900 border border-white/5 p-5 sm:p-8">

        <div className="flex items-center gap-3 mb-6">

          <DollarSign className="text-yellow-400" />

          <h2 className="text-xl font-black">
            Monthly Subscription
          </h2>

        </div>

        <div className="max-w-sm">

          <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            Price ($)
          </label>

          <Input
            type="number"
            value={settings.monthlyPrice}
            onChange={(e)=>
              setSettings({
                ...settings,
                monthlyPrice:e.target.value
              })
            }
          />

        </div>

      </div>

      {/* Free Trial */}

      <div className="rounded-3xl bg-zinc-900 border border-white/5 p-8">

        <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">

          <div>

            <h2 className="font-black text-xl">
              Free Trial
            </h2>

            <p className="text-zinc-500 mt-2">
              Let new subscribers try your page for free.
            </p>

          </div>

          <button
            onClick={()=>toggle("freeTrial")}
            className={`w-14 h-7 rounded-full relative ${
              settings.freeTrial
                ? "bg-yellow-500"
                : "bg-zinc-700"
            }`}
          >

            <div
              className={`absolute top-1 w-5 h-5 rounded-full transition ${
                settings.freeTrial
                  ? "left-8 bg-black"
                  : "left-1 bg-white"
              }`}
            />

          </button>

        </div>

        {settings.freeTrial && (

          <div className="mt-6 max-w-xs">

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
              Trial Days
            </label>

            <Input
              type="number"
              value={settings.trialDays}
              onChange={(e)=>
                setSettings({
                  ...settings,
                  trialDays:e.target.value
                })
              }
            />

          </div>

        )}

      </div>

      {/* Subscriber Features */}

      <div className="space-y-5">

        {features.map((item)=>(

          <div
            key={item.key}
            className="bg-zinc-900 border border-white/5 rounded-3xl p-6 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between"
          >

            <div>

              <h2 className="font-bold">
                {item.title}
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                {item.desc}
              </p>

            </div>

            <button
              onClick={()=>toggle(item.key)}
              className={`w-14 h-7 rounded-full relative ${
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

        ))}

      </div>

      {/* Summary */}

      <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-6">

        <div className="flex gap-3">

          <Gift className="text-yellow-400 mt-1"/>

          <div>

            <h3 className="font-black">
              Subscriber Benefits
            </h3>

            <p className="text-zinc-400 mt-2 leading-7">
              Fans will pay
              <span className="text-yellow-400 font-bold">
                {" "}$
                {settings.monthlyPrice}
                /month
              </span>
              {settings.freeTrial &&
                ` after a ${settings.trialDays}-day free trial.`}
            </p>

          </div>

        </div>

      </div>

      <Button className="bg-yellow-500 text-black w-full py-4 font-black rounded-2xl">

        <CheckCircle2 className="mr-2"/>

        SAVE SUBSCRIPTION SETTINGS

      </Button>

    </div>
  );
}