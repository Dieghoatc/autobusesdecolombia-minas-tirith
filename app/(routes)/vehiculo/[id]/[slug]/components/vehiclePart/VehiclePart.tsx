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
  const title = type === "chassis" ? "Chassis" : "Carrocería";

  return (
    <div>
      <div className={styles.header}>
        <LogoCard logo={type} />
        <Brand name={brand} />
      </div>

      <div className={styles.content}>
        <div className={styles.detailItem}>
          <h2 className={styles.label}>{title}</h2>
          <span className={styles.value}>
            {brand} {name}
          </span>
        </div>
      </div>
    </div>
  );
}
