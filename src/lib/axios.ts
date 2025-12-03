import Axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const TOKEN_KEY = "numra_token";

/** Get the stored token */
export const getToken = (): string | undefined => Cookies.get(TOKEN_KEY);

/** Save the token (expires in 7 days by default) */
export const setToken = (token: string, days = 7): void => {
  Cookies.set(TOKEN_KEY, token, { expires: days });
};

/** Remove the token */
export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

function authRequestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = getToken();

  config.headers = config.headers || {};
  config.headers["Accept"] = "application/json";

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}

export const axios = Axios.create({
  baseURL: "https://api.safqaa.net/v1",
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => Promise.reject(error)
);
