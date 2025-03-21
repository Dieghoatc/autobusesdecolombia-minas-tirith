import { create } from "zustand"
import { ApiPostsResponse } from "../api/dto/post.dto";

interface PostStore {
    post: ApiPostsResponse;
    setPost: (newPost: ApiPostsResponse) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void;
}

const usePostStore = create<PostStore>((set) => ({
    post: {} as ApiPostsResponse,
    setPost: (newPost: ApiPostsResponse) => {
        set({ post: newPost })
    },
    loading: true,
    setLoading: (loading: boolean) => {
        set({ loading })
    }
}))

export default usePostStore