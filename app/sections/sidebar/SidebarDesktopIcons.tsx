
import { ArrowRightToLine, Bus, Factory, File, FileMinus, House, Images, Layers, Mail, MapPinCheck, Newspaper, Route, Rss, User, Users } from 'lucide-react'
import styles from "./components/MenuList.module.css"
import { useShowSidebarMenu } from "@/lib/store/useShowSidebarMenu";

export function SidebarDesktopIcons() {
    const { setOpen } = useShowSidebarMenu();

    return (
        <aside className="fixed w-14 px-2 pt-4 flex flex-col gap-5 items-center justify-center">
            <ul className='h-16 w-full flex items-center justify-center'>
                <li> <ArrowRightToLine onClick={() => setOpen(true)} /></li>
            </ul>
            <ul className={`${styles.list_item} flex flex-col gap-2`}>
                <li> <House /></li>
                <li> <Newspaper /></li>
                <li> <Bus /></li>
                <li> <Factory /></li>
            </ul>
            <ul className={`${styles.list_item} flex flex-col gap-2`}>
                <li> <Route /></li>
                <li> <Layers /></li>
                <li> <MapPinCheck /></li>
            </ul>
            <ul className={`${styles.list_item} flex flex-col gap-2`}>
                <li> <Images /></li>
                <li> <User /></li>
                <li> <Users /></li>
                <li> <Rss /></li>
            </ul>
            <ul className={`${styles.list_item} flex flex-col gap-2`}>
                <li> <Mail /></li>
                <li> <File /></li>
                <li> <FileMinus /></li>
            </ul>
        </aside>
    )
}