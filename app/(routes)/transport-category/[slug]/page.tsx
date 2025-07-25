"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";

import { useGetVehicleCategoryById } from "@/lib/hooks";

import { GalleryList } from "@/components/galleryList";
import { PaginationGallery } from "@/components/paginationGallery/paginationGallery";

import styles from "./CategoryGallery.module.css";
import { SkeletonGallery } from "../components/SkeletonGallery";
import { useTransportCategoryStore } from "@/lib/store/useTransportCategoryStore";

export default function CategoryGallery() {
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { transportCategories, loading: loadingCategories } =
    useTransportCategoryStore();

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

  if (loading || loadingCategories) return <SkeletonGallery />;

  const category = transportCategories.find(
    (category) => category.transport_category_id === Number(slug)
  );
  const categoryTitle = category?.name.split(" ") || "";
  const categoryDescription = category?.description || "";

  return (
    <div>
      <section className={styles.container}>
          <div className="w-full bg-black flex flex-col md:flex-row items-center justify-center px-4 py-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">  
            <span className="text-white">{categoryTitle[0] + " "}</span>            
            <span className="text-amber-500">{categoryTitle[1]}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              {categoryDescription}
            </p>
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
