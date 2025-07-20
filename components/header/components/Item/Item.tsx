import { useMemo } from "react";

import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";
import { useTransportCategories } from "@/lib/hooks";

export function Item({ title }: { title: string }) {
  const { list } = useTransportCategories();

  const category = useMemo(
    () => list.find((category) => category.name === title),
    [title]
  );

  if (!category) {
    return null;
  }

  return (
    <Link href={`/category/${category.category_id}`}>
      <li className={styles.container}>
        <span>{title}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
