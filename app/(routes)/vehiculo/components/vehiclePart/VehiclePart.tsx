"use client";

import { Brand } from "../brand";
import styles from "./VehiclePart.module.css";
import { LogoCard } from "../logoCard";

interface VehiclePartProps {
  type: "chassis" | "bodywork";
  name: string;
  brand: string;
}

export function VehiclePart({ type, name, brand }: VehiclePartProps) {
  const title = type === "chassis" ? "Chassis" : "Carroceria";

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoCard logo={type} />
      </div>
      <div className={styles.brand}>
        <Brand name={brand} />
      </div>
      <div className={styles.description}>
        <h2>{title}</h2>
        <span>
          {brand} {name}
        </span>
      </div>
    </div>
  );
}
