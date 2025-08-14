import abc_logo from "@/assets/singlelogo.png";
import Image from "next/image";
import styles from "./ABCLoader.module.css";

export function ABCLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src={abc_logo.src}
          alt="autobuses de colombia logo"
          fill
          priority
          sizes="100px"
          className={styles.image}
        />
      </div>
      <div>
        <h1>Autobuses de Colombia</h1>
      </div>
    </div>
  );
}
