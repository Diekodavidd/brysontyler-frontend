import {
  VideoOff,
  Upload,
} from "lucide-react";

export default function EmptyGallery({
  onUpload,
}) {
  return (
    <div className="rounded-[36px] border border-dashed border-white/10 bg-[#090909] py-24 px-8">

      <div className="mx-auto max-w-xl text-center">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/10">

          <VideoOff
            size={48}
            className="text-amber-500"
          />

        </div>

        <h2 className="mt-8 text-4xl font-black">

          No Videos Yet

        </h2>

        <p className="mt-5 text-zinc-400 leading-8">

          Your Bryson Tyler Gallery is currently empty.
          Upload your first vlog, music video, campaign,
          or exclusive content to begin building your
          premium video library.

        </p>

        <button
          onClick={onUpload}
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-amber-500 px-8 py-4 font-black text-black transition hover:bg-amber-400"
        >

          <Upload size={18} />

          Upload First Video

        </button>

      </div>

    </div>
  );
}