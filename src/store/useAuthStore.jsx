import { create } from "zustand";
import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

export const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setHydrated: (hasHydrated) =>
        set({
          hasHydrated,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(
        () => localStorage
      ),
      onRehydrateStorage:
        () => (state) =>
          state?.setHydrated(true),
    }
  )
);