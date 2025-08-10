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
      <div>
        <LogoCard logo="camera" />
      </div>
      <div className={styles.description}>
        <div>
          <h2>Fotografo/a</h2>
          <span>{author}</span>
          <div className={styles.photolocation}>
            <MapPin />
            <span>{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
