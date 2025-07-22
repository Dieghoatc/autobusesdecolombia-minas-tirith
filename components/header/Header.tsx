"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useTransportCategories } from "@/lib/hooks";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Overlay } from "./components/overlay";

import styles from "./Header.module.css";

import logo from "@/assets/singlelogo.png";
import logoLarge from "@/assets/logox2.png";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={styles.container}>
      <div className={styles.container_menu}>
        <div className={styles.menu_mobile}>
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(false)}
              >
                <X className={styles.xmenu} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(true)}
              >
                <Menu className={styles.listMenu} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className={styles.logo}>
          <Image
            src={logo}
            alt="Logo de Autobuses de Colombia"
            title="Logo de Autobuses de Colombia"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.login}></div>
        <div className={styles.logo_large}>
          <Image
            src={logoLarge}
            alt="Logo de Autobuses de Colombia"
            title="Logo de Autobuses de Colombia"
            width={180}
            height={100}
          />
        </div>
        <div className={styles.menu_desktop}>
          <ul>
            <li>
              <Link href="/">Inicio</Link>
            </li>
            <li>
              <Link href="/posts">Noticias</Link>
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
      <Overlay open={open} />
    </div>
  );
}
