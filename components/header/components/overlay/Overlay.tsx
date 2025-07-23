import styles from "./Overlay.module.css";
import { Item } from "../Item";
import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { useTransportCategories } from "@/lib/hooks";

export function Overlay({open}: {open: boolean}) { 
  const {categories, loading} = useTransportCategories()

  return (
    <section className={`${styles.container} ${open ? "" : styles.close}`}>
      <div className={styles.content}>
        <h3>Galerias</h3>
        <div className={styles.content_categories}>
          <h4>Categorias</h4>
          <ul className={styles.content_categories_list}>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ) : (
              categories.map((category) => (
                <Item key={category.transport_category_id} category={category} />
              ))
            )}
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
