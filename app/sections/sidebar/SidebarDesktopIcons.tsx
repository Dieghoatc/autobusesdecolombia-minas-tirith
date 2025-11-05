
import { ArrowRightToLine, Bus, Factory, File, FileMinus, House, Images, Layers, Mail, MapPinCheck, Newspaper, Route, Rss, User, Users } from 'lucide-react'
import styles from "./components/MenuList.module.css"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export function SidebarDesktopIcons() {
    const { setOpenDesktop } = useShowSidebarMenu();

    return (
        <aside className="w-14 h-screen px-2 pt-4 flex flex-col items-center">
            <div className="fixed h-screen">
                <div className='flex flex-col gap-2'>
                    <ul className='h-16 w-full flex items-center justify-center'>
                        <li> <ArrowRightToLine onClick={() => setOpenDesktop(true)} /></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li> <House /></li>
                        <li> <Newspaper /></li>
                        <li> <Bus /></li>
                        <li> <Factory /></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li> <Route /></li>
                        <li> <Layers /></li>
                        <li> <MapPinCheck /></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li> <Images /></li>
                        <li> <User /></li>
                        <li> <Users /></li>
                        <li> <Rss /></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li> <Mail /></li>
                        <li> <File /></li>
                        <li> <FileMinus /></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}