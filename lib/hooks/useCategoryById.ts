"use client";

import { useEffect, useState } from "react";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { categoryByIdQuery } from "@/services/api/categoryById.query";

interface UseCategoryByIdProps {
  id: string;
  page: number;
}

export function useCategoryById({ id, page }: UseCategoryByIdProps) {
  const [photosById, setPhotoById] = useState<ApiPhotosResponse>({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOnePhoto(id: string) {
      setLoading(true);
      setError("");

      try {
        const result = await categoryByIdQuery(id, page);
        setPhotoById(result || {} as ApiPhotosResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePhoto(id);
  }, [id]);

  return {
    photosById,
    loading,
    error,
  };
}
