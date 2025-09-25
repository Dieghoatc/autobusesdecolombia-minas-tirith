"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import type { Model } from "@/services/types/search.type";
import { NeuropolTitle } from "@/app/components/neuropol-title";
import { Camera } from "lucide-react";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Loader } from "@/app/components/loader";
import { formatURL } from "@/lib/helpers/formatURL";

import styles from "./SearchResult.module.css";
import { ABCLoader } from "@/app/components/abc-loader";

interface SearchResultProps {
  results: Model[] | null; // null = aún cargando
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  hasNext: boolean;
}

export function SearchResults({
  results,
  setCurrentPage,
  hasNext,
}: SearchResultProps) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    if (isVisible && hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isVisible, hasNext, setCurrentPage]);

  // Caso: cargando
  if (!results) {
    return <ABCLoader />;
  }

  // Caso: sin resultados
  if (results.length === 0) {
    return (
      <section className={styles.container}>
        <NeuropolTitle>Modelos:</NeuropolTitle>
        <p className={styles.no_results}>No se encontraron resultados.</p>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <NeuropolTitle>Modelos:</NeuropolTitle>
      <article className={styles.models_container}>
        {results.map((model) => {
          const photo = model.vehicles?.[0]?.vehiclePhotos?.[0];

          return model.vehicles?.[0] ? (
            <div key={model.model_id} className={styles.card}>
              <div className={styles.card_item}>
                <Link
                  href={`/modelo/${model.model_id}/${formatURL(
                    model.model_name
                  )}`}
                >
                  <div className={styles.image}>
                    {photo ? (
                      <Image
                        src={photo.image_url}
                        alt={model.model_name}
                        fill
                        className={styles.img}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className={styles.placeholder}>
                        Imagen no disponible
                      </div>
                    )}
                    <div className={styles.overlay}></div>
                  </div>
                  <div className={styles.caption}>
                    <p className={styles.caption_title}>{model.model_name}</p>
                    {photo?.photographer?.name && (
                      <p
                        className={styles.caption_meta}
                        aria-label={`Foto por ${photo.photographer.name}`}
                      >
                        <Camera size={15} />
                        {photo.photographer.name}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ) : null;
        })}
      </article>
      {hasNext && (
        <div ref={ref} className={styles.loader}>
          <Loader />
        </div>
      )}
    </section>
  );
}
