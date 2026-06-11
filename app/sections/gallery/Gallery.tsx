import { ImageCard } from "@/app/components/image-card";
import { vehicleQuery } from "@/services/api/vehicle.query";
import { formatURL } from "@/lib/helpers/formatURL";
import { PaginationGallery } from "@/app/components/paginationGallery/paginationGallery";
import Link from "next/link";

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
      <article className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.data.map((vehicle) =>
          vehicle.vehiclePhotos.map((photo) => (
            <div key={photo.vehicle_photo_id}>
              <Link
                href={`/vehiculo/${vehicle.vehicle_id}/${formatURL(
                  vehicle.model.model_name
                )}${
                  vehicle.company?.company_name
                    ? "-" + formatURL(vehicle.company?.company_name)
                    : ""
                }${
                  vehicle.companySerial?.company_serial_code
                    ? "-" +
                      formatURL(vehicle.companySerial?.company_serial_code)
                    : ""
                }`}
              >
                <ImageCard
                  image_url={photo.image_url}
                  title={vehicle.model.model_name}
                  company={vehicle.company?.company_name ?? ""}
                  author={photo.photographer}
                />
              </Link>
            </div>
          ))
        )}
      </article>
      <div className="mt-8 mb-4">
        <PaginationGallery pagination={data.info} />
      </div>
    </section>
  );
}
