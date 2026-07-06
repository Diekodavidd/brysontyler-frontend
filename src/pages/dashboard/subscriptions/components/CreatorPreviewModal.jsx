import {
  X,
  Crown,
  Play,
  Lock,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriptionPayment } from "@/hooks/usePayment";
import { useCreatorr } from "@/hooks/useFan";
import { useState } from "react";





export default function CreatorPreviewModal({
    creator,
    subscriptions,
    onClose,
}){
  if (!creator) return null;
const navigate = useNavigate();
const { data, isLoading } = useCreatorr(creator?._id);
const [selectedPreview, setSelectedPreview] = useState(null);
const fullCreator = data?.creator || creator;
console.log("Creator Data:", fullCreator);

const previews = fullCreator.contents?.slice(0, 6) || [];
const { mutate, isPending } =
    useCreateSubscriptionPayment();
  
const alreadySubscribed =
    subscriptions.some(
        sub =>
            sub.creatorId._id === fullCreator._id &&
            sub.status === "active"
    );

    if (isLoading) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80">
      <div className="text-white">
        Loading creator...
      </div>
    </div>
  );
}
  return (
    <div className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-lg flex items-center justify-center p-6">

      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-yellow-500/20">

        {/* Header */}

        <div className="relative">

<div className="h-60 overflow-hidden rounded-t-3xl">
  {fullCreator.coverImage ? (
    <img
      src={fullCreator.coverImage}
      alt={`${fullCreator.name} cover`}
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

              {fullCreator.profileImage ? (
                <img
                  src={fullCreator.profileImage}
                  alt={fullCreator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-yellow-500 text-black text-4xl font-black">
                  {fullCreator.name
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

                {fullCreator.stageName || fullCreator.name}

              </h2>

              <p className="text-zinc-500 mt-2">

                @{fullCreator.username}

              </p>

              <p className="mt-6 text-zinc-300 max-w-2xl">

                {fullCreator.bio}

              </p>

            </div>

            <div className="text-right">

              <div className="flex items-center gap-2 justify-end text-yellow-400">

                <Crown size={18} />

                Premium Creator

              </div>

              <h2 className="text-5xl font-black mt-3">

                ${fullCreator.subscriptionPrice}

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
          onClick={() => setSelectedPreview(content)}
          className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/40 transition-all duration-300"
        >
          <div className="relative h-56 overflow-hidden">

            <video
    src={content.previewUrl}
    poster={content.thumbnail}
    muted
    loop
    playsInline
    preload="metadata"
    onLoadedData={() => console.log("loaded")}
    onCanPlay={() => console.log("can play")}
    onPlay={() => console.log("playing")}
    onError={(e) => console.log(e.target.error)}
    onMouseEnter={(e) => e.target.play()}
    onMouseLeave={(e) => {
        e.target.pause();
        e.target.currentTime = 0;
    }}

              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">

              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">

                <Play
                  size={34}
                  className="fill-white text-white ml-1"
                />

              </div>

            </div>

          </div>

          <div className="p-5">

            <h4 className="font-bold text-lg">
              {content.title}
            </h4>

            <p className="text-zinc-500 mt-2 text-sm line-clamp-2">
              {content.description}
            </p>

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
  mutate(fullCreator._id, {
    onSuccess: (res) => {
      console.log("SUCCESS", res);
navigate(`/dashboard/payment/${res.payment.id}`);
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
        : `Subscribe for $${fullCreator.subscriptionPrice}/month`}
</button>
)}
        

          </div>

        </div>

      </div>
{selectedPreview && (
  <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">

    <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden bg-black">

      <button
        onClick={() => setSelectedPreview(null)}
        className="absolute top-5 right-5 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-black flex items-center justify-center"
      >
        <X />
      </button>

      <video
        src={ selectedPreview.fileUrl}
        controls
        autoPlay
        playsInline
        poster={selectedPreview.thumbnail}
        className="w-full max-h-[80vh] bg-black"
      />

      <div className="p-6 bg-zinc-950">

        <h2 className="text-3xl font-black">
          {selectedPreview.title}
        </h2>

        <p className="text-zinc-400 mt-4">
          {selectedPreview.description}
        </p>

      </div>

    </div>

  </div>
)}
    </div>
  );
}