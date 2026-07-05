import { SearchResponse } from "../types/search.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(
    params: URLSearchParams,
    signal?: AbortSignal
): Promise<T> {
    const res = await fetch(`${URL}/search?${params}`, {
        cache: "no-store",
        signal,
    });

    if (!res.ok) {
        throw new Error(`Search request failed with status ${res.status}`);
    }

    return res.json() as Promise<T>;
}

export async function searchQuery(
    params: URLSearchParams,
    signal?: AbortSignal
): Promise<SearchResponse> {
    return fetchData<SearchResponse>(params, signal);
}