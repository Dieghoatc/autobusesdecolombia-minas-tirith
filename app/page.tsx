import { Suspense } from "react";
import { Gallery } from "./sections/gallery";
import { Hero } from "./sections/hero/Hero";
import { GallerySkeleton } from "./sections/gallery/components/gallery-skeleton";

// Latest photos: regenerate at most every 60s (same as /api/gallery)
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery limit={24} />
      </Suspense>
    </>
  );
}
