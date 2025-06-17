"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({ children, onClose, isOpen }: ModalProps) {
  
  useEffect(() => {
    if (isOpen) {
      window.history.pushState({ modal: true }, "");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handlePopState = (e: PopStateEvent) => {
      if (isOpen) {
        onClose();
        e.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("popstate", handlePopState);
      // Opcional: limpiar el historial extra si es necesario
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {children}
      <div className={styles.button}>
        <button className={styles.close_button} onClick={onClose}>
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
