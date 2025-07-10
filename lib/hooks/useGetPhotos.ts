"use client";

import { useState, useEffect } from "react";
import { photosQuery } from "@/services/api/photos.query";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import usePhotosStore from "@/lib/store/usePhotosStore";

export function useGetPhotos(page: number) {
  const [photos, setPhotos] = useState<ApiPhotosResponse>({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setPhotosStore = usePhotosStore((state) => state.setPhotos);
  const setLoadingStore = usePhotosStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchPhotos(page: number) {
      setLoading(true);
      setError("");

      try {
        const result = await photosQuery(page);      
        setPhotos(result as ApiPhotosResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoadingStore(false);
        setLoading(false);
      }
    }
    fetchPhotos(page);
  }, [setPhotosStore, setLoadingStore, page]);

  return { photos, loading, error };
}
