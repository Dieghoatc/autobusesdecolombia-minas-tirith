import { ApiPhotoResponse } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(category_id: number, page: number, limit?: number): Promise<T> {

  if (!URL) return {} as T;

  try {
    const response = await fetch(`${URL}/photos/category/${category_id}?page=${page}${limit ? `&limit=${limit}` : ""}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as T;
  }
}

export async function photosCategoryByIdQuery(category_id: number, page: number, limit?: number): Promise<ApiPhotoResponse | undefined> {
  return fetchData<ApiPhotoResponse>(category_id, page, limit);
}
