import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

const TOKEN_KEY = "numra_token";
const API_BASE_URL = "https://numra.motofy.io/api";

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
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Log the error for debugging
    console.error("API Error:", error.response?.status, error.response?.data);

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
