import {
  X,
  CalendarDays,
  Clock3,
  Radio,
  Globe,
  Users,
  DollarSign,
  Lock,
} from "lucide-react";

import { useState } from "react";
import { useScheduleLive } from "@/hooks/useLive";

export default function ScheduleModal({
  open,
  onClose,
}) {
  const { mutate: scheduleLive, isPending } =
    useScheduleLive();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",

    visibility: "public",

    price: 0,

    date: "",

    time: "",

    notifyFollowers: true,
  });

  if (!open) return null;

  const submit = () => {
    scheduleLive(form, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center overflow-y-auto p-8">

      <div className="w-full max-w-4xl rounded-[36px] bg-zinc-900 border border-white/5 p-10">

        {/* Header */}

        <div className="flex justify-between items-start mb-10">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">

              Creator Studio

            </p>

            <h2 className="text-5xl font-black mt-3">

              Schedule Live Stream

            </h2>

            <p className="text-zinc-500 mt-4">

              Plan your next broadcast and notify your audience.

            </p>

          </div>

          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-black hover:bg-zinc-800 flex items-center justify-center"
          >
            <X />
          </button>

        </div>

        {/* Basic */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div>

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

              Stream Title

            </label>

            <input
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="mt-3 w-full rounded-2xl bg-black border border-white/10 px-5 py-4 outline-none"
              placeholder="Late Night Chat"
            />

          </div>

          <div>

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

              Category

            </label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="mt-3 w-full rounded-2xl bg-black border border-white/10 px-5 py-4 outline-none"
            >
              <option>General</option>
              <option>Music</option>
              <option>Gaming</option>
              <option>Podcast</option>
              <option>Lifestyle</option>
              <option>Fitness</option>
              <option>Business</option>
              <option>Education</option>
            </select>

          </div>

        </div>

        {/* Description */}

        <div className="mt-8">

          <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

            Description

          </label>

          <textarea
            rows={5}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="mt-3 w-full rounded-3xl bg-black border border-white/10 p-6 outline-none"
            placeholder="Tell your fans what this stream is about..."
          />

        </div>

        {/* Visibility */}

        <div className="mt-10">

          <h3 className="text-2xl font-black mb-5">

            Stream Access

          </h3>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              {
                value: "public",
                label: "Public",
                icon: Globe,
              },
              {
                value: "subscribers",
                label: "Subscribers",
                icon: Users,
              },
              {
                value: "ppv",
                label: "Pay Per View",
                icon: DollarSign,
              },
              {
                value: "members",
                label: "Members",
                icon: Lock,
              },
            ].map((option) => {
              const Icon = option.icon;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      visibility: option.value,
                    })
                  }
                  className={`rounded-3xl border p-6 transition ${
                    form.visibility === option.value
                      ? "border-yellow-500 bg-yellow-500 text-black"
                      : "border-white/10 bg-black"
                  }`}
                >
                  <Icon
                    size={28}
                    className="mx-auto mb-4"
                  />

                  <h4 className="font-black">

                    {option.label}

                  </h4>

                </button>
              );
            })}

          </div>

        </div>

        {(form.visibility === "ppv" ||
          form.visibility === "members") && (

          <div className="mt-8">

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

              Entry Price

            </label>

            <div className="relative mt-3">

              <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                className="w-full rounded-2xl bg-black border border-white/10 pl-12 pr-5 py-4 outline-none"
              />

            </div>

          </div>

        )}

        {/* Date & Time */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div>

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

              Stream Date

            </label>

            <div className="relative mt-3">

              <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-2xl bg-black border border-white/10 pl-12 pr-5 py-4"
              />

            </div>

          </div>

          <div>

            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

              Stream Time

            </label>

            <div className="relative mt-3">

              <Clock3 className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="time"
                value={form.time}
                onChange={(e) =>
                  setForm({
                    ...form,
                    time: e.target.value,
                  })
                }
                className="w-full rounded-2xl bg-black border border-white/10 pl-12 pr-5 py-4"
              />

            </div>

          </div>

        </div>

        {/* Notify */}

        <div className="mt-8 flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.notifyFollowers}
            onChange={(e) =>
              setForm({
                ...form,
                notifyFollowers: e.target.checked,
              })
            }
          />

          <span className="font-semibold">

            Notify followers when this stream is published

          </span>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 mt-12">

          <button
            onClick={onClose}
            className="px-8 py-4 rounded-2xl bg-zinc-800 hover:bg-zinc-700 font-bold"
          >
            Cancel
          </button>

          <button
            disabled={isPending}
            onClick={submit}
            className="px-10 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-3"
          >
            <Radio />

            Schedule Stream

          </button>

        </div>

      </div>

    </div>
  );
}