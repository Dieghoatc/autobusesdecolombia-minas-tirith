import { TransportCategory } from "../types/transportCategories.type";

const API_URL = process.env.NEXT_PUBLIC_ABC_API;

// All transport categories. Throws on failure instead of returning a non-list,
// so callers never store or use an invalid value.
export async function transportCategoriesQuery(): Promise<TransportCategory[]> {
    if (!API_URL) {
        throw new Error("API_URL not found");
    }

    const response = await fetch(`${API_URL}/transport-categories`);
    if (!response.ok) {
        throw new Error(`Failed to fetch transport categories: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
        throw new Error("Unexpected transport categories response");
    }
    return data as TransportCategory[];
}
