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
      <CategoryList category="Interdepartamentales" />
      <CategoryList category="Intermunicipales" />
      <CategoryList category="Nuestros Recuerdos" />
      {/* <CategoryList category="Turismo" /> */}
      <CategoryList category="Urbanos" />
      {/* <CategoryList category="Chivas" /> */}
      <CategoryList category="Internacionales" />
    </section>
  );
}
