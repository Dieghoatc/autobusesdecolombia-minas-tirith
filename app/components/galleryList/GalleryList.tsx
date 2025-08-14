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
      <Link href={`/vehiculo/${vehicle.vehicle_id}`}>
        <div className={styles.imageContainer}>
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={vehicle.vehiclePhotos[0].image_url}
                media="(min-width: 1200px)"
              />
              <source
                type="image/webp"
                srcSet={vehicle.vehiclePhotos[0].image_url}
                media="(min-width: 768px)"
              />
              <img
                src={vehicle.vehiclePhotos[0].image_url}
                role="presentation"
                loading="lazy"
                title=""
                alt=""
                decoding="async"
                className={styles.image}
              />
            </picture>
          </figure>
          <div className={styles.overlay}></div>
        </div>
      </Link>
    </section>
  );
}
