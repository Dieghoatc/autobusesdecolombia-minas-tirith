import { ApiPhotosResponse } from "../types/photo.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhotosResponse>(page: number): Promise<ApiPhotosResponse> {
  if (!URL) return {} as ApiPhotosResponse;

  try {
    const response = await fetch(`${URL}/photos/page/${page}`);
    const data = await response.json();
    return data as ApiPhotosResponse;

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPhotosResponse;
  }
}

export async function photosQuery(page: number): Promise<ApiPhotosResponse | undefined> {
    return fetchData<ApiPhotosResponse>(page);
}