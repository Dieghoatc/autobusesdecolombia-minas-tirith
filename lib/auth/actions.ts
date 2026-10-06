"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { LOGIN_PATH, SESSION_COOKIE, safeRedirectPath } from "./constants";
import { fetchProfile, isAdmin } from "./session";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;
const DEFAULT_SESSION_SECONDS = 60 * 60;

const loginSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export interface LoginState {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  email?: string;
}

// The API sets the JWT as a cookie on its own domain; we read it from the
// Set-Cookie header (or the body, if the API returns it) and keep our own
// httpOnly cookie on this domain.
function extractToken(response: Response, body: unknown): string | null {
  for (const header of response.headers.getSetCookie()) {
    const match = header.match(/(?:^|;\s*)access_token=([^;]+)/);
    if (match) return decodeURIComponent(match[1]);
  }
  if (body && typeof body === "object" && "access_token" in body) {
    const token = (body as { access_token: unknown }).access_token;
    if (typeof token === "string") return token;
  }
  return null;
}

// Expiry only — the signature is verified by the API on every request.
function tokenMaxAge(token: string): number {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64url").toString("utf8")
    ) as { exp?: number };
    if (payload.exp) {
      return Math.max(payload.exp - Math.floor(Date.now() / 1000), 0);
    }
  } catch {
    // Not a decodable JWT; fall back to the default lifetime.
  }
  return DEFAULT_SESSION_SECONDS;
}

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const values = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };

  const parsed = loginSchema.safeParse(values);
  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      email: values.email,
      fieldErrors: { email: errors.email?.[0], password: errors.password?.[0] },
    };
  }

  if (!API_URL) {
    return { email: values.email, error: "Servicio no disponible" };
  }

  let token: string | null = null;
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    if (response.ok) {
      const body = await response.json().catch(() => null);
      token = extractToken(response, body);
    }
  } catch (error) {
    console.error(`Login request failed: ${error}`);
    return { email: values.email, error: "No pudimos conectar con el servidor" };
  }

  if (!token) {
    return { email: values.email, error: "Usuario o contraseña incorrectos" };
  }

  const user = await fetchProfile(token);
  if (!isAdmin(user)) {
    return {
      email: values.email,
      error: "Tu cuenta no tiene permisos de administrador",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: tokenMaxAge(token),
  });

  redirect(safeRedirectPath(formData.get("next")?.toString()));
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect(LOGIN_PATH);
}
