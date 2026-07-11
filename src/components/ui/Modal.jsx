import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div
        onClick={onClose}
        className="absolute inset-0"
      />

      <div className="relative w-full max-w-lg rounded-3xl border border-yellow-500/20 bg-[#111] p-8">

        <button
          onClick={onClose}
          className="absolute right-5 top-5"
        >
          <X size={22} />
        </button>

        {children}

      </div>

    </div>
  );
}