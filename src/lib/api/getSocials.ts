import { axios } from "../axios";

export interface SocialLinks {
  snapchat: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  whatsapp: string;
  phone: string;
  email: string;
}

export const getSocials = async (): Promise<SocialLinks> => {
  try {
    const response = await axios.get<SocialLinks>("/socials");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch social links", error);
    throw error;
  }
};
