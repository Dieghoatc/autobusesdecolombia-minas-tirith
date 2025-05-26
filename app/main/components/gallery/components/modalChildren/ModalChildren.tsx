import Link from "next/link";
import { replaceStringSpaces } from "@/lib/helpers/replaceStringSpaces";

import styles from "./ModalChildren.module.css";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { formatString } from "@/lib/helpers/formatString";

interface ModalChildrenProps {
  photo: ApiPhotosResponse;
}

export function ModalChildren({ photo }: ModalChildrenProps) {
  const {
    url,
    company,
    serial,
    plate,
    bodywork,
    chassis,
    author,
    location,
    country,
    service,
  } = photo;

  const plateUpperCase = plate.toUpperCase();
  return (
    <div>
      <div className={styles.image}>
        <Link
          href={`/image/${photo.photo_id}/${replaceStringSpaces(
            photo.company
          )}-${photo.serial}`}
        >
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
                loading="lazy"
                role="presentation"
                title={`Fotografía de la empresa ${company} ${
                  serial && serial !== "n/a" ? `numero ${serial}` : ""
                }`}
                alt={`autobus de la empresa ${company} ${
                  serial && serial !== "n/a" ? `numero ${serial}` : ""
                }`}
                decoding="async"
              />
            </picture>
          </figure>
        </Link>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <h2>
            {formatString(company)}
            {serial && serial !== "n/a" ? ` - ${serial}` : ""}
          </h2>
        </div>
        <div className={styles.details}>
          <div>
            {bodywork && bodywork !== "n/a" && (
              <p>
                <span className={styles.label}>Carroceria: </span>
                {formatString(bodywork)}
              </p>
            )}
            {chassis && chassis !== "n/a" && (
              <p>
                <span className={styles.label}>Chasis: </span>
                {formatString(chassis)}
              </p>
            )}
            {plate && plate !== "n/a" && (
              <p>
                <span className={styles.label}>Placa: </span>
                {plateUpperCase}
              </p>
            )}
            <p>
              <span className={styles.label}>Fotógrafo/a: </span>{" "}
              {formatString(author)}
            </p>
            <p>
              <span className={styles.label}>Ubicación: </span>
              {formatString(location)} - {formatString(country)}
            </p>
          </div>
          <div className={styles.rightcopy}>
            {service && service !== "n/a" && (
              <p>&quot;{formatString(service)}&quot;</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
