import { Model } from "../types/model.type";

const URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>(search: string): Promise<T> {
    try {
        return fetch(`${URL}/search/${encodeURIComponent(search)}`, {
            cache: "force-cache"
        })
        .then((res) => res.json());
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`);
        return {} as T;
    }
}

export async function searchQuery(search: string): Promise<Model[]> {
    return fetchData<Model[]>(search);
}