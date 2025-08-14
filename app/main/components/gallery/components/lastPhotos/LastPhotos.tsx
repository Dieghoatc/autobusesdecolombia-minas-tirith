"use client";

import { useRef } from "react";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel, useGetVehicle } from "@/lib/hooks";

import styles from "./LastPhotos.module.css";
import { Skeleton } from "@/components/ui/skeleton";

export function LastPhotos() {
  const { vehicles, loading } = useGetVehicle({ page: 1, limit: 10 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  if (loading) return null;

  return (
    <section className={styles.container}>
      <h3>Últimas fotografías</h3>
      <div className={styles.arrows_controls}>
        {showLeftArrow && (
          <div className={styles.arrow_left} onClick={() => scroll("left")}>
            <ChevronLeft />
          </div>
        )}
        <div className={styles.carousel} ref={sliderRef}>
          {vehicles.data.map((vehicle) => (
            <figure key={vehicle.vehicle_id}>
              <Link href={`/vehiculo/${vehicle.vehicle_id}`}>
                <div className={styles.slide}>
                  {vehicle.vehiclePhotos[0] ? (
                    <div className={styles.image_container}>
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={vehicle.vehiclePhotos[0].image_url}
                        />
                        <img src={vehicle.vehiclePhotos[0].image_url} alt="" />
                      </picture>
                      <div className={styles.overlay}></div>
                    </div>
                  ) : (
                    <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
                  )}
                </div>
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
    </section>
  );
}
