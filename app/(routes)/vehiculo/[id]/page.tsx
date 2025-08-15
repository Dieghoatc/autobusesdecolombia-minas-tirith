"use client";

import { useGetVehicleById } from "@/lib/hooks";
import { useParams } from "next/navigation";
import Image from "next/image";

import { CompanyLogo } from "../components/companies";
import { VehicleModelName } from "../components/vehicleModel";

import styles from "./ImagePage.module.css";

import { VehicleDetail } from "../components/vehicleDetail/VehicleDetail";
import { VehiclePart } from "../components/vehiclePart/VehiclePart";
import { Photographer } from "../components/photographer";
import { ABCLoader } from "@/app/components/abc-loader";
import { Building2 } from "lucide-react";

import { Vehicle } from "@/services/types/vehicle.type";
import { Metadata } from "next";

interface Props {
  vehicle: Vehicle;
}

export async function generateMetadata({ vehicle }: Props): Promise<Metadata> {
  const vehicleImage = vehicle.vehiclePhotos[0].image_url;
  const vehicleModel = vehicle.model?.model_name || "";
  const companyName = vehicle.company?.company_name || "";

  return {
    title: `${vehicleModel} - ${companyName} | Autobuses de Colombia`,
    description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
    openGraph: {
      title: `${vehicleModel} - ${companyName}`,
      description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
      images: [
        {
          url: vehicleImage,
          width: 1200,
          height: 630,
          alt: `${vehicleModel} de ${companyName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${vehicleModel} - ${companyName}`,
      description: `Descubre este ${vehicleModel} de ${companyName}. Una exclusiva fotografía de nuestra colección de autobuses en Colombia.`,
      images: [vehicleImage],
    },
  };
}

export default function ImagePage() {
  const { id } = useParams<{ id: string }>();

  const { vehicle, loading } = useGetVehicleById({ id: Number(id) });

  if (loading) return <ABCLoader />;
  const vehicleImage = vehicle.vehiclePhotos[0].image_url;

  const plate = vehicle.plate;
  let companyName = "";
  let vehicleModel = "";
  let brand = "";
  let serial = "";
  let chassisBrand = "";
  let chassisName = "";
  let bodyworkBrand = "";
  let bodyworkName = "";
  let service = "";

  if (vehicle.company_id) {
    companyName = vehicle.company.company_name;
  }

  if (vehicle.company_service_id) {
    service = vehicle.companyService.company_service_name;
  }

  if (vehicle.model_id) {
    vehicleModel = vehicle.model.model_name;
    brand = vehicle.model.brand.name;

    if (vehicle.model.chassis_id) {
      chassisBrand = vehicle.model.chassis.brand.name;
      chassisName = vehicle.model.chassis.chassis_name;
    }
    if (vehicle.model.bodywork_id) {
      bodyworkBrand = vehicle.model.bodywork.brand.name;
      bodyworkName = vehicle.model.bodywork.bodywork_name;
    }

    if (vehicle.company_serial_id) {
      serial = vehicle.companySerial.company_serial_code;
    }
    if (vehicle.company_service_id) {
      service = vehicle.companyService.company_service_name;
    }
  }

  const photograper = vehicle?.vehiclePhotos[0].photographer.name;
  const location = vehicle?.vehiclePhotos[0].location;

  return (
    <section>
      <article className={styles.container}>
        <div className={styles.image}>
          <Image
            src={vehicleImage}
            alt={vehicleImage}
            width={1000}
            height={1000}
          />
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <VehicleModelName title={vehicleModel} />
            </div>
            <div className={styles.body}>
              <div className={styles.company}>
                <div className={styles.icon}>
                  <Building2 />
                </div>
                <div className={styles.info}>
                  <h2>{companyName}</h2>
                  <span>{photograper}</span>
                </div>
              </div>
              <CompanyLogo name={companyName} />
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <VehicleDetail
                plate={plate}
                serial={serial}
                service={service}
                brand={brand}
              />
            </div>
            {vehicle.model_id && vehicle.model.chassis_id && (
              <div className={styles.block}>
                <VehiclePart
                  type="chassis"
                  name={chassisName}
                  brand={chassisBrand}
                />
              </div>
            )}
            {vehicle.model_id && vehicle.model.bodywork_id && (
              <div className={styles.block}>
                <VehiclePart
                  type="bodywork"
                  name={bodyworkName}
                  brand={bodyworkBrand}
                />
              </div>
            )}
            <div className={styles.block}>
              <Photographer author={photograper} location={location} />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
