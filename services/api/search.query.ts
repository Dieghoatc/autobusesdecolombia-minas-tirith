import { SearchResponse } from "../types/search.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(search: string, page: number = 1, limit: number = 10): Promise<T> {
    try {
        return fetch(`${URL}/search/${encodeURIComponent(search)}?page=${page}&limit=${limit}`, {
            cache: "force-cache"
        })
        .then((res) => res.json());
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return {} as T;
    }
}

export async function searchQuery(search: string, page: number = 1, limit: number = 10): Promise<SearchResponse> {
    return fetchData<SearchResponse>(search, page, limit);
}