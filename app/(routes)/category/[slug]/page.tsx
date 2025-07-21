"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";

import { usePhotosCategoryById } from "@/lib/hooks";
import { Photo } from "@/services/types/photo.type";

import { GalleryList } from "@/components/galleryList";
import { PaginationGallery } from "@/components/paginationGallery/paginationGallery";
import styles from "./CategoryGallery.module.css";
import { SkeletonGallery } from "../components/SkeletonGallery";

export default function CategoryGallery() {
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { photos, loading } = usePhotosCategoryById({
    slug: slug,
    page: page,
    limit: limit,
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) return <SkeletonGallery />;

  const categoryTitle = photos.data[0].category.name;
  const categoryDescription = photos.data[0].category.description;

  return (
    <div>
      <section className={styles.container}>
        <div className={styles.header}>
          <h2>{categoryTitle}</h2>
          <p>{categoryDescription}</p>
        </div>
        <div className={styles.list}>
          {photos.data.map((photo: Photo) => (
            <GalleryList key={photo.photo_id} photo={photo} />
          ))}
        </div>
        <div className={styles.pagination}>
          <PaginationGallery pagination={photos.info} goToPage={goToPage} />
        </div>
      </section>
    </div>
  );
}
