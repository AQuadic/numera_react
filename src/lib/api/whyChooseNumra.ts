import { axios } from "../axios";

export interface LocalizedText {
  ar: string;
  en: string;
}

export interface ChooseNumraItem {
  icon: string;
  Question: LocalizedText;
  Answer: LocalizedText;
}

export interface WhyChooseNumraResponse {
  choose_numera: ChooseNumraItem[];
}

export const getWhyChooseNumra = async (): Promise<WhyChooseNumraResponse> => {
  try {
    const response = await axios.get<WhyChooseNumraResponse>("/why_choose_numra");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch Why Choose Numra data", error);
    throw error;
  }
};
