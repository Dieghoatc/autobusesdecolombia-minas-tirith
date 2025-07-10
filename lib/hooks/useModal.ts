import { useState } from "react";
import { ApiPhoto } from "@/services/types/photo.type";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    photo: {} as ApiPhoto,
  });

  const openModal = (photo: ApiPhoto) =>
    setIsModalOpen({ isOpen: true, photo });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, photo: {} as ApiPhoto });

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
