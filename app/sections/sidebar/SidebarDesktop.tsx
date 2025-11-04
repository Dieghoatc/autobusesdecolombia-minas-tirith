'use client'

import Link from "next/link"

import { ArrowLeftToLine } from 'lucide-react'
import abcLogo from '@/public/assets/logos/abclogo.svg'
import { MenuList } from "./components/MenuList"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import { SidebarDesktopIcons } from "./SidebarDesktopIcons";

export function SidebarDesktop() {
    const { openDesktop, setOpenDesktop } = useShowSidebarMenu();
    return (
        <>
            {openDesktop ? (
                <aside className="w-64 h-screen p-4 flex flex-col">
                    <div className="fixed">
                        <div className="flex flex-col h-screen">
                            <header className="flex items-center justify-between h-16">
                            <div className="cursor-pointer">
                                <Link href="/" title="Home">
                                    <img className='h-14' src={abcLogo.src} alt="Logo Autobuses de Colombia" />
                                </Link>
                            </div>
                            <ArrowLeftToLine onClick={() => setOpenDesktop(false)} />
                        </header>
                        <div className="flex-1 overflow-y-auto">
                            <MenuList />
                        </div>
                        </div>
                    </div>
                </aside>
            ) : (
                <SidebarDesktopIcons />
            )}
        </>
    )
}