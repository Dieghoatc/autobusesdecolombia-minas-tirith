"use client";

import "./card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { PhotoApiResponse } from "@/app/api/autobusesApi.adapter";


export default function Card({ photo }: { photo: PhotoApiResponse }) {

  const {author,bodywork,company, description, engine , serial, url } = photo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  return (
    <div className="card-container">
      <div className="card-image-container" onClick={openModal}>
        <img src={url} alt={company + " - " + serial} /> 
      </div>
      <div className="card-details">
        <div className="card-item">
          <p>{company} - {serial}</p>
        </div>
      </div>
      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="preview-image">
            <img src={url} alt={company + " - " + serial} />
          </div>
          <div className="preview-title">
            <h2>{capitalizeFirstLetter(company)} - {capitalizeFirstLetter(serial)}</h2>
          </div>
          <div className="preview-details">
            <p>
              <span className="text-preview">Carroceria :</span> {capitalizeFirstLetter(bodywork)}
            </p>
            <p>
              <span className="text-preview">Motor :</span> {capitalizeFirstLetter(engine)}
            </p>
            <p>
              <span className="text-preview">Fotógrafo/a :</span> {capitalizeFirstLetter(author)}
            </p>
            <p>
            <span className="text-preview">Descripcion :</span> {description}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
