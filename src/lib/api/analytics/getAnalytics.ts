import { axios } from "../../axios";

export interface AnalyticsData {
  views_over_days: number[];
  response_rate: number;
  inquiries: number;
  views: number;
  visitor: number;
  active_ads: number;
  total_views: number;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const response = await axios.get<AnalyticsData>("/analytics");
  return response.data;
};
