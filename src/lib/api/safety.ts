import { axios } from "../axios";

export interface Tip {
  tip: {
    ar: string;
    en: string;
  };
}

export interface Instruction {
  icon: string;
  instruction: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
}

export interface SafetyResponse {
  tips: Tip[];
  purchase_instructions: Instruction[];
}

export const getSafety = async (): Promise<SafetyResponse> => {
  try {
    const response = await axios.get<SafetyResponse>("/safety", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch safety data:", error);
    throw error;
  }
};
