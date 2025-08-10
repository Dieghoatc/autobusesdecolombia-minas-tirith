"use client";

import { useMemo } from "react";
import { brands } from "./brands";

import styles from "./Brand.module.css";

interface BrandProps {
  name: string;
}

export function Brand({ name }: BrandProps) {
  console.log(name);

  const findBrand = useMemo(
    () => brands.find((brand) => brand.name === name),
    [name]
  );

  console.log(">>>>", findBrand);

  if (!findBrand) return null;
  if (!findBrand.logo || findBrand.logo === null) return null;

  return (
    <div className={styles.container}>
      <img src={findBrand.logo.src} alt="brand" />
    </div>
  );
}
