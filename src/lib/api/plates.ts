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

export interface Package {
  id: number;
  name: { ar: string; en: string };
  primary_color: string;
  secondary_color: string;
}

export interface PackageUser {
  id: number;
  user_id: number;
  package_id: number;
  iap: string;
  package: Package;
}

export interface Plate {
  id: number;
  package_user_id: number;
  package_user?: PackageUser;
  vehicle_type: "classic" | "bikes" | "cars" | "fun";
  emirate_id: string;
  is_active: boolean;
  is_sold: boolean;
  is_negotiable: boolean;
  published_until: string;
  published_at: string;
  numbers: string;
  letters: string;
  price: number;
  user_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  paused_at: string | null;
  views_count: number;
  chats_count: number;
  favorites_count: number;
  is_favorite: boolean | null;
  image_url: string;
  share_url: string;
  user: User;
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

export interface PlateFilters {
  emirate_id?: string;
  vehicle_types?: string[];
  package_id?: number;
  letters?: string;
  numbers?: string;
  price_from?: number;
  price_to?: number;
  page?: number;
}

export interface City {
  id: number;
  name: {
    ar: string;
    en: string;
  };
}

// API Functions
export const getPlates = async (
  filters?: PlateFilters
): Promise<PaginatedResponse<Plate>> => {
  const params: Record<string, string | string[]> = {};

  if (filters?.emirate_id) params.emirate_id = filters.emirate_id.toString();
  if (filters?.vehicle_types && filters.vehicle_types.length > 0) {
    params.vehicle_types = filters.vehicle_types;
  }
  if (filters?.package_id) params.package_id = filters.package_id.toString();
  if (filters?.letters) params.letters = filters.letters;
  // if (filters?.numbers) params.numbers = filters.numbers;
  if (filters?.numbers && filters.numbers.trim() !== "") {
    params.numbers = filters.numbers.trim(); 
  }
  if (filters?.price_from) params.price_from = filters.price_from.toString();
  if (filters?.price_to) params.price_to = filters.price_to.toString();
  if (filters?.page) params.page = filters.page.toString();

  const response = await axios.get<PaginatedResponse<Plate>>("/plates", {
    params,
  });
  return response.data;
};

export const getCities = async (): Promise<City[]> => {
  const response = await axios.get<City[]>("/city");
  return response.data;
};

export const getPlateById = async (id: number): Promise<Plate> => {
  const response = await axios.get<{ data: Plate }>(`/plates/${id}`);
  return response.data.data;
};
