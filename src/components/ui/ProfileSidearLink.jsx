import Link from "@/compat/Link";
import { usePathname } from "@/compat/navigation";
import { User, Shield, Wallet, Video } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const iconMap = {
  user: User,
  shield: Shield,
  wallet: Wallet,
  video: Video,
};

export function ProfileSidebarLink({
  href,
  label,
  iconName,
  roleRequired,
}) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const Icon = iconMap[iconName];

  if (roleRequired && user?.role !== roleRequired) return null;

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        isActive
          ? "bg-zinc-800 text-yellow-500"
          : "hover:bg-zinc-900 text-zinc-400"
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}