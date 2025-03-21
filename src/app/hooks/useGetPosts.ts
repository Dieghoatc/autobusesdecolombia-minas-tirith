import { useState, useEffect } from "react";

import { ApiPostsResponse } from "../api/dto/post.dto";
import { getAllPost } from "../api/services/posts/getAllPost";
import usePostStore from "../store/usePostStore";
import { orderById } from "../utils/orderById";

export function useGetPosts() {
  const [post, setPost] = useState<ApiPostsResponse[]>([]);
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
        const response = await getAllPost();
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

  return { post, loading, error };
}
