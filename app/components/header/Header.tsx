import Image from "next/image";
import Link from "next/link";
import { HeaderMobile } from "./components/header-mobile";

import styles from "./Header.module.css";
import logoLarge from "@/assets/logo-mobile.svg";

export function Header() {
  return (
    <section> 
      <HeaderMobile />
      <div className={styles.menu_desktop}>
        <div className={styles.logo_desktop}>
          <Image
            src={logoLarge}
            alt="Logo de Autobuses de Colombia"
            title="Logo de Autobuses de Colombia"
          />
        </div>
        <div className={styles.links}>
          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/noticias">Noticias</Link>
            </li>
            <li>
              <Link href="#gallery">Galerias</Link>
            </li>
            <li>
              <Link href="/contact">Contacto</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
