import { useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  ShieldCheck,
  Clock3,
  Globe,
} from "lucide-react";

import {
  usePendingCreators,
  useApproveCreator,
  useRejectCreator,
} from "@/hooks/useAdmin";

export default function PendingCreatorsPage() {
  const [search, setSearch] = useState("");
  const [selectedCreator, setSelectedCreator] =
    useState(null);
    const [loadingAction, setLoadingAction] = useState(null);
const [loadingId, setLoadingId] = useState(null);
  const {
    data,
    isLoading,
  } = usePendingCreators();

  const approveMutation =
    useApproveCreator();

  const rejectMutation =
    useRejectCreator();

  const creators =
    data?.creators || [];

  const filtered = useMemo(() => {
    return creators.filter((creator) => {

      const term =
        search.toLowerCase();

      return (
        creator.name
          ?.toLowerCase()
          .includes(term) ||

        creator.email
          ?.toLowerCase()
          .includes(term) ||

        creator.creatorApplication?.stageName
          ?.toLowerCase()
          .includes(term) ||

        creator.creatorApplication?.category
          ?.toLowerCase()
          .includes(term)
      );
    });
  }, [creators, search]);

 const handleApprove = (id) => {
  setLoadingAction({
    id,
    type: "approve",
  });

  approveMutation.mutate(id, {
    onSettled: () => setLoadingAction(null),
  });
};
const handleReject = (id) => {
  const reason = prompt("Reason for rejection?");
  if (reason === null) return;

  setLoadingAction({
    id,
    type: "reject",
  });

  rejectMutation.mutate(
    { id, reason },
    {
      onSettled: () => setLoadingAction(null),
    }
  );
};

  if (isLoading) {
    return (
      <div className="py-40 text-center text-zinc-500">
        Loading creator applications...
      </div>
    );
  }

  const pendingCount =
    creators.length;

  const approvedToday = 0;

  const rejectedCount = 0;

  const awaitingKYC =
    creators.filter(
      (c) =>
        !c.isKYCVerified
    ).length;
    return (
  <div className="space-y-8">

<div className="flex flex-col lg:flex-row lg:justify-between gap-6">
      <div>

        <p className="uppercase tracking-[.3em] text-xs text-amber-500 font-black">
          Creator Verification
        </p>

        <h1 className="text-4xl font-black mt-3">
          Pending Applications
        </h1>

        <p className="text-zinc-500 mt-3">
          Review and approve creators joining the platform.
        </p>

      </div>

      <button className="
self-start
lg:self-auto
rounded-2xl
bg-amber-500
px-6
py-3
text-black
font-black
">
        {pendingCount} Pending
      </button>

    </div>

    {/* Search */}

<div className="flex flex-col sm:flex-row gap-5 flex-1 min-w-0">      <div className="relative w-full
lg:w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search creators..."
          className="w-full rounded-2xl border border-white/5 bg-[#090909] py-3 pl-12 pr-4 outline-none focus:border-amber-500"
        />

      </div>

      <button className="rounded-2xl border border-white/10 bg-[#090909] px-5 py-3 flex items-center gap-2">

        <Filter size={18} />

        Filters

      </button>

    </div>

    {/* Stats */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      <StatCard
        title="Pending"
        value={pendingCount}
        icon={Clock3}
      />

      <StatCard
        title="Approved Today"
        value={approvedToday}
        icon={ShieldCheck}
      />

      <StatCard
        title="Rejected"
        value={rejectedCount}
        icon={XCircle}
      />

      <StatCard
        title="Awaiting KYC"
        value={awaitingKYC}
        icon={Eye}
      />

    </div>

    {/* Applications */}

    <div className="space-y-5">

      {filtered.map((creator) => (

        <div
          key={creator._id}
 className="
        rounded-2xl
        bg-black/30
        p-5
      "        >

<div  className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
        ">
            <div className="flex gap-5">

              <img
                src={
                  creator.profileImage ||
                  "https://placehold.co/120x120"
                }
                alt=""
className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"              />

<div className="flex-1 min-w-0">
                <h2 className="text-xl font-black">

                  {creator.name}

                </h2>

<p className="mt-1 text-zinc-500 break-all">
                  {creator.email}

                </p>

<div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 text-sm text-zinc-400">
                  <span>

                    Stage Name

                    <span className="ml-2 text-white font-bold">

                      {creator.creatorApplication?.stageName || "-"}

                    </span>

                  </span>

                  <span>

                    Category

                    <span className="ml-2 text-white font-bold">

                      {creator.creatorApplication?.category || "-"}

                    </span>

                  </span>

                  <span>

                    KYC

                    <span
                      className={`ml-2 font-bold ${
                        creator.isKYCVerified
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >

                      {creator.kycStatus}

                    </span>

                  </span>

                  <span>

                    Applied

                    <span className="ml-2 text-white font-bold">

                      {creator.creatorApplication?.submittedAt
                        ? new Date(
                            creator.creatorApplication.submittedAt
                          ).toLocaleDateString()
                        : "-"}

                    </span>

                  </span>

                </div>

              </div>

            </div>

<div
  className="
    flex
    flex-col
    sm:flex-row
    lg:flex-col
    xl:flex-row
    gap-3
    w-full
    lg:w-auto
    xl:items-center
  "
>
              <button
                onClick={() =>
                  setSelectedCreator(creator)
                }
className="
flex
items-center
justify-center
gap-2
rounded-2xl
border
border-white/10
hover:border-amber-500
px-5
py-3
font-medium
w-full
sm:flex-1
lg:w-full
xl:w-auto
"              >

                <Eye size={18} />

                Review

              </button>

              <button
                onClick={() =>
                  handleApprove(creator._id)
                }
                disabled={
                  approveMutation.isPending
                }
className="
flex
items-center
justify-center
gap-2
rounded-2xl
bg-green-500
px-5
py-3
font-bold
text-black
w-full
sm:flex-1
lg:w-full
xl:w-auto
"              >

               <CheckCircle2
  className={
    loadingAction?.id === creator._id &&
    loadingAction?.type === "approve"
      ? "animate-spin"
      : ""
  }
/>

{
 loadingAction?.id === creator._id &&
 loadingAction?.type === "approve"
    ? "Approving..."
    : "Approve"
}
              </button>

              <button
                onClick={() =>
                  handleReject(creator._id)
                }
                disabled={
                  rejectMutation.isPending
                }
className="
flex
items-center
justify-center
gap-2
rounded-2xl
bg-red-500
px-5
py-3
font-bold
w-full
sm:flex-1
lg:w-full
xl:w-auto
"              >
<XCircle
  className={
    loadingAction?.id === creator._id &&
    loadingAction?.type === "reject"
      ? "animate-spin"
      : ""
  }
/>

{
 loadingAction?.id === creator._id &&
 loadingAction?.type === "reject"
    ? "Rejecting..."
    : "Reject"
}

              </button>

            </div>

          </div>

        </div>

      ))}

      {filtered.length === 0 && (

        <div className="rounded-3xl border border-white/5 bg-[#080808] p-16 text-center text-zinc-500">

          No pending creator applications.

        </div>

      )}

    </div>

    {/* Bottom */}

    <div className="rounded-3xl border border-white/5 bg-[#080808] p-8">

      <h2 className="text-2xl font-black">

        Approval Checklist

      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

        <Checklist
          title="Identity Verification"
          text="Government ID verified through Didit."
        />

        <Checklist
          title="Creator Profile"
          text="Stage name, category and creator information completed."
        />

        <Checklist
          title="Content Quality"
          text="Creator profile meets Bryson Tyler standards."
        />

        <Checklist
          title="Community Guidelines"
          text="Creator agrees to all platform rules."
        />

      </div>

    </div>

    {selectedCreator && (
      <ReviewModal
        creator={selectedCreator}
        onClose={() =>
          setSelectedCreator(null)
        }
      />
    )}

  </div>
);
}
function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-3xl bg-[#080808] border border-white/5 p-6">
      <div className="flex justify-between items-center">
        <Icon className="text-amber-500" />

        <span className="text-4xl font-black">
          {value}
        </span>
      </div>

      <p className="mt-6 text-zinc-500 uppercase tracking-[.25em] text-xs font-bold">
        {title}
      </p>
    </div>
  );
}

function Checklist({ title, text }) {
  return (
    <div className="rounded-2xl bg-black/30 p-6">
      <Globe className="text-amber-500" />

      <h3 className="font-black mt-5">
        {title}
      </h3>

      <p className="text-zinc-500 mt-3 leading-7">
        {text}
      </p>
    </div>
  );
}

function ReviewModal({
  creator,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">

<div
className="
w-full
max-w-2xl
max-h-[90vh]
overflow-y-auto
rounded-3xl
bg-[#080808]
border
border-white/10
p-6
lg:p-8
">
        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-black">
            Creator Application
          </h2>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 px-4 py-2 hover:border-red-500"
          >
            Close
          </button>

        </div>

<div className="flex flex-col md:flex-row gap-6">
          <img
            src={
              creator.profileImage ||
              "https://placehold.co/160x160"
            }
            alt=""
            className="h-32 w-32 rounded-3xl object-cover"
          />

          <div className="space-y-3">

            <div>
              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Full Name
              </p>

              <h3 className="text-xl font-black">
                {creator.name}
              </h3>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Email
              </p>

              <p>
                {creator.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
                Stage Name
              </p>

              <p>
                {creator.creatorApplication?.stageName || "-"}
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

          <InfoCard
            label="Category"
            value={
              creator.creatorApplication?.category || "-"
            }
          />

          <InfoCard
            label="KYC Status"
            value={creator.kycStatus}
          />

          <InfoCard
            label="Country"
            value={creator.country || "-"}
          />

          <InfoCard
            label="State"
            value={creator.state || "-"}
          />

          <InfoCard
            label="City"
            value={creator.city || "-"}
          />

          <InfoCard
            label="Applied"
            value={
              creator.creatorApplication?.submittedAt
                ? new Date(
                    creator.creatorApplication.submittedAt
                  ).toLocaleString()
                : "-"
            }
          />

        </div>

        <div className="mt-8">

          <p className="text-xs uppercase tracking-[.25em] text-zinc-500 mb-3">
            Bio
          </p>

          <div className="rounded-2xl bg-black/30 p-5 leading-7 text-zinc-300">
            {creator.bio || "No bio provided."}
          </div>

        </div>

        <div className="mt-8">

          <p className="text-xs uppercase tracking-[.25em] text-zinc-500 mb-3">
            Social Links
          </p>

          <div className="space-y-3">

            {(creator.creatorApplication?.socialLinks || []).length > 0 ? (
              creator.creatorApplication.socialLinks.map(
                (link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-xl bg-black/30 px-4 py-3 text-amber-400 hover:text-yellow-300 break-all"
                  >
                    {link}
                  </a>
                )
              )
            ) : (
              <p className="text-zinc-500">
                No social links submitted.
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

function InfoCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-black/30 p-5">

      <p className="text-xs uppercase tracking-[.25em] text-zinc-500">
        {label}
      </p>

      <h4 className="mt-3 font-bold break-words">
        {value}
      </h4>

    </div>
  );
}