import { useState } from "react";
import { Photo } from "@/services/types/photo.type";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    photo: {} as Photo,
  });

  const openModal = (photo: Photo) =>
    setIsModalOpen({ isOpen: true, photo });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, photo: {} as Photo });

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
