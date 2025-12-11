import { axios } from "../../axios";

export interface RepublishPlatePayload {
  plate_id: number;
  package_user_id: number;
}

export interface RepublishPlateResponse {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

export const republishPlate = async (
  payload: RepublishPlatePayload
): Promise<RepublishPlateResponse> => {
  const { data } = await axios.post("/plate/republish", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};
