"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { DASHBOARD_TABS } from "./tabs";

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Secciones del panel"
      className="flex gap-1 overflow-x-auto border-b border-zinc-800/60"
    >
      {DASHBOARD_TABS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              isActive
                ? "border-amber-500 text-white"
                : "border-transparent text-zinc-400 hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
