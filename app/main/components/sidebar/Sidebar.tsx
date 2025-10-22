
import Link from "next/link";

export function Sidebar() {
    return (
        <aside className="flex flex-col p-3 pr-2 h-full">
            <div className="flex-1 p-3">
                <ul className="flex flex-col gap-3 font-bold text-lg">
                    <li className="text-gray-800">Inicio</li>
                    <li className="text-gray-800">Rutas</li>
                    <li className="text-gray-800">Terminales</li>
                    <li className="hover:text-gray-100 text-gray-400"><Link href="/noticias">Noticias</Link></li>
                </ul>
            </div>
            <div className="flex-1 border-t border-gray-400 p-3">
                <nav className="flex flex-col gap-3">
                    <ul className="font-bold text-lg flex flex-col gap-3">
                        <li className="text-gray-800">Categorias de Transporte</li>
                        <li className="text-gray-800">Empresas de Transporte</li>
                        <li className="text-gray-800">Marcas</li>
                        <li className="text-gray-800">Carrocerias</li>
                        <li className="text-gray-800">Plataformas y Chasis</li>
                        <li className="text-gray-800">Fabricantes</li>
                    </ul>
                    <ul className="border-t border-gray-400 pt-3 flex flex-col gap-2">
                        <li className="text-gray-800">Fotografos</li>
                        <li className="text-gray-800">Comunidad</li>
                    </ul>
                </nav>
            </div>
            <div className="flex flex-col gap-3 p-3">
                <nav>
                    <ul className="border-t border-gray-400 flex gap-3 items-center justify-center text-sm p-3">
                        <li className="text-gray-800">Facebook</li>
                        <li className="text-gray-800">Instagram</li>
                        <li className="text-gray-800">Twitter</li>
                    </ul>
                    <ul className="border-t border-gray-400 flex flex-col items-center text-sm text-gray-400 font-bold pt-3 gap-1">
                        <li className="hover:text-gray-100 text-gray-400" ><Link href="/contacto">Contacto</Link></li>
                        <li className="text-gray-400">Copyright</li>
                        <li className="hover:text-gray-100 text-gray-400"><Link href="/politica-de-privacidad">Política de Privacidad</Link></li>
                        <li className="hover:text-gray-100 text-gray-400"><Link href="/terminos-y-condiciones">Terminos y Condiciones</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="flex-shrink-0 flex items-endh justify-center mt-2">
                <span className="text-gray-400 text-sm">© 2025 Autobuses de Colombia</span>
            </div>
        </aside>
    )
}