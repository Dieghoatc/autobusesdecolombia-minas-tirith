"use client";

import { useEffect, useState } from "react";
import { ApiPhotoResponse } from "@/services/types/photo.type";
import { photosCategoryByIdQuery } from "@/services/api/photosCategoryById.query";

interface UseCategoryByIdProps {
  slug: string;
  page: number;
  limit?: number;
}

export function usePhotosCategoryById({ slug, page, limit }: UseCategoryByIdProps) {
  const [photos, setPhotosByCategory] = useState<ApiPhotoResponse>({} as ApiPhotoResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPhotoCategoryById(slug: string, page: number, limit?: number) {
      setLoading(true);
      setError("");

      try {
        const result = await photosCategoryByIdQuery(slug, page, limit);
        setPhotosByCategory(result || {} as ApiPhotoResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchPhotoCategoryById(slug, page, limit);
  }, [slug, page]);

  return {
    photos,
    loading,
    error,
  };
}
