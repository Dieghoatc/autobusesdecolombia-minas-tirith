const URL = process.env.NEXT_PUBLIC_ABC_API;

import { ApiPostsResponse } from '../../dto/post.dto';

async function fetchData<ApiPostsResponse>(): Promise<ApiPostsResponse[]> {
    if(!URL) return [] as ApiPostsResponse[];

    try {
        const response = await fetch(`${URL}/posts`)
        return await response.json()
    } catch (error) {
        console.error(`Failed to fetch data: ${error}`)
        return [] as ApiPostsResponse[]
    }
}

export async function getAllPost(): Promise<ApiPostsResponse[]> {
    return fetchData<ApiPostsResponse>()
}