import { useState } from "react";
import { Vehicle } from "@/services/types/vehicle.type";
import { Modal } from "../modal";
import { ModalChildren } from "../modal/components/ModalChildren";

import styles from "./GalleryList.module.css";
import { Skeleton } from "@/components/ui/skeleton";

interface GalleryListProps {
  vehicle: Vehicle;
}

export function GalleryList({ vehicle }: GalleryListProps) {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.container}>
        <div onClick={openModal}>
          <figure>
            {vehicle.vehiclePhotos[0] ? (
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
            ) : (
              <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
            )}
          </figure>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalChildren vehicle={vehicle} />
        </Modal>
    </section>
  );
}
