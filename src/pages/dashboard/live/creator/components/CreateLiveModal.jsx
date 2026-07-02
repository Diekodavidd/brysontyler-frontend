import {
  X,
  CalendarDays,
  Clock3,
  Globe,
  Lock,
  DollarSign,
  Radio,
  Users,
} from "lucide-react";

import { useState } from "react";
import { useCreateLive } from "@/hooks/useLive";

export default function CreateLiveModal({
  open,
  onClose,
}) {
  const { mutate: createLive, isPending } =
    useCreateLive();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "General",
    visibility: "public",
    price: 0,
    scheduled: false,
    scheduledDate: "",
    scheduledTime: "",
    allowRecording: true,
    subscriberOnly: false,
    enableChat: true,
    maxGuests: 1,
  });

  if (!open) return null;

  const submit = () => {
    createLive(form, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-8 overflow-y-auto">

      <div className="w-full max-w-4xl rounded-[36px] bg-zinc-900 border border-white/5 p-10">

        {/* Header */}

        <div className="flex justify-between items-start mb-10">

          <div>

            <p className="uppercase tracking-[.3em] text-xs text-red-500 font-black">

              Live Studio

            </p>

            <h2 className="text-5xl font-black mt-3">

              Create Live Stream

            </h2>

            <p className="text-zinc-500 mt-4">

              Configure your stream before
              going live.

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

        <div className="grid lg:grid-cols-2 gap-7">

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
              className="mt-3 w-full rounded-2xl bg-black border border-white/10 px-5 py-4 outline-none focus:border-yellow-500"
              placeholder="Late Night Q&A"
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
              <option>Podcast</option>
              <option>Fitness</option>
              <option>Lifestyle</option>
              <option>Gaming</option>
              <option>Education</option>
              <option>Business</option>
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
            className="mt-3 w-full rounded-3xl bg-black border border-white/10 p-6 outline-none focus:border-yellow-500"
            placeholder="Tell your audience what today's stream is about..."
          />

        </div>

        {/* Visibility */}

        <div className="mt-10">

          <h3 className="text-xl font-black mb-6">

            Stream Access

          </h3>

          <div className="grid lg:grid-cols-4 gap-5">

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  visibility: "public",
                })
              }
              className={`rounded-3xl p-6 border transition ${
                form.visibility === "public"
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-white/10 bg-black"
              }`}
            >
              <Globe className="mx-auto mb-4" />

              <h4 className="font-black">
                Public
              </h4>

            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  visibility: "subscribers",
                })
              }
              className={`rounded-3xl p-6 border transition ${
                form.visibility ===
                "subscribers"
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-white/10 bg-black"
              }`}
            >
              <Users className="mx-auto mb-4" />

              <h4 className="font-black">
                Subscribers
              </h4>

            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  visibility: "ppv",
                })
              }
              className={`rounded-3xl p-6 border transition ${
                form.visibility === "ppv"
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-white/10 bg-black"
              }`}
            >
              <DollarSign className="mx-auto mb-4" />

              <h4 className="font-black">
                Pay Per View
              </h4>

            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  visibility: "members",
                })
              }
              className={`rounded-3xl p-6 border transition ${
                form.visibility ===
                "members"
                  ? "border-yellow-500 bg-yellow-500 text-black"
                  : "border-white/10 bg-black"
              }`}
            >
              <Lock className="mx-auto mb-4" />

              <h4 className="font-black">
                Members
              </h4>

            </button>

          </div>

        </div>

        {form.visibility !== "public" && (
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

        {/* Schedule */}

        <div className="mt-10 flex items-center gap-3">

          <input
            type="checkbox"
            checked={form.scheduled}
            onChange={(e) =>
              setForm({
                ...form,
                scheduled:
                  e.target.checked,
              })
            }
          />

          <span className="font-bold">

            Schedule Stream

          </span>

        </div>

        {form.scheduled && (

          <div className="grid lg:grid-cols-2 gap-6 mt-6">

            <div>

              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

                Date

              </label>

              <div className="relative mt-3">

                <CalendarDays className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="date"
                  value={form.scheduledDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scheduledDate:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 pl-12 pr-5 py-4"
                />

              </div>

            </div>

            <div>

              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">

                Time

              </label>

              <div className="relative mt-3">

                <Clock3 className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" />

                <input
                  type="time"
                  value={form.scheduledTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      scheduledTime:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-2xl bg-black border border-white/10 pl-12 pr-5 py-4"
                />

              </div>

            </div>

          </div>

        )}

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
            className="px-10 py-4 rounded-2xl bg-red-600 hover:bg-red-500 font-black flex items-center gap-3"
          >
            <Radio />

            {form.scheduled
              ? "Schedule Stream"
              : "Go Live"}

          </button>

        </div>

      </div>

    </div>
  );
}