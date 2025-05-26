const URL = process.env.NEXT_PUBLIC_ABC_API;

import { ApiPostsResponse } from '../types/post.type';

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

export async function postsQuery(): Promise<ApiPostsResponse[]> {
    return fetchData<ApiPostsResponse>()
}