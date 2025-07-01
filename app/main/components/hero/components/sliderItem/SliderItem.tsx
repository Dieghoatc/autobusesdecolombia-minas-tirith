import Image from "next/image";

import styles from "./SliderItem.module.css";

interface SliderItemProps {
  index: number;
  category?: string;
  type: "photo" | "post" | "video";
  image?: string;
  urlVideo?: string;
  title: string;
  serial?: string;
  bodywork?: string;
  chassis?: string;
  location?: string;
  author?: string;
}

export function SliderItem(data: SliderItemProps) {
  return (
    <div
      className={styles.container + " " + styles["translation-" + data.index]}
    >
      <div className={styles.slide}>
        <Image src={data.image || ""} alt="" width={1920} height={1080} />
      </div>
      <div className={styles.overlay}>
        <div className={styles.content}>
            <h3 className={styles.title}>{data.title}</h3>
        </div>
      </div>
    </div>
  );
}
