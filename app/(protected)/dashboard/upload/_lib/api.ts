import type { DashboardVehicleSearchResponse } from "@/services/types/dashboard.type";

// Client-side calls to the dashboard BFF (app/api/dashboard/*).
// The session cookie is sent automatically; the token never reaches the browser.

export type VehicleSearchType = "plate" | "serial";

async function errorMessage(response: Response, fallback: string) {
  if (response.status === 401) return "Tu sesión expiró. Vuelve a iniciar sesión.";
  const body = await response.json().catch(() => null);
  return (body && typeof body.error === "string" && body.error) || fallback;
}

export async function markPhoto(formData: FormData): Promise<Blob> {
  const response = await fetch("/api/dashboard/photos/mark", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(await errorMessage(response, "Error al marcar la foto"));
  }
  return response.blob();
}

export async function uploadVehiclePhoto(formData: FormData): Promise<void> {
  const response = await fetch("/api/dashboard/vehicles", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(await errorMessage(response, "Error al subir la foto"));
  }
}

export async function searchVehicles(
  type: VehicleSearchType,
  value: string
): Promise<DashboardVehicleSearchResponse> {
  const params = new URLSearchParams({ type, value });
  const response = await fetch(`/api/dashboard/vehicles/search?${params}`);
  if (response.status === 404) return { data: [] };
  if (!response.ok) {
    throw new Error(await errorMessage(response, "Error al buscar el vehículo"));
  }
  const body = (await response.json()) as Partial<DashboardVehicleSearchResponse>;
  return { data: body.data ?? [] };
}
