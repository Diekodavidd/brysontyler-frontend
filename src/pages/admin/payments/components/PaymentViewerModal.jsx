import { X } from "lucide-react";

export default function PaymentViewerModal({
  payment,
  onClose,
}) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">

      <div className="relative max-w-5xl w-full rounded-3xl bg-zinc-900 overflow-hidden">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 p-2 rounded-full bg-black/50 hover:bg-black"
        >
          <X />
        </button>

        <img
          src={payment.bankTransfer?.receiptUrl}
          alt=""
          className="w-full max-h-[85vh] object-contain bg-black"
        />

      </div>

    </div>
  );
}