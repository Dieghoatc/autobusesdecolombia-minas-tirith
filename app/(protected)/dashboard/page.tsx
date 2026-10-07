import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { requireAdmin } from "@/lib/auth/session";
import { glassCard } from "@/lib/constants/formStyles";

import { DASHBOARD_TABS } from "./_components/tabs";

export default async function DashboardPage() {
  const user = await requireAdmin();
  const sections = DASHBOARD_TABS.filter((tab) => tab.href !== "/dashboard");

  return (
    <div className="space-y-6">
      <section className={`p-6 ${glassCard}`}>
        <h2 className="text-lg font-semibold text-white">Bienvenido</h2>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-zinc-500 uppercase text-xs tracking-wider">Correo</dt>
            <dd className="text-zinc-200">{user.email}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 uppercase text-xs tracking-wider">Rol</dt>
            <dd className="text-zinc-200 capitalize">{user.role}</dd>
          </div>
        </dl>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ href, label, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`group p-5 flex items-center gap-4 hover:border-amber-500/40 transition-colors ${glassCard}`}
          >
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400">
              <Icon className="w-5 h-5" />
            </span>
            <span className="flex-1">
              <span className="block font-medium text-white">{label}</span>
              <span className="block text-sm text-zinc-400">{description}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400" />
          </Link>
        ))}
      </section>
    </div>
  );
}
