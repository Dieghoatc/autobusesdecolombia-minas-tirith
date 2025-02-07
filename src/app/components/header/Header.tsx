"use client";

import logo from "../../../assets/autobusesdecolombia_logo.png";
import Image from "next/image";
import "./header.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className="header">
      <div className="header__logo">
        <Link href="/">
          <Image
            src={logo}
            alt="autobuses de colombia logo"
            className="header__logo"
          />
        </Link>
      </div>
      <div className="header_menu">
      <Link href="/">Inicio</Link>
        <Link href="/pages/contact">Contacto</Link>
      </div>
    </div>
  );
}
