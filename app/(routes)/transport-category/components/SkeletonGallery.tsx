"use client";

import { Skeleton } from "@/components/ui/skeleton";

const count = 20

export function SkeletonGallery() {

 const array = Array.from({ length: count }, (_, index) => index)

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4 mt-4">
      {array.map((item) => (
        <Skeleton key={item} className="w-[180px] h-[180px] md:aspect-square md:w-[300px] md:h-[300px] rounded-xl bg-slate-800" />
      ))}
    </div>
  )
}
