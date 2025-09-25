"use client";

import { useEffect, useState } from "react";
import type { Model } from "@/services/types/vehicle-model-response";
import { vehicleModelQuery } from "@/services/api/vehicle-model.query";

interface Pagination {
  currentPage: number;
  hasNext: boolean;
}

interface VehicleModelResponse {
  model: Model;
  pagination: Pagination;
}

interface UseVehicleModelProps {
  id: number;
}

export function useVehicleModel({ id }: UseVehicleModelProps) {
  const [results, setResults] = useState<VehicleModelResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    setResults(null);
    setCurrentPage(1);
    setHasNext(true);
    setLoading(true);
  }, [id]);

  useEffect(() => {
    if (!id || currentPage < 1) return; // evitar llamadas inválidas

    let cancel = false; // protección contra race conditions

    async function fetchResults() {
      try {
        const result = await vehicleModelQuery(id, currentPage, 9);

        if (cancel) return; // evitar actualizar estado si cambió id

        setResults((prev) => {
          if (!prev) return result;
          return {
            ...result,
            model: {
              ...result.model,
              vehicles: [...prev.model.vehicles, ...result.model.vehicles],
            },
          };
        });

        setHasNext(result.pagination.hasNext);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    fetchResults();

    return () => {
      cancel = true; // cleanup evita duplicados en cambios rápidos de id/page
    };
  }, [id, currentPage]);

  return {
    results,
    setCurrentPage,
    hasNext,
    loading,
  };
}
