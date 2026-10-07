import "server-only";

export function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

export const unauthorized = () => jsonError("No autorizado", 401);

const API_ERROR_MESSAGES: Record<number, string> = {
  400: "Los datos enviados no son válidos",
  401: "Tu sesión expiró. Vuelve a iniciar sesión.",
  403: "Tu cuenta no tiene permisos de administrador",
  404: "El vehículo no existe",
};

// Re-emit the API response, keeping only the headers the client needs.
// Errors are translated to { error } (the shape the dashboard client reads);
// the API's own message is logged on the server.
export async function passthrough(response: Response): Promise<Response> {
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    console.error(`API ${response.url} responded ${response.status}: ${body}`);
    return jsonError(
      API_ERROR_MESSAGES[response.status] ?? "Error del servidor, intenta de nuevo",
      response.status >= 500 ? 502 : response.status
    );
  }

  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  return new Response(response.body, { status: response.status, headers });
}
