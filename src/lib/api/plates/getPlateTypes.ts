import { axios } from "../../axios";

export interface PlateType {
  id: string | number;
  name: string;
}

export interface GetPlateTypesResponse {
  message: string;
  data: PlateType[];
}

export const getPlateTypesForCity = async (
  city: string = "dubai"
): Promise<GetPlateTypesResponse> => {
  const { data } = await axios.get(`/utils/plate_types_for_city/${city}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return data;
};
