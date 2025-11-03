"use client";

import { HeaderMobile } from "./components/header-mobile";
import { HeaderDesktop } from "./components/header-desktop";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

import styles from "./Header.module.css";

export function Header() {
  return (
    <section className={styles.container}>
      {useIsMobile(768) ? <HeaderMobile /> : <HeaderDesktop />}
    </section>
  );
}
