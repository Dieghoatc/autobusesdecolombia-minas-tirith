"use client";

import { useEffect, useState } from "react";
import { Vehicle } from "@/services/types/vehicle.type";
import { vehicleQueryById } from "@/services/api/vehicleById.query";

interface UseVehicleByIdProps {
  id: number;
}

export function useGetVehicleById({ id }: UseVehicleByIdProps) {
  const [vehicle, setVehicle] = useState<Vehicle>({} as Vehicle);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVehicle(id: number) {
      setLoading(true);
      setError("");

      try {
        const result = await vehicleQueryById(id);
        setVehicle(result || ({} as Vehicle));
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchVehicle(id);
  }, [id]);

  return {
    vehicle,
    loading,
    error,
  };
}
