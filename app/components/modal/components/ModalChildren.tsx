"use client";

import { CldImage } from "next-cloudinary";
import styles from "./ModalChildren.module.css";
import { Vehicle } from "@/services/types/vehicle.type";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { RotateCw } from "lucide-react";
import { Skeleton } from "@/app/components/ui/skeleton";

interface ModalChildrenProps {
  vehicle: Vehicle;
}

export function ModalChildren({ vehicle }: ModalChildrenProps) {
  const { vehiclePhotos } = vehicle;
  const [isRotated, setIsRotated] = useState(false);

  const isMobile = useIsMobile();

  const handleRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRotated(!isRotated);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.image} ${isRotated ? styles.rotated_image : ""}`}
      >
        {vehiclePhotos[0] ? (
          <CldImage
            src={vehiclePhotos[0].image_url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        ) : (
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
        )}
      </div>

      <div className={styles.car_button}>
        {/* <Link
          href={`/image/${photo.photo_id}`}
        >
          <Car size={30} />
        </Link> */}
      </div>

      {isMobile && (
        <div
          className={styles.rotate_button}
          onClick={handleRotate}
          title="Rotar imagen"
        >
          <RotateCw size={30} />
        </div>
      )}
    </div>
  );
}
