import { useEffect, useState } from "react";
import { ApiPhotosResponse } from "@/app/api/autobusesApi.interfaces";
import { autobusesApiFindPhoto } from "@/app/api/photos_service/autobuses.Api.findphoto";

export function useGetPhoto(id: string) {
  const [photo, setPhoto] = useState<ApiPhotosResponse>({} as ApiPhotosResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const metadata = {
    title: photo.company,
    openGraph: {
      images: [photo.url],
    },
  }

  useEffect(() => {
    async function fetchOnePhoto(id: string) {
      setLoading(true);
      setError("");
      try {
        const result = await autobusesApiFindPhoto(id);
        setPhoto(result as ApiPhotosResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePhoto(id);
  }, [id]);

  return { photo, loading, error, metadata };
}
