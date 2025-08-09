"use client";

import { useState } from "react";
import { useGetVehicleById } from "@/lib/hooks";
import { useParams } from "next/navigation";

import { CompanyLogo } from "../components/companies";
import { VehicleBrandName } from "../components/vehicleBrand";
import { Brand } from "../components/brand";

import styles from "./ImagePage.module.css";
import BodyworkLogo from "@/assets/vehicle/bodywork.png";
import ChassisLogo from "@/assets/vehicle/chassis.png";
import { Camera, Car, Eye, EyeOff, MapPin } from "lucide-react";

export default function ImagePage() {
  const [isShow, setIsShow] = useState(true);
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const { vehicle, loading } = useGetVehicleById({ id: Number(id) });

  const handleClick = () => {
    setIsShow(!isShow);
  };

  if (loading) return null;
  const vehicleImage = vehicle.vehiclePhotos[0].image_url;

  let companyLogo = "";
  let vehicleModel = "";
  let brand = "";
  let serial = "";
  let chassis = "";
  let chassisName = "";
  let bodywork = "";
  let bodyworkName = "";

  if (!vehicle.company === null) {
    companyLogo = vehicle.company.company_name;
  }

  if (!vehicle.model === null) {
    vehicleModel = vehicle.model.model_name;
    brand = vehicle.model.brand.name;

    if (!vehicle.model.chassis === null) {
      chassis = vehicle.model.chassis.brand.name;
      chassisName = vehicle.model.chassis.chassis_name;
    }

    if (!vehicle.model.bodywork === null) {
      bodyworkName = vehicle.model.bodywork.bodywork_name;
      bodywork = vehicle.model.bodywork.brand.name;
    }
  }
  const plate = vehicle.plate;

  if (!vehicle.companySerial === null) {
    serial = vehicle.companySerial.company_serial_code;
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
            <VehicleBrandName title={vehicleModel} isShow={isShow} />
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
                  <div className={styles.description}>
                    <div className={styles.model}>
                      <h2>Placa</h2>
                      <p>{plate}</p>
                    </div>
                    <div>
                      <h2>Serial</h2>
                      <p>{serial}</p>
                    </div>
                  </div>
                </div>
              </div>
              {bodywork && (
                <div className={styles.block}>
                  <div className={styles.item_container}>
                    <div className={styles.assets}>
                      <div className={styles.logo}>
                        <img src={ChassisLogo.src} alt="chassis" />
                      </div>
                      <Brand name={chassis} />
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
              {chassis && (
                <div className={styles.block}>
                  <div className={styles.item_container}>
                    <div className={styles.assets}>
                      <div className={styles.logo}>
                        <img src={BodyworkLogo.src} alt="bodywork" />
                      </div>
                      <Brand name={bodywork} />
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
