import { Bus, Factory, File, FileMinus, House, Images, Layers, Mail, MapPinCheck, Newspaper, Route, Rss, User, Users } from 'lucide-react'
import Link from "next/link"
import styles from "./MenuList.module.css"

export function MenuList() {
    return (
        <>
            <section>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold ">
                    <li><Link href="/"><div className={`${styles.logo} flex gap-2`}><House /><span>Inicio</span></div></Link></li>
                    <li><Link href="/noticias"><div className={`${styles.logo} flex gap-2`}><Newspaper /><span>Noticias</span></div></Link></li>
                    <li><Link href="/empresas-de-transporte"><div className={`${styles.logo} flex gap-2`}><Bus /><span>Empresas de Transporte</span></div></Link></li>
                    <li><Link href="/empresas-fabricantes"><div className={`${styles.logo} flex gap-2`}><Factory /><span>Empresas Fabricantes</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Transporte</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/rutas-de-transporte"><div className={`${styles.logo} flex gap-2`}><Route /><span>Rutas</span></div></Link></li>
                    <li><Link href="/terminales-de-transporte"><div className={`${styles.logo} flex gap-2`}><Layers /><span>Terminales de Transporte</span></div></Link></li>
                    <li><Link href="/destinos"><div className={`${styles.logo} flex gap-2`}><MapPinCheck /><span>Destinos</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Nosotros</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/galerias"><div className={`${styles.logo} flex gap-2`}><Images /><span>Galerias</span></div></Link></li>
                    <li><Link href="/quienes-somos"><div className={`${styles.logo} flex gap-2`}><User /><span>Quienes Somos</span></div></Link></li>
                    <li><Link href="/comunidad"><div className={`${styles.logo} flex gap-2`}><Users /><span>Comunidad</span></div></Link></li>
                    <li><Link href="/blog"><div className={`${styles.logo} flex gap-2`}><Rss /><span>Blog</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Legal</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/contacto"><div className={`${styles.logo} flex gap-2`}><Mail /><span>Contacto</span></div></Link></li>
                    <li><Link href="/politica-de-privacidad"><div className={`${styles.logo} flex gap-2`}><File /><span>Política de Privacidad</span></div></Link></li>
                    <li><Link href="/terminos-condiciones"><div className={`${styles.logo} flex gap-2`}><FileMinus /><span>Terminos y Condiciones</span></div></Link></li>
                </ul>
            </section>
            <footer className="mt-20 font-semibold text-gray-400 text-xs text-center">
                <span>Copyright © Autobuses de Colombia 2025</span>
            </footer>
        </>
    )
}