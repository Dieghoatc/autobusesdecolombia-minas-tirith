import { Skeleton } from "@/app/components/ui/skeleton";

import styles from "./MagazineSkeleton.module.css";

export function MagazineSkeleton() {
  return (
      <Skeleton className={styles.skeleton} />
  );
}

export function MagazineSkeletonItem() {
  return (
      <Skeleton className={styles.skeleton_item} />
  );
}