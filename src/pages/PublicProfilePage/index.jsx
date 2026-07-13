import { useParams, useNavigate } from "react-router-dom";
import {
  Lock,
  Play,
  User,
  Crown,
  ArrowRight,
} from "lucide-react";

import { usePublicProfile } from "@/hooks/usePublic";

export default function PublicProfilePage() {
const { username } = useParams(); 
 const navigate = useNavigate();

   const {
        data,
        isLoading,
        error,
    } = usePublicProfile(username);

    console.log(data);
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!data?.profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Profile not found.
      </div>
    );
  }

  const profile = data.profile;
  const videos = data.videos || [];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Cover */}

      <div className="relative h-72">

        <img
          src={
            profile.coverImage ||
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          }
          className="w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-black/60" />

      </div>

      {/* Profile */}

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">

        <div className="flex flex-col lg:flex-row gap-8">

          <img
            src={
              profile.profileImage ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(profile.name)
            }
            className="w-40 h-40 rounded-full border-4 border-yellow-500 object-cover"
            alt={profile.name}
          />

          <div className="flex-1">

            <div className="flex items-center gap-3">

              <h1 className="text-4xl font-black">
                {profile.name}
              </h1>

              {profile.role === "creator" && (
                <Crown className="text-yellow-400" />
              )}

            </div>

            <p className="text-zinc-400 mt-5 max-w-3xl leading-8">
              {profile.bio || "No bio yet."}
            </p>

            {profile.role === "creator" && (
              <div className="mt-6 flex gap-6 text-sm text-zinc-400">

                <span>
                  💰 ${profile.subscriptionPrice}/month
                </span>

                <span>
                  🎬 {videos.length} Videos
                </span>

              </div>
            )}

          </div>

        </div>

        {/* Preview */}

        <div className="mt-16 flex items-center justify-between">

          <h2 className="text-3xl font-black">
            Preview Content
          </h2>

          <span className="text-yellow-400">
            {videos.length} Available
          </span>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 mt-10">

          {videos.map((video) => (
            <div
              key={video._id}
              className="rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 hover:border-yellow-500/40 transition"
            >
              <div className="relative">

                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="h-60 w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">

                  <Play
                    size={55}
                    className="text-white"
                  />

                </div>

              </div>

              <div className="p-5">

                <h3 className="font-bold line-clamp-1">
                  {video.title}
                </h3>

                <p className="text-zinc-500 text-sm mt-2 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-yellow-400 capitalize">
                    {video.membership}
                  </span>

                  <span className="text-zinc-500">
                    {video.views} views
                  </span>

                </div>

              </div>

            </div>
          ))}

        </div>

        {/* CTA */}

        <div className="mt-20 mb-24 rounded-[40px] bg-gradient-to-r from-yellow-500 to-yellow-300 p-[1px]">

          <div className="rounded-[40px] bg-black px-10 py-16 text-center">

            <Lock
              size={55}
              className="mx-auto text-yellow-400"
            />

            <h2 className="mt-8 text-4xl font-black">
              Unlock Full Access
            </h2>

            <p className="mt-5 text-zinc-400 max-w-2xl mx-auto leading-8">
              Register to subscribe, watch premium videos,
              join livestreams, message creators and unlock
              exclusive content.
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-yellow-500 text-black font-black hover:bg-yellow-400 transition"
            >
              Register to Subscribe

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}