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
import { useAuthStore } from "../store/useAuthStore";

export default function AdminDashboardLayout() {
   const router = useRouter();
  const pathname = usePathname();

  const logout = useAuthStore((state) => state.logout);

 const navItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
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
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
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
<div className="min-h-screen bg-[#030303] text-white flex overflow-hidden">
        {/* Sidebar */}
<aside
className="
w-20
lg:w-72
border-r
border-white/5
px-2
lg:px-8
py-6
flex
flex-col
justify-between
transition-all
duration-300
bg-[#050505]
">        <div>
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-12">

<div className="bg-gradient-to-tr from-amber-600 to-amber-900 p-2.5 rounded-xl">
<Lock size={20}/>
</div>

<div className="hidden lg:block text-sm font-black tracking-[0.2em] text-amber-500">
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
className={`
w-full
flex
items-center
justify-center
lg:justify-start
gap-3
px-2
lg:px-4
py-3
rounded-xl
transition-all
font-medium
text-sm
${
active
? "bg-amber-600/10 text-amber-500 border border-amber-500/20"
: "text-zinc-600 hover:text-white hover:bg-white/5"
}
`}               
                >
                  <Icon size={18}/>

<span className="hidden lg:block">
{item.name}
</span>
                </button>
              );
            })}
          </nav>
        </div>

        <button
  onClick={() => {
    logout();
    router.replace("/login");
  }}
  className="flex items-center gap-2 text-zinc-700 hover:text-amber-500 text-xs font-bold tracking-widest transition-colors uppercase"
>
  <LogOut size={16} />
  Exit Panel
</button>
      </aside>

      {/* Main Content */}
<main
className="
flex-1
overflow-y-auto
p-4
sm:p-6
lg:p-12
">        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}