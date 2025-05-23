"use client";

import "./card.css";
import Modal from "../Modal/Modal";
import { useState } from "react";
import { ApiPhotosResponse } from "@/app/api/dto/photo.dto";
import { formatString } from "@/app/utils";
import Link from "next/link";

import { replaceStringSpaces } from "@/app/utils/replaceStringSpaces";

interface CardProps {
  photo: ApiPhotosResponse;
}

export function Card({ photo }: CardProps) {
  const {
    url,
    company,
    serial,
    bodywork,
    chassis,
    plate,
    service,
    author,
    location,
    country,
  } = photo;

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const plateUpperCase = plate.toUpperCase();
  
  return (
    <div className="card-gallery">
      <figure className="card-gallery_image" onClick={openModal}>
        <picture>
          <source type="image/webp" srcSet={url} media="(min-width: 1200px)" />
          <source type="image/webp" srcSet={url} media="(min-width: 768px)" />
          <img
            src={url}
            role="presentation"
            loading="lazy"
            title={`Fotografía de la empresa ${company} ${serial !== "n/a" ? `numero ${serial}` : ""}`}
            alt={`autobus de la empresa ${company} ${serial !== "n/a" ? `numero ${serial}` : ""}`}
            decoding="async"
          />
        </picture>
      </figure>
      <div className="card-gallery_title">
        <h2>
          {formatString(company)}
          {serial && serial !== "n/a" ? ` - ${serial}` : ""}
        </h2>
      </div>

      <Modal onClose={closeModal} isOpen={isModalOpen}>
        <div>
          <div className="modal-photopreview_image">
            <Link
              href={`/image/${photo.photo_id}/${replaceStringSpaces(
                photo.company
              )}-${photo.serial}`}
            >
              <figure>
                <picture>
                  <source
                    type="image/webp"
                    srcSet={url}
                    media="(min-width: 1200px)"
                  />
                  <source
                    type="image/webp"
                    srcSet={url}
                    media="(min-width: 768px)"
                  />
                  <img
                    src={url}
                    loading="lazy"
                    role="presentation"
                    title={`Fotografía de la empresa ${company} ${serial && serial !== "n/a" ? `numero ${serial}` : ""}`}
                    alt={`autobus de la empresa ${company} ${serial && serial !== "n/a" ? `numero ${serial}` : ""}`}
                    decoding="async"
                  />
                </picture>
              </figure>
            </Link>
          </div>
          <div className="modal-photopreview_content">
            <div className="modal-photopreview_title">
              <h2>
                {formatString(company)}
                {serial && serial !== "n/a" ? ` - ${serial}` : ""}
              </h2>
            </div>
            <div className="modal-photopreview_details">
              <div>
                {bodywork && bodywork !== "n/a" && (
                  <p>
                    <span className="modal-photopreview_label">
                      Carroceria:{" "}
                    </span>
                    {formatString(bodywork)}
                  </p>
                )}
                {chassis && chassis !== "n/a" && (
                  <p>
                    <span className="modal-photopreview_label">Chasis: </span>
                    {formatString(chassis)}
                  </p>
                )}
                {plate && plate !== "n/a" && (
                  <p>
                    <span className="modal-photopreview_label">Placa: </span>
                    {plateUpperCase}
                  </p>
                )}
                <p>
                  <span className="modal-photopreview_label">
                    Fotógrafo/a:{" "}
                  </span>{" "}
                  {formatString(author)}
                </p>
                <p>
                  <span className="modal-photopreview_label">Ubicación: </span>
                  {formatString(location)} - {formatString(country)}
                </p>
              </div>
              <div className="modal-photopreview_company-service">
                {service && service !== "n/a" && (
                  <p>&quot;{formatString(service)}&quot;</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
