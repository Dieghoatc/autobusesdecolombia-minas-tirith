"use client";

import { useState, useEffect } from "react";
import { photosQuery } from "@/services/api/photos.query";
import { ApiPhoto, ApiPhotosResponse } from "@/services/types/photo.type";
import usePhotosStore from "@/lib/store/usePhotosStore";
import { orderById } from "@/lib/helpers/orderById";

export function useGetPhotos(page: number) {
  const [photos, setPhotos] = useState<ApiPhotosResponse>({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setPhotosStore = usePhotosStore((state) => state.setPhotos);
  const setCategoryStore = usePhotosStore((state) => state.setCategory);
  const setLoadingStore = usePhotosStore((state) => state.setLoading);

  function formatPhotosData(response : ApiPhoto[]) {
    const order = orderById(response, "photo_id");
    return order[0]
  }

  function findForCategory(data: ApiPhoto[], category: number) {
    return data.filter((photo) => photo.category_id === category);
  }

  useEffect(() => {
    async function fetchPhotos(page: number) {
      setLoading(true);
      setError("");

      try {
        const result = await photosQuery(page);      
        setPhotos(result as ApiPhotosResponse);
        // const resultFormat = formatPhotosData(result as ApiPhoto[]);
        // setPhotosStore(resultFormat);
        // const category = findForCategory(result as ApiPhoto[], 5);
        // const categoryFormat = formatPhotosData(category);
        // setCategoryStore(categoryFormat);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoadingStore(false);
        setLoading(false);
      }
    }
    fetchPhotos(page);
  }, [setPhotosStore, setLoadingStore, setCategoryStore, page]);

  return { photos, loading, error };
}
