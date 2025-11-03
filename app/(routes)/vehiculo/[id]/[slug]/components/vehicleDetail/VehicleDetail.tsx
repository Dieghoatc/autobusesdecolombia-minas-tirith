import styles from "./VehicleDetail.module.css";
import { LogoCard } from "../logoCard";

interface VehicleDetailProps {
  plate: string;
  serial: string;
  service: string;
  brand: string;
}

export function VehicleDetail({
  plate,
  serial,
  service,
}: VehicleDetailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <LogoCard logo="car" />
      </div>

      <div className={styles.detailsGrid}>
        {plate && (
          <div className={styles.detailItem}>
            <h2 className={styles.label}>
              Placa:{" "}
              <span className={styles.value}>{plate.toLocaleUpperCase()}</span>
            </h2>
          </div>
        )}
        {serial && (
          <div className={styles.detailItem}>
            <h2 className={styles.label}>
              Serial:{" "}
              <span className={styles.value}>{serial.toLocaleUpperCase()}</span>
            </h2>
          </div>
        )}
        {service && (
          <div className={styles.detailItem}>
            <h2 className={styles.label}>
              Servicio: <span className={styles.value}>{service}</span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
