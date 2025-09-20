import { use } from "react";
import Image from "next/image";
import Link from "next/link";

import type { SearchResponse } from "@/services/types/search.type";

import { NeuropolTitle } from "@/app/components/neuropol-title";
import { Camera } from "lucide-react";
import styles from "./SearchResult.module.css";

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
    <section className={styles.container}>
      <NeuropolTitle>Modelos:</NeuropolTitle>
      <article className={styles.models_container}>
        {results.data.map((model) => (
          <div key={model.model_id} className={styles.card}>
            <div key={model.model_id} className={styles.cardItem}>
              <Link href={``}>
                <div className={styles.image}>
                  <Image
                    src={model.vehicles[0].vehiclePhotos[0].image_url}
                    alt={model.vehicles[0].plate}
                    fill
                    className={styles.img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className={styles.caption}>
                  <p className={styles.captionTitle}>{model.model_name}</p>
                  <p className={styles.captionMeta}>
                    <Camera size={15} />{" "}
                    {model.vehicles[0].vehiclePhotos[0].photographer.name}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}
