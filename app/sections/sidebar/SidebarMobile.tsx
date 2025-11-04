'use client'

import { X } from 'lucide-react'
import Link from "next/link"

import abclogo from "@/public/assets/logos/abclogo.svg"

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import { MenuList } from "./components/MenuList";

export function SidebarMobile() {

    const { setOpen } = useShowSidebarMenu();

    return (
        <aside className="fixed z-50 top-0 left-0 w-14 h-dvh bg-gray-950 p-4">
            <div className="flex justify-between items-center">
                <div className="cursor-pointer">
                    <Link href="/" title="Home">
                        <img className='h-14' src={abclogo.src} alt="Logo Autobuses de Colombia" />
                    </Link>
                </div>
                <div>
                    <X onClick={() => setOpen(false)} />
                </div>
            </div>
            <MenuList />
        </aside>
    )
}