import { axios } from "../axios";

export interface MarkPlateSoldRequest {
  plate_id: number;
  is_sold: number;
}

export interface MarkPlateSoldResponse {
  message: string;
}

export const markPlateSold = async (
  params: MarkPlateSoldRequest
): Promise<MarkPlateSoldResponse> => {
  const response = await axios.get<MarkPlateSoldResponse>(
    "/plate/mark-sold",
    {
      params,
    }
  );

  return response.data;
};
