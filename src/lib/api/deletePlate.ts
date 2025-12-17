import { axios } from "../axios";

export interface DeletePlateResponse {
  message?: string;
}

export const deletePlate = async (
  plateId: number | string
): Promise<DeletePlateResponse> => {
  const response = await axios.delete<DeletePlateResponse>(
    `/plates/${plateId}`
  );

  return response.data;
};
