"use client";

import { useState } from "react";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { formatString } from "@/lib/helpers/formatString";

import styles from "./ImageCard.module.css";
import { Modal } from "../../../modal";
import { ModalChildren } from "../modalChildren";

interface ImageCardProps {
  photo: ApiPhotosResponse;
}

export function ImageCard({ photo }: ImageCardProps) {
  const { url, company, serial } = photo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.container}>
      <figure className={styles.image} onClick={openModal}>
        <picture>
          <source type="image/webp" srcSet={url} media="(min-width: 1200px)" />
          <source type="image/webp" srcSet={url} media="(min-width: 768px)" />
          <img
            src={url}
            role="presentation"
            loading="lazy"
            title={`Fotografía de la empresa ${company} ${
              serial !== "n/a" ? `numero ${serial}` : ""
            }`}
            alt={`autobus de la empresa ${company} ${
              serial !== "n/a" ? `numero ${serial}` : ""
            }`}
            decoding="async"
          />
        </picture>
      </figure>
      <div className={styles.title}>
        <h2>
          {formatString(company)}
          {serial && serial !== "n/a" ? ` - ${serial}` : ""}
        </h2>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <ModalChildren photo={photo} />
      </Modal>
    </div>
  );
}
