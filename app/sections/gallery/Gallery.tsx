import { vehicleQuery } from "@/services/api/vehicle.query";
import { PaginationGallery } from "@/app/components/paginationGallery/paginationGallery";
import { GalleryGrid } from "./components/GalleryGrid";

interface GalleryProps {
  page?: number;
  limit?: number;
}

export async function Gallery({ page = 1, limit = 12 }: GalleryProps) {
  const data = await vehicleQuery(page, limit);

  if (!data || !data.data || data.data.length === 0) {
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
    <section className="w-full mt-4">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-2xl font-bold">Galería</h2>
        <span className="text-sm text-muted-foreground">
          {data.info.count} fotos
        </span>
      </div>
      
      <GalleryGrid vehicles={data.data} />
      
      <div className="mt-8 mb-4">
        <PaginationGallery pagination={data.info} />
      </div>
    </section>
  );
}
