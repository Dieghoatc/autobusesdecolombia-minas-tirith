"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { LOGIN_PATH, SESSION_COOKIE, safeRedirectPath } from "./constants";
import { isAdmin, type SessionUser } from "./session";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

const loginSchema = z.object({
  email: z.string().trim().email("Ingresa un correo válido"),
  password: z.string().min(1, "Ingresa tu contraseña"),
});

export interface LoginState {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  email?: string;
}

// Response of POST /users/login
interface LoginResponse {
  access_token: string;
  expires_in: number;
  user: SessionUser;
}

function isLoginResponse(body: unknown): body is LoginResponse {
  const value = body as Partial<LoginResponse> | null;
  return (
    typeof value?.access_token === "string" &&
    typeof value.expires_in === "number" &&
    typeof value.user?.role === "string"
  );
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

  let session: LoginResponse;
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
      cache: "no-store",
    });

    // 400 (rejected by validation) and 401 both mean bad credentials
    if (response.status === 400 || response.status === 401) {
      return { email: values.email, error: "Usuario o contraseña incorrectos" };
    }

    const body = await response.json().catch(() => null);
    if (!response.ok || !isLoginResponse(body)) {
      console.error(`Login failed: API responded ${response.status}`);
      return { email: values.email, error: "Servicio no disponible" };
    }
    session = body;
  } catch (error) {
    console.error(`Login request failed: ${error}`);
    return { email: values.email, error: "No pudimos conectar con el servidor" };
  }

  if (!isAdmin(session.user)) {
    return {
      email: values.email,
      error: "Tu cuenta no tiene permisos de administrador",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // Expires together with the API token
    maxAge: session.expires_in,
  });

  redirect(safeRedirectPath(formData.get("next")?.toString()));
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect(LOGIN_PATH);
}
