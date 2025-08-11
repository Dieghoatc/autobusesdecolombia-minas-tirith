import styles from "./Banner.module.css";
import Link from "next/link";

export function Banner() {
  return (
    <div className={styles.banner}>
      <Link href={`/destinos/medellin`}>
        <h1>Visita la Feria de las Flores Medellín 2025</h1>
        <p>Del 1 al 10 de Agosto</p>
      </Link>
    </div>
  );
}
