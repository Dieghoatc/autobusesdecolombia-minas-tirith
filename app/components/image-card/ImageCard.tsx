import Image from "next/image";

import { User } from "lucide-react";

import styles from "./ImageCard.module.css";

interface ImageCardProps {
  image_url: string;
  title: string;
  company?: string;
  author: string;
}

export function ImageCard({
  image_url,
  title,
  company,
  author,
}: ImageCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={image_url}
          alt={title}
          width={100}
          height={100}
        />
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <div className={styles.details}>
          <div className={styles.avatar}>
            <User />
          </div>
          <div className={styles.info}>
            <p className={styles.company}>{company}</p>
            <p className={styles.author}>{author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
