"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";

import { useGetVehicleCategoryById   } from "@/lib/hooks";

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

  const { vehicles, loading } = useGetVehicleCategoryById({
    id: Number(slug),
    page: page,
    limit: limit,
  });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) return <SkeletonGallery />;


  return (
    <div>
      <section className={styles.container}>
        <div className={styles.header}>
          {/* <h2>{categoryTitle}</h2>
          <p>{categoryDescription}</p> */}
        </div>
        <div className={styles.list}>
          {vehicles.data.map((vehicle) => (
            <GalleryList key={vehicle.vehicle_id} vehicle={vehicle} />
          ))}
        </div>
        <div className={styles.pagination}>
          <PaginationGallery pagination={vehicles.info} goToPage={goToPage} />
        </div>
      </section>
    </div>
  );
}
