import type { NextRequest } from "next/server";

import { apiFetch, getAdminToken } from "@/lib/auth/session";

import { jsonError, passthrough, unauthorized } from "../../_lib/http";

const SEARCH_TYPES = ["plate", "serial"] as const;
type SearchType = (typeof SEARCH_TYPES)[number];

// GET /api/dashboard/vehicles/search?type=plate|serial&value=XYZ123
export async function GET(request: NextRequest) {
  const token = await getAdminToken();
  if (!token) return unauthorized();

  const type = request.nextUrl.searchParams.get("type") as SearchType | null;
  const value = request.nextUrl.searchParams.get("value")?.trim();

  if (!type || !SEARCH_TYPES.includes(type)) {
    return jsonError("Tipo de búsqueda inválido", 400);
  }
  if (!value) return jsonError("Ingresa un valor para buscar", 400);

  const response = await apiFetch(
    token,
    `/vehicle/${type}/${encodeURIComponent(value)}`
  );

  return passthrough(response);
}
