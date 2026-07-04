import { Outlet } from "react-router-dom";
import { usePathname, useRouter } from "../compat/navigation";
import {
  ShieldCheck,
  Wallet,
  UserCheck,
  Settings,
  LayoutDashboard,
  LogOut,
  Lock,
  Bell,
  Crown,
  Film,
  Users,
  ShieldAlert,
} from "lucide-react";

export default function AdminDashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();

 const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Creator Applications",
    path: "/admin/pending-creators",
    icon: UserCheck,
  },
  {
    name: "Creators",
    path: "/admin/creators",
    icon: Users,
  },
  {
    name: "Fans",
    path: "/admin/fans",
    icon: Users,
  },
  {
    name: "Brand Gallery",
    path: "/admin/gallery",
    icon: Film,
  },
  {
    name: "Memberships",
    path: "/admin/memberships",
    icon: Crown,
  },
  {
    name: "Payout Requests",
    path: "/admin/payouts",
    icon: Wallet,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: ShieldAlert,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 p-8 flex flex-col justify-between bg-[#050505]">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-gradient-to-tr from-amber-600 to-amber-900 p-2.5 rounded-xl shadow-[0_0_15px_rgba(217,119,6,0.3)]">
              <Lock size={20} className="text-white" />
            </div>

            <div className="text-sm font-black tracking-[0.2em] text-amber-500">
              ADMINISTRATOR
            </div>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.path;

              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                    active
                      ? "bg-amber-600/10 text-amber-500 border border-amber-500/20"
                      : "text-zinc-600 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <button className="flex items-center gap-2 text-zinc-700 hover:text-amber-500 text-xs font-bold tracking-widest transition-colors uppercase">
          <LogOut size={16} />
          Exit Panel
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}