"use client";

import { useMemo } from "react";
import styles from "./CompanyLogo.module.css";
import companies from "./companies";

interface CompanyLogoProps {
  isShow: boolean;
  name: string;
}

export function CompanyLogo({ isShow, name }: CompanyLogoProps) {
  const findLogo = useMemo(
    () => companies.find((company) => company.name === name),
    [name]
  );

  if (!findLogo) return null;
  if (!findLogo.icon || findLogo.icon === null) return null;

  return (
    <div className={styles.container}>
      <img
        src={findLogo.icon.src}
        alt="company"
        className={isShow ? "" : styles.logoHidden}
      />
    </div>
  );
}
