import { axios, setToken, removeToken } from "../axios";
import type { AxiosError } from "axios";

// Types for API responses
export interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

// API returns `{ user: ..., token: ... }` directly (no status/message), but we also
// gracefully handle a nested `{ data: { user, token } }` shape.
export interface AuthResponse {
  user: User;
  token: string;
}

// Current user endpoint may return `{ user: ... }` or `{ data: user }`
export interface UserResponse {
  user: User;
}

export interface ApiError {
  status: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Sign Up Request
export interface SignUpRequest {
  name: string;
  // number only (no +, no dial code) e.g. "1012345678"
  phone: string;
  // iso2 country code (e.g. "EG")
  phone_country: string;
  password: string;
  password_confirmation?: string;
}

// Login Request
export interface LoginRequest {
  // number only (no +, no dial code) e.g. "1012345678"
  phone: string;
  // iso2 country code (e.g. "EG")
  phone_country: string;
  password: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (payload: SignUpRequest): Promise<AuthResponse> => {
  const body = {
    name: payload.name,
    phone: payload.phone,
    phone_country: payload.phone_country,
    password: payload.password,
    password_confirmation: payload.password_confirmation || payload.password,
  };

  const response = await axios.post("/user/signup", body);
  const raw = response.data as unknown;
  const parsed = raw as {
    user?: User;
    token?: string;
    data?: { user?: User; token?: string };
  };
  const user = parsed.user ?? parsed.data?.user;
  const token = parsed.token ?? parsed.data?.token;

  if (token) {
    setToken(token);
  }

  if (!user || !token) {
    throw new Error("Signup response missing user or token");
  }

  return { user, token };
};

/**
 * Login an existing user
 */
export const login = async (payload: LoginRequest): Promise<AuthResponse> => {
  const body = {
    phone: payload.phone,
    phone_country: payload.phone_country,
    password: payload.password,
  };

  const response = await axios.post("/user/login", body);
  const raw = response.data as unknown;
  const parsed = raw as {
    user?: User;
    token?: string;
    data?: { user?: User; token?: string };
  };
  const user = parsed.user ?? parsed.data?.user;
  const token = parsed.token ?? parsed.data?.token;

  if (token) {
    setToken(token);
  }

  if (!user || !token) {
    throw new Error("Login response missing user or token");
  }

  return { user, token };
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await axios.post("/user/user");
  const raw = response.data as unknown;
  const data = raw as
    | { user?: User }
    | { data?: User }
    | { data?: { user?: User } };
  const user =
    (data as { user?: User }).user ??
    (data as { data?: User }).data ??
    (data as { data?: { user?: User } }).data?.user;

  if (!user) {
    throw new Error("Current user response missing user");
  }

  return { user };
};

/**
 * Logout the current user
 */
export const logout = (): void => {
  removeToken();
};

/**
 * Extract error message from API error
 */
export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<ApiError>;

  if (axiosError.response?.data?.message) {
    return axiosError.response.data.message;
  }

  if (axiosError.response?.data?.errors) {
    const firstError = Object.values(axiosError.response.data.errors)[0];
    if (firstError && firstError.length > 0) {
      return firstError[0];
    }
  }

  if (axiosError.message) {
    return axiosError.message;
  }

  return "An unexpected error occurred";
};
