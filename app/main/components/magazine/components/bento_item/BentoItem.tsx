import styles from "./BentoItem.module.css";
import { Newspaper, Map } from "lucide-react";

interface BentoItemProps {
  image_url: string;
  title: string;
  resume?: string;
  category: string;
  icon: "newspaper" | "map";
}

export function BentoItem({
  image_url,
  title,
  resume,
  category,
  icon,
}: BentoItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content_header}>
        {icon === "newspaper" ? <Newspaper /> : <Map />}
        <span>{category}</span>
      </div>
      <div className={styles.image}>
        <img src={image_url} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.content_body}>
          <h2>{title}</h2>
          {resume && <span>{resume}</span>}
        </div>
      </div>
    </div>
  );
}
