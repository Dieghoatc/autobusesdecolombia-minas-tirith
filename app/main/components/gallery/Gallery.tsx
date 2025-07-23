import { LastPhotos } from "./components/lastPhotos";
import { CategoryList } from "./components/categoryList";

import styles from "./Gallery.module.css";
import { useTransportCategories } from "@/lib/hooks";

export function Gallery() {
  const { categories } = useTransportCategories();

  return (
    <section className={styles.container} id="gallery">
      <LastPhotos />
      {categories.map((category) => (
        <CategoryList
          key={category.transport_category_id}
          category={category.transport_category_id}
          name={category.name}
        />
      ))}
    </section>
  );
}
