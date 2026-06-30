import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getToken } from "@/lib/token";
import { BrysonLoader } from "@/components/ui/BrysonLoader";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  // Token is written synchronously at login, so it can't lag behind navigation.
  const authed = isAuthenticated || Boolean(getToken());

  if (!hasHydrated) return <BrysonLoader />;
  if (!authed) return <Navigate to="/" replace />;

  return <Outlet />;
}