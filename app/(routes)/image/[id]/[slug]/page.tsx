"use client";

import { useParams } from "next/navigation";
import { ImageDetails } from "./components/imagedetails";
import { usePhotoById } from "@/lib/hooks";

import "./image.css";

import companyIcon from "@/assets/icons/company.png";
import bodyworkIcon from "@/assets/icons/bodywork.png";
import chassisIcon from "@/assets/icons/chassis.png";
import serialIcon from "@/assets/icons/serial.png";
import serviceIcon from "@/assets/icons/service.png";
import plateIcon from "@/assets/icons/plate.png";
import cameraIcon from "@/assets/icons/camera.png";
import locationIcon from "@/assets/icons/location.png";

import Metadata from "@/app/main/components/metadata/Metadata";
import { formatString } from "@/lib/helpers/formatString";
import { LoaderIntro } from "@/components/loader/LoaderIntro";

export default function ImageView() {
  const params = useParams();

  let imageId = "1";

  if (params.id) {
    imageId = Array.isArray(params.id) ? params.id[0] : params.id;
  }

  const { image, loading } = usePhotoById(imageId);
  const { data } = image;
  const { company, serial, url, author, bodywork, chassis, service, plate, location, country } = data;

  if (loading) return <LoaderIntro />;

  const metadata = {
    title: `${company} - ${serial}`,
    description: `Fotografía de la empresa ${company} numero ${serial}`,
    image: `${url}`,
    url: `https://autobusesdecolombia.com/image/${data.photo_id}_${company}_${serial}`,
    author: author,
    publisher: "Autobuses de Colombia",
  };

  const title =
    formatString(company) + " - " + formatString(serial);

  return (
    <section>
      <Metadata
        title={metadata.title}
        description={metadata.description}
        image={metadata.image}
        url={metadata.url}
        author={metadata.author}
      />
      <div className="imageview-container">
        <section>
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={data.url}
                media="min-width: 1200px"
              />
              <source
                type="image/webp"
                srcSet={data.url}
                media="min-width: 768px"
              />
              <img
                className="imageview-image"
                src={url}
                role="presentation"
                loading="lazy"
                title={`Fotografía de la empresa ${company} numero ${serial}`}
                alt={`imagen de la empresa ${company} con serial ${serial}`}
                decoding="async"
              />
            </picture>
          </figure>
          <h1>{title}</h1>
          <article className="imageview-info">
            <div>
              <ImageDetails
                type="empresa"
                info={company}
                icon={companyIcon.src}
              />
              {bodywork === "n/a" || bodywork === "" ? null : (
                <ImageDetails
                  type="carroceria"
                  info={bodywork}
                  icon={bodyworkIcon.src}
                />
              )}
              {chassis === "n/a" || chassis === "" ? null : (
                <ImageDetails
                  type="chasis"
                  info={chassis}
                  icon={chassisIcon.src}
                />
              )}
              <ImageDetails
                type="serial"
                info={serial}
                icon={serialIcon.src}
              />
              {service === "n/a" || service === "" ? null : (
                <ImageDetails
                  type="servicio"
                  info={service}
                  icon={serviceIcon.src}
                />
              )}
              <ImageDetails type="placa" info={plate} icon={plateIcon.src} />
            </div>
            <div>
              <ImageDetails
                type="fotografo"
                info={author}
                icon={cameraIcon.src}
              />
              <ImageDetails
                type="localización"
                info={`${location} - ${country}`}
                icon={locationIcon.src}
              />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
