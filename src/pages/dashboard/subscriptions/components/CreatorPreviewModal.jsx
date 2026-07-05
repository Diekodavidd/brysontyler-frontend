import {
  X,
  Crown,
  Play,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriptionPayment } from "@/hooks/usePayment";





export default function CreatorPreviewModal({
    creator,
    subscriptions,
    onClose,
}){
  if (!creator) return null;
const navigate = useNavigate();
const { mutate, isPending } =
    useCreateSubscriptionPayment();
  const previews =
    creator.contents?.slice(0, 6) || [];
const alreadySubscribed =
    subscriptions.some(
        sub =>
            sub.creatorId._id === creator._id &&
            sub.status === "active"
    );
  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-lg flex items-center justify-center p-6">

      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-yellow-500/20">

        {/* Header */}

        <div className="relative">

<div className="h-60 overflow-hidden rounded-t-3xl">
  {creator.coverImage ? (
    <img
      src={creator.coverImage}
      alt={`${creator.name} cover`}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-r from-yellow-500/20 via-black to-black" />
  )}

  {/* Dark overlay for better contrast */}
  <div className="absolute inset-0 bg-black/40" />
</div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-black/70 hover:bg-black flex items-center justify-center"
          >
            <X />
          </button>

          <div className="absolute bottom-[-45px] left-10">

            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-zinc-950 bg-zinc-800">

              {creator.profileImage ? (
                <img
                  src={creator.profileImage}
                  alt={creator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-yellow-500 text-black text-4xl font-black">
                  {creator.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
              )}

            </div>

          </div>

        </div>

        <div className="pt-20 px-10 pb-10">

          <div className="flex flex-wrap justify-between gap-8">

            <div>

              <h2 className="text-4xl font-black">

                {creator.stageName || creator.name}

              </h2>

              <p className="text-zinc-500 mt-2">

                @{creator.username}

              </p>

              <p className="mt-6 text-zinc-300 max-w-2xl">

                {creator.bio}

              </p>

            </div>

            <div className="text-right">

              <div className="flex items-center gap-2 justify-end text-yellow-400">

                <Crown size={18} />

                Premium Creator

              </div>

              <h2 className="text-5xl font-black mt-3">

                ${creator.subscriptionPrice}

              </h2>

              <p className="text-zinc-500">

                / month

              </p>

            </div>

          </div>

          {/* Preview */}

          <div className="mt-14">

            <h3 className="text-2xl font-black">

              Preview Content

            </h3>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

              {previews.length > 0 ? (
                previews.map((content) => (

                  <div
                    key={content._id}
                    className="rounded-3xl overflow-hidden bg-zinc-900 border border-white/5"
                  >

                    <div className="relative h-56">

                      <img
                        src={content.previewThumbnail}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">

                        <Play
                          size={55}
                          className="text-white"
                        />

                      </div>

                    </div>

                    <div className="p-5">

                      <h4 className="font-bold">

                        {content.title}

                      </h4>

                    </div>

                  </div>

                ))
              ) : (

                <div className="col-span-full text-center text-zinc-500 py-20">

                  No preview content available.

                </div>

              )}

            </div>

          </div>

          {/* Features */}

          <div className="grid md:grid-cols-3 gap-6 mt-14">

            <div className="rounded-2xl bg-zinc-900 p-6">

              <CheckCircle className="text-yellow-400" />

              <h4 className="font-bold mt-5">

                Premium Videos

              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900 p-6">

              <CheckCircle className="text-yellow-400" />

              <h4 className="font-bold mt-5">

                Private Livestreams

              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900 p-6">

              <CheckCircle className="text-yellow-400" />

              <h4 className="font-bold mt-5">

                Exclusive Posts

              </h4>

            </div>

          </div>

          {/* Subscribe */}

          <div className="mt-16 flex justify-end">
{alreadySubscribed ? (
    <button
        className="px-10 py-4 rounded-2xl bg-green-600 text-white font-black"
    >
        Already Subscribed
    </button>
) : (
    <button
    disabled={isPending}
  onClick={() => {
  console.log("BUTTON CLICKED");
  mutate(creator._id, {
    onSuccess: (res) => {
      console.log("SUCCESS", res);
      navigate(`/dashboard/payment/${res.payment.payment_id}`);
    },
    onError: (err) => {
      console.log("ERROR", err);
    },
  });
}}
    className="px-10 py-4 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-black font-black flex items-center gap-3"
>
    <Lock size={18} />

    {isPending
        ? "Creating Payment..."
        : `Subscribe for $${creator.subscriptionPrice}/month`}
</button>
)}
        

          </div>

        </div>

      </div>

    </div>
  );
}