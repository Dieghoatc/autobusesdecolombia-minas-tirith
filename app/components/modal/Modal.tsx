"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

export function Modal({ children, onClose, isOpen }: ModalProps) {
  // Read through a ref so a new onClose identity (parent re-render, e.g. the
  // infinite gallery loading a page) never re-runs the history effect below,
  // which used to pop the entry and close the modal on its own.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // While open: one extra history entry so the browser/phone back button
  // closes the modal instead of leaving the page, and the page can't scroll.
  useEffect(() => {
    if (!isOpen) return;

    // Keep the current entry's state (Next.js router data, gallery key)
    window.history.pushState({ ...window.history.state, modal: true }, "");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handlePopState = () => onCloseRef.current();
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = previousOverflow;
      // Closed from the UI: drop the entry we pushed
      if (window.history.state?.modal) {
        window.history.back();
      }
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
      {children}
      <div className={styles.button}>
        <button className={styles.close_button} onClick={onClose}>
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
