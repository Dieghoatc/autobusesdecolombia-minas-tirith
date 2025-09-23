import styles from "./BentoItem.module.css";
import { Newspaper, Map } from "lucide-react";

interface BentoItemProps {
  image_url: string;
  title: string;
  category: string;
  icon: "newspaper" | "map";
}

export function BentoItem({
  image_url,
  title,
  category,
  icon,
}: BentoItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.category}>
        {icon === "newspaper" ? <Newspaper /> : <Map />}
        <span>{category}</span>
      </div>
      <div className={styles.image}>
        <img src={image_url} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.content_body}>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
}
