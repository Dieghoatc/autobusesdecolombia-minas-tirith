import styles from "./Overlay.module.css";
import { Item } from "../Item";
import Link from "next/link";

export function Overlay({ open }: { open: boolean }) {
  return (
    <section className={`${styles.container} ${open ? "" : styles.close}`}>
      <div className={styles.content}>
        <h3>Galerias</h3>
        <div className={styles.content_categories}>
          <h4>Categorias</h4>
          <ul className={styles.content_categories_list}>
            <Item title="Interdepartamentales" />
            <Item title="Intermunicipales" />
            <Item title="Urbanos" />
            <Item title="Nuestros Recuerdos" />
            <Item title="Especial" />
            <Item title="Internacionales" />
          </ul>
        </div>
      </div>
      <div className={styles.footer}>
        <Link href="/contact">
          <p className={styles.footer_contacto}>Contacto</p>
        </Link>
        <span>Autobuses de Colombia</span>
        <span>develop by dieghoatc</span>
      </div>
    </section>
  );
}
