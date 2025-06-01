import { ApiPhotosResponse } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhotosResponse>(id: string): Promise<ApiPhotosResponse[]> {

  if (!URL) return [] as ApiPhotosResponse[];

  try {
    const response = await fetch(`${URL}/photos/category/${id}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return [] as ApiPhotosResponse[];
  }
}

export async function categoryByIdQuery(id: string): Promise<ApiPhotosResponse[] | undefined> {
  return fetchData<ApiPhotosResponse>(id);
}
