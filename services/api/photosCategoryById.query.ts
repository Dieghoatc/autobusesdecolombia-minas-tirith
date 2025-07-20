import { ApiPhotoResponse } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhotoResponse>(slug: string, page: number, limit?: number): Promise<ApiPhotoResponse> {

  if (!URL) return {} as ApiPhotoResponse;

  try {
    const response = await fetch(`${URL}/photos/category/${slug}?page=${page}${limit ? `&limit=${limit}` : ""}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPhotoResponse;
  }
}

export async function photosCategoryByIdQuery(slug: string, page: number, limit?: number): Promise<ApiPhotoResponse | undefined> {
  return fetchData<ApiPhotoResponse>(slug, page, limit);
}
