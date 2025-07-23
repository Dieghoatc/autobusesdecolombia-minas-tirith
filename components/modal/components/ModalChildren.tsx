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
  const { image_url } = photo;
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
          title=""
          alt=""
        />
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
