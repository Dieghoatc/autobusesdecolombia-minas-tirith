import { Bus, Factory, File, FileMinus, House, Images, Layers, Mail, MapPinCheck, Newspaper, Route, Rss, User, Users } from 'lucide-react'
import Link from "next/link"
import styles from "./MenuList.module.css"

export function MenuList() {
    return (
        <>
            <section>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-5 text-white text-sm font-semibold ">
                    <li><Link href="/"><div className={styles.list_item}><House /><span>Inicio</span></div></Link></li>
                    <li><Link href="/noticias"><div className={styles.list_item}><Newspaper /><span>Noticias</span></div></Link></li>
                    <li><Link href="/empresas-de-transporte"><div className={styles.list_item}><Bus /><span>Empresas de Transporte</span></div></Link></li>
                    <li><Link href="/empresas-fabricantes"><div className={styles.list_item}><Factory /><span>Empresas Fabricantes</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Transporte</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/rutas-de-transporte"><div className={styles.list_item}><Route /><span>Rutas</span></div></Link></li>
                    <li><Link href="/terminales-de-transporte"><div className={styles.list_item}><Layers /><span>Terminales de Transporte</span></div></Link></li>
                    <li><Link href="/destinos"><div className={styles.list_item}><MapPinCheck /><span>Destinos</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Nosotros</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/galerias"><div className={styles.list_item}><Images /><span>Galerias</span></div></Link></li>
                    <li><Link href="/quienes-somos"><div className={styles.list_item}><User /><span>Quienes Somos</span></div></Link></li>
                    <li><Link href="/comunidad"><div className={styles.list_item}><Users /><span>Comunidad</span></div></Link></li>
                    <li><Link href="/blog"><div className={styles.list_item}><Rss /><span>Blog</span></div></Link></li>
                </ul>
                <h2 className="mt-2 font-bold">Legal</h2>
                <ul className="border-b border-gray-700 flex flex-col gap-2 py-4 text-white text-sm font-semibold">
                    <li><Link href="/contacto"><div className={styles.list_item}><Mail /><span>Contacto</span></div></Link></li>
                    <li><Link href="/politica-de-privacidad"><div className={styles.list_item}><File /><span>Política de Privacidad</span></div></Link></li>
                    <li><Link href="/terminos-condiciones"><div className={styles.list_item}><FileMinus /><span>Terminos y Condiciones</span></div></Link></li>
                </ul>
            </section>
            <footer className="mt-20 font-semibold text-gray-400 text-xs text-center">
                <span>Copyright © Autobuses de Colombia 2025</span>
            </footer>
        </>
    )
}