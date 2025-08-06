import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";
import { TransportCategory } from "@/services/types/transportCategories.type";

interface ItemProps {
  category: TransportCategory;
  setOpen: (open: boolean) => void;
}

export function Item({ category, setOpen }: ItemProps) {
  return (
    <Link href={`/transport-category/${category.transport_category_id}`}>
      <li className={styles.container} onClick={() => setOpen(false)}>
        <span>{category.name}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
