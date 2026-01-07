import { axios } from "../axios";

export interface SellerCountResponse {
  total: number;
  sold: number;
  premium: number;
}

export const getSellerCount = async (
  userId: number | string
): Promise<SellerCountResponse> => {
  try {
    const { data } = await axios.get<SellerCountResponse>("/seller/count", {
      params: { user_id: userId },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch seller counts", error);
    throw error;
  }
};
