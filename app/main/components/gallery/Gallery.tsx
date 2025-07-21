import { useTransportCategories } from "@/lib/hooks";
import { TransportCategory } from "@/services/types/transportCategories.type";

import { LastPhotos } from "./components/lastPhotos";
import { CategoryList } from "./components/categoryList";

import styles from "./Gallery.module.css";

export function Gallery() {
  const categoriesList = useTransportCategories();

  return (
    <section className={styles.container} id="gallery">
      <LastPhotos />
      {categoriesList.list.map((category: TransportCategory) => (
        <CategoryList key={category.category_id} category={category.slug} name={category.name} />
      ))}
    </section>
  );
}
