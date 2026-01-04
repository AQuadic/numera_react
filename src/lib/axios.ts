import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import i18n from "../i18n";

const TOKEN_KEY = "numra_token";
const API_BASE_URL =
  // Use env to allow dev proxy (e.g. VITE_API_BASE_URL=/api)
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_API_BASE_URL) ||
  "https://numra.motofy.io/api";

/** Get the stored token - checks localStorage first, then sessionStorage */
export const getToken = (): string | undefined => {
  if (globalThis.window === undefined) return undefined;
  return localStorage.getItem(TOKEN_KEY) ?? undefined;
};

/** Save the token to localStorage */
export const setToken = (token: string): void => {
  if (globalThis.window === undefined) return;
  localStorage.setItem(TOKEN_KEY, token);
};

/** Remove the token from localStorage */
export const removeToken = (): void => {
  if (globalThis.window === undefined) return;
  localStorage.removeItem(TOKEN_KEY);
};

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = getToken();

  config.headers = config.headers || {};
  config.headers["Accept"] = "application/json";
  config.headers["Accept-Language"] = i18n.language;
  // If the request body is FormData, let Axios set the correct multipart Content-Type
  // (including the boundary). Do not override it here.
  if (config.data instanceof FormData) {
    if ("Content-Type" in config.headers) delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}

export const axios = Axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => searchParams.append(`${key}[]`, item));
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  },
});

axios.interceptors.request.use(authRequestInterceptor);

// Helper to extract error message from API response
const getErrorMessageFromResponse = (error: AxiosError): string => {
  const data = error.response?.data as
    | {
        message?: string;
        errors?: Record<string, string[]>;
      }
    | undefined;

  if (data?.message) {
    return data.message;
  }

  if (data?.errors) {
    const firstError = Object.values(data.errors)[0];
    if (firstError && firstError.length > 0) {
      return firstError[0];
    }
  }

  if (error.message) {
    return error.message;
  }

  return "An unexpected error occurred";
};

// Helper to extract success message from API response
const getSuccessMessageFromResponse = (
  response: AxiosResponse
): string | null => {
  const data = response.data as { message?: string } | undefined;
  return data?.message || null;
};

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Show success toast if API returns a message (for mutating requests)
    const method = response.config.method?.toLowerCase();
    if (method && ["post", "put", "patch", "delete"].includes(method)) {
      const message = getSuccessMessageFromResponse(response);
      if (message) {
        toast.success(message);
      }
    }
    return response;
  },
  (error: AxiosError) => {
    // Log the error for debugging
    console.error("API Error:", error.response?.status, error.response?.data);

    // Show error toast
    const errorMessage = getErrorMessageFromResponse(error);
    toast.error(errorMessage);

    // Handle 401 Unauthorized: logout and redirect to signin
    if (error.response?.status === 401) {
      try {
        // Clear auth state (removes token and clears user)
        // Use getState().logout() so we can call it outside of React components
        useAuthStore.getState().logout();

        // Notify user and redirect to sign-in page (replace history so back won't return to protected pages)
        if (typeof window !== "undefined") {
          // Avoid redundant navigation if already on signin
          if (window.location.pathname !== "/signin") {
            toast.error("Session expired. Please sign in again.");
            window.location.replace("/signin");
          }
        }
      } catch (e) {
        // If anything goes wrong, ensure token is removed as a fallback
        console.warn("Failed to perform automatic logout on 401:", e);
        removeToken();
      }
    }
    return Promise.reject(error);
  }
);
