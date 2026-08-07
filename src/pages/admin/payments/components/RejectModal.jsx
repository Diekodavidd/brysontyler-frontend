import { useState } from "react";
import { XCircle } from "lucide-react";

export default function RejectModal({
  payment,
  onClose,
  onSubmit,
  loading,
}) {
  const [reason, setReason] = useState("");

  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="w-full max-w-lg rounded-3xl bg-zinc-900 p-8">

        <div className="flex items-center gap-3">

          <XCircle className="text-red-500" />

          <h2 className="text-2xl font-black">
            Reject Receipt
          </h2>

        </div>

        <p className="text-zinc-500 mt-3">
          Tell the fan why this receipt is
          being rejected.
        </p>

        <textarea
          rows={5}
          value={reason}
          onChange={(e) =>
            setReason(e.target.value)
          }
          className="mt-6 w-full rounded-2xl bg-black/30 border border-white/10 p-4 outline-none focus:border-red-500 resize-none"
          placeholder="Example: Amount transferred does not match the payment amount."
        />

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="h-12 px-6 rounded-xl bg-zinc-800"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={() =>
              onSubmit(reason)
            }
            className="h-12 px-6 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60"
          >
            {loading
              ? "Rejecting..."
              : "Reject Receipt"}
          </button>

        </div>

      </div>

    </div>
  );
}