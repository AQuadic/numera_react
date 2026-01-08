import { axios } from "../../axios";

export interface BroadcastNotificationParams {
  search?: string;
  pagination?: "simple" | "normal" | "none";
  per_page?: number;
  from_date?: string;
  to_date?: string;
  cursor?: string | null;
}

export interface BroadcastNotification {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  body: {
    en: string;
    ar: string;
  };
  created_at: string;
  app_ids?: string[];
  type?: string;
  image?: string | null;
  read_at?: string | null;
}


export interface BroadcastNotificationsResponse {
  data: BroadcastNotification[];
  links?: {
    first?: string | null;
    last?: string | null;
    prev?: string | null;
    next?: string | null;
  };
  meta?: {
    path?: string;
    per_page?: number;
    next_cursor?: string | null;
    prev_cursor?: string | null;
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
