"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useGetVehicle } from "@/lib/hooks";
import { Vehicle } from "@/services/types/vehicle.type";
import { PaginationGallery } from "@/components/paginationGallery/paginationGallery";

export default function ProvisionalSeach() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");

  const { vehicles, loading } = useGetVehicle({ page: page, limit: limit });

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-2 gap-2">
        {vehicles.data.map((item: Vehicle) => (
          <div key={item.vehicle_id} className="relative w-full h-96">
            <div className="absolute top-0 left-0 z-10 p-4 text-white bg-gray-950 bg-opacity-20">
              <h1 className="text-9xl font-bold">{item.vehicle_id}</h1>
              {item.model ? (
                <p className="text-2xl">{item.model.model_name}</p>
              ) : null}
              {item.model?.bodywork ? (
                <p className="text-2xl">{item.model.bodywork.bodywork_name}</p>
              ) : null}
              {item.model?.chassis ? (
                <p className="text-2xl">{item.model.chassis.chassis_name}</p>
              ) : null}
            </div>

            <img
              src={item.vehiclePhotos[0]?.image_url}
              alt="Vehicle"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div>
        <PaginationGallery pagination={vehicles.info} goToPage={goToPage} />
      </div>
    </div>
  );
}
