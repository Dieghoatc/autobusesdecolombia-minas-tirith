import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useCategoryById } from "@/lib/hooks/useCategoryById";
import { ApiPhotosResponse } from "@/services/types/photo.type";

import { Modal, ModalChildren } from "@/components/modal";

import { orderById } from "@/lib/helpers/orderById";
import { formatString } from "@/lib/helpers/formatString";

import { categoriesList } from "@/lib/constants";

import styles from "./CategoryList.module.css";
import { SkeletonCatList } from "./components/SkeletonCatList";

export function CategoryList({ category }: { category: string }) {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    photo: {} as ApiPhotosResponse,
  });

  const openModal = (photo: ApiPhotosResponse) =>
    setIsModalOpen({ isOpen: true, photo });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, photo: {} as ApiPhotosResponse });

  const selectedCategory = categoriesList.find((cat) => cat.key === category);

  const { photosById, loading } = useCategoryById({
    id: selectedCategory?.id.toString() || "",
  });

  if (loading) return <SkeletonCatList />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{selectedCategory?.label}</span>
        <Link href={`/category/${selectedCategory?.key}`}>
          <span>Ver más</span>
        </Link>
      </div>
      <div className={styles.carousel}>
        {orderById(photosById, "photo_id")
          .slice(0, 6)
          .map((photo: ApiPhotosResponse) => (
            <div
              key={photo.photo_id}
              className={styles.slide}
              onClick={() => openModal(photo)}
            >
              <Image
                key={photo.photo_id}
                src={photo.url}
                alt=""
                width={800}
                height={450}
                className={styles.image}
              />
              <div className={styles.info}>
                <p>{formatString(photo.company)}</p>
              </div>
            </div>
          ))}
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen.isOpen}>
        <ModalChildren photo={isModalOpen.photo} />
      </Modal>
    </div>
  );
}
