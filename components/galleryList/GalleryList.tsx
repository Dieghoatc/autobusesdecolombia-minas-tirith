import styles from "./GalleryList.module.css";
import { formatString } from "@/lib/helpers/formatString";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import Link from "next/link";

interface GalleryListProps {
  photo: ApiPhotosResponse;
}

export function GalleryList({ photo }: GalleryListProps) {
  const { url, company, serial } = photo;

  return (
    <section className={styles.container}>
      <Link href={`/image/${photo.photo_id}/${photo.company}-${photo.serial}`}>
        <div>
          <figure>
            <picture>
              <source
                type="image/webp"
                srcSet={url}
                media="(min-width: 1200px)"
              />
              <source
                type="image/webp"
                srcSet={url}
                media="(min-width: 768px)"
              />
              <img
                src={url}
                role="presentation"
                loading="lazy"
                title={`Fotografía de la empresa ${company} ${
                  serial !== "n/a" ? `numero ${serial}` : ""
                }`}
                alt={`autobus de la empresa ${company} ${
                  serial !== "n/a" ? `numero ${serial}` : ""
                }`}
                decoding="async"
                className={styles.image}
              />
            </picture>
          </figure>
        </div>
        <div className={styles.title}>
          <h2>{formatString(company)}</h2>
        </div>
      </Link>
    </section>
  );
}
