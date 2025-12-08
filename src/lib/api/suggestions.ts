import { axios } from "../axios";
import type { AxiosError } from "axios";

export interface SuggestionRequest {
  name: string;
  email: string;
  message: string;
}

export interface SuggestionResponse {
  message?: string;
}

export const createSuggestion = async (
  payload: SuggestionRequest
): Promise<SuggestionResponse> => {
  const response = await axios.post("/suggestions", payload);
  return response.data as SuggestionResponse;
};

export const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError<{
    message?: string;
    errors?: Record<string, string[]>;
  }>;

  if (axiosError.response?.data?.message)
    return axiosError.response.data.message;

  if (axiosError.response?.data?.errors) {
    const first = Object.values(axiosError.response.data.errors)[0];
    if (first?.length) return first[0];
  }

  if (axiosError.message) return axiosError.message;

  return "An unexpected error occurred";
};
