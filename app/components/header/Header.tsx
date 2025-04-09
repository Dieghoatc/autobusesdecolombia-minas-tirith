"use client";

import logo from "../../assets/abclogo_1.png";
import Image from "next/image";
import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link href="/" title="Ir a la página de inicio">
          <Image
            src={logo}
            title="Logo de Autobuses de Colombia"
            alt="autobuses de colombia logo"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header_menu">
      <Link href="/" title="Ir a la página de inicio">Inicio</Link>
        <Link href="/contact" title="Ir a la página de contacto">Contacto</Link>
      </div>
    </div>
  );
}
