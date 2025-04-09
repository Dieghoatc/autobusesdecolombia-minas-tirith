import { ApiPhotosResponse } from "../../dto/photo.dto";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhotosResponse>(): Promise<ApiPhotosResponse[]> {
  if (!URL) return [] as ApiPhotosResponse[];

  try {
    const response = await fetch(`${URL}/photos`);
    const data = await response.json();
    return data as ApiPhotosResponse[];

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return [] as ApiPhotosResponse[];
  }
}

export async function getAllPhotos(): Promise<ApiPhotosResponse[] | undefined> {
    return fetchData<ApiPhotosResponse>();
}