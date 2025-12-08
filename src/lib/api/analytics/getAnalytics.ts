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

export interface AdsCounts {
  active_ads: number;
  sold_ads: number;
  paused_ads: number;
  total_ads: number;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const response = await axios.get<AnalyticsData>("/analytics");
  return response.data;
};

export const getAdsCounts = async (): Promise<AdsCounts> => {
  const response = await axios.get<AdsCounts>("/ads-counts");
  return response.data;
};
