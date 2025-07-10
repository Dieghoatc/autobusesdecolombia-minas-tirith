import { useState, useEffect } from "react";

import { ApiPostsResponse } from "../../services/types/post.type";
import { postsQuery } from "../../services/api/posts.query";
import usePostStore from "../store/usePostStore";
import { orderById } from "@/lib/helpers/orderById";

export function useGetPosts() {
  const [posts, setPost] = useState<ApiPostsResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const setPostsStore = usePostStore((state) => state.setPost);
  const setLoadingPostsStore = usePostStore((state) => state.setLoading);

  function formatPostData(data: ApiPostsResponse[]) {
    const order = orderById(data, "post_id");
    return order[0];
  }

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError("");

      try {
        const response = await postsQuery();
        const resultFormat = formatPostData(response);
        setPostsStore(resultFormat);
        setPost(response as ApiPostsResponse[]);
      } catch (error) {
        setError(`Error: ${error}`);
      } finally {
        setLoadingPostsStore(false);
        setLoading(false);
      }
    }

    fetchPosts();

  }, [setPostsStore, setLoadingPostsStore]);

  return { posts, loading, error };
}
