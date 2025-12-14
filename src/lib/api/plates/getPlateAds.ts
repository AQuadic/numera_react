import { axios } from "../../axios";

export interface PlateAd {
  id: number;
  package_user_id?: number;
  user_id?: number;
  vehicle_type: "cars" | "fun" | "bikes" | "classic";
  emirate_id: string;
  price: number;
  numbers: string;
  letters: string;
  status: string;
  created_at: string;
  updated_at?: string;
  is_active: boolean;
  is_sold: boolean;
  is_negotiable: boolean;
  image_url?: string;
  share_url?: string;
  published_at?: string;
  published_until?: string;
}

export interface GetPlateAdsParams {
  per_page?: number; 
  filter_type?: "active" | "paused_at" | "sold" | "none";
  pagination?: "normal" | "simple" | "none";
  vehicle_types?: ("bikes" | "cars" | "fun" | "classic")[];
}

export interface GetPlateAdsResponse {
  data: PlateAd[];

  current_page: number;
  per_page: number;
  total: number;
  last_page: number;

  from?: number;
  to?: number;

  next_page_url?: string | null;
  prev_page_url?: string | null;
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
