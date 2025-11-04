'use client'

import { Main } from "./sections/main"
import { SidebarMobile, SidebarDesktop, SidebarDesktopIcons } from "./sections/sidebar"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";
import { useIsMobile } from "@/lib/hooks/useIsMobile";


export default function HomePage() {
    const { open } = useShowSidebarMenu();
    const isMobile = useIsMobile();

    return (
        <section className="relative">
            {isMobile && open && <SidebarMobile />}
            <div className="flex">
                <div className="hidden md:block">
                    {open ? <div className="w-64"><SidebarDesktop /></div> :
                        <div className="w-14"><SidebarDesktopIcons /></div>
                    }
                </div>
                <main className="flex-1">
                    <Main />
                </main>
            </div>
        </section>
    )
}
