import { Skeleton } from "@/components/ui/skeleton";

import styles from "./Skeleton.module.css";

export function SkeletonNews() {
  return (
    <div className={styles.container}>
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
      <Skeleton className={styles.item} />
    </div>
  );
}
