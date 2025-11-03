import { useMemo } from "react";
import Image from "next/image";
import styles from "./CompanyLogo.module.css";
import companies from "./companies";

interface CompanyLogoProps {
  name: string;
}

export function CompanyLogo({ name }: CompanyLogoProps) {
  const findLogo = useMemo(
    () => companies.find((company) => company.name === name),
    [name]
  );

  if (!findLogo) return null;
  if (!findLogo.icon || findLogo.icon === null) return null;

  return (
    <div className={styles.container}>
      <Image
        src={findLogo.icon.src}
        alt={`${name} logo`}
        width={100}
        height={100}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
}
