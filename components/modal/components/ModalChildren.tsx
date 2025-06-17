import styles from "./ModalChildren.module.css";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Car, RotateCw } from "lucide-react";
import Link from "next/link";

interface ModalChildrenProps {
  photo: ApiPhotosResponse;
}

export function ModalChildren({ photo }: ModalChildrenProps) {
  const { url, company, serial } = photo;
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
        <img
          src={url}
          loading="lazy"
          decoding="async"
          role="presentation"
          title={`Fotografía de la empresa ${company} ${
            serial && serial !== "n/a" ? `número ${serial}` : ""
          }`}
          alt={`Autobús de la empresa ${company} ${
            serial && serial !== "n/a" ? `número ${serial}` : ""
          }`}
        />
      </div>

      <div className={styles.car_button}>
        <Link
          href={`/image/${photo.photo_id}/${photo.company}-${photo.serial}`}
        >
          <Car size={30} />
        </Link>
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
