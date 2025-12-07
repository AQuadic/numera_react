import { axios } from "../../axios";

export interface SliderItem {
  name: string;
  url: string;
  ar_image?: { url: string };
  en_image?: { url: string };
}

export const getSlider = async (): Promise<SliderItem[]> => {
  const response = await axios.get("/slider");
  return response.data.data; 
};
