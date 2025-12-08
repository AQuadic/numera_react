import { axios } from "../../axios";

export interface Page {
  id: number;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  is_active: number;
  order_column: number;
  app_ids: string[];
  image: string | null;
}

export const getPages = async (): Promise<Page[]> => {
  const response = await axios.get("/pages");
  return response.data;
};
