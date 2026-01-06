import { axios } from "../../axios";

export interface TopPerformingAd {
  model_type: string;
  ad_model: string;
  views_count: number;
  inquiries_count: number;
}

export interface AnalyticsData {
  views_over_days: number[];
  response_rate: number;
  inquiries: number;
  views: number;
  visitor: number;
  active_ads: number;
  total_views: number;
  top_three_performing_ads: TopPerformingAd[];
}

export interface AdsCounts {
  active_ads: number;
  sold_ads: number;
  paused_ads: number;
  total_ads: number;
  remaining_ads: number;
}

export interface GetAnalyticsParams {
  from_date: string;
  to_date: string;
}

export const getAnalytics = async (params: GetAnalyticsParams): Promise<AnalyticsData> => {
  const response = await axios.get<AnalyticsData>("/analytics", { params });
  return response.data;
};

export const getAdsCounts = async (): Promise<AdsCounts> => {
  const response = await axios.get<AdsCounts>("/ads-counts");
  return response.data;
};
