import { ApiPhotoById } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhotoById>(id: string): Promise<ApiPhotoById> {

  if (!URL) return {} as ApiPhotoById;

  try {
    const response = await fetch(`${URL}/photos/${id}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPhotoById;
  }
}

export async function photoByIdQuery(id: string): Promise<ApiPhotoById | undefined> {
  
  return fetchData<ApiPhotoById>(id);
}
