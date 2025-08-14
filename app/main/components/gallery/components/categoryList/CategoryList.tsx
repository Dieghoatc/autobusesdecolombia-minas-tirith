"use client";

import { useRef } from "react";
import Link from "next/link";
import { useCarousel, useGetVehicleCategoryById } from "@/lib/hooks";
import { TransportCategory } from "@/services/types/transportCategories.type";

import { Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryList.module.css";
import { Skeleton } from "@/app/components/ui/skeleton";

interface CategoryListProps {
  transportCategory: TransportCategory;
}

export function CategoryList({ transportCategory }: CategoryListProps) {
  const { vehicles, loading } = useGetVehicleCategoryById({
    id: transportCategory.transport_category_id,
    page: 1,
    limit: 10,
  });

  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{transportCategory.name}</h3>
        <Link
          href={`/transport-category/${transportCategory.transport_category_id}`}
        >
          <Ellipsis />
        </Link>
      </div>
      <div className={styles.arrows_controls}>
        {showLeftArrow && (
          <div className={styles.arrow_left} onClick={() => scroll("left")}>
            <ChevronLeft />
          </div>
        )}
        <div className={styles.carousel} ref={sliderRef}>
          {vehicles.data.map((vehicle) => (
            <figure key={vehicle.vehicle_id} className={styles.slide}>
              <Link href={`/vehiculo/${vehicle.vehicle_id}`}>
                {vehicle.vehiclePhotos[0] ? (
                  <div className={styles.image_container}>
                    <img src={vehicle.vehiclePhotos[0].image_url} alt={""} />
                    <div className={styles.overlay}></div>
                  </div>
                ) : (
                  <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
                )}
              </Link>
            </figure>
          ))}
        </div>
        {showRightArrow && (
          <div className={styles.arrow_right} onClick={() => scroll("right")}>
            <ChevronRight />
          </div>
        )}
      </div>
    </div>
  );
}
