"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { login, type LoginState } from "@/lib/auth/actions";
import {
  fieldError,
  fieldInput,
  fieldLabel,
  primaryButton,
} from "@/lib/constants/formStyles";

interface LoginFormProps {
  next?: string;
  initialError?: string;
}

export function LoginForm({ next, initialError }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(
    login,
    { error: initialError }
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {next && <input type="hidden" name="next" value={next} />}

      <div className="space-y-1.5">
        <Label htmlFor="email" className={fieldLabel}>
          Correo
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="correo@ejemplo.com"
          defaultValue={state.email}
          aria-invalid={!!state.fieldErrors?.email}
          className={fieldInput}
          required
        />
        {state.fieldErrors?.email && (
          <p className={fieldError}>{state.fieldErrors.email}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="password" className={fieldLabel}>
          Contraseña
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            aria-invalid={!!state.fieldErrors?.password}
            className={`pr-10 ${fieldInput}`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPassword}
            aria-controls="password"
            className="absolute inset-y-0 right-0 flex w-10 items-center justify-center rounded-r-xl text-zinc-500 transition-colors hover:text-zinc-200 focus-visible:outline-none focus-visible:text-amber-400"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {state.fieldErrors?.password && (
          <p className={fieldError}>{state.fieldErrors.password}</p>
        )}
      </div>

      {state.error && (
        <p
          role="alert"
          className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2"
        >
          {state.error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className={`w-full py-3 ${primaryButton}`}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Ingresando...
          </>
        ) : (
          <>
            <LogIn className="w-4 h-4" />
            Ingresar
          </>
        )}
      </Button>
    </form>
  );
}
