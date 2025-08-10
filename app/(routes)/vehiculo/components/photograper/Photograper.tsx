import { MapPin } from "lucide-react";
import styles from "./Photograper.module.css";
import { LogoCard } from "../logoCard";

interface PhotograperProps {
  author: string;
  location: string;
}

export function Photograper({ author, location }: PhotograperProps) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoCard logo="camera" />
      </div>
      <div className={styles.author}>
        <h2>
          Fotografo/a: <span>{author}</span>
        </h2>
      </div>
      <div className={styles.photolocation}>
        <MapPin />
        <span>{location}</span>
      </div>
    </div>
  );
}
