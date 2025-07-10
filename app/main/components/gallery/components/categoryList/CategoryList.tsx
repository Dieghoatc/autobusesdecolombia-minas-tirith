"use client";

import { useRef } from "react";
import Link from "next/link";
import { ApiPhoto } from "@/services/types/photo.type";
import { Modal, ModalChildren } from "@/components/modal";
import { useModal, useCarousel } from "@/lib/hooks";

import { Ellipsis, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./CategoryList.module.css";

interface CategoryListProps {
  category: string;
  photos: ApiPhoto[];
}

export function CategoryList({ category, photos }: CategoryListProps) {
  const { isModalOpen, openModal, closeModal } = useModal();
  const sliderRef = useRef<HTMLDivElement>(null);
  const { showLeftArrow, showRightArrow, scroll } = useCarousel(sliderRef);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{category}</h3>
        <Link href="/category/interdepartamental">
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
          {photos.slice(0, 6).map((photo) => (
            <div
              key={photo.photo_id}
              className={styles.slide}
              onClick={() => openModal(photo)}
            >
              <img src={photo.url} alt="" className={styles.image} />
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
    </div>
  );
}
