import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;
const MAX_LIMIT = 30;

function positiveInt(value: string | null, fallback: number): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

// GET /api/gallery?page=2&limit=20 — next pages for the infinite gallery.
// Proxied (and cached) on the server so the browser never depends on API CORS.
export async function GET(request: NextRequest) {
  if (!API_URL) {
    return Response.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  const params = request.nextUrl.searchParams;
  const page = positiveInt(params.get("page"), 1);
  const limit = Math.min(positiveInt(params.get("limit"), 20), MAX_LIMIT);

  try {
    const response = await fetch(`${API_URL}/vehicle?page=${page}&limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      console.error(`Gallery page ${page}: API responded ${response.status}`);
      return Response.json({ error: "No se pudieron cargar las fotos" }, { status: 502 });
    }
    return Response.json(await response.json());
  } catch (error) {
    console.error(`Gallery page ${page} failed: ${error}`);
    return Response.json({ error: "No se pudieron cargar las fotos" }, { status: 502 });
  }
}
