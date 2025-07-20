"use client";

import { useRef } from "react";

import { Modal, ModalChildren } from "@/components/modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel, useGetPhotos, useModal } from "@/lib/hooks";

import styles from "./LastPhotos.module.css";


export function LastPhotos() {
  const { photos } = useGetPhotos(1, 10);
  const { isModalOpen, openModal, closeModal } = useModal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

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
          {photos.map((photo) => (
            <div
              key={photo.photo_id}
              className={styles.slide}
              onClick={() => openModal(photo)}
            >
              <picture>
                <source type="image/webp" srcSet={photo.image_url} />
                <img src={photo.image_url} alt={photo.company.name} className={styles.image} />
              </picture>
            </div>
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
        <ModalChildren photo={isModalOpen.photo} />
      </Modal>
    </section>
  );
}
