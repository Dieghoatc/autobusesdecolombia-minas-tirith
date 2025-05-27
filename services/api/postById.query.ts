import { ApiPostsResponse } from "../types/post.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPostsResponse>(
  id: string
): Promise<ApiPostsResponse> {

  if (!URL) return {} as ApiPostsResponse;

  try {
    const response = await fetch(`${URL}/posts/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPostsResponse;
  }
}

export async function postByIdQuery(
  id: string
): Promise<ApiPostsResponse | undefined> {
  return fetchData<ApiPostsResponse>(id);
}
