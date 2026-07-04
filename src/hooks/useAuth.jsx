import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authService from "../services/auth.service";
import { useRouter } from "@/compat/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { setToken, clearToken, getToken } from "../lib/token";
import { toast } from "react-toastify";

const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");

const getErrorMessage = (err) =>
  err?.message || "An unexpected error occurred";

export const useSignUp = () => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (res) => {
      if (res?.token) setToken(res.token);

      if (res?.user) {
        setUser(res.user);
      }

      toast.success(res?.message || "Registration Successful");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useSignIn = () => {
  const { replace } = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.signIn,
 onSuccess: (res) => {
  console.log("LOGIN RESPONSE", res);

  if (res?.token) setToken(res.token);

  setUser(res.user);

  replace("/dashboard");
},
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: (res) =>
      toast.success(res?.message || "Password reset link sent"),
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useResetPassword = () => {
  const { replace } = useRouter();

  return useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: (res) => {
      toast.success(res?.message || "Password updated successfully");
      replace("/login");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useChangePassword = () => {
  const clearAll = useAuthStore((store) => store.logout);
  const { replace } = useRouter();
  const { mutate: logout } = useLogout();

  return useMutation({
    mutationFn: authService.ChangePassword,
    onSuccess: (res) => {
      toast.success(res?.message || "Password changed successfully");
      clearAll();
      logout();
      replace("/");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const clearAll = useAuthStore((state) => state.logout);
  const { replace } = useRouter();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearToken();
      clearAll();
      queryClient.clear();
      toast.info("Logged out successfully");
      replace("/");
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useGetAuthUser = (isAuthenticated) => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: authService.getAuthUser,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useCompleteProfile = () => {
  return useMutation({
    mutationFn: async (data) => {
      const token = getToken();

      const res = await fetch(`${API_BASE}/auth/complete-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json.message || "Failed to complete profile");
      }

      return json;
    },
  });
};

export const useStartKYC = () => {
  return useMutation({
    mutationFn: authService.startKYC,
    onError: (err) => toast.error(getErrorMessage(err)),
  });
};

export const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  import { httpPatch } from "@/lib/http";
import { useNavigate } from "react-router-dom";

export const updateProfile = (payload) =>
    httpPatch("/auth/profile", payload);

export const useUploadProfileImage = () => {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: authService.uploadProfileImage,
        onSuccess: (res) => {
            if (res.user) {
                setUser(res.user);
            }
        },
    });
};

export const useUploadCoverImage = () => {
    const setUser = useAuthStore((s) => s.setUser);

    return useMutation({
        mutationFn: authService.uploadCoverImage,
        onSuccess: (res) => {
            if (res.user) {
                setUser(res.user);
            }
        },
    });
};

export const useAdminLogin = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const { replace } = useRouter();

  return useMutation({
    mutationFn: authService.adminLogin,

    onSuccess: (res) => {
      if (res?.token) {
        setToken(res.token);
      }

      if (res?.user) {
        setUser(res.user);
      }

      toast.success("Welcome back, Admin!");

      replace("/admin/dashboard");
    },

    onError: (err) => {
      toast.error(getErrorMessage(err));
    },
  });
};