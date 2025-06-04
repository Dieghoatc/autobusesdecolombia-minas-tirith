import Image from "next/image";
//import location from "@/assets/icons/location.png";
//import camera from "@/assets/icons/camera.png";

import styles from "./SliderItem.module.css";

import { formatString } from "@/lib/helpers/formatString";

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
    <div className={styles.container}>
      <div className={styles.slide}>
        <Image src={data.image || ""} alt="" width={1920} height={1080} /> 
      </div>
      <div className={styles.overlay}>
        <h1>{formatString(data.title)}</h1>
      </div>
    </div>
  );
}
