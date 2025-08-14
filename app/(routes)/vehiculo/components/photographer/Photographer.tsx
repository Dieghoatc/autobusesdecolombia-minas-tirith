

import { MapPin } from "lucide-react";
import { LogoCard } from "../logoCard";
import styles from "./Photographer.module.css";

interface PhotographerProps {
  author: string;
  location: string;
}

export function Photographer({ author, location }: PhotographerProps) {
  return (
    <div>
      <div className={styles.header}>
        <LogoCard logo="camera" />
        <div className={styles.info}>
          <h2 className={styles.author}>
            Fotógrafo/a: <span>{author}</span>
          </h2>
          <div className={styles.location}>
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
