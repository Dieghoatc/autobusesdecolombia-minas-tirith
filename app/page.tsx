'use client'

import HomePage from "./pages/home/home"
import { Sidebar } from "./sections/sidebar"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";


export default function Home() {

    const { open } = useShowSidebarMenu();

    return (
        <section className="relative">
            {open && <Sidebar />}
            <main className="">
                <HomePage />
            </main>
        </section>
    )
}
