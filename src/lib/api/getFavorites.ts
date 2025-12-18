import { axios } from "../axios";
import type { Sim } from "./sims";

export interface Plate {
  id: number;
  package_user_id: number;
  vehicle_type: "classic" | "bikes" | "cars" | "fun";
  emirate_id: string;
  is_active: boolean;
  is_sold: boolean;
  numbers: string;
  letters: string;
  price: number;
  image_url: string;
  is_favorite?: boolean | null;
  package_user: {
    package: { name: { en: string; [key: string]: string } };
  };
}

export type Favorite =
  | {
      id: number;
      user_id: number;
      favorable_type: "plate";
      favorable_id: number;
      favorable: Plate;
    }
  | {
      id: number;
      user_id: number;
      favorable_type: "sim";
      favorable_id: number;
      favorable: Sim;
    };

export const getFavorites = async (): Promise<Favorite[]> => {
  const res = await axios.get("/favorites");
  return res.data;
};
