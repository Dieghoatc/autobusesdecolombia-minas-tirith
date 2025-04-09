import { Skeleton } from "@/app/components/ui/skeleton";
import { generateArray } from "../../../utils";  
import "./skeleton.css";

const SKELETON_ITEM_COUNT = 30;

export default function SkeletonComponent() {
  const skeletonItems = generateArray(SKELETON_ITEM_COUNT);

  return (
    <div className="sketelon-container">
      {skeletonItems.map((item: number) => (
        <div key={item}>
          <Skeleton className="skeleton-image" />
          <Skeleton className="skeleton-detail" />
        </div>
      ))}
    </div>
  );
}
