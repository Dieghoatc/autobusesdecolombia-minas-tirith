import { SearchResponse } from "../types/search.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(params: URLSearchParams): Promise<T> {
    try {
        return fetch(`${URL}/search?${params}`, {
            cache: "force-cache"
        })
        .then((res) => res.json());
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return {} as T;
    }
}

export async function searchQuery(params: URLSearchParams): Promise<SearchResponse> {
    return fetchData<SearchResponse>(params);
}