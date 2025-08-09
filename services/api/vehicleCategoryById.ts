import { APIVehicleResponse } from "../types/vehicle.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(
  id: number,
  page: number,
  limit?: number
): Promise<T> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  try {
    const response = await fetch(
      `${URL}/vehicle/category/${id}?page=${page}${
        limit ? `&limit=${limit}` : ""
      }`
    );
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}

export async function vehicleCategoryQueryById(
  id: number,
  page: number,
  limit?: number
): Promise<APIVehicleResponse | undefined> {
  return fetchData<APIVehicleResponse>(id, page, limit);
}
