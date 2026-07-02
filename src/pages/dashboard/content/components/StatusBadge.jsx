import {
  CheckCircle2,
  Clock3,
  FileEdit,
  Ban,
  LoaderCircle,
} from "lucide-react";

export default function StatusBadge({ status }) {
  const config = {
    draft: {
      label: "Draft",
      icon: FileEdit,
      className:
        "bg-zinc-500/10 text-zinc-300 border-zinc-500/20",
    },

    pending_review: {
      label: "Pending Review",
      icon: LoaderCircle,
      className:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },

    approved: {
      label: "Approved",
      icon: CheckCircle2,
      className:
        "bg-sky-500/10 text-sky-400 border-sky-500/20",
    },

    scheduled: {
      label: "Scheduled",
      icon: Clock3,
      className:
        "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },

    published: {
      label: "Published",
      icon: CheckCircle2,
      className:
        "bg-green-500/10 text-green-400 border-green-500/20",
    },

    rejected: {
      label: "Rejected",
      icon: Ban,
      className:
        "bg-red-500/10 text-red-400 border-red-500/20",
    },
  };

  const item =
    config[status] || config.pending_review;

  const Icon = item.icon;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wider ${item.className}`}
    >
      <Icon size={14} />
      {item.label}
    </span>
  );
}