import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";
import { TransportCategory } from "@/services/types/transportCategories.type";

interface ItemProps {
  category: TransportCategory;
}

export function Item({ category }: ItemProps) {
  return (
    <Link href={`/category/${category.transport_category_id}`}>
      <li className={styles.container}>
        <span>{category.name}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
