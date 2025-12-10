import { axios } from "../../axios";

export interface PlateAd {
  id: number;
  emirate_id: number;
  price: number;
  vehicle_type: string;
  numbers: string;
  letters: string;
  status: string;
  created_at: string;
}

export interface GetPlateAdsParams {
  per_page?: number; 
  filter_type?: "active" | "paused_at" | "sold" | "none";
  pagination?: "normal" | "simple" | "none";
  vehicle_types?: string[];
}

export interface GetPlateAdsResponse {
  data: PlateAd[];
  total?: number;
  current_page?: number;
  last_page?: number;
}

export const getPlateAds = async (
  params?: GetPlateAdsParams
): Promise<GetPlateAdsResponse> => {
  const response = await axios.get("/plate/ads", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params,
  });

  return response.data;
};
