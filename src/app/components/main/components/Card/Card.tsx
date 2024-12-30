"use client";

import "./card.css";
import image from "../../../../../assets/gallery/1404-copetran.jpeg";
import Modal from "../Modal/Modal";
import { useState } from "react";

export default function Card() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card-container">
      <div className="card-image-container" onClick={openModal}>
        <img src={image.src} alt="card-image" />
      </div>
      <div className="card-details">
        <div className="card-item">
          <p>Copetran 1404</p>
        </div>
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="preview-image">
            <img src={image.src} alt="image-preview" />
          </div>
          <div className="preview-title">
            <h2>Copetran 1404</h2>
          </div>
          <div className="preview-details">
            <p><span className="text-preview">Carroceria :</span> Marcopolo</p>
            <p><span className="text-preview">Motor :</span> Chevrolet </p>
            <p><span className="text-preview">Fotógrafo/a :</span></p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
