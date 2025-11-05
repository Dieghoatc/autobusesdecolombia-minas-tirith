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
                <aside className="fixed w-full h-screen overflow-y-auto p-4 z-50 bg-gray-950">
                    <div className="flex justify-between items-center">
                        <div className="cursor-pointer">
                            <Link href="/" title="Home">
                                <img className='h-14' src={abclogo.src} alt="Logo Autobuses de Colombia" />
                            </Link>
                        </div>
                        <div>
                            <X onClick={() => setOpenMobile(false)} />
                        </div>
                    </div>
                    <MenuList />
                </aside>
            )}
        </div>
    )
}