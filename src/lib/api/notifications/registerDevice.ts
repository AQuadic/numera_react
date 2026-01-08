import { axios, addToastExcludeEndpoint } from "../../axios";

// Exclude this endpoint from showing API toasts
addToastExcludeEndpoint("/device");

export interface RegisterDeviceParams {
  device_type: "ios" | "android" | "web";
  device_token: string;
  device_name?: string;
  app_id: string;
  notifiable_type: "firebase";
  notifiable_id: string;
  enabled: boolean;
}

export const registerDevice = async (params: RegisterDeviceParams) => {
  const { data } = await axios.post("/device", params);
  return data;
};
