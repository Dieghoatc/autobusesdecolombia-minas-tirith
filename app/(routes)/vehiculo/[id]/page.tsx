"use client";

import { useState } from "react";
import { useGetVehicleById } from "@/lib/hooks";
import { useParams } from "next/navigation";

import { CompanyLogo } from "../components/companies";
import { VehicleModelName } from "../components/vehicleModel";
import { Brand } from "../components/brand";

import styles from "./ImagePage.module.css";
import BodyworkLogo from "@/assets/vehicle/bodywork.png";
import ChassisLogo from "@/assets/vehicle/chassis.png";
import { Camera, Car, Eye, EyeOff, MapPin } from "lucide-react";
import { VehicleDetail } from "../components/vehicleDetail/VehicleDetail";

export default function ImagePage() {
  const [isShow, setIsShow] = useState(true);
  const { id } = useParams<{ id: string }>();

  const { vehicle, loading } = useGetVehicleById({ id: Number(id) });

  const handleClick = () => {
    setIsShow(!isShow);
  };

  if (loading) return null;
  const vehicleImage = vehicle.vehiclePhotos[0].image_url;

  const plate = vehicle.plate;
  let companyLogo = "";
  let vehicleModel = "";
  let brand = "";
  let serial = "";
  let chassisBrand = "";
  let chassisName = "";
  let bodyworkBrand = "";
  let bodyworkName = "";
  let service = "";

  if (vehicle.company_id) {
    companyLogo = vehicle.company.company_name;
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
    <section className={styles.wrapper}>
      <article className={styles.container}>
        <div className={styles.vehicleImage}>
          <div>
            <img src={vehicleImage} alt="image" />
          </div>
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <CompanyLogo isShow={isShow} name={companyLogo} />
            <VehicleModelName title={vehicleModel} isShow={isShow} />
            <div className={styles.controlview} onClick={handleClick}>
              {isShow ? <Eye /> : <EyeOff />}
            </div>
          </div>

          {isShow && (
            <div className={styles.blocks}>
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <Car />
                    </div>
                    <Brand name={brand} />
                  </div>
                  <VehicleDetail
                    plate={plate}
                    serial={serial}
                    service={service}
                  />
                </div>
              </div>
              {vehicle.model_id && vehicle.model.chassis_id && (
                <div className={styles.block}>
                  <div className={styles.item_container}>
                    <div className={styles.assets}>
                      <div className={styles.logo}>
                        <img src={ChassisLogo.src} alt="chassis" />
                      </div>
                      <Brand name={chassisBrand} />
                    </div>
                    <div className={styles.description}>
                      <div>
                        <h2>Chassis</h2>
                        <p>{chassisName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {vehicle.model_id && vehicle.model.bodywork_id && (
                <div className={styles.block}>
                  <div className={styles.item_container}>
                    <div className={styles.assets}>
                      <div className={styles.logo}>
                        <img src={BodyworkLogo.src} alt="bodywork" />
                      </div>
                      <Brand name={bodyworkBrand} />
                    </div>
                    <div className={styles.description}>
                      <div>
                        <h2>Carroceria</h2>
                        <p>{bodyworkName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.block}>
                <div className={styles.item_container}>
                  <div className={styles.assets}>
                    <div className={styles.logo}>
                      <Camera />
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div>
                      <h2>Fotografo/a</h2>
                      <p>{photograper}</p>
                      <div className={styles.photolocation}>
                        <MapPin />
                        <p>{location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
