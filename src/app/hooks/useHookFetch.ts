import { useState, useEffect } from "react";
import { ApiResponse } from "../api/autobusesApi.adapter";

export function useHookFetch(fetchFunction: () => Promise<ApiResponse[]>) {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const result = await fetchFunction();
        if (isMounted) {
          setData(result || []);
        }
      } catch (error) {
        console.log("Error al obtener los datos", error);
        if (isMounted) {
          setData([]);
          setError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchFunction]);

  return { data, loading, error };
}
