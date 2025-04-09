import { useEffect, useState } from "react";
import { ApiPhotosResponse } from "@/app/api/dto/photo.dto";
import { getPhotoById } from "@/app/api/services/photos/getPhotoById";

export function useGetPhoto(id: string) {
  const [photo, setPhoto] = useState<ApiPhotosResponse>({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchOnePhoto(id: string) {
      setLoading(true);
      setError("");

      try {
        const result = await getPhotoById(id);
        setPhoto(result as ApiPhotosResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePhoto(id);
  }, [id]);

  return { photo, loading, error };
}
