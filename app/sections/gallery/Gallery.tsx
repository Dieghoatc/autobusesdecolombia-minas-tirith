import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { vehicleQuery } from "@/services/api/vehicle.query";

import { GalleryGrid } from "./components/GalleryGrid";

interface GalleryProps {
  limit?: number;
}

// Home preview: latest photos, faded out at the bottom, with a link to the
// full (infinite scroll) gallery.
export async function Gallery({ limit = 24 }: GalleryProps) {
  const data = await vehicleQuery(1, limit);

  if (!data?.data?.length) {
    return (
      <section className="w-full mt-4">
        <h2 className="text-2xl font-bold m-2">Galería</h2>
        <p className="text-muted-foreground text-center py-12">
          No se encontraron vehículos.
        </p>
      </section>
    );
  }

  return (
    <section aria-label="Galería" className="w-full mt-4 mb-12">
      <div className="relative max-h-[120vh] overflow-hidden">
        <GalleryGrid vehicles={data.data} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-10 flex justify-center">
          <Link
            href="/galeria"
            className="flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/15 px-6 py-3 text-base font-semibold text-amber-300 backdrop-blur-md transition-colors hover:bg-amber-500/25"
          >
            Ver todas las imágenes
            <ArrowUpRight aria-hidden className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
