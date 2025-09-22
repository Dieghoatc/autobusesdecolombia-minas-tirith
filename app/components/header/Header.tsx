import { HeaderMobile } from "./components/header-mobile";
import { HeaderDesktop } from "./components/header-desktop";

import styles from "./Header.module.css";

export function Header() {
  return (
    <section className={styles.container}>
      <HeaderMobile />
      <HeaderDesktop />
    </section>
  );
}
