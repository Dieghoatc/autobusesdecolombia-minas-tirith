import { ApiPostsResponse } from "../types/post.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number): Promise<T> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  try {
    const response = await fetch(`${URL}/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 404) {
        return undefined as T;
      }
      throw new Error(`HTTP error! status: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
}

export async function postByIdQuery(
  id: number
): Promise<ApiPostsResponse | undefined> {
  try {
    return await fetchData<ApiPostsResponse>(id);
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error}`);
  }
  return fetchData<ApiPostsResponse>(id);
}
