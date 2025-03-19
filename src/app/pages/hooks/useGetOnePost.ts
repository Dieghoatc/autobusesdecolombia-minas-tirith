import { useEffect, useState } from "react";

import { autobusesApiFindOnePost } from "@/app/api/autobusesApi.find_one_post";
import { ApiPostsResponse } from "@/app/api/dto/photo.dto";

export function useFindOne(id: string) {
  const [post, setPost] = useState<ApiPostsResponse>({} as ApiPostsResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function fetchOnePost(id: string) {
      setLoading(true);
      setError("");
      try {
        const result = await autobusesApiFindOnePost(id);
        setPost(result as ApiPostsResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePost(id)
    
  }, [id]);

  return { post, loading, error };
}
