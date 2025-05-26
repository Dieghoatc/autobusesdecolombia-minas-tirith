"use client";

import { useParams } from "next/navigation";
import { ImageDetails } from "./components/imagedetails";
import { useGetPhoto } from "./hooks/useGetPhoto";
import "./image.css";

import company from "../../../assets/icons/company.png";
import bodywork from "../../../assets/icons/bodywork.png";
import chassis from "../../../assets/icons/chassis.png";
import serial from "../../../assets/icons/serial.png";
import service from "../../../assets/icons/service.png";
import plate from "../../../assets/icons/plate.png";
import camera from "../../../assets/icons/camera.png";
import location from "../../../assets/icons/location.png";
import Metadata from "@/app/main/components/metadata/Metadata";
import { formatString } from "@/lib/helpers/formatString";
import { LoaderIntro } from "@/app/main/components/loader/LoaderIntro";

export default function Imageview() {
  const params = useParams();
  let id_image = "1";

  if (params?.id) {
    id_image = params?.id.toString().split("_")[0];
  }
  const { photo, loading } = useGetPhoto(id_image);

  if (loading) return <LoaderIntro />;

  const metadata = {
    title: `${photo.company} - ${photo.serial}`,
    description: `Fotografía de la empresa ${photo.company} numero ${photo.serial}`,
    image: `${photo.url}`,
    url: `https://autobusesdecolombia.com/image/${photo.photo_id}_${photo.company}_${photo.serial}`,
    author: photo.author,
    publisher: "Autobuses de Colombia",
  };

  const title = formatString(photo.company) + " - " + formatString(photo.serial);

  return (
    <>
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
                    srcSet={photo.url}
                    media="min-width: 1200px"
                  />
                  <source
                    type="image/webp"
                    srcSet={photo.url}
                    media="min-width: 768px"
                  />
            </picture>
            <img
              className="imageview-image"
              src={photo.url}
              role="presentation"
              loading="lazy"
              title= {`Fotografía de la empresa ${photo.company} numero ${photo.serial}`}
              alt={`imagen de la empresa ${photo.company} con serial ${photo.serial}`}
              decoding="async"
            />
          </figure>
          <h1>{title}</h1>
          <article className="imageview-info">
            <div>
              <ImageDetails
                type="empresa"
                info={photo.company}
                icon={company.src}
              />
              {photo.bodywork === "n/a" || photo.bodywork === "" ? null : (
                <ImageDetails
                  type="carroceria"
                  info={photo.bodywork}
                  icon={bodywork.src}
                />
              )}
              {photo.chassis === "n/a" || photo.chassis === "" ? null : (
                <ImageDetails
                  type="chasis"
                  info={photo.chassis}
                  icon={chassis.src}
                />
              )}
              <ImageDetails
                type="serial"
                info={photo.serial}
                icon={serial.src}
              />
              {photo.service === "n/a" || photo.service === "" ? null : (
                <ImageDetails
                  type="servicio"
                  info={photo.service}
                  icon={service.src}
                />
              )}
              <ImageDetails type="placa" info={photo.plate} icon={plate.src} />
            </div>
            <div>
              <ImageDetails
                type="fotografo"
                info={photo.author}
                icon={camera.src}
              />
              <ImageDetails
                type="localización"
                info={`${photo.location} - ${photo.country}`}
                icon={location.src}
              />
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
