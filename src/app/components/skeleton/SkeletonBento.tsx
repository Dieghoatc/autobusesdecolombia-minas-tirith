import { Skeleton } from "@/components/ui/skeleton";
import { generateArray } from "../../utils";

const SKELETON_ITEM_COUNT = 5;

interface SkeletonBentoProps {
  skeletonStyle: string;
}

export function SkeletonBento({ skeletonStyle }: SkeletonBentoProps) {
  const skeletonItems = generateArray(SKELETON_ITEM_COUNT);

  return (
    <>
      {skeletonItems.map((item: number) => (
        <Skeleton key={item} className={skeletonStyle} />
      ))}
    </>
  );
}
