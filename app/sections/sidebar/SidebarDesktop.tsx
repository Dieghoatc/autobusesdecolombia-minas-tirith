'use client'

import Link from "next/link"

import { ArrowLeftToLine } from 'lucide-react'
import abcLogo from '@/public/assets/logos/abclogo.svg'
import { MenuList } from "./components/MenuList"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export function SidebarDesktop() {
    const { setOpen } = useShowSidebarMenu();
    return (
        <aside className="fixed bg-gray-950 w-64 h-dvh p-4">
            <header className="flex items-center justify-between h-16">
                <div className="cursor-pointer">
                    <Link href="/" title="Home">
                        <img className='h-14' src={abcLogo.src} alt="Logo Autobuses de Colombia" />
                    </Link>
                </div>
                <ArrowLeftToLine onClick={() => setOpen(false)} />
            </header>
            <MenuList />
        </aside>
    )
}