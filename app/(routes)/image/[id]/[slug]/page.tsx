"use client";

import { useParams } from "next/navigation";
//import { ImageDetails } from "./components/imagedetails";
import { usePhotoById } from "@/lib/hooks";

import "./image.css";

// import companyIcon from "@/assets/icons/company.png";
// import bodyworkIcon from "@/assets/icons/bodywork.png";
// import chassisIcon from "@/assets/icons/chassis.png";
// import serialIcon from "@/assets/icons/serial.png";
// import serviceIcon from "@/assets/icons/service.png";
// import plateIcon from "@/assets/icons/plate.png";
// import cameraIcon from "@/assets/icons/camera.png";
// import locationIcon from "@/assets/icons/location.png";

// import Metadata from "@/app/main/components/metadata/Metadata";
// import { formatString } from "@/lib/helpers/formatString";
import { ABCLoader } from "@/components/abcLoader/ABCLoader";

export default function ImageView() {
  const params = useParams();
  const { id: imageId = 1 } = params;

  const { loading } = usePhotoById(imageId.toString());

  if (loading) return <ABCLoader />;

  // const metadata = {
  //   title: `${image.company.name} - ${image.serial_company}`,
  //   description: `Fotografía de la empresa ${company.name} numero serial ${serial_company}`,
  //   image: `${image_url}`,
  //   url: `https://autobusesdecolombia.com/image/${image.photo_id}_${company.name}_${serial_company}`,
  //   author: photographer.name,
  //   publisher: "Autobuses de Colombia",
  // };

  // const title =
  //   formatString(company.name) + " - " + formatString(serial_company);

  return (
    <section>
      {/* <Metadata
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
                srcSet={image_url}
                media="min-width: 1200px"
              />
              <source
                type="image/webp"
                srcSet={image_url}
                media="min-width: 768px"
              />
              <img
                className="imageview-image"
                src={image_url}
                role="presentation"
                loading="lazy"
                title={`Fotografía de la empresa ${company} numero ${serial_company}`}
                alt={`imagen de la empresa ${company} con serial ${serial_company}`}
                decoding="async"
              />
            </picture>
          </figure>
          <h1>{title}</h1>
          <article className="imageview-info">
            <div>
              <ImageDetails
                type="empresa"
                info={company.name}
                icon={companyIcon.src}
              />
              {bodywork.model === "n/a" || bodywork.model === "" ? null : (
                <ImageDetails
                  type="carroceria"
                  info={bodywork.model}
                  icon={bodyworkIcon.src}
                />
              )}
              {chassis.model === "n/a" || chassis.model === "" ? null : (
                <ImageDetails
                  type="chasis"
                  info={chassis.model}
                  icon={chassisIcon.src}
                />
              )}
              <ImageDetails
                type="serial"
                info={serial_company}
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
                info={photographer.name}
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
      </div> */}
    </section>
  );
}
