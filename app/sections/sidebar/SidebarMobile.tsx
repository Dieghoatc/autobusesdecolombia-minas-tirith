'use client'

import { X } from 'lucide-react'
import Link from "next/link"

import abclogo from "@/public/assets/logos/abclogo.svg"

import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import { MenuList } from "./components/MenuList";

export function SidebarMobile() {

    const { openMobile, setOpenMobile } = useShowSidebarMenu();

    return (
        <div>
            {openMobile && (
                <aside className="fixed inset-0 w-full h-screen overflow-y-auto p-4 z-50 bg-zinc-950/95 backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-center h-16 px-2 border-b border-zinc-900 mb-4">
                        <div className="cursor-pointer">
                            <Link href="/" title="Home" onClick={() => setOpenMobile(false)}>
                                <img className="h-10 w-auto" src={abclogo.src} alt="Logo Autobuses de Colombia" />
                            </Link>
                        </div>
                        <button 
                            onClick={() => setOpenMobile(false)}
                            className="p-2 rounded-lg hover:bg-white/[0.04] text-zinc-400 hover:text-white transition-colors"
                            title="Cerrar menú"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex-1">
                        <MenuList />
                    </div>
                </aside>
            )}
        </div>
    )
}