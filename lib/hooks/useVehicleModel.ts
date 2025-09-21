"use client";

import { useEffect, useState } from "react";
import { VehicleModelResponse } from "@/services/types/vehicle-model-response";
import { vehicleModelQuery } from "@/services/api/vehicle-model.query";

interface UseSearchProps {
  id: number;
}

export function useVehicleModel({ id }: UseSearchProps) {
  const [results, setResults] = useState<VehicleModelResponse>(
    {} as VehicleModelResponse
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    async function fetchResults(id: number, page: number, limit: number) {
      try {
        const result = await vehicleModelQuery(id, page, limit);
        setResults((prev: VehicleModelResponse | null) => {
          if (!prev) return result; // primer request
        
          return {
            ...prev,
            model: {
              ...prev.model,
              ...result.model,
              vehicles: [
                ...(prev.model?.vehicles ?? []),
                ...(result.model?.vehicles ?? []),
              ],
            },
            pagination: result.pagination,
          };
        });
        setCurrentPage(result.pagination.currentPage);
        setHasNext(result.pagination.hasNext);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchResults(id, currentPage, 9);
  }, [id, currentPage]);

  return {
    results,
    setCurrentPage,
    hasNext,
    loading,
  };
}
