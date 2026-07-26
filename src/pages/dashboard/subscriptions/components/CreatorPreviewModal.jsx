import {
  X,
  Crown,
  Play,
  Lock,
  Loader2,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useCreateSubscription } from "@/hooks/usePayment";
import { useCreatorr } from "@/hooks/useFan";
import { useState } from "react";

import "./gasc.css";

export default function CreatorPreviewModal({
  creator,
  subscriptions,
  onClose,
}) {
  if (!creator) return null;

  const navigate = useNavigate();

  const {
    data,
    isLoading,
  } = useCreatorr(creator?._id);

  const [selectedPreview, setSelectedPreview] =
    useState(null);

  const [showPaymentModal, setShowPaymentModal] =
    useState(false);

  const [selectedProvider, setSelectedProvider] =
    useState("nowpayments");

  const [isCreatingPayment, setIsCreatingPayment] =
    useState(false);

  const fullCreator =
    data?.creator || creator;

  console.log(
    "Creator Data:",
    fullCreator
  );

  /*
  ==========================================
  CREATOR CONTENT
  ==========================================
  */

  const previews =
    fullCreator.contents || [];

  /*
  ==========================================
  SUBSCRIPTION
  ==========================================
  */

  const {
    mutateAsync,
    isPending,
  } = useCreateSubscription();

  /*
  ==========================================
  PAYMENT
  ==========================================
  */

  const handleContinuePayment =
    async () => {
      try {
        setIsCreatingPayment(true);

        const res =
          await mutateAsync({
            creatorId: creator._id,
            provider:
              selectedProvider,
          });

        setShowPaymentModal(false);

        if (
          selectedProvider ===
          "paxum"
        ) {
          navigate(
            `/dashboard/payment/card/${res.payment._id}`
          );
        } else {
          navigate(
            `/dashboard/payment/${res.payment._id}`
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsCreatingPayment(false);
      }
    };

  /*
  ==========================================
  ALREADY SUBSCRIBED
  ==========================================
  */

  const alreadySubscribed =
    subscriptions?.some(
      (sub) =>
        sub.creatorId?._id ===
          fullCreator._id &&
        sub.status === "active"
    );

  /*
  ==========================================
  LOADING
  ==========================================
  */

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

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="relative">

          <div className="h-60 overflow-hidden rounded-t-3xl">

            {fullCreator.coverImage ? (
              <img
                src={
                  fullCreator.coverImage
                }
                alt={`${fullCreator.name} cover`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-yellow-500/20 via-black to-black" />
            )}

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
                  src={
                    fullCreator.profileImage
                  }
                  alt={fullCreator.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-yellow-500 text-black text-4xl font-black">
                  {fullCreator.name
                    ?.split(" ")
                    .map(
                      (n) => n[0]
                    )
                    .join("")
                    .slice(0, 2)}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* =====================================
            CREATOR DETAILS
        ===================================== */}

        <div className="pt-20 px-10 pb-10">

          <div className="flex flex-wrap justify-between gap-8">

            <div>

              <h2 className="text-4xl font-black">
                {
                  fullCreator.stageName ||
                  fullCreator.name
                }
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

          {/* =====================================
              PREVIEW CONTENT
          ===================================== */}

          <div className="mt-14">

            <div className="flex items-center justify-between gap-4">

              <div>
                <h3 className="text-2xl font-black">
                  Preview Content
                </h3>

                <p className="text-zinc-500 mt-2">
                  Explore videos and images from this creator.
                </p>
              </div>

              <div className="text-sm text-zinc-500">
                {previews.length}{" "}
                {previews.length === 1
                  ? "item"
                  : "items"}
              </div>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">

              {previews.length > 0 ? (

                previews.map(
                  (content) => {

                    const isImage =
                      content.mediaType ===
                      "image";

                    const mediaSrc =
                      isImage
                        ? content.fileUrl ||
                          content.thumbnail ||
                          content.images?.[0]
                            ?.url
                        : content.previewUrl ||
                          content.fileUrl;

                    return (
                      <div
                        key={
                          content._id
                        }
                        onClick={() =>
                          setSelectedPreview(
                            content
                          )
                        }
                        className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/40 transition-all duration-300"
                      >

                        {/* MEDIA */}

                        <div className="relative h-56 overflow-hidden bg-black">

                          {isImage ? (

                            <img
                              src={
                                mediaSrc
                              }
                              alt={
                                content.title
                              }
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />

                          ) : (

                            <video
                              src={
                                mediaSrc
                              }
                              poster={
                                content.thumbnail
                              }
                              muted
                              loop
                              playsInline
                              preload="metadata"
                              onMouseEnter={(
                                e
                              ) =>
                                e.currentTarget
                                  .play()
                                  .catch(
                                    () => {}
                                  )
                              }
                              onMouseLeave={(
                                e
                              ) => {
                                e.currentTarget.pause();
                                e.currentTarget.currentTime = 0;
                              }}
                              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />

                          )}

                          {/* DARK OVERLAY */}

                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">

                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">

                              {isImage ? (

                                <ImageIcon
                                  size={30}
                                  className="text-white"
                                />

                              ) : (

                                <Play
                                  size={34}
                                  className="fill-white text-white ml-1"
                                />

                              )}

                            </div>

                          </div>

                          {/* MEDIA TYPE BADGE */}

                          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur text-xs font-black uppercase tracking-wider">

                            {isImage
                              ? "Image"
                              : "Video"}

                          </div>

                        </div>

                        {/* CONTENT INFO */}

                        <div className="p-5">

                          <h4 className="font-bold text-lg line-clamp-1">
                            {
                              content.title
                            }
                          </h4>

                          <p className="text-zinc-500 mt-2 text-sm line-clamp-2">
                            {
                              content.description
                            }
                          </p>

                        </div>

                      </div>
                    );
                  }
                )

              ) : (

                <div className="col-span-full text-center text-zinc-500 py-20">

                  No preview content available.

                </div>

              )}

            </div>

          </div>

          {/* =====================================
              FEATURES
          ===================================== */}

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
                Premium Images
              </h4>

            </div>

            <div className="rounded-2xl bg-zinc-900 p-6">

              <CheckCircle className="text-yellow-400" />

              <h4 className="font-bold mt-5">
                Exclusive Posts
              </h4>

            </div>

          </div>

          {/* =====================================
              SUBSCRIBE
          ===================================== */}

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
                onClick={() =>
                  setShowPaymentModal(true)
                }
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

      {/* ==========================================
          CONTENT VIEWER
      ========================================== */}

      {selectedPreview && (

        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6">

          <div className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden bg-black">

            <button
              onClick={() =>
                setSelectedPreview(null)
              }
              className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-black/60 hover:bg-black flex items-center justify-center"
            >
              <X />
            </button>

            {/* IMAGE */}

            {selectedPreview.mediaType ===
            "image" ? (

              <div className="relative bg-black">

                <img
                  src={
                    selectedPreview.fileUrl ||
                    selectedPreview.thumbnail ||
                    selectedPreview.images?.[0]
                      ?.url
                  }
                  alt={
                    selectedPreview.title
                  }
                  className="w-full max-h-[80vh] object-contain"
                />

                {/* Watermark */}

                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                  <div className="moving-watermark">

                    <img
                      src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1783268228/favicon2_tzcc8h.jpg"
                      alt="logo"
                      className="watermark-logo"
                    />

                    <span className="watermark-text">
                      BRYSON TYLER
                    </span>

                  </div>

                </div>

              </div>

            ) : (

              /* VIDEO */

              <div className="relative">

                <video
                  src={
                    selectedPreview.fileUrl ||
                    selectedPreview.previewUrl
                  }
                  controls
                  autoPlay
                  playsInline
                  poster={
                    selectedPreview.thumbnail
                  }
                  className="w-full max-h-[80vh] bg-black"
                />

                {/* Watermark */}

                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                  <div className="moving-watermark">

                    <img
                      src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1783268228/favicon2_tzcc8h.jpg"
                      alt="logo"
                      className="watermark-logo"
                    />

                    <span className="watermark-text">
                      BRYSON TYLER
                    </span>

                  </div>

                </div>

              </div>

            )}

            {/* CONTENT INFO */}

            <div className="p-6 bg-zinc-950">

              <div className="flex items-center gap-3">

                {selectedPreview.mediaType ===
                "image" ? (
                  <ImageIcon
                    size={20}
                    className="text-yellow-400"
                  />
                ) : (
                  <Play
                    size={20}
                    className="text-yellow-400"
                  />
                )}

                <span className="text-xs uppercase tracking-widest text-yellow-400 font-black">
                  {selectedPreview.mediaType ===
                  "image"
                    ? "Image"
                    : "Video"}
                </span>

              </div>

              <h2 className="text-3xl font-black mt-3">
                {
                  selectedPreview.title
                }
              </h2>

              <p className="text-zinc-400 mt-4">
                {
                  selectedPreview.description
                }
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ==========================================
          PAYMENT MODAL
      ========================================== */}

      {showPaymentModal && (

        <div className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-5">

          <div className="bg-zinc-900 rounded-3xl w-full max-w-lg p-8 border border-white/10">

            <h2 className="text-3xl font-black">
              Choose Payment Method
            </h2>

            <p className="text-zinc-400 mt-2">
              Select how you'd like to pay.
            </p>

            <div className="space-y-4 mt-8">

              {/* CRYPTO */}

              <button
                disabled={
                  isCreatingPayment
                }
                onClick={() =>
                  setSelectedProvider(
                    "nowpayments"
                  )
                }
                className={`w-full rounded-2xl p-5 border transition ${
                  selectedProvider ===
                  "nowpayments"
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >

                <div className="text-left">

                  <h3 className="font-bold">
                    Crypto
                  </h3>

                  <p className="text-sm text-zinc-400">
                    BTC • ETH • USDT
                  </p>

                </div>

              </button>

              {/* CARD */}

              <button
                disabled={
                  isCreatingPayment
                }
                onClick={() =>
                  setSelectedProvider(
                    "paxum"
                  )
                }
                className={`w-full rounded-2xl p-5 border transition ${
                  selectedProvider ===
                  "paxum"
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-white/10 hover:border-white/20"
                }`}
              >

                <div className="text-left">

                  <h3 className="font-bold">
                    Credit / Debit Card
                  </h3>

                  <p className="text-sm text-zinc-400">
                    Secure card payment via Paxum
                  </p>

                </div>

              </button>

            </div>

            <div className="flex gap-4 mt-8">

              <button
                disabled={
                  isCreatingPayment
                }
                onClick={() =>
                  setShowPaymentModal(
                    false
                  )
                }
                className="flex-1 h-12 rounded-xl border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                onClick={
                  handleContinuePayment
                }
                disabled={
                  isCreatingPayment
                }
                className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 transition ${
                  isCreatingPayment
                    ? "bg-pink-500/60 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
              >

                {isCreatingPayment ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Creating Payment...
                  </>
                ) : (
                  "Continue"
                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}