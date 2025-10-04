"use client";

import React, { useEffect, useState } from "react";
import { ImageCard } from "@/app/components/image-card";
import { Loader } from "@/app/components/loader";
import { useGetVehicle } from "@/lib/hooks";
import { useWindowSize, useIntersectionObserver } from "@uidotdev/usehooks";
import { formatURL } from "@/lib/helpers/formatURL";

import Link from "next/link";
import { GallerySkeleton } from "./components/gallery-skeleton";

export function Gallery() {
  const size = useWindowSize();
  const width = size?.width ?? 0;

  const [limit] = useState(() => (width < 1440 ? 6 : 8));

  const { vehicles, loading, setCurrentPage, hasNext } = useGetVehicle({
    page: 1,
    limit,
  });

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "200px",
  });

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isVisible, hasNext, setCurrentPage]);

  if (loading && vehicles.length === 0) return <GallerySkeleton />

  return (
    <section className="w-full mt-4">
      <h3 className="text-2xl font-bold m-2">Galeria</h3>
      <article className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {vehicles.map((vehicle) =>
          vehicle.vehiclePhotos.map((photo) => (
            <div key={photo.vehicle_photo_id}>
              <Link
                href={`/vehiculo/${vehicle.vehicle_id}/${formatURL(
                  vehicle.model.model_name
                )}${
                  vehicle.company?.company_name
                    ? "-" + formatURL(vehicle.company?.company_name)
                    : ""
                }${
                  vehicle.companySerial?.company_serial_code
                    ? "-" +
                      formatURL(vehicle.companySerial?.company_serial_code)
                    : ""
                }`}
              >
                <ImageCard
                  image_url={photo.image_url}
                  title={vehicle.model.model_name}
                  company={vehicle.company?.company_name ?? ""}
                  author={photo.photographer}
                />
              </Link>
            </div>
          ))
        )}
      </article>
      {hasNext && (
        <div ref={ref} className="flex justify-center align-center">
          <Loader />
        </div>
      )}
    </section>
  );
}
