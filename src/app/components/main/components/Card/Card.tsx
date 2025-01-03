"use client";

import "./card.css";
//import image from "../../../../../assets/gallery/1404-copetran.jpeg";
import Modal from "../Modal/Modal";
import { useState } from "react";

interface CardProps {
  url: string;
  company: string;
  bodywork: string;
  engine: string;
  serial: string;
}

export default function Card({ url, company, bodywork, engine, serial }: CardProps) {
  console.log(url);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card-container">
      <div className="card-image-container" onClick={openModal}>
        <img src={url} alt="card-image" />
      </div>
      <div className="card-details">
        <div className="card-item">
          <p>{company} - {serial}</p>
        </div>
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="preview-image">
            <img src={url} alt="image-preview" />
          </div>
          <div className="preview-title">
            <h2>{company} - {serial}</h2>
          </div>
          <div className="preview-details">
            <p>
              <span className="text-preview">Carroceria :</span> {bodywork}
            </p>
            <p>
              <span className="text-preview">Motor :</span> {engine}
            </p>
            <p>
              <span className="text-preview">Fotógrafo/a :</span>
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
