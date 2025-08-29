import styles from "./VehicleBrand.module.css";

export function VehicleModelName({ title }: { title: string }) {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
    </div>
  );
}
