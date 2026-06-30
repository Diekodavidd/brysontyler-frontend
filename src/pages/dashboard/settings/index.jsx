import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "@/compat/navigation";

export default function SettingsHome() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  console.log("SETTINGS USER:", user);

  const fanItems = [
    {
      title: "Profile",
      path: "/dashboard/settings/profile",
    },
    {
      title: "Notifications",
      path: "/dashboard/settings/notifications",
    },
    {
      title: "Security",
      path: "/dashboard/settings/security",
    },
    {
      title: "Payment Methods",
      path: "/dashboard/settings/payment-methods",
    },
    {
      title: "Preferences",
      path: "/dashboard/settings/preferences",
    },
  ];

  const creatorItems = [
    {
      title: "Profile",
      path: "/dashboard/settings/profile",
    },
    {
      title: "Notifications",
      path: "/dashboard/settings/notifications",
    },
    {
      title: "Security",
      path: "/dashboard/settings/security",
    },
    {
      title: "Subscription Plans",
      path: "/dashboard/settings/subscription",
    },
    {
      title: "Identity Verification",
      path: "/dashboard/settings/identity-docs",
    },
  ];

  const items =
    user?.role === "creator"
      ? creatorItems
      : fanItems;

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-black">Settings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => router.push(item.path)}
            className="rounded-3xl border border-white/10 bg-zinc-900 p-8 text-left hover:border-yellow-500 transition"
          >
            <h2 className="text-xl font-bold">
              {item.title}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}