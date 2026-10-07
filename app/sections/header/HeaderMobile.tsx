"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User, X } from "lucide-react";

import { cn } from "@/lib/utils";
import logo from "@/public/assets/logos/abc_logo_single.svg";

import { HeaderSearch } from "./components/HeaderSearch";
import { LOGIN_HREF, NAVIGATION, isActivePath } from "./navigation";

const iconButton =
  "flex h-10 w-10 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white";

export function HeaderMobile() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Lock page scroll behind the full-screen menu
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      <div className="flex h-14 items-center justify-between px-4">
        <Link href="/" title="Inicio" onClick={closeAll}>
          <Image
            src={logo}
            alt="Autobuses de Colombia"
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              setMenuOpen(false);
            }}
            aria-label="Buscar"
            aria-expanded={searchOpen}
            className={iconButton}
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={iconButton}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="px-4 pb-3">
          <HeaderSearch autoFocus onSearch={closeAll} />
        </div>
      )}

      {/* Portaled: the header's backdrop-filter would otherwise become the
          containing block of this fixed panel and clip it to the header. */}
      {menuOpen &&
        createPortal(
          <nav
            id="mobile-menu"
            aria-label="Menú principal"
            className="fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto bg-zinc-950 px-4 pb-8 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <ul className="flex flex-col gap-6 pt-4">
              {NAVIGATION.map((entry) =>
                entry.type === "link" ? (
                  <li key={entry.href}>
                    <Link
                      href={entry.href}
                      onClick={closeAll}
                      className={cn(
                        "block rounded-xl px-3 py-2 text-lg font-semibold",
                        isActivePath(pathname, entry.href)
                          ? "text-amber-400"
                          : "text-white",
                      )}
                    >
                      {entry.label}
                    </Link>
                  </li>
                ) : (
                  <li key={entry.label}>
                    <p className="px-3 mb-1 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                      {entry.label}
                    </p>
                    <ul className="flex flex-col">
                      {entry.items.map(
                        ({ href, label, description, icon: Icon }) => (
                          <li key={href}>
                            <Link
                              href={href}
                              onClick={closeAll}
                              className={cn(
                                "flex gap-3 rounded-xl px-3 py-2.5",
                                isActivePath(pathname, href)
                                  ? "bg-white/[0.06]"
                                  : "active:bg-white/[0.04]",
                              )}
                            >
                              <Icon
                                aria-hidden
                                className="mt-0.5 w-5 h-5 flex-shrink-0 text-zinc-400"
                              />
                              <span>
                                <span className="block text-sm font-medium text-white">
                                  {label}
                                </span>
                                <span className="block text-xs text-zinc-400">
                                  {description}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </li>
                ),
              )}
            </ul>

            <Link
              href={LOGIN_HREF}
              onClick={closeAll}
              className="mt-8 flex h-11 items-center justify-center gap-2 rounded-full bg-white text-sm font-semibold text-black"
            >
              <User aria-hidden className="w-4 h-4" />
              Ingresar
            </Link>
            <p className="mt-8 text-center text-[11px] text-zinc-600">
              &copy; {new Date().getFullYear()} Autobuses de Colombia
            </p>
          </nav>,
          document.body,
        )}
    </>
  );
}
