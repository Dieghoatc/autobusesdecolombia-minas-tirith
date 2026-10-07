// Shared by proxy.ts (edge of the request) and the server-only session code.
// Keep this file free of server-only imports.

export const SESSION_COOKIE = "abc_session";
export const ADMIN_ROLE = "admin";

export const LOGIN_PATH = "/login";
export const DASHBOARD_PATH = "/dashboard";

// Only allow redirects back into the dashboard (prevents open redirects via ?next=)
export function safeRedirectPath(next: string | null | undefined): string {
  if (next && next.startsWith(DASHBOARD_PATH) && !next.startsWith("//")) {
    return next;
  }
  return DASHBOARD_PATH;
}
