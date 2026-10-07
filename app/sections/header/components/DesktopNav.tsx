"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { NAVIGATION, isActivePath, type NavLink } from "../navigation";

const itemBase =
  "flex items-center gap-1 h-9 px-3.5 rounded-full text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50";

// Centered nav whose groups open a full-width panel under the header
// (Radix NavigationMenu: hover/keyboard support and a shared animated viewport).
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu.Root
      delayDuration={80}
      className="static flex flex-1 justify-center"
    >
      <NavigationMenu.List className="flex items-center gap-1">
        {NAVIGATION.map((entry) => {
          if (entry.type === "link") {
            const active = isActivePath(pathname, entry.href);
            return (
              <NavigationMenu.Item key={entry.href}>
                <NavigationMenu.Link asChild active={active}>
                  <Link
                    href={entry.href}
                    className={cn(
                      itemBase,
                      active
                        ? "text-white bg-white/[0.08]"
                        : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                    )}
                  >
                    {entry.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          }

          const active = entry.items.some((item) => isActivePath(pathname, item.href));
          return (
            <NavigationMenu.Item key={entry.label}>
              <NavigationMenu.Trigger
                className={cn(
                  itemBase,
                  "group data-[state=open]:bg-white/[0.08] data-[state=open]:text-white",
                  active ? "text-white" : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {entry.label}
                <ChevronDown
                  aria-hidden
                  className="w-3.5 h-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="w-full data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out">
                <MegaPanel items={entry.items} pathname={pathname} />
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      {/* Full-width panel anchored to the bottom of the sticky header */}
      <div className="absolute inset-x-0 top-full flex justify-center">
        <NavigationMenu.Viewport className="relative w-full origin-top overflow-hidden rounded-b-3xl border-b border-x border-white/[0.06] bg-zinc-950 shadow-2xl shadow-black/60 h-[var(--radix-navigation-menu-viewport-height)] transition-[height] duration-300 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2 data-[state=closed]:animate-out data-[state=closed]:fade-out" />
      </div>
    </NavigationMenu.Root>
  );
}

function MegaPanel({ items, pathname }: { items: NavLink[]; pathname: string }) {
  return (
    <ul
      className="mx-auto grid max-w-5xl gap-2 px-6 py-10"
      style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
    >
      {items.map(({ href, label, description, icon: Icon }) => {
        const active = isActivePath(pathname, href);
        return (
          <li key={href}>
            <NavigationMenu.Link asChild active={active}>
              <Link
                href={href}
                className={cn(
                  "group/item flex gap-3 rounded-2xl p-4 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50",
                  active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                )}
              >
                <Icon
                  aria-hidden
                  className="mt-0.5 w-5 h-5 flex-shrink-0 text-zinc-400 transition-colors group-hover/item:text-amber-400"
                />
                <span>
                  <span className="block text-sm font-medium text-white">{label}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-zinc-400">
                    {description}
                  </span>
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        );
      })}
    </ul>
  );
}
