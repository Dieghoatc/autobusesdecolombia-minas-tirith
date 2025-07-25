
import { APIVehicleResponse } from "../types/vehicle.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number, page: number, limit?: number): Promise<T> {

  if (!URL) return {} as T;

  try {
    const response = await fetch(`${URL}/vehicle/${id}?page=${page}${limit ? `&limit=${limit}` : ""}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as T;
  }
}

export async function vehicleQuery(id: number, page: number, limit?: number): Promise<APIVehicleResponse | undefined> {
  return fetchData<APIVehicleResponse>(id, page, limit);
}