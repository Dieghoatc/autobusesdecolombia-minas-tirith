"use client";

import { useEffect, useState } from "react";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { categoryByIdQuery } from "@/services/api/categoryById.query";

interface UseCategoryByIdProps {
  id: string;
}

export function useCategoryById({ id }: UseCategoryByIdProps) {
  const [photosById, setPhotoById] = useState([] as ApiPhotosResponse[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOnePhoto(id: string) {
      setLoading(true);
      setError("");

      try {
        const result = await categoryByIdQuery(id);
        setPhotoById(result as ApiPhotosResponse[]);
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
