import { useMemo } from "react";

import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";

import { categoriesList } from "@/lib/constants/categoriesList";

export function Item({ title }: { title: string }) {
  const category = useMemo(() =>
    categoriesList.find((category) => category.label === title)
  , [title]);

  if (!category) {
    return null;
  }

  return (
    <Link href={`/category/${category.key}`}>
      <li className={styles.container}>
        <span>{title}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
