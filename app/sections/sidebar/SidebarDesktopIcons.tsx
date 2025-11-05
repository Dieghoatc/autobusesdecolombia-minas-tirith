
import { ArrowRightToLine, Bus, Factory, File, FileMinus, House, Images, Layers, Link, Mail, MapPinCheck, Newspaper, Route, Rss, User, Users } from 'lucide-react'
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
                        <li><Link href="/"><House /></Link></li>
                        <li><Link href="/noticias"><Newspaper /></Link></li>
                        <li><Link href="/empresas-de-transporte"><Bus /></Link></li>
                        <li><Link href="/empresas-fabricantes"><Factory /></Link></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li><Link href="/rutas-de-transporte"><Route /></Link></li>
                        <li><Link href="/terminales-de-transporte"><Layers /></Link></li>
                        <li><Link href="/destinos"><MapPinCheck /></Link></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li><Link href="/galerias"><Images /></Link></li>
                        <li><Link href="/nosotros"><User /></Link></li>
                        <li><Link href="/comunidad"><Users /></Link></li>
                        <li><Link href="/blog"><Rss /></Link></li>
                    </ul>
                    <ul className={`${styles.logo} flex flex-col gap-2 border-b border-gray-700 py-4`}>
                        <li><Link href="/contacto"><Mail /></Link></li>
                        <li><Link href="/politica-de-privacidad"><File /></Link></li>
                        <li><Link href="/terminos-condiciones"><FileMinus /></Link></li>
                    </ul>
                </div>
            </div>
        </aside>
    )
}