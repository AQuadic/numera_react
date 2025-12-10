import axios from "axios";

export interface PlateGenerateResponse {
  price: number;
  type: string;
  vehicle: string;
  letters: string;
  numbers: string;
  emirate: string;
  formatted_number: string;
}


export const generatePlate = async (
  letters: string,
  numbers: string,
  emirate: string
) => {
  const { data } = await axios.get(
    `https://numra.motofy.io/plate-generate/cars/${letters}/${numbers}/${emirate}`
  );
  return data;
};