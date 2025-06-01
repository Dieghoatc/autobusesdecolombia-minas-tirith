"use client";

import { useState } from "react";

import { ApiPhotosResponse } from "@/services/types/photo.type";
import { Modal, ModalChildren } from "@/components/modal";
import styles from "./LastPhotos.module.css";

interface LastPhotosProps {
  photos: ApiPhotosResponse[];
}

export function LastPhotos({ photos }: LastPhotosProps) {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    photo: {} as ApiPhotosResponse,
  });

  const openModal = (photo: ApiPhotosResponse) =>
    setIsModalOpen({ isOpen: true, photo });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, photo: {} as ApiPhotosResponse });

  return (
    <section className={styles.container}>
      <h3>Últimas fotografías</h3>
      <div className={styles.fade_shadow}>
        <div className={styles.carousel}>
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
        <Modal onClose={closeModal} isOpen={isModalOpen.isOpen}>
          <ModalChildren photo={isModalOpen.photo} />
        </Modal>
      </div>
    </section>
  );
}
