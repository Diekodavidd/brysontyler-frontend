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
  Images,
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
    name: "Gallery",
    path: "/dashboard/gallery",
    icon: Images,
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
    name: "Membership",
    path: "/dashboard/membership",
    icon: CreditCard,
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
    name: "History",
    path: "/dashboard/history",
    icon: History,
  },

  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const fanSections = [
  {
    title: "DISCOVER",
    items: fanNavItems.slice(0, 3),
  },
  {
    title: "COMMUNITY",
    items: fanNavItems.slice(3, 6),
  },
  {
    title: "ACCOUNT",
    items: fanNavItems.slice(6),
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
<div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
<aside
className="
w-20
lg:w-64
border-r
border-white/10
px-2
lg:px-8
py-6
flex
flex-col
justify-between
transition-all
duration-300
">        <div>
<div className="hidden lg:block text-xl font-black mb-8 tracking-widest text-yellow-500">
    {auth.user?.role === "creator"
    ? "CREATOR STUDIO"
    : "FAN DASHBOARD"}
</div>

         

          <nav className="space-y-8">
           {auth.user?.role === "creator"
  ? navItems.map((item) => {
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
    transition
    ${
      active
        ? "bg-yellow-500 text-black font-bold"
        : "text-zinc-500 hover:text-white"
    }
  `}
>
  <Icon size={18} />

  <span className="hidden lg:block">
    {item.name}
  </span>
</button>
      );
    })
  : fanSections.map((section) => (
      <div key={section.title}>

<p className="hidden lg:block text-[10px] uppercase tracking-[0.35em] text-zinc-600 font-black mb-3">          {section.title}
        </p>

        <div className="space-y-2">

          {section.items.map((item) => {
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
transition
 ${
                  active
                    ? "bg-yellow-500 text-black font-bold"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                <Icon size={18} />
<span className="hidden lg:block">
    {item.name}
</span>              </button>
            );
          })}

        </div>

      </div>
    ))}
          </nav>
        </div>

       <button
  onClick={() => logout()}
className="
flex
items-center
justify-center
lg:justify-start
gap-2
text-zinc-500
hover:text-red-500
text-sm
font-bold
transition-colors
">
  <LogOut size={18}/>

<span className="hidden lg:block">
SIGN OUT
</span>
</button>
      </aside>

<main
className="
flex-1
overflow-y-auto
p-4
sm:p-6
lg:p-12
">        <Outlet />
      </main>
    </div>
  );
}