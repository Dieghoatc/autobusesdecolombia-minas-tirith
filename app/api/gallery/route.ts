import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;
const MAX_LIMIT = 30;

function positiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

// GET /api/gallery?page=2&limit=20[&category=4] — next pages for the infinite
// gallery (all photos, or one transport category).
// Proxied (and cached) on the server so the browser never depends on API CORS.
export async function GET(request: NextRequest) {
  if (!API_URL) {
    return Response.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const page = positiveInt(params.get("page"), 1);
  const limit = Math.min(positiveInt(params.get("limit"), 20), MAX_LIMIT);

  const category = params.get("category");
  // A non-numeric id makes the API answer 500: reject it here
  if (category !== null && !/^\d+$/.test(category)) {
    return Response.json({ error: "Categoría inválida" }, { status: 400 });
  }
  const path = category ? `/vehicle/category/${category}` : "/vehicle";

  try {
    const response = await fetch(`${API_URL}${path}?page=${page}&limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      console.error(`Gallery ${path} page ${page}: API responded ${response.status}`);
      return Response.json({ error: "No se pudieron cargar las fotos" }, { status: 502 });
    }
    return Response.json(await response.json());
  } catch (error) {
    console.error(`Gallery ${path} page ${page} failed: ${error}`);
    return Response.json({ error: "No se pudieron cargar las fotos" }, { status: 502 });
  }
}
