import { useGetPhotos } from "@/lib/hooks/useGetPhotos";

import SkeletonComponent from "../skeleton/Skeleton";
import { LastPhotos } from "./components/lastPhotos";
import { CategoryList } from "./components/categoryList";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { photos, loading } = useGetPhotos(1);

  if (loading || !photos) return <SkeletonComponent />;

  return (
    <section className={styles.container} id="gallery">
      <LastPhotos photos={photos.data} />
      <CategoryList photos={photos.data} category="Interdepartamentales" />
      <CategoryList photos={photos.data} category="Intermunicipales" />
      <CategoryList photos={photos.data} category="Nuestros Recuerdos" />
      <CategoryList photos={photos.data} category="Turismo" />
      <CategoryList photos={photos.data} category="Urbanos" />
      <CategoryList photos={photos.data} category="Chivas" />
      <CategoryList photos={photos.data} category="Internacionales" />
    </section>
  );
}
