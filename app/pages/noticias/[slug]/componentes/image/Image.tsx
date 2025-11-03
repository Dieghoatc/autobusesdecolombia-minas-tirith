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
      <figure className={styles.image}>
        <img src={src} alt={alt} />
      </figure>
      <div className={styles.info}>
        <div className={styles.author}>
          <Camera />
          <figcaption>{photograper}</figcaption>
        </div>
        {overlay && <div className={styles.resume}>{overlay}</div>}
      </div>
    </section>
  );
}
