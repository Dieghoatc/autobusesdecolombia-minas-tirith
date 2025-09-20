"use client";

import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import type { Model } from "@/services/types/search.type";
import { NeuropolTitle } from "@/app/components/neuropol-title";
import { Camera } from "lucide-react";

import { useIntersectionObserver } from "@uidotdev/usehooks";
import { Loader } from "@/app/components/loader";

import styles from "./SearchResult.module.css";

interface SearchResultProps {
  results: Model[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>; // ✅
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
    if (isVisible) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isVisible, setCurrentPage]);

  if (results.length === 0) {
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
        {results.map((model) => (
          <div key={model.model_id} className={styles.card}>
            <div className={styles.card_item}>
              <Link href={``}>
                <div className={styles.image}>
                  <Image
                    src={model.vehicles[0].vehiclePhotos[0].image_url}
                    alt={model.model_name}
                    fill
                    className={styles.img}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
                <div className={styles.caption}>
                  <p className={styles.caption_title}>{model.model_name}</p>
                  <p className={styles.caption_meta}>
                    <Camera size={15} />
                    {model.vehicles[0].vehiclePhotos[0].photographer.name}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </article>
      {hasNext && <div ref={ref} className={styles.loader}><Loader /></div>}
    </section>
  );
}
