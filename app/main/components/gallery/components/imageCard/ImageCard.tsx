"use client";

import { useState } from "react";
import { ApiPhoto } from "@/services/types/photo.type";
import { formatString } from "@/lib/helpers/formatString";

import styles from "./ImageCard.module.css";
import { Modal, ModalChildren } from "@/components/modal";
import Image from "next/image";

interface ImageCardProps {
  photo: ApiPhoto;
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
          <source type="image/webp" srcSet={url} />
          <Image
            src={url} // Puede ser externa, asegúrate de configurar "images.domains" en next.config.js
            alt={`Foto de ${company}`}
            width={800}
            height={600}
            unoptimized // si no quieres optimización automática de Next.js
          />
        </picture>
      </figure>
      <div className={styles.title}>
        <h2>{formatString(company)}</h2>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <ModalChildren photo={photo} />
      </Modal>
    </div>
  );
}
