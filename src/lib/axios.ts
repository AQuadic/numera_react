import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";
import Cookies from "js-cookie";

const TOKEN_KEY = "numra_token";
const API_BASE_URL = "https://numra.motofy.io/api";

/** Get the stored token */
export const getToken = (): string | undefined => Cookies.get(TOKEN_KEY);

/** Save the token (expires in 7 days by default) */
export const setToken = (token: string, days = 7): void => {
  const isHttps = globalThis.window?.location?.protocol === "https:";
  Cookies.set(TOKEN_KEY, token, {
    expires: days,
    secure: isHttps, // allow cookies on localhost/http during dev
    sameSite: "lax",
    path: "/",
  });
};

/** Remove the token */
export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
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
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      removeToken();
      // Optionally redirect to login page
      if (
        globalThis.window !== undefined &&
        !globalThis.window.location.pathname.includes("/signin")
      ) {
        globalThis.window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);
