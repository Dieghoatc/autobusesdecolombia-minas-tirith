"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeaderSearchProps {
  className?: string;
  autoFocus?: boolean;
  onSearch?: () => void;
}

export function HeaderSearch({ className, autoFocus, onSearch }: HeaderSearchProps) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const query = new FormData(form).get("busqueda")?.toString().trim();
    if (!query) return;

    router.push(`/search?busqueda=${encodeURIComponent(query)}`);
    form.reset();
    onSearch?.();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={cn("relative", className)}>
      <Search
        aria-hidden
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
      />
      <input
        type="search"
        name="busqueda"
        aria-label="Buscar vehículos"
        placeholder="Buscar vehículos..."
        autoFocus={autoFocus}
        className="h-9 w-full rounded-full bg-white/[0.04] border border-white/[0.08] pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:bg-white/[0.07] focus:border-amber-500/60"
      />
    </form>
  );
}
