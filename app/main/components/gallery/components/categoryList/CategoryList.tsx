"use client";

import { useRef } from "react";
import Link from "next/link";
import { Modal, ModalChildren } from "@/components/modal";
import { useModal, useCarousel, useGetVehicleCategoryById } from "@/lib/hooks";
import { TransportCategory } from "@/services/types/transportCategories.type";

import { Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryList.module.css";
import { Skeleton } from "@/components/ui/skeleton";

interface CategoryListProps {
  transportCategory: TransportCategory;
}

export function CategoryList({ transportCategory }: CategoryListProps) {

  const { vehicles, loading } = useGetVehicleCategoryById({ id: transportCategory.transport_category_id, page: 1, limit: 10 });

  const { isModalOpen, openModal, closeModal } = useModal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{transportCategory.name}</h3>
        <Link href={`/transport-category/${transportCategory.transport_category_id}`}>
          <Ellipsis />
        </Link>
      </div>
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
            >{vehicle.vehiclePhotos[0] ? (
              <img src={vehicle.vehiclePhotos[0].image_url} alt={""} />
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
    </div>
  );
}
