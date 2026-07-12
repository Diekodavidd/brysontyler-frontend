import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

import AuthModal from "./modals/AuthModal";
import { useAuthStore } from "../store/useAuthStore";
import { useGetAuthUser } from "../hooks/useAuth";
import { AnimatedPulseLoader } from "./ui/AnimatedPulseLoader";

export default function Navbar() {
  const navigate = useNavigate();

  const [modalType, setModalType] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const setUser = useAuthStore((state) => state.setUser);

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

  const renderActions = () => {
    // Logged in
    if (user) {
      return (
        <button
          onClick={() =>
            handleAction(() =>
              navigate("/dashboard")
            )
          }
          className="
            h-11
            px-6
            rounded-xl
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            font-semibold
            transition-all
          "
        >
          Go to Dashboard
        </button>
      );
    }

    // Logged out
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
          "
        >
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
          "
        >
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">

          {/* Logo */}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center shrink-0">
 <img
                  src="https://res.cloudinary.com/zy7u4nqi/image/upload/v1783268228/favicon2_tzcc8h.jpg"
                  alt="df"
                  className="w-16 h-16 rounded-full object-cover"
                />
            </div>

            <div>

              <h1 className="text-lg sm:text-xl lg:text-[22px] font-bold tracking-tight leading-none whitespace-nowrap">
                Bryson Tyler
              </h1>

              <p className="text-[9px] sm:text-[10px] text-yellow-400 font-semibold tracking-[0.22em]">
                PRODUCTIONS
              </p>

            </div>

          </div>

          {/* Desktop */}

          <div className="hidden lg:flex items-center gap-4">

            {isInitializing ? (
              <AnimatedPulseLoader className="w-32 h-10 rounded-full" />
            ) : (
              renderActions()
            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            className="lg:hidden p-2 text-white"
            onClick={() =>
              setIsMenuOpen(!isMenuOpen)
            }
          >
            {isMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-white/5 p-5 flex flex-col gap-4">

            {isInitializing ? (
              <AnimatedPulseLoader className="w-full h-10" />
            ) : (
              renderActions()
            )}

          </div>
        )}

      </nav>
    </>
  );
}