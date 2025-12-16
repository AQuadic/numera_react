import { axios, setToken, removeToken } from "../axios";
import type { AxiosError } from "axios";

// Types for API responses
export interface User {
  id: number;
  name: string;
  phone: string;
  phone_country?: string;
  phone_normalized?: string;
  phone_national?: string;
  phone_e164?: string;
  phone_verified_at?: string | null;
  email?: string | null;
  email_verified_at?: string | null;
  language?: string;
  image?: string | null;
  created_at?: string;
  updated_at?: string;
  city_id?: number | null;
  country_id?: number | null;
  is_active?: number;
  type?: string;
  company_name?: string | null;
  verification_status?: string | null;
  unread_notifications_count?: number;
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
  const raw = response.data;

  // API returns user directly OR wrapped in { user: ... } or { data: ... }
  let user: User | undefined;

  if (raw && typeof raw === "object") {
    if ("id" in raw && "name" in raw) {
      // User returned directly
      user = raw as User;
    } else if ("user" in raw && raw.user) {
      // Wrapped in { user: ... }
      user = raw.user as User;
    } else if ("data" in raw && raw.data) {
      // Wrapped in { data: ... }
      const data = raw.data;
      if ("id" in data && "name" in data) {
        user = data as User;
      } else if ("user" in data && data.user) {
        user = data.user as User;
      }
    }
  }

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

// Change Password Request
export interface ChangePasswordRequest {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface ChangePasswordResponse {
  message?: string;
}

/**
 * Change the current user's password
 */
export const changePassword = async (
  data: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const response = await axios.post<ChangePasswordResponse>(
    "/user/change_password",
    data
  );
  return response.data;
};

// Forgot password (request OTP)
export interface ForgotPasswordRequest {
  // number only (no +, no dial code) e.g. "1012345678"
  phone: string;
  // iso2 country code (e.g. "EG")
  phone_country: string;
  // backend expects "sms" for phone flow
  reset_type?: "sms";
}

export interface ForgotPasswordResponse {
  message?: string;
}

/**
 * Trigger password reset OTP via SMS
 */
export const requestPasswordReset = async (
  payload: ForgotPasswordRequest
): Promise<ForgotPasswordResponse> => {
  const body = {
    phone: payload.phone,
    phone_country: payload.phone_country,
    reset_type: payload.reset_type ?? "sms",
  };

  const response = await axios.post<ForgotPasswordResponse>(
    "/user/forgot",
    body
  );
  return response.data;
};

// Verify OTP (reset)
export interface VerifyResetCodeRequest {
  code: string;
  type?: "reset";
  phone: string;
  phone_country: string;
}

export interface VerifyResetCodeResponse {
  user: User;
  reset_token: string;
  [key: string]: unknown;
}

/**
 * Verify the OTP sent for password reset and retrieve reset token
 */
export const verifyResetCode = async (
  payload: VerifyResetCodeRequest
): Promise<VerifyResetCodeResponse> => {
  const body = {
    code: payload.code,
    type: payload.type ?? "reset",
    phone: payload.phone,
    phone_country: payload.phone_country,
  };

  const response = await axios.post<VerifyResetCodeResponse>(
    "/user/verify",
    body
  );

  const raw = response.data as
    | VerifyResetCodeResponse
    | { data?: VerifyResetCodeResponse };

  const user = (raw as VerifyResetCodeResponse).user ?? raw?.data?.user;
  const reset_token =
    (raw as VerifyResetCodeResponse).reset_token ?? raw?.data?.reset_token;

  if (!user || !reset_token) {
    throw new Error("Verification response missing user or reset token");
  }

  return { user, reset_token };
};

// Reset password using reset token
export interface ResetPasswordRequest {
  password: string;
  password_confirmation: string;
  reset_token: string;
  phone: string;
  phone_country: string;
}

export interface ResetPasswordResponse {
  message?: string;
}

/**
 * Complete password reset with token from verification step
 */
export const resetPasswordWithToken = async (
  payload: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await axios.post<ResetPasswordResponse>(
    "/user/change_password",
    payload
  );
  return response.data;
};

// Update user/profile request
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  phone_country?: string;
  type?: "personal" | "company";
  company_name?: string;
}

export interface UpdateUserResponse {
  user?: User;
  message?: string;
}

/**
 * Update current authenticated user's data (e.g. name, email, phone)
 */
export const updateUser = async (
  data: UpdateUserRequest | FormData
): Promise<UpdateUserResponse> => {
  // If caller passed FormData we want to send it as multipart/form-data
  const config =
    data instanceof FormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : undefined;
  const response = await axios.post<UpdateUserResponse>(
    "/user/update",
    data as any,
    config
  );
  return response.data;
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
