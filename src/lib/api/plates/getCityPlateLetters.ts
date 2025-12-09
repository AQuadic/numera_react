import { axios } from "../../axios";

export interface CityPlateLettersResponse {
  letters: string[];
  city: string;
  type: string;
}

export const getCityPlateLetters = async (
  city?: string,
  type?: string 
): Promise<CityPlateLettersResponse> => {
  const selectedCity = city || "dubai"; 
  const selectedType = type || "private";

  try {
    const response = await axios.get<CityPlateLettersResponse>(
      `/utils/city_plate_letters/${selectedCity}/${selectedType}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching plate letters for city: ${selectedCity}, type: ${selectedType}`,
      error
    );
    throw error;
  }
};