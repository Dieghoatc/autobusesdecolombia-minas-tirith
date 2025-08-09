"use client";

import { useEffect, useState } from "react";
import { APIVehicleResponse } from "@/services/types/vehicle.type";
import { vehicleCategoryQueryById } from "@/services/api/vehicleCategoryById";

interface UseVehicleCategoryByIdProps {
  id: number;
  page: number;
  limit?: number;
}

export function useGetVehicleCategoryById({
  id,
  page,
  limit,
}: UseVehicleCategoryByIdProps) {
  const [vehicles, setVehicles] = useState<APIVehicleResponse>(
    {} as APIVehicleResponse
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicle(id: number, page: number, limit?: number) {
      setLoading(true);
      setError("");

      try {
        const result = await vehicleCategoryQueryById(id, page, limit);
        setVehicles(result || ({} as APIVehicleResponse));
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle(id, page, limit);
  }, [id, page, limit]);

  return {
    vehicles,
    loading,
    error,
  };
}
