"use client";

import "./card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ApiPhotosResponse } from "@/app/api/autobusesApi.interfaces";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  capitalizeFirstLetterWithoutAccents,
} from "@/app/utils";

interface CardProps {
  photo: ApiPhotosResponse;
}

export default function Card({ photo }: CardProps) {
  const { url, company, serial, bodywork, chassis, plate, service, author, location, country } = photo;

  const plateUpperCase = plate.toUpperCase();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card-gallery">
      <div className="card-gallery__image" onClick={openModal}>
        <img src={url} alt={`autobus de la empresa ${company} con serial ${serial ==="n/a" ? "" : serial}`} />
      </div>
      <div className="card-gallery__title"> 
        <h2>
          {capitalizeWords(company)}{serial ==="n/a" ? "" : ` - ${serial}`}
        </h2>
        <p>{capitalizeFirstLetterWithoutAccents(author)}</p>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="modal-photopreview__image">
            <img src={url} alt={`autobus de la empresa ${company} con serial ${serial ==="n/a" ? "" : serial}`} />
          </div>
          <div className="modal-photopreview__title">
            <h2>
              {capitalizeFirstLetter(company)}{serial ==="n/a" ? "" : ` - ${serial}`}
            </h2>
          </div>
          <div className="modal-photopreview__details">
            <div>
            {bodywork === "n/a" || null ? null : ( 
              <p>
                <span className="modal-photopreview_label">Carroceria: </span>{" "}
                {capitalizeWords(bodywork)}
              </p>
            )}
            {chassis === "n/a" || null ? null : (
              <p>
                <span className="modal-photopreview_label">Chasis: </span>{" "}
                {capitalizeFirstLetter(chassis)}
              </p>
            )}
            {plate === "n/a" || null ? null : (
              <p>
                <span className="modal-photopreview_label">Placa: </span>{" "}
                {plateUpperCase}
              </p>
            )}
            <p>
              <span className="modal-photopreview_label">Fotógrafo/a: </span>{" "}
              {capitalizeFirstLetterWithoutAccents(author)}
            </p>
            <p>
              <span className="modal-photopreview_label">Ubicación: </span>{" "}
              {capitalizeFirstLetterWithoutAccents(location)} - {capitalizeWords(country)}
            </p>
            </div>
            <div className="modal-photopreview_company-service">
              {service === "n/a" || null ? null :(
                <p>&quot;{capitalizeFirstLetter(service)}&quot;</p>
              )}
            </div>            
          </div>
        </div>
      </Modal>
    </div>
  );
}
