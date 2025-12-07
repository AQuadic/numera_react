import { create } from "zustand";
import {
  getCurrentUser,
  logout as logoutApi,
  type User,
} from "../lib/api/auth";
import { getToken } from "../lib/axios";

interface AuthState {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,

  // Actions
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      // Mark as initialized so guards/headers react immediately after login/signup
      isInitialized: true,
    });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },

  /**
   * Initialize auth state on app load
   * Checks if token exists and fetches current user
   */
  initializeAuth: async () => {
    const token = getToken();
    const existingUser = get().user;

    // If no token, mark as initialized and return
    if (!token) {
      set({ isInitialized: true, isAuthenticated: false, user: null });
      return;
    }

    // If we already have a user set (e.g., from a just-finished login/signup), honor it and skip fetch
    if (existingUser) {
      set({ isInitialized: true, isAuthenticated: true, isLoading: false });
      return;
    }

    // If already initialized and authenticated, skip
    if (get().isInitialized && get().isAuthenticated) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const response = await getCurrentUser();

      // response is { user: User }
      if (response.user) {
        set({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      } else {
        // Token is invalid, clear it
        logoutApi();
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
          error: null,
        });
      }
    } catch {
      // Token is invalid or expired
      logoutApi();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        isInitialized: true,
        error: null,
      });
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    logoutApi();
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));
