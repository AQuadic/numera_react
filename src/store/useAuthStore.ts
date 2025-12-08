import { create } from "zustand";
import {
  logout as logoutApi,
  getCurrentUser,
  type User,
} from "../lib/api/auth";
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
  refetchUser: () => Promise<void>;
}

/**
 * Auth store (Zustand)
 *
 * NOTE: This store intentionally does NOT persist the `user` object to
 * localStorage. The app will fetch fresh user data on each page refresh
 * via `AuthProvider` which calls `getCurrentUser()` if a token exists.
 */
export const useAuthStore = create<AuthState>()((set) => ({
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
   * Refetch user data from the API
   */
  refetchUser: async () => {
    const token = getToken();
    if (!token) return;

    try {
      const { user } = await getCurrentUser();
      set({ user });
    } catch {
      // Silent fail - user stays as is
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    logoutApi();
    set({ user: null, error: null });
  },
}));
