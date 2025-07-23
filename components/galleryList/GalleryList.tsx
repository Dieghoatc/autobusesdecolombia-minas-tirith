import { useState } from "react";
import { Photo } from "@/services/types/photo.type";
import { Modal } from "../modal";
import { ModalChildren } from "../modal/components/ModalChildren";

import styles from "./GalleryList.module.css";

interface GalleryListProps {
  photo: Photo;
}

export function GalleryList({ photo }: GalleryListProps) {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { image_url } = photo
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

  return (
    <section className={styles.container}>
        <div onClick={openModal}>
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={image_url}
                media="(min-width: 1200px)"
              />
              <source
                type="image/webp"
                srcSet={image_url}
                media="(min-width: 768px)"
              />
              <img
                src={image_url}
                role="presentation"
                loading="lazy"
                title=""
                alt=""
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
