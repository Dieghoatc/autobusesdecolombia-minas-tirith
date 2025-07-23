"use client";

import { useRef } from "react";
import Link from "next/link";
import { Photo } from "@/services/types/photo.type";
import { Modal, ModalChildren } from "@/components/modal";
import { useModal, useCarousel, usePhotosCategoryById } from "@/lib/hooks";

import { Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryList.module.css";

interface CategoryListProps {
  category: number;
  name:string;
}

export function CategoryList({ category, name }: CategoryListProps) {

  const { photos, loading } = usePhotosCategoryById({ category_id: category, page: 1, limit: 10 });

  const { isModalOpen, openModal, closeModal } = useModal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  if (loading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <Link href={`/category/${category}`}>
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
          {photos.data.map((photo: Photo) => (
            <figure
              key={photo.photo_id}
              className={styles.slide}
              onClick={() => openModal(photo)}
            >
              <img src={photo.image_url} alt={`${photo.vehicles}-${photo.vehicles}`} />
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
        <ModalChildren photo={isModalOpen.photo} />
      </Modal>
    </div>
  );
}
