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
      <div className={styles.info}>
        {plate && (
          <div>
            <h2>
              Placa: <span>{plate.toLocaleUpperCase()}</span>
            </h2>
          </div>
        )}
        {serial && (
          <div>
            <h2>
              Serial: <span>{serial.toLocaleUpperCase()}</span>
            </h2>
          </div>
        )}
        {service && (
          <div>
            <h2>Servicio</h2>
            <span>{service}</span>
          </div>
        )}
      </div>
    </div>
  );
}
