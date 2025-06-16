"use client";

import { useParams } from "next/navigation";
import { useCategoryById } from "@/lib/hooks";
import { GalleryList } from "@/components/galleryList";
import { LoaderIntro } from "@/components/loader/LoaderIntro";

import { categoriesList } from "@/lib/constants";

import styles from "./CategoryGallery.module.css";

export default function CategoryGallery() {
  const params = useParams();
  
  const selectedCategory = categoriesList.find(
    (cat) => cat.key === params.slug
  );

  const { photosById, loading } = useCategoryById({
    id: selectedCategory?.id.toString() || "",
  });

  if (loading) return <LoaderIntro />;

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>{selectedCategory?.label}</h2>
      </div>
      <div className={styles.list}>
        {photosById.map((photo) => (
          <GalleryList key={photo.photo_id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
