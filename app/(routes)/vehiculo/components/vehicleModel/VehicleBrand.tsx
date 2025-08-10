import styles from "./VehicleBrand.module.css";

interface VehicleBrandProps {
  title: string;
  isShow: boolean;
}

export function VehicleModelName({ title, isShow }: VehicleBrandProps) {
  return (
    <div
      className={styles.container + " " + (isShow ? "" : styles.brandHidden)}
    >
      <h1>{title}</h1>
    </div>
  );
}
