import {
  Users,
  Send,
  Clock3,
  CheckCircle2,
  XCircle,
  Search,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useCreatorCollaborations } from "@/hooks/useCreator";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useDiscoverCreators } from "../../../hooks/useCreator";
import {
  useCreateCollaboration,
} from "@/hooks/useCollaboration";

export default function CreatorCollaborationsPage() {
  const navigate = useNavigate();

const [search, setSearch] = useState("");
const [showModal, setShowModal] = useState(false);
const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useCreatorCollaborations();
const { data: creatorsData } = useDiscoverCreators();
const {
  mutate: sendRequest,
  isPending,
} = useCreateCollaboration();
const creators =
  creatorsData?.creators || [];
  const collaborations = data?.collaborations || [];

const filtered = useMemo(() => {
  return collaborations.filter((item) => {

    const creator =
      item.senderId?._id === user?._id
        ? item.receiverId
        : item.senderId;

    return creator?.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  });
}, [collaborations, search, user]);

  const pending = collaborations.filter(
    (c) => c.status === "pending"
  ).length;

  const accepted = collaborations.filter(
    (c) => c.status === "accepted"
  ).length;

  const rejected = collaborations.filter(
    (c) => c.status === "rejected"
  ).length;

  if (isLoading) {
    return (
      <div className="h-[70vh] flex items-center justify-center text-zinc-500">
        Loading collaborations...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

        <div>

          <p className="uppercase tracking-[.3em] text-xs font-black text-yellow-400">
            Collaborations
          </p>

          <h1 className="text-5xl font-black mt-3">
            Creator Collaborations
          </h1>

          <p className="text-zinc-500 mt-3">
            Manage creator requests and partnerships.
          </p>

        </div>

       <button
  onClick={() => setShowModal(true)}
  className="px-6 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-2"
>
          <Send size={18} />
          New Request
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6">

        <Stat
          title="Total"
          value={collaborations.length}
          icon={<Users />}
          color="text-yellow-400"
        />

        <Stat
          title="Pending"
          value={pending}
          icon={<Clock3 />}
          color="text-orange-400"
        />

        <Stat
          title="Accepted"
          value={accepted}
          icon={<CheckCircle2 />}
          color="text-green-400"
        />

        <Stat
          title="Rejected"
          value={rejected}
          icon={<XCircle />}
          color="text-red-400"
        />

      </div>

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-4 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search creators..."
          className="w-full bg-zinc-900 rounded-2xl border border-white/5 pl-12 pr-4 py-4 outline-none focus:border-yellow-500"
        />

      </div>

      {/* Cards */}

      <div className="grid lg:grid-cols-2 gap-7">

        {filtered.map((item) => {
const creator =
  item.senderId?._id === user?._id
    ? item.receiverId
    : item.senderId;

          return (

            <div
              key={item._id}
              className="rounded-[30px] bg-zinc-900 border border-white/5 p-7 hover:border-yellow-500/30 transition"
            >

              <div className="flex justify-between items-start">

                <div className="flex gap-4 items-center">

                  <div className="w-16 h-16 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black text-xl">

                    {creator?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}

                  </div>

                  <div>

                    <h2 className="text-2xl font-black">

                      {creator?.name}

                    </h2>

                    <p className="text-zinc-500 mt-1">

                      Collaboration Request

                    </p>

                  </div>

                </div>

                {item.status === "accepted" && (

                  <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-xs font-black">

                    ACCEPTED

                  </span>

                )}

                {item.status === "pending" && (

                  <span className="px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-black">

                    PENDING

                  </span>

                )}

                {item.status === "rejected" && (

                  <span className="px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-xs font-black">

                    REJECTED

                  </span>

                )}

              </div>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                  <span className="text-zinc-500">
                    Created
                  </span>

                  <span>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-500">
                    Status
                  </span>

                  <span className="capitalize">
                    {item.status}
                  </span>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <button
                  className="rounded-2xl bg-yellow-500 hover:bg-yellow-400 py-3 font-black text-black flex justify-center items-center gap-2"
                >
                  View
                  <ArrowRight size={16} />
                </button>

                <button
                  className="rounded-2xl border border-white/10 bg-black hover:border-yellow-500 py-3 font-black"
                >
                  Message
                </button>

              </div>

            </div>

          );
        })}

      </div>
{
showModal && (

<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

<div className="w-full max-w-2xl rounded-3xl bg-zinc-900 border border-white/10 p-8">

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-black">

New Collaboration

</h2>

<button
onClick={() => setShowModal(false)}
className="text-zinc-400 hover:text-white"
>

<XCircle />

</button>

</div>

<div className="space-y-4 max-h-[500px] overflow-y-auto">

{creators
.filter(c => c._id !== user._id)
.map((creator) => (

<div
key={creator._id}
className="flex justify-between items-center rounded-2xl bg-black/40 p-5"
>

<div className="flex items-center gap-4">

<div className="w-14 h-14 rounded-full bg-yellow-500 text-black flex items-center justify-center font-black">

{creator.name
.split(" ")
.map(n=>n[0])
.join("")
.slice(0,2)}

</div>

<div>

<h3 className="font-black">

{creator.name}

</h3>

<p className="text-zinc-500 text-sm">

{creator.category || "Creator"}

</p>

</div>

</div>

<button
  disabled={isPending}
  onClick={() =>
    sendRequest(
      {
        receiverId: creator._id,
        message: "I'd like to collaborate with you.",
      },
      {
        onSuccess: () => {
          alert("Collaboration request sent!");
          setShowModal(false);
        },
        onError: (err) => {
          alert(err.message);
        },
      }
    )
  }
  className="rounded-xl bg-yellow-500 px-5 py-3 font-black text-black hover:bg-yellow-400"
>
  Send Request
</button>

</div>

))}

</div>

</div>

</div>

)}
    </div>
  );
}

function Stat({
  title,
  value,
  icon,
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