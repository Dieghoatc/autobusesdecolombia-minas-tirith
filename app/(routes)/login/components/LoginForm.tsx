"use client";

import { useActionState } from "react";
import { Loader2, LogIn } from "lucide-react";

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
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={!!state.fieldErrors?.password}
          className={fieldInput}
          required
        />
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
