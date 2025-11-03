import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";
import { MenuCategory } from "../overlay/menuCategories";

interface ItemProps {
  category: MenuCategory;
  setOpen: (open: boolean) => void;
}

export function Item({ category, setOpen }: ItemProps) {
  return (
    <Link href={`/transport-category/${category.id}`}>
      <li className={styles.container} onClick={() => setOpen(false)}>
        <span>{category.name}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
