import { Camera } from "lucide-react";
import styles from "./Image.module.css";

interface ImageProps {
  src: string;
  alt: string;
  overlay?: string;
  photograper: string;
}

export function Image({ src, alt, overlay, photograper }: ImageProps) {
  return (
    <section>
      <div className={styles.container}>
        <figure>
          <img src={src} alt={alt} />
        </figure>
      </div>
      <div className={styles.author}>
        <Camera />
        <figcaption>{photograper}</figcaption>
      </div>
      {overlay && <div className={styles.overlay}>{overlay}</div>}
    </section>
  );
}
