import { axios } from "../../axios";

export interface ContinuePlatePayload {
  plate_id: number;
}

export interface ContinuePlateResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

export const continuePlate = async (
  payload: ContinuePlatePayload
): Promise<ContinuePlateResponse> => {
  const { data } = await axios.post("/plate/continue", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};
