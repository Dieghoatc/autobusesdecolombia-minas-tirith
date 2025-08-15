import { useEffect, useState } from "react";

import { postByIdQuery } from "@/services/api/postById.query";
import { ApiPostsResponse } from "@/services/types/post.type";

export function useFindPost(id: number) {
  const [post, setPost] = useState<ApiPostsResponse>({} as ApiPostsResponse);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOnePost(id: number) {
      setLoading(true);
      setError("");
      try {
        const result = await postByIdQuery(id);
        setPost(result as ApiPostsResponse);
      } catch (error) {
        setError(`Error to fetch data: ${error}`);
      } finally {
        setLoading(false);
      }
    }

    fetchOnePost(id);
  }, [id]);

  return { post, loading, error };
}
