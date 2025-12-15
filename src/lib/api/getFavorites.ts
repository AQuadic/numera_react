import { axios } from "../axios";

export interface FavoritePlate {
  id: number;
  user_id: number;
  favorable_type: "plate";
  favorable_id: number;
  favorable: Plate;
}

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

export const getFavorites = async (): Promise<FavoritePlate[]> => {
  const res = await axios.get("/favorites");
  return res.data;
};
