import { axios } from "../../axios";

export interface BroadcastNotificationParams {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  from_date?: string;
  to_date?: string;
}

export interface BroadcastNotification {
  id: number;
  title: string;
  message: string;
  created_at: string;
}

export interface BroadcastNotificationsResponse {
  data: BroadcastNotification[];
  meta?: {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
  };
}

export const getBroadcastNotifications = async (
  params?: BroadcastNotificationParams
): Promise<BroadcastNotificationsResponse> => {
  const response = await axios.get<BroadcastNotificationsResponse>("/notification", {
    params,
  });
  return response.data;
};
