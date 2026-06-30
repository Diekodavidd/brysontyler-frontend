import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, X } from "lucide-react";

import AuthModal from "./modals/AuthModal";
import { useAuthStore } from "../store/useAuthStore";
import { useGetAuthUser, useLogout } from "../hooks/useAuth";
import Image from "@/compat/Image";
import { getInitials } from "../utils/getInitials";
import { AnimatedPulseLoader } from "./ui/AnimatedPulseLoader";

export default function Navbar() {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate: logout } = useLogout();
  const {
    data: refreshedUser,
    isLoading,
    isFetching,
  } = useGetAuthUser(isAuthenticated);

  const isInitializing =
    isLoading ||
    isFetching ||
    (!user && isAuthenticated);

  useEffect(() => {
    if (refreshedUser) {
      setUser(refreshedUser);
    }
  }, [refreshedUser, setUser]);

  const handleAction = (action) => {
    setIsMenuOpen(false);
    action();
  };

  const renderActions = (isMobile) => {
    if (user) {
      return (
        <>
          <div
            onClick={() => handleAction(() => navigate("/profile"))}
            className="flex
w-full
max-w-xs
cursor-pointer
items-center
justify-center
gap-3 bg-zinc-900
border border-zinc-800
hover:border-yellow-400/40

transition-all px-4 py-2 rounded-full border border-white/10"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-yellow-500 flex items-center justify-center text-black font-bold text-xs">
              {user.profilePic ? (
                <Image
                  src={user.profilePic}
                  alt={user.name}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              ) : (
                getInitials(user.name)
              )}
            </div>

            <span className="text-sm font-medium">
              {user.name.split(" ")[0]}
            </span>
          </div>

          {(user.role === "creator" || user.role === "admin") && (
            <button
              onClick={() =>
                handleAction(() => navigate("/live/1?role=fan"))
              }
className="
h-10
px-4
rounded-xl
bg-red-600/90
hover:bg-red-500
text-white
font-semibold
transition-all
"            >
              Go Live
            </button>
          )}

          <button
            onClick={() => handleAction(() => logout())}
            className="flex items-center gap-2 text-zinc-500 hover:text-red-400"
          >
            <LogOut size={18} />
            {isMobile && "Logout"}
          </button>
        </>
      );
    }

    return (
      <>
        <button
          onClick={() => {
            setIsMenuOpen(false);
            setModalType("login");
          }}
className="
h-11
px-5
rounded-xl
text-zinc-300
hover:bg-zinc-900
hover:text-white
transition-all
"        >
          Login
        </button>

        <button
          onClick={() => {
            setIsMenuOpen(false);
            setModalType("signup");
          }}
className="
h-11
px-5
w-full
max-w-xs
rounded-xl
bg-yellow-400
hover:bg-yellow-300
text-black
font-semibold
transition-all
"        >
          Sign Up
        </button>
      </>
    );
  };

  return (
    <>
      {modalType && (
        <AuthModal
          type={modalType}
          onClose={() => setModalType(null)}
        />
      )}

      <nav className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-lg border-b border-yellow-500">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">          <div
className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/home")}
          >
<div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">    
<span className="text-yellow-400 text-sm font-black">BT</span>
</div>

            <div>
<h1 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight leading-none whitespace-nowrap">                Bryson Tyler
              </h1>

<p className="text-[9px] sm:text-[10px] text-yellow-400 font-semibold tracking-[0.22em]">                PRODUCTIONS
              </p>
            </div>
          </div>

<div className="hidden lg:flex items-center gap-3 lg:gap-4">
              {isInitializing ? (
              <AnimatedPulseLoader className="w-32 h-10 rounded-full" />
            ) : (
              renderActions(false)
            )}
          </div>

          <button
            className="md:hidden p-2 text-white "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 p-5 flex flex-col items-center gap-4">
            {isInitializing ? (
              <AnimatedPulseLoader className="w-full h-10" />
            ) : (
              renderActions(true)
            )}
          </div>
        )}
      </nav>
    </>
  );
}