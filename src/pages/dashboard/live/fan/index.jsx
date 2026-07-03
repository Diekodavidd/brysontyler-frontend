import {
  Radio,
  Eye,
  Search,
  Play,
  CheckCircle2,
  Flame,
  Users,
  Clock3,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useJoinLive,
  useLiveSessions,
} from "@/hooks/useLive";

export default function FanLivePage() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
const {
  data,
  isLoading,
} = useLiveSessions();

const {
  mutate: joinLive,
} = useJoinLive();

const liveCreators =
  data?.sessions || [];
 const filtered = useMemo(() => {
  return liveCreators.filter((session) =>
    session.creatorId?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );
}, [liveCreators, search]);

  const featured = filtered[0];
if (isLoading) {
  return (
    <div className="h-[70vh] flex items-center justify-center text-zinc-500">
      Loading Live Streams...
    </div>
  );
}
  return (
    <div className="space-y-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-red-500 flex items-center gap-2">

            <Radio size={14} />

            LIVE NOW

          </p>

          <h1 className="text-5xl font-black mt-3">
            Live Streams
          </h1>

          <p className="text-zinc-500 mt-3 max-w-2xl">
            Join creators broadcasting live, interact in real time,
            unlock premium experiences and never miss a moment.
          </p>

        </div>

        <div className="relative w-full lg:w-[360px]">

          <Search
            size={18}
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search live creators..."
            className="w-full rounded-2xl bg-zinc-900 border border-white/5 pl-12 pr-4 py-4 outline-none focus:border-yellow-500"
          />

        </div>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-6">

        <Stat
          icon={<Radio />}
          title="Live Now"
value={filtered.length}
          color="text-red-400"
        />

        <Stat
          icon={<Users />}
          title="Watching"
          value={filtered.reduce(
  (sum, s) => sum + (s.viewers || 0),
  0
)}

          color="text-yellow-400"
        />

        <Stat
          icon={<Flame />}
          title="Trending"
          value="0"
          color="text-orange-400"
        />

        <Stat
          icon={<Clock3 />}
          title="Today's Streams"
          value="0"
          color="text-green-400"
        />

      </div>

      {/* FEATURED */}

      {featured && (
        <div
          className="relative rounded-[34px] overflow-hidden h-[500px] cursor-pointer group"
          onClick={() =>
            navigate(`/dashboard/live/${featured._id}`)
          }
        >

          <img
          src={
  featured.thumbnail ||
  "https://picsum.photos/1200/800"
}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-[2500ms]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          <div className="absolute top-8 left-8 flex gap-4">

            <span className="px-5 py-2 rounded-full bg-red-600 text-xs font-black tracking-widest">
              LIVE
            </span>

            <span className="px-5 py-2 rounded-full bg-black/40 backdrop-blur-xl text-sm flex items-center gap-2">

              <Eye size={15} />

(featured.viewers || 0).toLocaleString()
            </span>

          </div>

          <div className="absolute bottom-10 left-10">

            <div className="flex items-center gap-3">

              <h2 className="text-5xl font-black">
{featured.creatorId?.name}              </h2>

              {featured.creatorId?.isVerifiedCreator && (
                <CheckCircle2 className="fill-sky-400 text-sky-400" />
              )}

            </div>

            <p className="text-zinc-300 mt-4 text-lg">
              {featured.title}
            </p>

            <p className="text-zinc-500 mt-2">
{new Date(
    featured.createdAt
).toLocaleString()}            </p>

            <button
  onClick={(e) => {
    e.stopPropagation();

    joinLive(featured._id, {
      onSuccess: ({ token, roomName }) => {
        navigate(`/dashboard/live/${featured._id}`, {
          state: {
            token,
            roomName,
          },
        });
      },
    });
  }}
  className="mt-8 bg-yellow-500 hover:bg-yellow-400 transition text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3"
>
  <Play fill="currentColor" />
  Join Stream
</button>

          </div>

        </div>
      )}

      {/* LIVE CREATORS */}

      <div>

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-black">
            Live Creators
          </h2>

          <span className="text-zinc-500">
            {filtered.length} Live
          </span>

        </div>

        <div className="grid lg:grid-cols-3 gap-7">

          {filtered.map((creator) => (

            <div
              key={creator._id}
              onClick={() =>
                navigate(`/dashboard/live/${creator._id}`)
              }
              className="rounded-[30px] overflow-hidden bg-zinc-900 border border-white/5 hover:border-red-500/40 transition cursor-pointer group"
            >

              <div className="relative h-64 overflow-hidden">

                <img
src={
  creator.thumbnail ||
  "https://picsum.photos/600/400"
}                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[1800ms]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute top-5 left-5 flex gap-3">

                  <span className="bg-red-600 px-4 py-2 rounded-full text-xs font-black">
                    LIVE
                  </span>

                  <span className="bg-black/50 backdrop-blur px-4 py-2 rounded-full text-xs flex items-center gap-2">

                    <Eye size={14} />

(creator.viewers || 0).toLocaleString()
                  </span>

                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center gap-2">

                  <h3 className="text-2xl font-black">
{creator.creatorId?.name}                  </h3>

                  {creator.creatorId?.isVerifiedCreator && (
                    <CheckCircle2
                      size={18}
                      className="fill-sky-400 text-sky-400"
                    />
                  )}

                </div>

                <p className="text-zinc-500 mt-3">
                  {creator.title}
                </p>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-yellow-400 font-bold">
{creator.category || "General"}                  </span>

                  <span className="text-zinc-500 text-sm">
{new Date(
    creator.createdAt
).toLocaleString()}                  </span>

                </div>

                <button
  onClick={(e) => {
    e.stopPropagation();

    joinLive(creator._id, {
      onSuccess: ({ token, roomName }) => {
        navigate(`/dashboard/live/${creator._id}`, {
          state: {
            token,
            roomName,
          },
        });
      },
    });
  }}
  className="mt-8 w-full rounded-2xl bg-yellow-500 hover:bg-yellow-400 py-3 text-black font-black flex items-center justify-center gap-3"
>
  <Play
    size={16}
    fill="currentColor"
  />
  Watch Live
</button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

function Stat({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
            {title}
          </p>

          <h2 className="text-4xl font-black mt-4">
            {value}
          </h2>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </div>
  );
}