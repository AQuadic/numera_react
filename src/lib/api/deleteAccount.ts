import { axios } from "../axios";

export interface DeleteUserResponse {
  success: boolean;
  message?: string;
}

export const deleteUser = async (): Promise<DeleteUserResponse> => {
  try {
    const { data } = await axios.delete<DeleteUserResponse>("/user/destroy", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    return data;
  } catch (error: any) {
    console.error("Failed to delete user:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};
