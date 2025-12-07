import { create } from "zustand";
import { persist } from "zustand/middleware";
import { logout as logoutApi, type User } from "../lib/api/auth";
import { getToken } from "../lib/axios";

interface AuthState {
  // State
  user: User | null;
  error: string | null;

  // Computed (based on token)
  isAuthenticated: () => boolean;

  // Actions
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      error: null,

      // Check if authenticated based on token presence
      isAuthenticated: () => !!getToken(),

      // Actions
      setUser: (user) => {
        set({ user });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      /**
       * Logout the current user
       */
      logout: () => {
        logoutApi();
        set({ user: null, error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
