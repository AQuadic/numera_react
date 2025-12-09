import { axios } from "../../axios";

export interface PostPlateBody {
  emirate_id: number;
  vehicle_type: string;
  is_negotiable: boolean;
  numbers: string;
  letters: string;
  package_user_id: number;
  price: number;
}

export interface PostPlateResponse {
  message: string;
  data?: any;
}

export const postPlate = async (body: PostPlateBody): Promise<PostPlateResponse> => {
  const { data } = await axios.post("/plates", body, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};
