"use client";

import { useParams } from "next/navigation";
import { ImageDetails } from "./components/imagedetails";
import { usePhotoById } from "@/lib/hooks";

import "./image.css";

import company from "@/assets/icons/company.png";
import bodywork from "@/assets/icons/bodywork.png";
import chassis from "@/assets/icons/chassis.png";
import serial from "@/assets/icons/serial.png";
import service from "@/assets/icons/service.png";
import plate from "@/assets/icons/plate.png";
import camera from "@/assets/icons/camera.png";
import location from "@/assets/icons/location.png";

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

  if (loading) return <LoaderIntro />;

  const metadata = {
    title: `${image.company} - ${image.serial}`,
    description: `Fotografía de la empresa ${image.company} numero ${image.serial}`,
    image: `${image.url}`,
    url: `https://autobusesdecolombia.com/image/${image.photo_id}_${image.company}_${image.serial}`,
    author: image.author,
    publisher: "Autobuses de Colombia",
  };

  const title =
    formatString(image.company) + " - " + formatString(image.serial);

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
                srcSet={image.url}
                media="min-width: 1200px"
              />
              <source
                type="image/webp"
                srcSet={image.url}
                media="min-width: 768px"
              />
              <img
                className="imageview-image"
                src={image.url}
                role="presentation"
                loading="lazy"
                title={`Fotografía de la empresa ${image.company} numero ${image.serial}`}
                alt={`imagen de la empresa ${image.company} con serial ${image.serial}`}
                decoding="async"
              />
            </picture>
          </figure>
          <h1>{title}</h1>
          <article className="imageview-info">
            <div>
              <ImageDetails
                type="empresa"
                info={image.company}
                icon={company.src}
              />
              {image.bodywork === "n/a" || image.bodywork === "" ? null : (
                <ImageDetails
                  type="carroceria"
                  info={image.bodywork}
                  icon={bodywork.src}
                />
              )}
              {image.chassis === "n/a" || image.chassis === "" ? null : (
                <ImageDetails
                  type="chasis"
                  info={image.chassis}
                  icon={chassis.src}
                />
              )}
              <ImageDetails
                type="serial"
                info={image.serial}
                icon={serial.src}
              />
              {image.service === "n/a" || image.service === "" ? null : (
                <ImageDetails
                  type="servicio"
                  info={image.service}
                  icon={service.src}
                />
              )}
              <ImageDetails type="placa" info={image.plate} icon={plate.src} />
            </div>
            <div>
              <ImageDetails
                type="fotografo"
                info={image.author}
                icon={camera.src}
              />
              <ImageDetails
                type="localización"
                info={`${image.location} - ${image.country}`}
                icon={location.src}
              />
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
