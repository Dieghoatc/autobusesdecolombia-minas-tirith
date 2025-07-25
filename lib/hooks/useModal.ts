import { useState } from "react";
import { Vehicle } from "@/services/types/vehicle.type";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    vehicle: {} as Vehicle,
  });

  const openModal = (vehicle: Vehicle) =>
    setIsModalOpen({ isOpen: true, vehicle });
  const closeModal = () =>
    setIsModalOpen({ isOpen: false, vehicle: {} as Vehicle });

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
}
