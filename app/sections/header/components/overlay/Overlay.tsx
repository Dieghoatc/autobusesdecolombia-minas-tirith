import styles from "./Overlay.module.css";
import { Item } from "../Item";
import Link from "next/link";

import { menuCategories } from "./menuCategories";

interface OverlayProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Overlay({ open, setOpen }: OverlayProps) {
  return (
    <section className={`${styles.container} ${open ? "" : styles.close}`}>
      <div className={styles.content}>
        <h3>Galerias</h3>
        <div className={styles.content_categories}>
          <h4>Categorias</h4>
          <ul className={styles.content_categories_list}>
            {menuCategories.map((category) => (
              <Item key={category.id} category={category} setOpen={setOpen} />
            ))}
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
