import Image from "next/image";
import { vehicleQueryById } from "@/services/api/vehicleById.query";
import { VehicleModelName } from "./components/vehicleModel";
import styles from "./ImagePage.module.css";
import { VehicleDetail } from "./components/vehicleDetail/VehicleDetail";
import { VehiclePart } from "./components/vehiclePart/VehiclePart";
import { Photographer } from "./components/photographer";
import { Building2 } from "lucide-react";
import { notFound } from "next/navigation";

interface ImagePageProps {
  params: Promise<{ id: string; slug: string }>;
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { id } = await params;
  const vehicle = await vehicleQueryById(Number(id));

  if (!vehicle || !vehicle.vehiclePhotos || vehicle.vehiclePhotos.length === 0) {
    notFound();
  }

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

  if (vehicle.company_id && vehicle.company) { 
    companyName = vehicle.company.company_name; 
  }
  
  if (vehicle.company_service_id && vehicle.companyService) { 
    service = vehicle.companyService.company_service_name; 
  }
  
  if (vehicle.model_id && vehicle.model) {
    vehicleModel = vehicle.model.model_name;
    
    if (vehicle.model.brand) {
      brand = vehicle.model.brand.name;
    }
    
    if (vehicle.model.chassis_id && vehicle.model.chassis) { 
      if (vehicle.model.chassis.brand) {
        chassisBrand = vehicle.model.chassis.brand.name; 
      }
      chassisName = vehicle.model.chassis.chassis_name; 
    }
    
    if (vehicle.model.bodywork_id && vehicle.model.bodywork) { 
      if (vehicle.model.bodywork.brand) {
        bodyworkBrand = vehicle.model.bodywork.brand.name; 
      }
      bodyworkName = vehicle.model.bodywork.bodywork_name; 
    }
    
    if (vehicle.company_serial_id && vehicle.companySerial) { 
      serial = vehicle.companySerial.company_serial_code; 
    }
    
    if (vehicle.company_service_id && vehicle.companyService) { 
      service = vehicle.companyService.company_service_name; 
    }
  }

  const photograper = vehicle?.vehiclePhotos[0]?.photographer?.name || "Desconocido";
  const location = vehicle?.vehiclePhotos[0]?.location || "Desconocido";

  return (
    <section>
      <article className={styles.container}>
        <div className={`${styles.image} select-none`} onContextMenu={(e) => e.preventDefault()}>
          <Image 
            src={vehicleImage} 
            alt={vehicleModel || "Vehículo"} 
            width={1000} 
            height={1000} 
            className="pointer-events-none select-none"
          />
          <div className={`${styles.overlay} z-10 cursor-default`}></div>
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
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.block}>
              <VehicleDetail plate={plate} serial={serial} service={service} brand={brand} />
            </div>
            {vehicle.model_id && vehicle.model?.chassis_id && (
              <div className={styles.block}>
                <VehiclePart type="chassis" name={chassisName} brand={chassisBrand} />
              </div>
            )}
            {vehicle.model_id && vehicle.model?.bodywork_id && (
              <div className={styles.block}>
                <VehiclePart type="bodywork" name={bodyworkName} brand={bodyworkBrand} />
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
