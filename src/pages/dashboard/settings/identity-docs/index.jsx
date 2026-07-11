import { useAuthStore } from "@/store/useAuthStore";
import {
  ShieldCheck,
  Clock3,
  AlertTriangle,
  BadgeCheck,
  Globe,
  ExternalLink,
} from "lucide-react";
import { useRestartKYC } from "@/hooks/useKYC";
import { useQueryClient } from "@tanstack/react-query";
import { getMe } from "@/services/auth.service";
import { useEffect } from "react";




export default function IdentityDocsPage() {

  const queryClient = useQueryClient();

  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const didit = user?.didit;
  const creator = user?.creatorVerification;

  const {
    mutate: restartVerification,
    isPending,
  } = useRestartKYC();

  useEffect(() => {
    async function refreshUser() {
      try {
        const freshUser = await getMe();
        setUser(freshUser);
      } catch (err) {
        console.error(err);
      }
    }

    refreshUser();
  }, [setUser]);

  const status = (didit?.status || "not_started")
  .toLowerCase()
  .replace(/\s+/g, "_");

    console.log("didit:", didit);
console.log("status:", status);

const badges = {
  approved: {
    text: "Verified",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: ShieldCheck,
  },

  active: {
    text: "Verified",
    color: "text-green-400 bg-green-500/10 border-green-500/20",
    icon: ShieldCheck,
  },

  pending: {
    text: "Pending Review",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    icon: Clock3,
  },

  rejected: {
    text: "Rejected",
    color: "text-red-400 bg-red-500/10 border-red-500/20",
    icon: AlertTriangle,
  },

  not_started: {
    text: "Not Started",
    color: "text-zinc-400 bg-zinc-800 border-zinc-700",
    icon: Globe,
  },
};

const badge = badges[status] || badges.not_started;
const diditStatus = (didit?.status || "not_started")
  .toLowerCase()
  .replace(/\s+/g, "_");

const creatorStatus = (
  user?.creatorApproval?.status || "pending"
).toLowerCase();

const isVerified =
  diditStatus === "approved" ||
  diditStatus === "active" ||
  creatorStatus === "approved";
const Icon = badge.icon;

  return (
    <div className="space-y-8">

      <div>

        <p className="text-yellow-400 uppercase tracking-[.3em] text-xs font-black">
          Verification
        </p>

        <h1 className="text-3xl sm:text-4xl">
          Identity Center
        </h1>

        <p className="text-zinc-500 mt-3">
          View your creator verification and identity status.
        </p>

      </div>

      {/* STATUS */}

      <div className="rounded-3xl border border-white/5 bg-zinc-900 p-8">

        <div className="flex flex-col sm:flex-row gap-5 sm:justify-between sm:items-center">

          <div>

            <h2 className="text-2xl font-black">
              Verification Status
            </h2>

            <p className="text-zinc-500 mt-2">
              Current DIDIT verification
            </p>

          </div>

          <div
            className={`flex items-center gap-2 rounded-full border px-5 py-2 font-bold ${badge.color}`}
          >

            <Icon size={18} />

            {badge.text}

          </div>

        </div>

      </div>

      {/* CREATOR INFO */}

      {/* <div className="grid md:grid-cols-2 gap-6">

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Stage Name
          </p>

          <h3 className="text-2xl font-black mt-3">
            {creator?.creatorApplication?.stageName || "-"}
          </h3>

        </div>

        <div className="rounded-3xl bg-zinc-900 border border-white/5 p-7">

          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Category
          </p>

          <h3 className="text-2xl font-black mt-3">
            {creator?.category || "-"}
          </h3>

        </div>

      </div>


      <div className="rounded-3xl border border-white/5 bg-zinc-900 p-8">

        <h2 className="text-xl font-black mb-6">
          Submitted Social Links
        </h2>

        <div className="space-y-4">

          {creator?.socialLinks?.length ? (

            creator.socialLinks.map((link, index) => (

              <a
                key={index}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl bg-black/40 px-5 py-4 hover:bg-black/60 transition"
              >

                <span className="truncate">
                  {link}
                </span>

                <ExternalLink size={18} />

              </a>

            ))

          ) : (

            <p className="text-zinc-500">
              No social links submitted.
            </p>

          )}

        </div>

      </div> */}

      {/* DIDIT */}

  <div className="mt-8 flex justify-end">
  {!isVerified && (
    <button
      onClick={() => {
        restartVerification(
          {
            callback: `${window.location.origin}/dashboard/settings/identity-docs`,
          },
          {
            onSuccess: ({ verificationUrl }) => {
              window.location.href = verificationUrl;
            },
            onError: console.error,
          }
        );
      }}
      className="rounded-2xl bg-yellow-500 px-6 py-3 font-black text-black"
    >
      Continue Verification
    </button>
  )}
</div>


    </div>
  );
}