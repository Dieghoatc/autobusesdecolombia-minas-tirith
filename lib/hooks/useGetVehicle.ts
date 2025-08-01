"use client";

import { useEffect, useState } from "react";
import { APIVehicleResponse } from "@/services/types/vehicle.type";
import { vehicleQuery } from "@/services/api/vehicle.query";

interface UseVehicle {
  page: number;
  limit?: number;
}

export function useGetVehicle({ page, limit }: UseVehicle) {
  const [vehicles, setVehicles] = useState<APIVehicleResponse>(
    {} as APIVehicleResponse
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicle(page: number, limit?: number) {
      setLoading(true);
      setError("");

      try {
        const result = await vehicleQuery(page, limit);
        setVehicles(result || ({} as APIVehicleResponse));
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle(page, limit);
  }, [page, limit]);

  return {
    vehicles,
    loading,
    error,
  };
}
