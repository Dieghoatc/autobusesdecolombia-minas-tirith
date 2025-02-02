import { useState, useEffect } from "react";
import { apiAdapter } from "../api/autobusesApi.adapter";
import {
  ApiPhotosResponse,
  ApiPostsResponse,
} from "../api/autobusesApi.interfaces";

type ApiResponseType = ApiPhotosResponse[] | ApiPostsResponse[];

export function useHookFetch<T extends ApiResponseType>(
  endpoint: "photos" | "posts"
) {
  const [data, setData] = useState<T | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const result = await apiAdapter(endpoint);
        setData(result as T);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    const intervalo = setInterval(fetchData, 1400000);
    return () => clearInterval(intervalo);
  }, [endpoint]);

  return { data, loading, error };
}
