"use client";

import { useRef } from "react";

import { Modal, ModalChildren } from "@/components/modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel, useGetVehicleCategoryById, useModal } from "@/lib/hooks";

import styles from "./LastPhotos.module.css";
import { Skeleton } from "@/components/ui/skeleton";

export function LastPhotos() {
  const { vehicles, loading } = useGetVehicleCategoryById({ id: 1, page: 1, limit: 10 });
  const { isModalOpen, openModal, closeModal } = useModal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  if (loading) return null;

  return (
    <section className={styles.container}>
      <h3>Últimas fotografías</h3>
      <div className={styles.arrows_controls}>
        {showLeftArrow && (
          <button className={styles.arrow_left} onClick={() => scroll("left")}>
            <ChevronLeft />
          </button>
        )}
        <div className={styles.carousel} ref={sliderRef}>
          {vehicles.data.map((vehicle) => (
            <figure
              key={vehicle.vehicle_id}
              className={styles.slide}
              onClick={() => openModal(vehicle)}
            >
              {vehicle.vehiclePhotos[0] ? (
                <picture>
                  <source type="image/webp" srcSet={vehicle.vehiclePhotos[0].image_url} />
                  <img src={vehicle.vehiclePhotos[0].image_url} alt="" />
                </picture>
              ) : (
                <Skeleton className="h-[125px] w-[250px] rounded-xl bg-slate-900" />
              )}
            </figure>
          ))}
        </div>
        {showRightArrow && (
          <button
            className={styles.arrow_right}
            onClick={() => scroll("right")}
          >
            <ChevronRight />
          </button>
        )}
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen.isOpen}>
        <ModalChildren vehicle={isModalOpen.vehicle} />
      </Modal>
    </section>
  );
}
