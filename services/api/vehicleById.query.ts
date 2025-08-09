import { Vehicle } from "../types/vehicle.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number): Promise<T> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  try {
    const response = await fetch(`${URL}/vehicle/${id}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    throw error;
  }
}

export async function vehicleQueryById(
  id: number
): Promise<Vehicle | undefined> {
  return fetchData<Vehicle>(id);
}
