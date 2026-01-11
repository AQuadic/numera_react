import { axios } from "../axios";

export interface SellerImage {
  id?: number;
  uuid: string;
  url: string;
  responsive_urls: string[];
  size?: number;
  file_name?: string;
  mime_type?: string;
}

export interface SellerProfile {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string | null;
  phone_country: string | null;
  phone_normalized: string | null;
  phone_national: string | null;
  phone_e164: string | null;
  phone_verified_at: string | null;
  language: string;
  created_at: string;
  updated_at: string;
  city_id: number | null;
  created_by: number | null;
  country_id: number | null;
  deleted_at: string | null;
  is_active: number;
  tenant_id: number | null;
  blocked_until: string | null;
  type: string;
  company_name: string | null;
  verification_status: string | null;
  unread_notifications_count?: number;
  image: SellerImage | null;
}

export const getSellerProfile = (userId: number) =>
  axios
    .get<{ user: SellerProfile }>(`/seller/profile/${userId}`)
    .then((res) => res.data.user);
