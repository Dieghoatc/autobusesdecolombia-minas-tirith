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
      <div onClick={openModal}>
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
        <div className={styles.content}>
          <h1>{vehicle.vehicle_id}</h1>
          <h2 className={styles.title}>
            {vehicle.model ? vehicle.model.model_name : ""}
          </h2>
          <p>{vehicle.company.company_name}</p>
          <p>{vehicle.plate}</p>
          <p>
            {vehicle.companySerial
              ? vehicle.companySerial.company_serial_code
              : ""}
          </p>
          <p>
            {vehicle.companySerial
              ? vehicle.companySerial.company.company_name
              : ""}
          </p>
          <p>
            {vehicle.companyService
              ? vehicle.companyService.company_service_name
              : ""}
          </p>
          <p>
            {vehicle.companyService
              ? vehicle.companyService.company.company_name
              : ""}
          </p>
          <p>
            {vehicle.vehiclePhotos[0].photographer.name
              ? vehicle.vehiclePhotos[0].photographer.name
              : ""}
          </p>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalChildren vehicle={vehicle} />
      </Modal>
    </section>
  );
}
