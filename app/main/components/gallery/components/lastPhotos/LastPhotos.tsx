"use client";

import { ApiPhotosResponse } from "@/services/types/photo.type";
import Image from "next/image";

import styles from "./LastPhotos.module.css";

interface LastPhotosProps {
  photos: ApiPhotosResponse[];
}

export function LastPhotos({ photos }: LastPhotosProps) {
  return (
    <section className={styles.container}>
      <h3>Últimas fotografías</h3>
      <div className={styles.slide_container}>
        {photos.slice(0, 6).map((photo) => (
          <Image
            key={photo.photo_id}
            src={photo.url}
            alt="Última foto"
            width={800}
            height={450}
            priority
            className={styles.slide}
          />
        ))}
      </div>
    </section>
  );
}
