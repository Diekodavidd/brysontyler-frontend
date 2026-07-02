import {
  Users,
  Crown,
  ShieldCheck,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Search,
  MoreVertical,
  UserX,
  Ban,
} from "lucide-react";

import { useMemo, useState } from "react";

export default function ViewersList({
  viewers = [],
  onRemove,
  onBan,
}) {
  const [search, setSearch] = useState("");

  const filteredViewers = useMemo(() => {
    return viewers.filter((viewer) =>
      viewer.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [viewers, search]);

  return (
    <div className="rounded-[34px] bg-zinc-900 border border-white/5 overflow-hidden h-[700px] flex flex-col">

      {/* Header */}

      <div className="p-8 border-b border-white/5">

        <div className="flex items-center justify-between">

          <div>

            <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">

              Audience

            </p>

            <h2 className="text-3xl font-black mt-2">

              Viewers

            </h2>

          </div>

          <div className="rounded-full bg-yellow-500/10 text-yellow-400 px-5 py-2 font-black">

            {viewers.length}

          </div>

        </div>

        {/* Search */}

        <div className="relative mt-8">

          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search viewer..."
            className="w-full h-14 rounded-2xl bg-black border border-white/5 pl-14 pr-5 outline-none focus:border-yellow-500"
          />

        </div>

      </div>

      {/* Viewer List */}

      <div className="flex-1 overflow-y-auto">

        {!filteredViewers.length && (

          <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500">

            <Users
              size={60}
              className="text-zinc-700 mb-5"
            />

            <h3 className="text-2xl font-black text-white">

              No Viewers

            </h3>

            <p className="mt-3">

              Viewers joining your stream
              will appear here.

            </p>

          </div>

        )}

        {filteredViewers.map((viewer) => (

          <div
            key={viewer._id}
            className="border-b border-white/5 p-6 hover:bg-black/40 transition"
          >

            <div className="flex justify-between items-start">

              <div className="flex gap-4">

                <img
                  src={
                    viewer.profilePicture ||
                    "/avatar.png"
                  }
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-black">

                      {viewer.name}

                    </h3>

                    {viewer.verified && (

                      <ShieldCheck
                        size={15}
                        className="text-sky-400"
                      />

                    )}

                    {viewer.subscription && (

                      <span className="rounded-full bg-yellow-500/10 text-yellow-400 px-2 py-1 text-[10px] font-black flex items-center gap-1">

                        <Crown size={11} />

                        SUBSCRIBER

                      </span>

                    )}

                  </div>

                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-zinc-500">

                    <span>

                      Joined{" "}
                      {viewer.joinedAt
                        ? new Date(
                            viewer.joinedAt
                          ).toLocaleTimeString()
                        : "--"}

                    </span>

                    <span>

                      {viewer.country ||
                        "Unknown"}

                    </span>

                  </div>

                </div>

              </div>

              {/* Status */}

              <div className="flex items-center gap-3">

                {viewer.camera ? (
                  <Video
                    size={17}
                    className="text-green-400"
                  />
                ) : (
                  <VideoOff
                    size={17}
                    className="text-zinc-600"
                  />
                )}

                {viewer.microphone ? (
                  <Mic
                    size={17}
                    className="text-green-400"
                  />
                ) : (
                  <MicOff
                    size={17}
                    className="text-zinc-600"
                  />
                )}

              </div>

            </div>

            {/* Actions */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  onRemove?.(viewer)
                }
                className="h-11 px-5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500 hover:text-black text-yellow-400 font-bold flex items-center gap-2 transition"
              >

                <UserX size={16} />

                Remove

              </button>

              <button
                onClick={() =>
                  onBan?.(viewer)
                }
                className="h-11 px-5 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 font-bold flex items-center gap-2 transition"
              >

                <Ban size={16} />

                Ban

              </button>

              <button
                className="w-11 h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition"
              >

                <MoreVertical size={17} />

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-white/5 p-6">

        <div className="rounded-3xl bg-black border border-white/5 p-6 flex justify-between items-center">

          <div>

            <p className="uppercase tracking-[.25em] text-xs text-zinc-500">

              Current Audience

            </p>

            <h2 className="text-4xl font-black mt-3">

              {viewers.length}

            </h2>

          </div>

          <div className="w-20 h-20 rounded-full bg-yellow-500/10 flex items-center justify-center">

            <Users
              size={38}
              className="text-yellow-400"
            />

          </div>

        </div>

      </div>

    </div>
  );
}