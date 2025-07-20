"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

import { usePhotosCategoryById } from "@/lib/hooks";
import { Photo, Info } from "@/services/types/photo.type";

import { GalleryList } from "@/components/galleryList";
import { LoaderIntro } from "@/components/loader/Loader";
import { PaginationGallery } from "@/components/paginationGallery/paginationGallery";
import Footer from "@/components/footer/Footer";
import styles from "./CategoryGallery.module.css";

export default function CategoryGallery() {
  const searchParams = useSearchParams();
  const { slug } = useParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  if (typeof slug !== "string" || slug.trim() === "") {
    return <LoaderIntro />;
  }

  const { photos, loading } = usePhotosCategoryById({
    slug: slug || "",
    page: page,
    limit: limit,
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) return <LoaderIntro />;

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
      <section>
        <Footer />
      </section>
    </div>
  );
}
