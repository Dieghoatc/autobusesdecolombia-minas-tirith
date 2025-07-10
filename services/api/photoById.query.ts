import { ApiPhoto } from "../types/photo.type";
const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<ApiPhoto>(id: string): Promise<ApiPhoto> {

  if (!URL) return {} as ApiPhoto;

  try {
    const response = await fetch(`${URL}/photos/${id}`);
    return await response.json();

  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
    return {} as ApiPhoto;
  }
}

export async function photoByIdQuery(id: string): Promise<ApiPhoto | undefined> {
  
  return fetchData<ApiPhoto>(id);
}
