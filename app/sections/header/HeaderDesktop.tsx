"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "lucide-react";

import abcLogo from "@/assets/abc_logo.svg";

import { DesktopNav } from "./components/DesktopNav";
import { HeaderSearch } from "./components/HeaderSearch";
import { LOGIN_HREF } from "./navigation";

export function HeaderDesktop() {
  const pathname = usePathname();
  // The home hero already has its own search
  const showSearch = pathname !== "/";

  return (
    <div className="flex h-16 items-center gap-6 px-6">
      <Link href="/" title="Inicio" className="flex-shrink-0">
        <Image src={abcLogo} alt="Autobuses de Colombia" height={40} className="h-10 w-auto" priority />
      </Link>

      <DesktopNav />

      <div className="flex flex-shrink-0 items-center gap-3">
        {showSearch && <HeaderSearch className="w-44 lg:w-60 focus-within:lg:w-72 transition-[width] duration-300" />}
        <Link
          href={LOGIN_HREF}
          className="flex h-9 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
        >
          <User aria-hidden className="w-4 h-4" />
          Ingresar
        </Link>
      </div>
    </div>
  );
}
