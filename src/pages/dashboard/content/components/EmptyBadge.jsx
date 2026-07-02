import { CloudUpload, Plus } from "lucide-react";

export default function EmptyState({
  onUpload,
}) {
  return (
    <div className="rounded-[36px] border border-dashed border-zinc-700 bg-zinc-900/40 py-24 px-8 text-center">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/10">
        <CloudUpload
          size={44}
          className="text-yellow-400"
        />
      </div>

      <h2 className="mt-8 text-4xl font-black">
        No Content Yet
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-zinc-500 leading-7">
        Upload your first video or image, choose how fans
        can access it, set your price, and start earning
        from your content immediately.
      </p>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onUpload}
          className="flex items-center gap-3 rounded-2xl bg-yellow-500 px-8 py-4 font-black text-black transition hover:bg-yellow-400"
        >
          <Plus size={18} />
          Upload Your First Content
        </button>
      </div>

    </div>
  );
}