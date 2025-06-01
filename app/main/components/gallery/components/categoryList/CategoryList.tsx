import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { usePhotosById } from "@/lib/hooks/usePhotosById";
import { ApiPhotosResponse } from "@/services/types/photo.type";

import { Modal } from "../modal";
import { ModalChildren } from "../modalChildren";

import { orderById } from "@/lib/helpers/orderById";
import { formatString } from "@/lib/helpers/formatString";
import styles from "./CategoryList.module.css";

interface CategoryListProps {
  category: string;
}

const categoriesList = [
  { key: "interdepartamental", label: "Interdepartamentales", id: 1 },
  { key: "intermunicipal", label: "Intermunicipales", id: 2 },
  { key: "nuestros_recuerdos", label: "Nuestros Recuerdos", id: 5 },
  { key: "especial", label: "Especiales", id: 3 },
  { key: "mixto", label: "Mixto", id: 4 },
  { key: "urbanos", label: "Urbanos", id: 6 },
  { key: "internacionales", label: "Internacionales", id: 8 },
];

export function CategoryList({ category }: CategoryListProps) {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    photo: {} as ApiPhotosResponse,
  });

  const openModal = (photo: ApiPhotosResponse) =>
    setIsModalOpen({ isOpen: true, photo });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, photo: {} as ApiPhotosResponse });

  const selectedCategory = categoriesList.find((cat) => cat.key === category);

  const { photoById, loading } = usePhotosById({
    id: selectedCategory?.id.toString() || "",
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{selectedCategory?.label}</h2>
        <Link href={`/category/${category}`}>
          <span>Ver más</span>
        </Link>
      </div>
      <div className={styles.carousel}>
        {orderById(photoById, "photo_id")
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
