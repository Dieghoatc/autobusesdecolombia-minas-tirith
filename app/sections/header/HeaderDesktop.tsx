"use client";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import abcLogo from "@/assets/abc_logo.svg";
import { User, Upload } from "lucide-react";

import { Search } from "./components/search";

export function HeaderDesktop() {
  const { openDesktop } = useShowSidebarMenu();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="max-w-7xl mx-auto w-full h-14 grid grid-cols-3 items-center px-4 md:px-6">
      <div className="flex items-center">
        {!openDesktop && (
          <div className="cursor-pointer">
            <Link href="/" title="Home">
              <Image src={abcLogo.src} alt="Logo" width={150} height={50} />
            </Link>
          </div>
        )}
      </div>
      {/* El buscador del header se oculta en la home: ya está el buscador del hero */}
      {isHome ? <div /> : <Search view="desktop" searchClose={() => console.log()} />}
      <div className="flex items-center justify-end gap-4">
        <Link 
          href="/upload" 
          className="flex items-center gap-2 text-sm font-medium text-white bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] px-4 py-2 rounded-full transition-colors"
        >
          <Upload className="w-4 h-4" />
          Subir foto
        </Link>
        <Link 
          href="/login" 
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] transition-colors text-white"
        >
          <User className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}
