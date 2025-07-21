import { ApiPhotoResponse } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData(id: string): Promise<ApiPhotoResponse> {

  if (!URL) return {} as ApiPhotoResponse;

  try {
    const response = await fetch(`${URL}/photos/${id}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPhotoResponse;
  }
}

export async function photoByIdQuery(id: string): Promise<ApiPhotoResponse | {}> {  
  return fetchData(id);
}
