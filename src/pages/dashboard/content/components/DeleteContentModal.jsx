import {
  Trash2,
  AlertTriangle,
  X,
} from "lucide-react";

import {
  useDeleteContent,
} from "@/hooks/useContent";

export default function DeleteContentModal({
  open,
  onClose,
  content,
}) {
  const deleteMutation =
    useDeleteContent();

  if (!open || !content) return null;

  const handleDelete = () => {
    deleteMutation.mutate(content._id, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur flex items-center justify-center p-6">

      <div className="w-full max-w-lg rounded-[32px] bg-zinc-900 border border-white/5 overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between p-8 border-b border-white/5">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">

              <AlertTriangle
                size={28}
                className="text-red-400"
              />

            </div>

            <div>

              <h2 className="text-3xl font-black">
                Delete Content
              </h2>

              <p className="text-zinc-500 mt-1">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-black hover:bg-zinc-800 flex items-center justify-center"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="rounded-2xl bg-black border border-white/5 p-6">

            <p className="text-zinc-400">
              You are about to permanently delete
              the following content:
            </p>

            <h3 className="text-2xl font-black mt-5">

              {content.title}

            </h3>

            {content.description && (

              <p className="mt-4 text-zinc-500 line-clamp-3">

                {content.description}

              </p>

            )}

          </div>

          <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">

            <p className="text-red-300 text-sm leading-7">

              Deleting this content will permanently remove:

            </p>

            <ul className="mt-4 space-y-2 text-zinc-400 text-sm">

              <li>• Uploaded media</li>

              <li>• Thumbnail</li>

              <li>• Purchase history reference</li>

              <li>• Analytics for this content</li>

              <li>• Fan access to this content</li>

            </ul>

          </div>

        </div>

        {/* Footer */}

        <div className="grid grid-cols-2 gap-4 p-8 border-t border-white/5">

          <button
            onClick={onClose}
            disabled={deleteMutation.isPending}
            className="h-14 rounded-2xl border border-white/10 hover:border-white/30 font-bold"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="h-14 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Trash2 size={18} />

            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Forever"}

          </button>

        </div>

      </div>

    </div>
  );
}