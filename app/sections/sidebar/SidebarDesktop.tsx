'use client'

import Link from "next/link"
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react'
import abcLogo from '@/public/assets/logos/abclogo.svg'
import { MenuList } from "./components/MenuList"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export function SidebarDesktop() {
    const { openDesktop, setOpenDesktop } = useShowSidebarMenu();

    return (
        <aside className={`h-screen flex-shrink-0 transition-all duration-300 ${openDesktop ? 'w-64' : 'w-16'}`}>
            <div className={`
              fixed top-0 left-0 h-screen flex flex-col border-r border-zinc-800/40 bg-zinc-950/80 backdrop-blur-md transition-all duration-300 z-30
              ${openDesktop ? 'w-64 p-4' : 'w-16 p-2 items-center'}
            `}>
                <header className={`flex items-center w-full h-16 ${openDesktop ? 'justify-between px-2' : 'justify-center'}`}>
                    {openDesktop ? (
                        <>
                            <div className="cursor-pointer">
                                <Link href="/" title="Home" className="block">
                                    <img className="h-10 w-auto" src={abcLogo.src} alt="Logo Autobuses de Colombia" />
                                </Link>
                            </div>
                            <button 
                                onClick={() => setOpenDesktop(false)}
                                className="p-2 rounded-lg hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-colors"
                                title="Contraer menú"
                            >
                                <ArrowLeftToLine className="w-[18px] h-[18px]" />
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setOpenDesktop(true)}
                            className="p-2 rounded-lg hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-colors"
                            title="Expandir menú"
                        >
                            <ArrowRightToLine className="w-[18px] h-[18px]" />
                        </button>
                    )}
                </header>

                <div className="flex-1 overflow-y-auto w-full no-scrollbar mt-2">
                    <MenuList collapsed={!openDesktop} />
                </div>
            </div>
        </aside>
    )
}