import { Skeleton } from "@/app/components/ui/skeleton";
import { GallerySkeleton } from "@/app/sections/gallery/components/gallery-skeleton";

export default function CategoryLoading() {
  return (
    <div className="py-8" aria-busy="true">
      <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center gap-4">
        <Skeleton className="h-3 w-24 bg-zinc-900" />
        <Skeleton className="h-12 w-3/4 max-w-xl bg-zinc-900" />
        <Skeleton className="h-16 w-full max-w-2xl bg-zinc-900" />
      </div>
      <GallerySkeleton />
    </div>
  );
}
