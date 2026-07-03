import {
  Crown,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import {
  useCreateMembership,
} from "@/hooks/useMembership";
import { useAuthStore } from "@/store/useAuthStore";

export default function FanMembershipPage() {
 const user = useAuthStore((state) => state.user);
const {
  mutate: buyMembership,
  isPending,
} = useCreateMembership();
const membership =
  user?.membership || {};

const currentPlan =
  membership.plan || "FREE";

const status =
  membership.status || "active";

const expiry =
  membership.endDate;

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex justify-between items-end">

        <div>

          <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
            Membership
          </p>

          <h1 className="text-3xl font-black mt-3">
            My Membership
          </h1>

          <p className="text-zinc-500 mt-3">
            Unlock premium creators and exclusive experiences.
          </p>

        </div>

      </div>

      {/* CURRENT PLAN */}

      <section className="rounded-[34px] border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-black p-6">

    <div className="flex justify-between items-center">

        <div>

            <p className="uppercase tracking-[.3em] text-xs text-yellow-400 font-black">
                Current Membership
            </p>

            <h2 className="text-5xl font-black mt-4">
                {currentPlan}
            </h2>

            <div className="mt-5 flex items-center gap-3">

                <span
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase ${
                        status === "active"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                    }`}
                >
                    {status}
                </span>

            </div>

            {expiry && (

                <p className="mt-5 text-zinc-500">

                    Renews on{" "}

                    {new Date(expiry).toLocaleDateString()}

                </p>

            )}

        </div>

        <div className="h-24 w-24 rounded-3xl bg-yellow-500/10 flex items-center justify-center">

            <Crown
                size={48}
                className="text-yellow-400"
            />

        </div>

    </div>

      </section>

      {/* PLANS */}

<div className="grid xl:grid-cols-3 gap-6">
        {/* FREE */}

        <div className="rounded-[28px] border border-white/5 bg-zinc-900 p-8">

          <h2 className="text-3xl font-black">

            FREE

          </h2>

          <h3 className="text-3xl font-black mt-6">

            $0

          </h3>

          <p className="text-zinc-500 mt-2">

            Forever

          </p>
<div className="space-y-3 mt-6">

  <Feature text="Preview Bryson Tyler vlog videos" />

  <Feature text="Browse selected creator profiles" />

  <Feature text="Access public livestreams" />

</div>

          <button
            disabled
            className="mt-6 w-full rounded-2xl bg-zinc-800 py-3 font-black"
          >

            {currentPlan === "FREE"
    ? "Current Plan"
    : "Downgrade"}

          </button>

        </div>

        {/* VIP */}

        <div className="rounded-[32px] border border-yellow-500 bg-gradient-to-b from-yellow-500/10 to-black p-8">

          <div className="flex justify-between">

            <h2 className="text-3xl font-black">

              {currentPlan === "VIP"
    ? "Current Plan"
    : currentPlan === "Elite"
    ? "Downgrade to VIP"
    : "Upgrade to VIP"}

            </h2>

            <Sparkles
              className="text-yellow-400"
            />

          </div>

          <h3 className="text-5xl font-black mt-6">

            $14.99

          </h3>

          <p className="text-zinc-500 mt-2">

            per month

          </p>

        <div className="space-y-5 mt-10">

  <Feature text="Access the premium Bryson Tyler vlog library" />

  <Feature text="View every creator profile" />

  <Feature text="Message any creator" />

  <Feature text="Verified Fan badge" />

  <Feature text="Join all livestreams" />

</div>

          <button
            disabled={
              isPending ||
              currentPlan === "VIP"
            }
            onClick={() => {
  console.log("VIP CLICKED");

  buyMembership("VIP", {
    onSuccess: (data) => {
      console.log("SUCCESS", data);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
}
            }
            className="mt-10 w-full rounded-2xl bg-yellow-500 py-4 text-black font-black hover:bg-yellow-400"
          >

            {currentPlan === "VIP"
              ? "Current Plan"
              : "Upgrade"}

          </button>

        </div>

        {/* ELITE */}

        <div className="rounded-[32px] border border-white/5 bg-zinc-900 p-8">

          <h2 className="text-3xl font-black">

            {currentPlan === "Elite"
    ? "Current Plan"
    : "Upgrade to Elite"}

          </h2>

          <h3 className="text-5xl font-black mt-6">

            $29.99

          </h3>

          <p className="text-zinc-500 mt-2">

            per month

          </p>

          <div className="space-y-5 mt-10">

  <Feature text="Everything included in VIP" />

  <Feature text="Unlimited access to every Bryson Tyler vlog" />

  <Feature text="Video call participating creators" />

  <Feature text="Access every creator profile" />

  <Feature text="Elite Member badge" />

</div>

          <button
            disabled={
              isPending ||
              currentPlan === "Elite"
            }
            onClick={() =>
              buyMembership("Elite", {
                onSuccess: ({
                  payment,
                }) =>
                  window.location.href =
                    payment.invoice_url,
              })
            }
            className="mt-10 w-full rounded-2xl bg-white text-black py-4 font-black hover:bg-zinc-200"
          >

            {currentPlan === "Elite"
              ? "Current Plan"
              : "Upgrade"}

          </button>

        </div>

      </div>

      {/* BENEFITS */}

      {/* BENEFITS */}

<section className="rounded-[34px] bg-zinc-900 border border-white/5 p-6">

  <h2 className="text-2xl font-black">
    Your Membership Benefits
  </h2>

  <p className="text-zinc-500 mt-2">
    Everything currently available with your {currentPlan} membership.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

    {currentPlan === "FREE" && (
      <>
        <Benefit
          title="Gallery Previews"
          desc="Watch short previews of Bryson Tyler vlog videos before upgrading."
        />

        <Benefit
          title="Creator Discovery"
          desc="Browse selected creator profiles and discover new talent."
        />

        <Benefit
          title="Live Streams"
          desc="Join public livestreams and interact with the community."
        />
      </>
    )}

    {currentPlan === "VIP" && (
      <>
        <Benefit
          title="Bryson Tyler Gallery"
          desc="Unlock a large collection of premium Bryson Tyler vlog videos."
        />

        <Benefit
          title="All Creator Profiles"
          desc="View every creator profile available on the platform."
        />

        <Benefit
          title="Creator Messaging"
          desc="Message any creator directly inside the platform."
        />

        <Benefit
          title="Verified Fan"
          desc="Receive a Verified Fan badge on your account."
        />

        <Benefit
          title="Livestream Access"
          desc="Watch creator livestreams and exclusive broadcasts."
        />
      </>
    )}

    {currentPlan === "ELITE" && (
      <>
        <Benefit
          title="Complete Video Library"
          desc="Unlimited access to every Bryson Tyler vlog and future releases."
        />

        <Benefit
          title="Video Calls"
          desc="Start one-on-one video sessions with participating creators."
        />

        <Benefit
          title="All Creator Profiles"
          desc="Browse every creator profile without restrictions."
        />

        <Benefit
          title="Livestream Access"
          desc="Access every livestream, including premium broadcasts."
        />

        <Benefit
          title="Elite Priority"
          desc="Highest priority support and exclusive member-only experiences."
        />

        <Benefit
          title="Verified Elite"
          desc="Display the Elite member badge across the platform."
        />
      </>
    )}

  </div>

</section>

    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">

      <CheckCircle2
        size={18}
        className="text-green-400"
      />

      <span>{text}</span>

    </div>
  );
}

function Benefit({
  title,
  desc,
}) {
  return (
    <div className="rounded-3xl bg-black/30 p-6">

      <ShieldCheck
        className="text-yellow-400"
      />

      <h3 className="font-black mt-5">

        {title}

      </h3>

      <p className="text-zinc-500 mt-3">

        {desc}

      </p>

    </div>
  );
}