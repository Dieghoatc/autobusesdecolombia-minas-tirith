import { redirect } from "next/navigation";

import { getCurrentUser, isAdmin } from "@/lib/auth/session";
import { safeRedirectPath } from "@/lib/auth/constants";
import { glassCard } from "@/lib/constants/formStyles";

import { LoginForm } from "./components/LoginForm";

const ERROR_MESSAGES: Record<string, string> = {
  forbidden: "Tu cuenta no tiene permisos de administrador",
};

interface LoginPageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next, error } = await searchParams;

  const user = await getCurrentUser();
  if (isAdmin(user)) redirect(safeRedirectPath(next));

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center py-12">
      <div className={`w-full max-w-sm p-6 md:p-8 ${glassCard}`}>
        <h1 className="text-xl font-bold text-white mb-1 uppercase tracking-wider">
          Iniciar sesión
        </h1>
        <p className="text-sm text-zinc-400 mb-6 pb-4 border-b border-zinc-800/60">
          Acceso al panel de administración
        </p>
        <LoginForm
          next={next}
          initialError={error ? ERROR_MESSAGES[error] : undefined}
        />
      </div>
    </section>
  );
}
