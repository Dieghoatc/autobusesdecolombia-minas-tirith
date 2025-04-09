import { useEffect } from "react";
import "./modal.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export default function Modal({ children, onClose, isOpen }: ModalProps) {

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
     document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Cerrar modal al hacer clic fuera
    }
  };

  if (!isOpen) return null;

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="close-button-container">
        <button className="close-button" onClick={onClose}>
          x
        </button>
      </div>
      <div className="modal">
        <div>{children}</div>
      </div>
    </div>
  );
}
