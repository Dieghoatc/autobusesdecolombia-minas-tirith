import { useState } from "react";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { Modal } from "../modal";
import { ModalChildren } from "../modal/components/ModalChildren";

import styles from "./GalleryList.module.css";

interface GalleryListProps {
  photo: ApiPhotosResponse;
}

export function GalleryList({ photo }: GalleryListProps) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { url, company, serial } = photo;
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.container}>
        <div onClick={openModal}>
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={url}
                media="(min-width: 1200px)"
              />
              <source
                type="image/webp"
                srcSet={url}
                media="(min-width: 768px)"
              />
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
                className={styles.image}
              />
            </picture>
          </figure>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalChildren photo={photo} />
        </Modal>
    </section>
  );
}
