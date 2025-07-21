import { ApiPhotoResponse } from "../types/photo.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(page: number, limit: number): Promise<T> {
  if (!URL) return {} as T;
  try {
    const response = await fetch(
      `${URL}/photos/page?page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as T;
  }
}

export async function photosQuery(
  page: number,
  limit: number
): Promise<ApiPhotoResponse | undefined> {
  return fetchData<ApiPhotoResponse>(page, limit);
}
