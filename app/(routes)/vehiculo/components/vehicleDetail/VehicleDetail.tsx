import styles from "./VehicleDetail.module.css";

interface VehicleDetailProps {
  plate: string;
  serial: string;
  service: string;
}

export function VehicleDetail({ plate, serial, service }: VehicleDetailProps) {
  return (
    <div className={styles.container}>
      <div className={styles.plate}>
        <h2>Placa</h2>
        <p>{plate}</p>
      </div>
      <div className={styles.serial}>
        <h2>Serial</h2>
        <p>{serial}</p>
      </div>
      <div className={styles.service}>
        <h2>Servicio</h2>
        <p>{service}</p>
      </div>
    </div>
  );
}
