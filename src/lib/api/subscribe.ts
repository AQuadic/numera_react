import { axios } from "../axios";

export interface SubscribePayload {
  email?: string;
  phone?: string;
}

export interface SubscribeResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export const postSubscribe = async (payload: SubscribePayload): Promise<SubscribeResponse> => {
  try {
    const response = await axios.post<SubscribeResponse>("/subscribe", payload);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      throw error.response.data;
    }
    throw error;
  }
};
