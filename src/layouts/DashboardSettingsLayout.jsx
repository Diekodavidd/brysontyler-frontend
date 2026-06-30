import { Outlet } from "react-router-dom";
import Link from "@/compat/Link";
import { usePathname } from "@/compat/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function SettingsLayout() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  const creatorTabs = [
    {
      name: "Profile",
      href: "/dashboard/settings/profile",
    },
    {
      name: "Notifications",
      href: "/dashboard/settings/notifications",
    },
    {
      name: "Security",
      href: "/dashboard/settings/security",
    },
    {
      name: "Subscription",
      href: "/dashboard/settings/subscription",
    },
    {
      name: "Identity Docs",
      href: "/dashboard/settings/identity-docs",
    },
  ];

  const fanTabs = [
    {
      name: "Profile",
      href: "/dashboard/settings/profile",
    },
    {
      name: "Notifications",
      href: "/dashboard/settings/notifications",
    },
    {
      name: "Security",
      href: "/dashboard/settings/security",
    },
    {
      name: "Payment Methods",
      href: "/dashboard/settings/payment-methods",
    },
    {
      name: "Preferences",
      href: "/dashboard/settings/preferences",
    },
  ];

  const tabs =
    user?.role === "creator"
      ? creatorTabs
      : fanTabs;

  return (
    <div className="flex gap-12">

      <aside className="w-64 space-y-2">

        {tabs.map((tab) => {

          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`block w-full rounded-xl px-4 py-3 font-bold transition ${
                isActive
                  ? "bg-yellow-500 text-black"
                  : "text-zinc-500 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tab.name}
            </Link>
          );
        })}

      </aside>

      <main className="flex-1 rounded-3xl border border-white/5 bg-zinc-900 p-10 min-h-[500px]">
        <Outlet />
      </main>

    </div>
  );
}