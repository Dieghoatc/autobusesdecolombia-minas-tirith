import { apiFetch, getAdminToken } from "@/lib/auth/session";

import { passthrough, unauthorized } from "../_lib/http";

// Exchanges the admin session (httpOnly cookie) for a short-lived upload token, so
// the browser can send photos straight to the API. The token only works on the API's
// photo endpoints and expires in a few minutes; the session token never leaves the server.
export async function POST() {
  const token = await getAdminToken();
  if (!token) return unauthorized();

  const response = await apiFetch(token, "/users/upload-token", { method: "POST" });
  return passthrough(response);
}
