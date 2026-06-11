import { Suspense } from "react";
import { Gallery } from "./sections/gallery";
import { Hero } from "./sections/hero/Hero";
import { GallerySkeleton } from "./sections/gallery/components/gallery-skeleton";

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;

  return (
    <>
      <Hero />
      <Suspense fallback={<GallerySkeleton />}>
        <Gallery page={page} limit={12} />
      </Suspense>
    </>
  );
}
