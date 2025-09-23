"use client";

import Image from "next/image";
import { Gallery } from "./components/gallery/Gallery";
import { Magazine } from "./components/magazine";

import Banner1 from "@/assets/destinations/BOG25.svg"

import Banner2 from "@/assets/destinations/BOG25-2.svg"
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
          <Image src={Banner1.src} alt="bienal bogota 2025" width={1920} height={1080} />
      </div>
      <div className={styles.content}>
        <Magazine />
        <Gallery />
      </div>
      <div className={styles.banner}>
          <Image src={Banner2.src} alt="bienal bogota 2025" width={1920} height={1080} />
      </div>
    </div>
  );
}
