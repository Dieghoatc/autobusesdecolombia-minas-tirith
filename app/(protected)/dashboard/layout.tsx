import type { Metadata } from "next";
import { LogOut } from "lucide-react";

import { logout } from "@/lib/auth/actions";
import { requireAdmin } from "@/lib/auth/session";
import { secondaryButton } from "@/lib/constants/formStyles";

import { DashboardNav } from "./_components/DashboardNav";

export const metadata: Metadata = {
  title: "Panel | Autobuses de Colombia",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="max-w-7xl mx-auto w-full py-6 space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white uppercase tracking-wider">
            Panel de administración
          </h1>
          <p className="text-sm text-zinc-400">{user.email}</p>
        </div>
        <form action={logout}>
          <button type="submit" className={`px-4 py-2 text-sm ${secondaryButton}`}>
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </form>
      </header>

      <DashboardNav />

      {children}
    </div>
  );
}
