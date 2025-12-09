import { axios } from "../axios";

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  phone_country: string | null;
  phone_normalized: string | null;
  phone_national: string | null;
  phone_e164: string | null;
  language: string;
  city_id: number | null;
  country_id: number | null;
  type: string;
  company_name: string | null;
  verification_status: string | null;
}

export interface Operator {
  id: number;
  name: {
    ar: string;
    en: string;
  };
  is_active: boolean;
  order_column: number;
  created_at: string;
  updated_at: string;
  image: {
    id: number;
    uuid: string;
    size: number;
    url: string;
    responsive_urls: string[];
  };
}

export interface Sim {
  id: number;
  operator_id: number;
  package_user_id: number;
  is_active: boolean;
  is_negotiable: boolean;
  is_sold: boolean;
  package: string;
  subscription: string;
  numbers: string;
  published_until: string;
  published_at: string;
  price: number;
  user_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  paused_at: string | null;
  is_favorite: boolean | null;
  share_url: string;
  user: User;
  operator: Operator;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface SimFilters {
  numbers?: string;
  price_from?: number;
  price_to?: number;
  page?: number;
}

// API Functions
export const getSims = async (
  filters?: SimFilters
): Promise<PaginatedResponse<Sim>> => {
  const params = new URLSearchParams();

  if (filters?.numbers) params.append("numbers", filters.numbers);
  if (filters?.price_from)
    params.append("price_from", filters.price_from.toString());
  if (filters?.price_to) params.append("price_to", filters.price_to.toString());
  if (filters?.page) params.append("page", filters.page.toString());

  const queryString = params.toString();
  const url = queryString ? `/sims?${queryString}` : "/sims";

  const response = await axios.get<PaginatedResponse<Sim>>(url);
  return response.data;
};
