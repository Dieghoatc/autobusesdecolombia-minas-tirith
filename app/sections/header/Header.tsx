"use client";

import { HeaderMobile } from "./HeaderMobile";
import { HeaderDesktop } from "./HeaderDesktop";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

import styles from "./Header.module.css";

export function Header() {
  return (
    <section className={styles.container}>
      {useIsMobile(768) ? <HeaderMobile /> : <HeaderDesktop />}
    </section>
  );
}
