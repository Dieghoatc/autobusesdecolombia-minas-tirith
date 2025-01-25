"use client";

import "./card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ApiResponse } from "@/app/api/autobusesApi.adapter";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  capitalizeFirstLetterWithoutAccents,
} from "@/app/utils";

interface CardProps {
  photo: ApiResponse;
}

export default function Card({ photo }: CardProps) {
  const {
    author,
    bodywork,
    company,
    description,
    chassis,
    serial,
    url,
    plate,
  } = photo;

  const plateUpperCase = plate.toUpperCase();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="card-container">
      <div className="card-image" onClick={openModal}>
        <img src={url} alt={company + " - " + serial} />
      </div>
      <div className="card-details">
        <div className="card-item">
          <h2>
            {capitalizeWords(company)} - {serial}
          </h2>
        </div>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="preview-image">
            <img src={url} alt={company + " - " + serial} />
          </div>
          <div className="preview-title">
            <h2>
              {capitalizeFirstLetter(company)} - {capitalizeFirstLetter(serial)}
            </h2>
          </div>
          <div className="preview-details">
            <p>
              <span className="text-preview">Carroceria :</span>{" "}
              {capitalizeWords(bodywork)}
            </p>
            {chassis === "n/a" || null ? null : (
              <p>
                <span className="text-preview">Chasis :</span>{" "}
                {capitalizeFirstLetter(chassis)}
              </p>
            )}
            {plate === "n/a" || null ? null : (
              <p>
                <span className="text-preview">Placa :</span> {plateUpperCase}
              </p>
            )}
            <p>
              <span className="text-preview">Fotógrafo/a :</span>{" "}
              {capitalizeFirstLetterWithoutAccents(author)}
            </p>
            <p>
              <span className="text-preview">Descripcion :</span>{" "}
              {capitalizeFirstLetterWithoutAccents(description)}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
