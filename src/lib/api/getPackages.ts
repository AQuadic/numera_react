import { axios } from "../axios";
import type { Package } from "./plates";

export const getPackages = async (): Promise<Package[]> => {
  const response = await axios.get("/packages", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return response.data;
};
