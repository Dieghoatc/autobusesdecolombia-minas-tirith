import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_ROLE, LOGIN_PATH, SESSION_COOKIE } from "./constants";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

export interface SessionUser {
  email: string;
  role: string;
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function fetchProfile(token: string): Promise<SessionUser | null> {
  if (!API_URL) return null;

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!response.ok) return null;

    const profile = (await response.json()) as Partial<SessionUser>;
    if (!profile.email) return null;

    return { email: profile.email, role: profile.role ?? "" };
  } catch (error) {
    console.error(`Failed to fetch profile: ${error}`);
    return null;
  }
}

// The API is the source of truth: the token is validated on every request,
// deduplicated within a single render with React's cache().
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = await getSessionToken();
  if (!token) return null;
  return fetchProfile(token);
});

export function isAdmin(user: SessionUser | null): user is SessionUser {
  return user?.role === ADMIN_ROLE;
}

// For Server Components / layouts: redirect when there is no admin session.
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect(LOGIN_PATH);
  if (!isAdmin(user)) redirect(`${LOGIN_PATH}?error=forbidden`);
  return user;
}

// For Route Handlers: the token of a valid admin session, or null (answer 401).
export async function getAdminToken(): Promise<string | null> {
  const [user, token] = await Promise.all([getCurrentUser(), getSessionToken()]);
  return isAdmin(user) && token ? token : null;
}

// Forward a request to the API on behalf of the session.
export function apiFetch(
  token: string,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  return fetch(`${API_URL}${path}`, { ...init, headers, cache: "no-store" });
}
