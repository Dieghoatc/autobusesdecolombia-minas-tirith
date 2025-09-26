import Image from "next/image";

import { User } from "lucide-react";

import styles from "./ImageCard.module.css";

import bpc from "@/assets/logos-authors/bpc.png";
import { Photographer } from "@/services/types/vehicle.type";

const userLogos = [{ id: 4, logo: bpc }];

interface ImageCardProps {
  image_url: string;
  title: string;
  company?: string;
  author: Photographer;
}

export function ImageCard({
  image_url,
  title,
  company,
  author,
}: ImageCardProps) {


  const userLogo = userLogos.find((logo) => logo.id === author.photographer_id);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image src={image_url} alt={title} width={100} height={100} />
      </div>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <div className={styles.details}>
          <div className={styles.avatar}>
            {userLogo ? (
              <Image
                src={userLogo.logo}
                alt={author.name}
                width={50}
                height={50}
              />
            ) : (
              <User />
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.company}>{company}</p>
            <p className={styles.author}>{author.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
