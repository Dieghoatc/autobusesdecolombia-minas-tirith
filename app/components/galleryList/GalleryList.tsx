"use client";

import { CldImage } from "next-cloudinary";
import { Vehicle } from "@/services/types/vehicle.type";

import styles from "./GalleryList.module.css";
import { Skeleton } from "@/app/components/ui/skeleton";
import Link from "next/link";

interface GalleryListProps {
  vehicle: Vehicle;
}

export function GalleryList({ vehicle }: GalleryListProps) {
  if (
    !vehicle ||
    !vehicle.vehiclePhotos ||
    vehicle.vehiclePhotos.length === 0
  ) {
    return (
      <section className={styles.container}>
        <Skeleton className={styles.image} />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <Link
        href={`/vehiculo/${vehicle.vehicle_id}/${vehicle.model.model_name}`}
      >
        <div className={styles.imageContainer}>
          <figure>
            <CldImage
              src={vehicle.vehiclePhotos[0].image_url}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
          </figure>
          <div className={styles.overlay}></div>
        </div>
      </Link>
    </section>
  );
}
