import { axios } from "../axios";

export interface ToggleFavoriteRequest {
  favorable_id: number;
  favorable_type: string;
}

export interface ToggleFavoriteResponse {
  message: string;
  is_favorited: boolean;
}

export const toggleFavorite = async (
  data: ToggleFavoriteRequest
): Promise<ToggleFavoriteResponse> => {
  const response = await axios.post<ToggleFavoriteResponse>(
    "/favorites/toggle",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
