import { ChevronRight } from "lucide-react";

import styles from "./Item.module.css";
import Link from "next/link";

export function Item({ title }: { title: string }) {

  return (
    <Link href={`/category/${title}`}>
      <li className={styles.container}>
        <span>{title}</span>
        <ChevronRight />
      </li>
    </Link>
  );
}
