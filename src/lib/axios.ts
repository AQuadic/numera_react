import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import toast from "react-hot-toast";

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
  config.headers["Content-Type"] = "application/json";

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

    // Handle 401 Unauthorized - but DON'T auto-remove token
    // The token might be valid but a different endpoint failed
    // Only remove token if it's explicitly an auth endpoint failure
    if (error.response?.status === 401) {
      const url = error.config?.url || "";
      // Only clear token if it's a user-fetch call that failed with 401
      // This means the token itself is invalid
      if (url.includes("/user/user") || url.includes("/user/me")) {
        console.warn("Token appears invalid, clearing...");
        removeToken();
      }
    }
    return Promise.reject(error);
  }
);
