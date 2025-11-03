import styles from "./SkeletonCatList.module.css";
import { Skeleton } from "@/app/components/ui/skeleton";

export function SkeletonCatList() {
  return (
    <div>
      <div className={styles.skeleton_title}>
        <Skeleton className={styles.skeleton_title_item} />
        <Skeleton className={styles.skeleton_title_item} />
      </div>
      <div className={styles.skeleton_card}>
        <Skeleton className={styles.skeleton_card_item} />
        <Skeleton className={styles.skeleton_card_item} />
      </div>
    </div>
  );
}
