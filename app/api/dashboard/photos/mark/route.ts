import { apiFetch, getAdminToken } from "@/lib/auth/session";

import {
  jsonError,
  passthrough,
  unauthorized,
  validateImage,
} from "../../_lib/http";

// Watermarks a photo. Responds with the marked image (binary).
export async function POST(request: Request) {
  const token = await getAdminToken();
  if (!token) return unauthorized();

  const formData = await request.formData();

  const image = formData.get("image");
  const author = formData.get("author")?.toString().trim();
  const location = formData.get("location")?.toString().trim();

  const imageError = validateImage(image);
  if (imageError) return jsonError(imageError, 400);
  if (!author) return jsonError("Selecciona un fotógrafo", 400);
  if (!location) return jsonError("Selecciona una ciudad", 400);

  const body = new FormData();
  body.append("image", image as File);
  body.append("author", author);
  body.append("location", location);

  const response = await apiFetch(token, "/photo/mark/", {
    method: "POST",
    body,
  });

  return passthrough(response);
}
