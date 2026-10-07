import { Skeleton } from "@/app/components/ui/skeleton";

import { MASONRY_COLUMNS, tileRatio } from "../masonry";

const items = Array.from({ length: 15 });

// Same masonry and tile shapes as the gallery, so nothing jumps on load.
export function GallerySkeleton() {
  return (
    <section className={`w-full mt-4 ${MASONRY_COLUMNS}`} aria-hidden>
      {items.map((_, index) => (
        <div key={index} className="mb-2 break-inside-avoid">
          <Skeleton
            className="w-full rounded-xl bg-zinc-900"
            style={{ aspectRatio: tileRatio(index).replace(":", " / ") }}
          />
        </div>
      ))}
    </section>
  );
}
