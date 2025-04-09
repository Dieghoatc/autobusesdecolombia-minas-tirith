import { ApiPostsResponse } from "./dto/post.dto";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPostsResponse>(
  id: string
): Promise<ApiPostsResponse> {

  if (!URL) return {} as ApiPostsResponse;

  try {
    const response = await fetch(`${URL}/posts/${id}`);
    return await response.json();

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPostsResponse;
  }
}

export async function autobusesApiFindOnePost(
  id: string
): Promise<ApiPostsResponse | undefined> {
  return fetchData<ApiPostsResponse>(id);
}
