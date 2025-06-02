import { useEffect, useState } from "react";
import { ApiPhotosResponse } from "@/services/types/photo.type";
import { photoByIdQuery } from "@/services/api/photoById.query";

export function usePhotoById(id: string) {
  const [image, setImage] = useState({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOnePhoto(id: string) {
      setLoading(true);
      setError("");

      try {
        const result = await photoByIdQuery(id);
        setImage(result as ApiPhotosResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePhoto(id);
  }, [id]);

  return {
    image,
    loading,
    error,
  };
}
