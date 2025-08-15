import { Vehicle } from "../types/vehicle.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number): Promise<T> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  try {
    const response = await fetch(`${URL}/vehicle/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Para datos dinámicos
      // cache: "force-cache", // Para datos que no cambian frecuentemente
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined as T; // Maneja el caso de vehículo no encontrado
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch vehicle with id ${id}:`, error);
    throw error;
  }
}

export async function vehicleQueryById(
  id: number
): Promise<Vehicle | undefined> {
  try {
    return await fetchData<Vehicle>(id);
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error);
    return undefined; // Retorna undefined en caso de error
  }
}
