import {
  Crown,
  Lock,
  Globe,
  Users,
} from "lucide-react";

export default function VisibilityBadge({ visibility }) {
  const config = {
    free: {
      label: "Free",
      icon: Globe,
      className:
        "bg-green-500/10 text-green-400 border-green-500/20",
    },

    subscribers: {
      label: "Subscribers Only",
      icon: Users,
      className:
        "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },

    ppv: {
      label: "Pay Per View",
      icon: Crown,
      className:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    },

    members_ppv: {
      label: "Members + PPV",
      icon: Lock,
      className:
        "bg-purple-500/10 text-purple-400 border-purple-500/20",
    },
  };

  const item =
    config[visibility] || config.free;

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