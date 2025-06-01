"use client";

import { useParams } from "next/navigation";
import { usePhotosById } from "@/lib/hooks";
import { GalleryList } from "@/components/galleryList";
import { LoaderIntro } from "@/app/main/components/loader/LoaderIntro";

import { categoriesList } from "@/lib/constants";

import styles from "./CategoryGallery.module.css";

export default function CategoryGallery() {
  const params = useParams();
  let id_category = "1";

  if (params?.slug) {
    id_category = params.slug.toString().split("_")[0];
  }

  const selectedCategory = categoriesList.find(
    (cat) => cat.key === id_category
  );

  const { photosById, loading } = usePhotosById({
    id: selectedCategory?.id.toString() || "",
  });

  if (loading) return <LoaderIntro />;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{selectedCategory?.label}</h2>
      <div className={styles.list}>
        {photosById.map((photo) => (
          <GalleryList key={photo.photo_id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
