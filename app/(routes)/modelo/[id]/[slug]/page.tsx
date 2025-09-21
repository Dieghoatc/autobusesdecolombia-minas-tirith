"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useVehicleModel } from "@/lib/hooks/useVehicleModel";
import { NeuropolTitle } from "@/app/components/neuropol-title";
import { useIntersectionObserver } from "@uidotdev/usehooks";

import { ABCLoader } from "@/app/components/abc-loader";
import { Loader } from "@/app/components/loader";

import styles from "./Modelo.module.css";

export default function Modelo() {
  const params = useParams();
  const id = params.id || "1";

  const { results, loading, setCurrentPage, hasNext } = useVehicleModel({
    id: Number(id),
  });

  const [ref, entry] = useIntersectionObserver({
      threshold: 0,
      root: null,
      rootMargin: "0px",
    });

  const isVisible = !!entry?.isIntersecting;
  
    useEffect(() => {
      if (isVisible) {
        setCurrentPage((prev) => prev + 1);
      }
    }, [isVisible, setCurrentPage]);

  if (loading) {
    return <ABCLoader />
  }

  const modelName = results.model.model_name;
  
  function generateUrl(value: string){
    return value.replace(/\s/g, "-").toLowerCase();
  }

  return (
    <section className={styles.container}>
      <div className="">
        <NeuropolTitle>{modelName}</NeuropolTitle>
        <div className={styles.vehicles}>
          {results.model.vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className={styles.card}>
              {vehicle.vehiclePhotos.map((photo) => (
                <div key={photo.vehicle_photo_id} className={styles.card_item}>
                  <Link href={`/vehiculo/${vehicle.vehicle_id}/${generateUrl(modelName)}${vehicle.companySerial?.company_serial_code ? `-${generateUrl(vehicle.companySerial?.company_serial_code)}` : ""}`}>
                    <div className={styles.image}>
                      <Image
                        src={photo.image_url}
                        alt={
                          modelName +
                            " " +
                            vehicle.company.company_name +
                            " " +
                            vehicle.companySerial?.company_serial_code ||
                          photo.vehicle_photo_id.toString()
                        }
                        fill
                        className={styles.img}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={false}
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {hasNext && <div ref={ref} className={styles.loader}><Loader /></div>}
    </section>
  );
}
