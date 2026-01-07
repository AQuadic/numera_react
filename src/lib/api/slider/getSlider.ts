import { axios } from "../../axios";
import type { ApiImage } from "../../utils/imageUtils";

export interface SliderItem {
  name: string;
  url: string;
  ar_image?: ApiImage;
  en_image?: ApiImage;
}

export const getSlider = async (): Promise<SliderItem[]> => {
  const response = await axios.get("/slider");
  return response.data.data;
};
