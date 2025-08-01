"use client";

import { Gallery } from "./components/gallery/Gallery";
import { Header } from "./components/header";
import styles from "./Main.module.css";
import "@fontsource-variable/caveat";

export default function Main() {
  return (
    <div>
      <div className={styles.banner}>
        <h1>Visita la Feria de las Flores Medellín 2025</h1>
        <p>Del 1 al 8 de Agosto</p>
      </div>
      <Header />
      <Gallery />
    </div>
  );
}
