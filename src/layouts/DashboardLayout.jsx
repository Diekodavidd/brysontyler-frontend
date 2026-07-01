import { Outlet } from "react-router-dom";
import { usePathname, useRouter } from "../compat/navigation";
import {
  BarChart3,
  Settings,
  Users,
  Video,
    Home,
  Heart,
  Wallet,
  History,
  Bell,
  CreditCard,
  MessageSquare,
  LogOut,
  Radio,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useLogout } from "@/hooks/useAuth";



export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const auth = useAuthStore();
  const { mutate: logout } = useLogout();

  console.log("Dashboard mounted");
  console.log(auth);

useEffect(() => {
  console.log("✅ DASHBOARD MOUNTED");
}, []);



const fanNavItems = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Membership",
    path: "/dashboard/membership",
    icon: Heart,
  },
  {
    name: "Live",
    path: "/dashboard/live",
    icon: Radio,
  },
  {
    name: "Subscriptions",
    path: "/dashboard/subscriptions",
    icon: Heart,
  },
  {
    name: "Wallet",
    path: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: MessageSquare,
},
  {
    name: "History",
    path: "/dashboard/history",
    icon: History,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Bell,
  },
];

const creatorNavItems = [
  {
    name: "Overview",
    path: "/dashboard",
    icon: BarChart3,
  },
  {
    name: "Content",
    path: "/dashboard/content",
    icon: Video,
  },
  {
    name: "Go Live",
    path: "/dashboard/live",
    icon: Radio,
  },
  {
    name: "Subscribers",
    path: "/dashboard/subscribers",
    icon: Users,
  },
  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Wallet",
    path: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    name: "Analytics",
    path: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Collaborations",
    path: "/dashboard/collaborations",
    icon: Heart,
  },
  {
    name: "Payouts",
    path: "/dashboard/payouts",
    icon: CreditCard,
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];


const navItems =
  auth.user?.role === "creator"
    ? creatorNavItems
    : fanNavItems;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="w-64 border-r border-white/10 p-8 flex flex-col justify-between">
        <div>
         <div className="text-xl font-black mb-8 tracking-widest text-yellow-500">
  {auth.user?.role === "creator"
    ? "CREATOR STUDIO"
    : "FAN DASHBOARD"}
</div>

          {/* Back to Home */}
          {/* <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white mb-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-all"
          >
            <ArrowLeft size={14} />
            Back to Site
          </button> */}

          <nav className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    active
                      ? "bg-yellow-500 text-black font-bold"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

       <button
  onClick={() => logout()}
  className="flex items-center gap-2 text-zinc-500 hover:text-red-500 text-sm font-bold transition-colors"
>
  <LogOut size={16} />
  SIGN OUT
</button>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}