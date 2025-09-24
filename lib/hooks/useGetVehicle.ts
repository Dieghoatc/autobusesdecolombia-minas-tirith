"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/services/types/vehicle.type";
import { vehicleQuery } from "@/services/api/vehicle.query";

interface UseVehicle {
  page: number;
  limit?: number;
}

export function useGetVehicle({ page, limit }: UseVehicle) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([] as Vehicle[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(page);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    async function fetchVehicle(page: number, limit?: number) {
      setLoading(true);
      setError("");

      try {
        const result = await vehicleQuery(page, limit);
        setVehicles((prev) => [...prev, ...result.data]);
        setCurrentPage(result.info.currentPage);
        setHasNext(result.info.hasNext);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle(currentPage, limit);
  }, [currentPage, limit]);

  return {
    vehicles,
    loading,
    error,
    currentPage,
    hasNext,
    setCurrentPage,
  };
}
