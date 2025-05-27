'use client'

import { useEffect } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({ children, onClose, isOpen }: ModalProps) {

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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.button}>
        <button className={styles.close_button} onClick={onClose}>
          x
        </button>
      </div>
      <div className={styles.modal_container}>
        <div>{children}</div>
      </div>
    </div>
  );
}
