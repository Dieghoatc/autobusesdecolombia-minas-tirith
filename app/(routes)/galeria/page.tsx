import { Suspense } from "react";
import { GalleryFeed } from "@/app/sections/gallery";
import { GallerySkeleton } from "@/app/sections/gallery/components/gallery-skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galería de Autobuses | Autobuses de Colombia",
  description: "Explora nuestra extensa galería de fotografías de autobuses, busetas y sistemas de transporte en Colombia.",
};

// Latest photos: regenerate at most every 60s (same as /api/gallery)
export const revalidate = 60;

export default function GaleriaPage() {
  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto text-center space-y-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Galería de Autobuses
        </h1>
        <p className="text-muted-foreground text-lg">
          Descubre miles de fotografías del transporte colombiano
        </p>
      </div>

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryFeed limit={20} />
      </Suspense>
    </div>
  );
}