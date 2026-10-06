import { apiFetch, getAdminToken } from "@/lib/auth/session";

import {
  jsonError,
  passthrough,
  unauthorized,
  validateImage,
} from "../_lib/http";

// Fields the API accepts when the photo belongs to a vehicle not yet registered.
const NEW_VEHICLE_FIELDS = [
  "plate",
  "company_serial",
  "vehicle_type_id",
  "model_id",
  "company_id",
  "transport_category_id",
  "company_service_id",
] as const;

const REQUIRED_NEW_VEHICLE_FIELDS = [
  "vehicle_type_id",
  "model_id",
  "company_id",
  "transport_category_id",
] as const;

function text(formData: FormData, key: string): string {
  return formData.get(key)?.toString().trim() ?? "";
}

// Publishes a marked photo, linked to an existing vehicle or creating a new one.
export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) return unauthorized();

  const formData = await request.formData();

  const photo = formData.get("photo");
  const photoError = validateImage(photo);
  if (photoError) return jsonError(photoError, 400);

  const photographerId = text(formData, "photographer_id");
  const location = text(formData, "location");
  if (!photographerId) return jsonError("Selecciona un fotógrafo", 400);
  if (!location) return jsonError("Selecciona una ciudad", 400);

  const body = new FormData();
  body.append("photo", photo as File);
  body.append("photographer_id", photographerId);
  body.append("location", location);

  const vehicleId = text(formData, "vehicle_id");
  if (vehicleId) {
    body.append("vehicle_id", vehicleId);
  } else {
    const missing = REQUIRED_NEW_VEHICLE_FIELDS.filter(
      (key) => !text(formData, key)
    );
    if (missing.length > 0) {
      return jsonError("Completa los datos del vehículo", 400);
    }
    for (const key of NEW_VEHICLE_FIELDS) {
      const value = text(formData, key);
      if (value) body.append(key, value);
    }
  }

  const response = await apiFetch(token, "/vehicle", { method: "POST", body });

  return passthrough(response);
}
