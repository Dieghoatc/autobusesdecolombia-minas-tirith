import { ApiPostsResponse } from "../types/post.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(id: number): Promise<T | undefined> {
  if (!URL) {
    throw new Error("API base URL not defined in NEXT_PUBLIC_ABC_API");
  }

  const response = await fetch(`${URL}/posts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      // Si no existe, simplemente devuelve undefined
      return undefined;
    }
    throw new Error(
      `HTTP error! status: ${response.status} ${response.statusText}`
    );
  }

  // Manejar caso de body vacío (204 No Content o response sin datos)
  const text = await response.text();
  if (!text) {
    return undefined; // <- evita el "Unexpected end of JSON input"
  }

  try {
    return JSON.parse(text) as T;
  } catch (e) {
    throw new Error(`Invalid JSON response: ${e}`);
  }
}

export async function postByIdQuery(
  id: number
): Promise<ApiPostsResponse | undefined> {
  return fetchData<ApiPostsResponse>(id);
}
