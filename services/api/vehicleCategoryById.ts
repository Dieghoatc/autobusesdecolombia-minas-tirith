import { APIVehicleResponse } from "../types/vehicle.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

// The API accepts any limit (limit=1000 returns ~640KB); keep requests small
export const CATEGORY_MAX_LIMIT = 30;
const DEFAULT_LIMIT = 20;

function clampInt(value: number | undefined, fallback: number, max = Infinity): number {
  const parsed = Math.trunc(Number(value));
  return Number.isFinite(parsed) && parsed >= 1 ? Math.min(parsed, max) : fallback;
}

// Vehicles of one transport category, paginated.
// Throws on an invalid id or a non-OK response (the API answers 400/500 with
// an error body that must not be treated as data).
export async function vehicleCategoryQueryById(
  id: number,
  page: number,
  limit?: number
): Promise<APIVehicleResponse> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }
  if (!Number.isInteger(id) || id < 1) {
    throw new Error(`Invalid transport category id: ${id}`);
  }

  const safePage = clampInt(page, 1);
  const safeLimit = clampInt(limit, DEFAULT_LIMIT, CATEGORY_MAX_LIMIT);

  const response = await fetch(
    `${URL}/vehicle/category/${id}?page=${safePage}&limit=${safeLimit}`,
    { next: { revalidate: 60 } }
  );
  if (!response.ok) {
    throw new Error(
      `Category ${id} page ${safePage}: API responded ${response.status}`
    );
  }
  return (await response.json()) as APIVehicleResponse;
}
