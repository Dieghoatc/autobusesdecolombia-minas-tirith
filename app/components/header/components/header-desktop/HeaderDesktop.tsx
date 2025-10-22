"use client";

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "lucide-react";

import { Menu } from "lucide-react";
import ABCLogo from "@/assets/abc_logo.svg";

import { Search } from "../search";


export function HeaderDesktop() {
  const { open, setOpen } = useShowSidebarMenu();

  return (
    <nav className="grid grid-cols-3 items-center">
      <div className="flex items-center">
        <div className="cursor-pointer rounded-full hover:bg-gray-800 p-2">
          <Menu onClick={() => setOpen(!open)} />
        </div>
        <div className="cursor-pointer">
          <Link href="/" title="Home">
            <Image src={ABCLogo.src} alt="Logo" width={150} height={50} />
          </Link>
        </div>
      </div>
      <Search view="desktop" searchClose={() => setOpen(false)} />
      <div className="flex justify-self-end items-center">
        <Link href="/" title="Home">
          <HomeIcon />
        </Link>
      </div>
    </nav>
  );
}
