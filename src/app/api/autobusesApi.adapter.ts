import { ApiPhotosResponse, ApiPostsResponse } from "./autobusesApi.interfaces";

const URL = process.env.NEXT_PUBLIC_ABC_API;

type ApiEndpoints = "photos" | "posts";
type ApiResponseMap = Record<
  ApiEndpoints,
  ApiPhotosResponse[] | ApiPostsResponse[]
>;

async function fetchData<T>(endpoint: string): Promise<T> {
  if (!URL) return [] as T;

  try {
    const response = await fetch(`${URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return [] as T;
  }
}

export async function apiAdapter<T extends ApiEndpoints>(
  endpoint: T
): Promise<ApiResponseMap[T]> {
  return fetchData<ApiResponseMap[T]>(endpoint);
}
