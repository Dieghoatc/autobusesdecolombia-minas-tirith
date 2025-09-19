import { use } from "react";
import Image from "next/image";

import type { SearchResponse } from "@/services/types/search.type";

import styles from "./SearchResult.module.css";
import { Camera } from "lucide-react";

export function SearchResults({
  searchPromise,
}: {
  searchPromise: Promise<SearchResponse>;
}) {
  const results = use(searchPromise);

  if (results.data.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {results.data.map((model) => (
        <div key={model.model_id} className={styles.card}>
          {model.vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className={styles.cardItem}>
              {vehicle.vehiclePhotos.map((photo) => (
                <div key={photo.vehicle_photo_id}>
                  <div className={styles.image}>
                    <Image
                      src={photo.image_url}
                      alt={vehicle.plate}
                      fill
                      className={styles.img}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className={styles.caption}>
                    <p className={styles.captionTitle}>{model.model_name}</p>
                    <p className={styles.captionMeta}>
                      {" "}
                      <Camera size={15} /> {photo.photographer.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
