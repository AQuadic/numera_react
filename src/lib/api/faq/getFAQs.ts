import { axios } from "../../axios";

export interface FaqsResponse {
  current_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  data: FaqItem[];
}

export interface FaqItem {
  id: number;
  question: {
    ar: string;
    en: string;
  };
  answer: {
    ar: string;
    en: string;
  };
}

export const getFaqs = async (page: number): Promise<FaqsResponse> => {
  const res = await axios.get(`/faqs?page=${page}`);
  return res.data;
};
