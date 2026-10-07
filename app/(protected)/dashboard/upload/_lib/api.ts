import type { DashboardVehicleSearchResponse } from "@/services/types/dashboard.type";

// Client-side calls for the upload dashboard.
// Photos go straight from the browser to the API (no Next.js proxy) with a
// short-lived upload token; the session token never reaches the browser.

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

export type VehicleSearchType = "plate" | "serial";

// Renew the upload token a little before it expires
const TOKEN_RENEW_MARGIN_MS = 30_000;

let uploadToken: { value: string; expiresAt: number } | null = null;

const API_ERROR_MESSAGES: Record<number, string> = {
  400: "Los datos enviados no son válidos",
  401: "Tu sesión expiró. Vuelve a iniciar sesión.",
  403: "Tu cuenta no tiene permisos de administrador",
  404: "El vehículo no existe",
};

async function errorMessage(response: Response, fallback: string) {
  if (response.status === 401) return API_ERROR_MESSAGES[401];
  const body = await response.json().catch(() => null);
  // Errors from the dashboard routes come as { error }
  if (body && typeof body.error === "string" && !("statusCode" in body)) return body.error;
  return API_ERROR_MESSAGES[response.status] ?? fallback;
}

async function getUploadToken(): Promise<string> {
  if (uploadToken && Date.now() < uploadToken.expiresAt - TOKEN_RENEW_MARGIN_MS) {
    return uploadToken.value;
  }

  const response = await fetch("/api/dashboard/upload-token", { method: "POST" });
  if (!response.ok) {
    throw new Error(await errorMessage(response, "No se pudo autorizar la subida"));
  }
  const body = (await response.json()) as { upload_token: string; expires_in: number };
  uploadToken = {
    value: body.upload_token,
    expiresAt: Date.now() + body.expires_in * 1000,
  };
  return uploadToken.value;
}

// POSTs a form with a photo straight to the API
async function postToApi(path: string, formData: FormData, fallback: string) {
  if (!API_URL) throw new Error("Servicio no disponible");

  const send = async () =>
    fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${await getUploadToken()}` },
      body: formData,
    });

  let response = await send();
  if (response.status === 401) {
    // The cached token may have expired: get a new one and retry once
    uploadToken = null;
    response = await send();
  }
  if (!response.ok) {
    throw new Error(await errorMessage(response, fallback));
  }
  return response;
}

// Adds the watermark and converts the photo to AVIF
export async function markPhoto(formData: FormData): Promise<Blob> {
  const response = await postToApi("/photo/mark", formData, "Error al marcar la foto");
  return response.blob();
}

// Converts the photo to an optimized AVIF, without watermark
export async function optimizePhoto(formData: FormData): Promise<Blob> {
  const response = await postToApi("/photo/optimize", formData, "Error al optimizar la foto");
  return response.blob();
}

// Publishes the photo, linked to an existing vehicle or creating a new one
export async function uploadVehiclePhoto(formData: FormData): Promise<void> {
  await postToApi("/vehicle", formData, "Error al subir la foto");
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
