"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useGetVehicle } from "@/lib/hooks";
import { Vehicle } from "@/services/types/vehicle.type";

export default function Search() {
  const [page, setPage] = useState(1);
  const { vehicles, loading } = useGetVehicle({ page });
  const [items, setItems] = useState<Vehicle[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip effect on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only update items when we have valid data and not loading
    if (!vehicles?.data || loading) return;

    setItems((prevItems) => {
      // For first page, replace items
      if (page === 1) return vehicles.data;

      // For subsequent pages, append new items
      // Filter out duplicates based on vehicle_id
      const newItems = vehicles.data.filter(
        (newItem) =>
          !prevItems.some(
            (existingItem) => existingItem.vehicle_id === newItem.vehicle_id
          )
      );

      return [...prevItems, ...newItems];
    });
  }, [vehicles?.data, loading, page]);

  const loadMore = useCallback(() => {
    if (loading || !vehicles?.info?.hasNext) return;
    setPage((prev) => prev + 1);
  }, [loading, vehicles?.info?.hasNext]);

  if (loading && page === 1) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div onClick={loadMore}>Cargar</div>
      {items.map((vehicle) => (
        <div key={vehicle.vehicle_id} className="relative">
          <img
            src={vehicle.vehiclePhotos[0].image_url}
            alt={vehicle.model.model_name}
            width={200}
            height={100}
            className="object-cover w-full h-full"
          />
          <span className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-1 text-3xl">
            {vehicle.model.model_name}
          </span>
        </div>
      ))}
    </div>
  );
}
