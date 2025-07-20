import { TransportCategory } from "../types/transportCategories.type";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

async function fetchData<T>():Promise<T> {
    if (!API_URL) {
        throw new Error("API_URL not found");
    }

    try {
        const response = await fetch(`${API_URL}/transport-categories`)

        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`)
        }
        return await response.json() as T

    } catch (error) {
        console.error(`Failed to fetch data: ${error}`)
        return {} as T;
    }
}

export async function transportCategoriesQuery(): Promise<TransportCategory[]> {
    return fetchData<TransportCategory[]>();
}
