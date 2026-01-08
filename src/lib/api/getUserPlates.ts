import { axios } from "../axios";

export interface PlateUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  language: string;
  type: "company" | "individual";
  company_name: string | null;
  verification_status: string;
}

export interface PackageName {
  ar: string;
  en: string;
}

export interface Package {
  id: number;
  name: PackageName;
  primary_color: string;
  secondary_color: string;
}

export interface PackageUser {
  id: number;
  user_id: number;
  package_id: number;
  iap: string;
  package_name: PackageName;
  package_publish_duration: number;
  package_publish_count: number;
  used_publish_count: number;
  status: string;
  package: Package;
}

export interface Plate {
  id: number;
  vehicle_type: string;
  emirate_id: string;
  letters: string;
  numbers: string;
  price: number;
  is_active: boolean;
  is_sold: boolean;
  is_negotiable: boolean;
  views_count: number;
  chats_count: number;
  favorites_count: number;
  image_url: string;
  share_url: string;
  published_at: string;
  published_until: string;
  user_id: number;
  user: PlateUser;
  package_user: PackageUser;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  total: number;
}

export const getUserPlates = async (
  userId: number,
  page: number = 1,
  vehicleType?: string  // <-- new parameter
): Promise<PaginatedResponse<Plate>> => {
  const params: any = { user_id: userId, page };

  if (vehicleType) {
    params["vehicle_types[]"] = vehicleType; // <-- send to API
  }

  const { data } = await axios.get<PaginatedResponse<Plate>>("/plates", { params });
  return data;
};

