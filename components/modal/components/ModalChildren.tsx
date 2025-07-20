import styles from "./ModalChildren.module.css";
import { Photo } from "@/services/types/photo.type";
import { useState } from "react";
import { useIsMobile } from "@/lib/hooks/useIsMobile";
import { Car, RotateCw } from "lucide-react";
import Link from "next/link";

interface ModalChildrenProps {
  photo: Photo;
}

export function ModalChildren({ photo }: ModalChildrenProps) {
  const { image_url, company: { name }, serial_company } = photo;
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
          src={image_url}
          loading="lazy"
          decoding="async"
          role="presentation"
          title={`Fotografía de la empresa ${name} ${
            serial_company && serial_company !== "n/a" ? `número ${serial_company}` : ""
          }`}
          alt={`Autobús de la empresa ${name} ${
            serial_company && serial_company !== "n/a" ? `número ${serial_company}` : ""
          }`}
        />
      </div>

      <div className={styles.car_button}>
        <Link
          href={`/image/${photo.photo_id}/${name}-${serial_company}`}
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
