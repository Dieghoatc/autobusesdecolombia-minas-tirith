import Image from "next/image";
import styles from "./NeuropolTitle.module.css";
import underline from "@/assets/underline.svg";

export function NeuropolTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{children}</h1>
      <Image src={underline} alt="underline" className={styles.underline}/>
    </div>
  );
}