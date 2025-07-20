"use client";

import { useState, useEffect } from "react";
import { photosQuery } from "@/services/api/photos.query";
import { ApiPhotoResponse, Photo } from "@/services/types/photo.type";
import usePhotosStore from "@/lib/store/usePhotosStore";

export function useGetPhotos(page: number, limit: number) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setPhotosStore = usePhotosStore((state) => state.setPhotos);
  const setLoadingStore = usePhotosStore((state) => state.setLoading);

  useEffect(() => {
    async function fetchPhotos(page: number, limit: number) {
      setLoading(true);
      setError("");

      try {
        const result = await photosQuery(page, limit); 
        const { data } = result || {} as ApiPhotoResponse;    
        setPhotos(data);
        setPhotosStore(data);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoadingStore(false);
        setLoading(false);
      }
    }
    fetchPhotos(page, limit);
  }, [setPhotosStore, setLoadingStore, page]);

  return { photos, loading, error };
}
