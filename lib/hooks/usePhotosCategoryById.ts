"use client";

import { useEffect, useState } from "react";
import { ApiPhotoResponse } from "@/services/types/photo.type";
import { photosCategoryByIdQuery } from "@/services/api/photosCategoryById.query";

interface UseCategoryByIdProps {
  category_id: number;
  page: number;
  limit?: number;
}

export function usePhotosCategoryById({ category_id, page, limit }: UseCategoryByIdProps) {
  const [photos, setPhotosByCategory] = useState<ApiPhotoResponse>({} as ApiPhotoResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPhotoCategoryById(category_id: number, page: number, limit?: number) {
      setLoading(true);
      setError("");

      try {
        const result = await photosCategoryByIdQuery(category_id, page, limit);
        setPhotosByCategory(result || {} as ApiPhotoResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotoCategoryById(category_id, page, limit);
  }, [category_id, page]);

  return {
    photos,
    loading,
    error,
  };
}
