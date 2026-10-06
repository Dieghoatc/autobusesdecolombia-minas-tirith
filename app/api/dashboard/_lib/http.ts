import "server-only";

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;

export function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

export const unauthorized = () => jsonError("No autorizado", 401);

// Re-emit the API response, keeping only the headers the client needs.
export function passthrough(response: Response): Response {
  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  return new Response(response.body, { status: response.status, headers });
}

export function validateImage(value: FormDataEntryValue | null): string | null {
  if (!(value instanceof File) || value.size === 0) {
    return "Selecciona una fotografía";
  }
  if (!ALLOWED_IMAGE_TYPES.includes(value.type)) {
    return "Solo se permiten archivos JPG, PNG, AVIF o WebP";
  }
  if (value.size > MAX_IMAGE_BYTES) {
    return "El archivo debe ser menor a 10MB";
  }
  return null;
}
