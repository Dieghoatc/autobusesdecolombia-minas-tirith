import { VehicleModelResponse } from "../types/vehicle-model-response";


const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number, page?: number, limit?: number): Promise<T> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  try {
    const endpoint = `/vehicle-model/${id}${page ?`?page=${page}` : ""}${
      limit ? `&limit=${limit}` : ""
    }`;

    const fullUrl = `${URL}${endpoint}`;
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}

export async function vehicleModelQuery(
  id: number,
  page?: number,
  limit?: number
): Promise<VehicleModelResponse> {
  return fetchData<VehicleModelResponse>(id, page, limit);
}
