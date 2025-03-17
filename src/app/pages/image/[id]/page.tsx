"use client";

import { useParams } from "next/navigation";
import { ImageDetails } from "./components/imagedetails";
import "./image.css";

import company from "@/assets/icons/company.png";
import bodywork from "@/assets/icons/bodywork.png";
import chassis from "@/assets/icons/chassis.png";
import serial from "@/assets/icons/serial.png";
import service from "@/assets/icons/service.png";
import plate from "@/assets/icons/plate.png";
import camera from "@/assets/icons/camera.png";
import location from "@/assets/icons/location.png";
import { useGetPhoto } from "../../hooks/useGetPhoto";

export default function Imageview() {
  const params = useParams();
  let id_image = "1";
  if (params?.id) {
    id_image = params?.id.toString().split("_")[0];
  }

  const { photo, loading, metadata } = useGetPhoto(id_image);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <meta
        property="og:url"
        content={`https://autobusesdecolombia.com/pages/image/${id_image}_${photo.company}_${photo.serial}`}
      />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={metadata.title}/>
      <meta
        property="og:description"
        content={metadata.description}
      />
      <meta
        property="og:image"
        content={metadata.image}
      />

      <div className="imageview-container">
        <div>
          <img
            className="imageview-image"
            src={photo.url}
            alt={`imagen de la empresa ${photo.company} con serial ${photo.serial}`}
          />
          <div className="imageview-info">
            <div>
              <ImageDetails
                type="empresa"
                info="Auto Fusa S.A."
                icon={company.src}
              />
              <ImageDetails
                type="carroceria"
                info={photo.bodywork}
                icon={bodywork.src}
              />
              <ImageDetails
                type="chasis"
                info={photo.chassis}
                icon={chassis.src}
              />
              <ImageDetails
                type="serial"
                info={photo.serial}
                icon={serial.src}
              />
              <ImageDetails
                type="servicio"
                info={photo.service}
                icon={service.src}
              />
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
          </div>
        </div>
      </div>
    </>
  );
}
