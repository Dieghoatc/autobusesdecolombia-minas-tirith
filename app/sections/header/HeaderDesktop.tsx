"use client";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import Image from "next/image";
import Link from "next/link";
import abcLogo from "@/assets/abc_logo.svg";

import { Search } from "./components/search";


export function HeaderDesktop() {
  const { openDesktop } = useShowSidebarMenu();

  return (
    <nav className="h-14 grid grid-cols-3 items-center">
      <div className="flex items-center">
        {!openDesktop && <div className="cursor-pointer">
          <Link href="/" title="Home">
            <Image src={abcLogo.src} alt="Logo" width={150} height={50} />
          </Link>
        </div>}
      </div>
      <Search view="desktop" searchClose={() => console.log()} />
    </nav>
  );
}
