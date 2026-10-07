import { vehicleQuery } from "@/services/api/vehicle.query";

import { InfiniteGallery } from "./components/InfiniteGallery";

interface GalleryFeedProps {
  limit?: number;
}

// Full gallery: the first page is server-rendered, the rest loads on scroll.
export async function GalleryFeed({ limit = 20 }: GalleryFeedProps) {
  const data = await vehicleQuery(1, limit);

  if (!data?.data?.length) {
    return (
      <p className="text-muted-foreground text-center py-12">
        No se encontraron vehículos.
      </p>
    );
  }

  return (
    <section className="w-full mt-4">
      <div className="flex items-center justify-end mb-4 px-2">
        <span className="text-sm text-muted-foreground">{data.info.count} fotos</span>
      </div>
      <InfiniteGallery initial={data} limit={limit} />
    </section>
  );
}
