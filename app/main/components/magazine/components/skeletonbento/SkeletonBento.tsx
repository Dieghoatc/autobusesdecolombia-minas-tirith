import { Skeleton } from "@/components/ui/skeleton";

import styles from "./SkeletonBento.module.css";

export function SkeletonBento() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
    </div>
  );
}
