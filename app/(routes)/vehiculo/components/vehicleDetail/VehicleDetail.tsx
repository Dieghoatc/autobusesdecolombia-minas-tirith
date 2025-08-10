import styles from "./VehicleDetail.module.css";
import { Brand } from "../brand";
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
  brand,
}: VehicleDetailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoCard logo="car" />
      </div>
      <div className={styles.brand}>
        <Brand name={brand} />
      </div>
      {plate && (
        <div className={styles.plate}>
          <h2>
            Placa: <span>{plate.toLocaleUpperCase()}</span>
          </h2>
        </div>
      )}
      {serial && (
        <div className={styles.serial}>
          <h2>
            Serial: <span>{serial.toLocaleUpperCase()}</span>
          </h2>
        </div>
      )}
      {service && (
        <div className={styles.service}>
          <h2>
            Servicio: <span>{service}</span>
          </h2>
        </div>
      )}
    </div>
  );
}
