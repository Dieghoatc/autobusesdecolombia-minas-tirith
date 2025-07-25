import { LastPhotos } from "./components/lastPhotos";
import { CategoryList } from "./components/categoryList";

import styles from "./Gallery.module.css";
import { useTransportCategories } from "@/lib/hooks";

export function Gallery() {
  const { transportCategories } = useTransportCategories();

  return (
    <section className={styles.container} id="gallery">
      <LastPhotos />
      {transportCategories.map((category) => (
        <CategoryList
          key={category.transport_category_id}
          transportCategory={category}
        />
      ))}
    </section>
  );
}
