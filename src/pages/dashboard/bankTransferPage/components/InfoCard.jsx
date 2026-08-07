import { Copy } from "lucide-react";

export default function InfoCard({
  icon,
  title,
  value,
  copy = false,
}) {
  const copyText = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-900 p-5 flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 text-pink-500">
          {icon}
          <p className="font-bold">{title}</p>
        </div>

        <p className="mt-4 text-lg font-semibold break-all">
          {value}
        </p>
      </div>

      {copy && (
        <button
          onClick={copyText}
          className="rounded-xl bg-zinc-800 p-3 hover:bg-zinc-700 transition"
        >
          <Copy size={18} />
        </button>
      )}
    </div>
  );
}