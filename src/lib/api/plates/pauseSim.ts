import { axios } from "../../axios";

export interface PauseSimPayload {
  plate_id: number;
}

export interface PauseSimResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

export const pauseSim = async (
  payload: PauseSimPayload
): Promise<PauseSimResponse> => {
  const { data } = await axios.post("/plate/paused", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};
