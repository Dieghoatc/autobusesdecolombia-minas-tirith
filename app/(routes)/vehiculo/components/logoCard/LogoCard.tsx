import { Car, Camera } from "lucide-react";
import ChassisLogo from "@/assets/vehicle/chassis.png";
import BodyworkLogo from "@/assets/vehicle/bodywork.png";

import styles from "./LogoCard.module.css";

interface LogoCardProps {
  logo: "car" | "chassis" | "bodywork" | "camera";
}

export function LogoCard({ logo }: LogoCardProps) {
  return (
    <div className={styles.container}>
      {logo === "car" ? (
        <Car />
      ) : logo === "chassis" ? (
        <img src={ChassisLogo.src} alt="chassis" />
      ) : logo === "bodywork" ? (
        <img src={BodyworkLogo.src} alt="bodywork" />
      ) : (
        <Camera />
      )}
    </div>
  );
}
